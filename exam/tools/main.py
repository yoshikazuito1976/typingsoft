#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Typing dictionary builder
- Input : source.csv (display,kana,romaji)  ※romajiは正解1つ（canonical）
- Optional: overrides.csv (display,romaji_add)  ※例外追記
- Output: dictionary.json  (display -> {kana, romaji:[variants...]})

Variant engine:
- Generates romaji variants from kana (hiragana) using multiple romanization options
- Adds canonical romaji (from CSV)
- Handles:
  - し/ち/つ/ふ/じ の揺らぎ (shi/si, chi/ti, tsu/tu, fu/hu, ji/zi)
  - 拗音 (しゃ/しゅ/しょ etc. sha/sya)
  - 促音っ (double consonant, and optional xtu/ltu)
  - 撥音ん (before vowel/y uses n' or nn; before consonant allows n; at end allows nn)
"""

import argparse
import csv
import json
from dataclasses import dataclass
from itertools import product
from pathlib import Path
from typing import Dict, List, Set, Tuple


# ----------------------------
# Variant generation core
# ----------------------------


@dataclass(frozen=True)
class VariantOptions:
    force_nn_at_end: bool = True
    force_nn_before_vowel_y: bool = True
    allow_xtu_ltu: bool = True   # ★追加
    max_variants: int = 4000



# Base syllables (hiragana) -> possible romanizations (variants)
# Keep it practical: hepburn + kunrei-ish common variants used by IME learners.
BASE: Dict[str, Tuple[str, ...]] = {
    # vowels
    "あ": ("a",), "い": ("i",), "う": ("u",), "え": ("e",), "お": ("o",),
    # k
    "か": ("ka",), "き": ("ki",), "く": ("ku",), "け": ("ke",), "こ": ("ko",),
    # s
    "さ": ("sa",), "し": ("shi", "si"), "す": ("su",), "せ": ("se",), "そ": ("so",),
    # t
    "た": ("ta",), "ち": ("chi", "ti"), "つ": ("tsu", "tu"), "て": ("te",), "と": ("to",),
    # n
    "な": ("na",), "に": ("ni",), "ぬ": ("nu",), "ね": ("ne",), "の": ("no",),
    # h
    "は": ("ha",), "ひ": ("hi",), "ふ": ("fu", "hu"), "へ": ("he",), "ほ": ("ho",),
    # m
    "ま": ("ma",), "み": ("mi",), "む": ("mu",), "め": ("me",), "も": ("mo",),
    # y
    "や": ("ya",), "ゆ": ("yu",), "よ": ("yo",),
    # r
    "ら": ("ra",), "り": ("ri",), "る": ("ru",), "れ": ("re",), "ろ": ("ro",),
    # w
    "わ": ("wa",), "を": ("wo", "o"),
    # g
    "が": ("ga",), "ぎ": ("gi",), "ぐ": ("gu",), "げ": ("ge",), "ご": ("go",),
    # z/j
    "ざ": ("za",), "じ": ("ji", "zi"), "ず": ("zu",), "ぜ": ("ze",), "ぞ": ("zo",),
    # d
    "だ": ("da",), "ぢ": ("ji", "di", "zi"), "づ": ("zu", "du"), "で": ("de",), "ど": ("do",),
    # b
    "ば": ("ba",), "び": ("bi",), "ぶ": ("bu",), "べ": ("be",), "ぼ": ("bo",),
    # p
    "ぱ": ("pa",), "ぴ": ("pi",), "ぷ": ("pu",), "ぺ": ("pe",), "ぽ": ("po",),
    # small vowels (rare but include)
    "ぁ": ("xa", "la",), "ぃ": ("xi", "li",), "ぅ": ("xu", "lu",), "ぇ": ("xe", "le",), "ぉ": ("xo", "lo",),
    # small ya/yu/yo
    "ゃ": ("xya", "lya",), "ゅ": ("xyu", "lyu",), "ょ": ("xyo", "lyo",),
    # others
    "ゔ": ("vu",),
}

# Digraphs (きゃ etc.) -> variants
DIGRAPHS: Dict[str, Tuple[str, ...]] = {
    # k
    "きゃ": ("kya",), "きゅ": ("kyu",), "きょ": ("kyo",),
    # s/sh
    "しゃ": ("sha", "sya"), "しゅ": ("shu", "syu"), "しょ": ("sho", "syo"),
    # t/ch
    "ちゃ": ("cha", "tya"), "ちゅ": ("chu", "tyu"), "ちょ": ("cho", "tyo"),
    # n
    "にゃ": ("nya",), "にゅ": ("nyu",), "にょ": ("nyo",),
    # h
    "ひゃ": ("hya",), "ひゅ": ("hyu",), "ひょ": ("hyo",),
    # m
    "みゃ": ("mya",), "みゅ": ("myu",), "みょ": ("myo",),
    # r
    "りゃ": ("rya",), "りゅ": ("ryu",), "りょ": ("ryo",),
    # g
    "ぎゃ": ("gya",), "ぎゅ": ("gyu",), "ぎょ": ("gyo",),
    # j
    "じゃ": ("ja", "jya", "zya"), "じゅ": ("ju", "jyu", "zyu"), "じょ": ("jo", "jyo", "zyo"),
    # b
    "びゃ": ("bya",), "びゅ": ("byu",), "びょ": ("byo",),
    # p
    "ぴゃ": ("pya",), "ぴゅ": ("pyu",), "ぴょ": ("pyo",),
    # v (ゔゃ etc.)
    "ゔぁ": ("va",), "ゔぃ": ("vi",), "ゔぇ": ("ve",), "ゔぉ": ("vo",),
    "ゔゃ": ("vya",), "ゔゅ": ("vyu",), "ゔょ": ("vyo",),
}

SMALL_TSU = "っ"
NASAL_N = "ん"


def normalize_kana(s: str) -> str:
    return s.strip()


def normalize_romaji(s: str) -> str:
    return s.strip().lower()


def _is_vowel_start(rom: str) -> bool:
    return len(rom) > 0 and rom[0] in "aeiou"


def _is_y_start(rom: str) -> bool:
    return len(rom) > 0 and rom[0] == "y"


def _leading_consonant(rom: str) -> str:
    # Return first consonant letter to double for sokuon.
    # Commonly: k,s,t,c,p,b,d,g,h,f,j,m,n,r,v,w,y,z (but doubling y rarely meaningful)
    if not rom:
        return ""
    ch = rom[0]
    if ch in "aeiou":
        return ""  # sokuon before vowel: not standard
    # Special cases: "ch" -> 'c' doubling becomes "ccha" style when base is "cha"
    if rom.startswith("ch"):
        return "c"
    # "sh" -> 's' => "ssha"
    if rom.startswith("sh"):
        return "s"
    # "ts" -> 't' => "ttsu" (some IMEs accept "ttsu")
    if rom.startswith("ts"):
        return "t"
    return ch


def kana_to_token_variants(kana: str, opt: VariantOptions) -> List[Tuple[str, ...]]:
    """
    Convert kana string into list of token-variant tuples.
    Each position is a tuple of possible romaji strings for that kana token.
    Handles digraphs, sokuon(っ), nasal(ん) as special tokens.
    """
    kana = normalize_kana(kana)
    tokens: List[Tuple[str, ...]] = []
    i = 0
    while i < len(kana):
        # digraph (2 chars)
        if i + 1 < len(kana):
            pair = kana[i:i+2]
            if pair in DIGRAPHS:
                tokens.append(DIGRAPHS[pair])
                i += 2
                continue

        ch = kana[i]

        if ch == SMALL_TSU:
            # placeholder; actual doubling depends on next token
            # We'll represent it as a special marker tuple ("__SOKUON__",)
            tokens.append(("__SOKUON__",))
            i += 1
            continue

        if ch == NASAL_N:
            tokens.append(("__NASAL__",))
            i += 1
            continue

        if ch in BASE:
            tokens.append(BASE[ch])
            i += 1
            continue

        # If unknown kana (e.g., 'ー' or kanji), keep as-is -> no variants
        # You can choose to raise error instead; for now make it visible.
        tokens.append((f"__UNKNOWN__{ch}",))
        i += 1

    return tokens


def expand_tokens(tokens: List[Tuple[str, ...]], opt: VariantOptions) -> Set[str]:
    """
    Expand token variants into full romaji strings, handling sokuon/nasal with context.
    """
    results: Set[str] = set()

    def dfs(idx: int, built: List[str]):
        if len(results) >= opt.max_variants:
            return
        if idx >= len(tokens):
            results.add("".join(built))
            return

        cur_variants = tokens[idx]

        # Handle unknown markers
        if cur_variants and cur_variants[0].startswith("__UNKNOWN__"):
            # treat unknown as blocker: do not generate
            # you can also choose to pass-through empty, but that can hide bugs.
            return

        # Sokuon marker
        if cur_variants == ("__SOKUON__",):
            # Need next token to decide doubling.
            # Option A: double consonant of next syllable variant
            if idx + 1 < len(tokens):
                next_variants = tokens[idx + 1]
                # If next is nasal/unknown/sokuon, skip doubling; optionally allow xtu/ltu
                if next_variants in (("__SOKUON__",), ("__NASAL__",)) or (next_variants and next_variants[0].startswith("__UNKNOWN__")):
                    if opt.allow_xtu_ltu:
                        for rep in ("xtu", "ltu"):
                            dfs(idx + 1, built + [rep])
                    else:
                        dfs(idx + 1, built)  # ignore
                    return

                # Double leading consonant for each next variant path by injecting before next is processed
                for nv in next_variants:
                    lead = _leading_consonant(nv)
                    if lead:
                        # inject doubled consonant then proceed to next token but we must still consume next normally
                        # simplest: append lead here, and let next token add its nv
                        dfs(idx + 1, built + [lead])
                    else:
                        # before vowel: fallback xtu/ltu if allowed
                        if opt.allow_xtu_ltu:
                            for rep in ("xtu", "ltu"):
                                dfs(idx + 1, built + [rep])
            else:
                # trailing sokuon: weird; allow xtu/ltu
                if opt.allow_xtu_ltu:
                    for rep in ("xtu", "ltu"):
                        dfs(idx + 1, built + [rep])
            return

        # Nasal marker
        if cur_variants == ("__NASAL__",):
            # 次に来るローマ字の先頭で判断（母音 or y のとき nn 固定にしたい）
            next_firsts: List[str] = []
            if idx + 1 < len(tokens):
                nxt = tokens[idx + 1]
                if nxt == ("__SOKUON__",) and idx + 2 < len(tokens):
                    nxt = tokens[idx + 2]
                if nxt not in (("__SOKUON__",), ("__NASAL__",)) and not (nxt and nxt[0].startswith("__UNKNOWN__")):
                    next_firsts = list(nxt)

            # 末尾
            if idx == len(tokens) - 1:
                if opt.force_nn_at_end:
                    dfs(idx + 1, built + ["nn"])
                else:
                    dfs(idx + 1, built + ["n"])
                return

            # 次が母音 or y：nn固定（な行/や行と混線しやすいところ）
            if next_firsts:
                starts_vowel_or_y = any(_is_vowel_start(r) or _is_y_start(r) for r in next_firsts)
                if starts_vowel_or_y and opt.force_nn_before_vowel_y:
                    dfs(idx + 1, built + ["nn"])
                    return

            # それ以外（次が子音など）は通常の n
            dfs(idx + 1, built + ["n"])
            return


        # Normal token: expand all variants
        for v in cur_variants:
            dfs(idx + 1, built + [v])

    dfs(0, [])
    return results


def generate_variants_from_kana(kana: str, opt: VariantOptions) -> Set[str]:
    tokens = kana_to_token_variants(kana, opt)
    return expand_tokens(tokens, opt)


# ----------------------------
# Dictionary build (CSV -> JSON)
# ----------------------------

def load_overrides(path: Path) -> Dict[str, Set[str]]:
    """
    overrides.csv: display,romaji_add
    """
    overrides: Dict[str, Set[str]] = {}
    if not path.exists():
        return overrides

    with path.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        if not reader.fieldnames:
            return overrides
        required = {"display", "romaji_add"}
        if set(reader.fieldnames) != required:
            raise ValueError(f"overrides.csv のヘッダは {required} にしてください。現在: {reader.fieldnames}")

        for row in reader:
            display = row["display"].strip()
            rom = normalize_romaji(row["romaji_add"])
            if not display or not rom:
                continue
            overrides.setdefault(display, set()).add(rom)
    return overrides


def build_dictionary(source_csv: Path, overrides_csv: Path | None, opt: VariantOptions) -> Dict[str, Dict]:
    data: Dict[str, Dict] = {}
    overrides = load_overrides(overrides_csv) if overrides_csv else {}

    with source_csv.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        required = {"display", "kana", "romaji"}
        if set(reader.fieldnames or []) != required:
            raise ValueError(f"source.csv のヘッダは {required} の3列にしてください。現在: {reader.fieldnames}")

        for row in reader:
            display = row["display"].strip()
            kana = normalize_kana(row["kana"])
            canonical = normalize_romaji(row["romaji"])

            if not display or not kana or not canonical:
                continue

            if display in data and data[display]["kana"] != kana:
                raise ValueError(f"display='{display}' の kana が不一致: '{data[display]['kana']}' vs '{kana}'")

            # generate
            variants = generate_variants_from_kana(kana, opt)
            variants.add(canonical)

            # add overrides
            if display in overrides:
                variants |= overrides[display]

            data[display] = {
                "kana": kana,
                "romaji": sorted(variants),
                "canonical": canonical,  # 便利なので残す（不要なら消してOK）
            }

    return data

def dict_to_quest_array(d: Dict[str, Dict]) -> List[Dict]:
    """
    {"宿題": {"kana":..., "romaji":[...], "canonical":...}, ...}
      -> [{"display":"宿題","kana":...,"romaji":[...],"canonical":...}, ...]
    """
    out: List[Dict] = []
    for display, v in d.items():
        out.append({
            "display": display,
            "kana": v["kana"],
            "romaji": v["romaji"],
            "canonical": v.get("canonical", (v["romaji"][0] if v.get("romaji") else "")),
        })
    return out



def main():
    p = argparse.ArgumentParser(description="Typing dictionary builder with kana-based variant generator")
    p.add_argument("--source", default="source.csv", help="source CSV path (display,kana,romaji)")
    p.add_argument("--overrides", default=None, help="optional overrides CSV path (display,romaji_add)")
    p.add_argument("--out", default="dictionary.json", help="output JSON path")
    p.add_argument("--max-variants", type=int, default=4000, help="safety cap for variants per entry")
    p.add_argument("--no-xtu", action="store_true", help="disable xtu/ltu variants for small っ")
    p.add_argument("--no-n-apostrophe", action="store_true", help="disable n' variants for ん before vowels/y")
    p.add_argument("--no-nn", action="store_true", help="disable nn variants")
    args = p.parse_args()

    opt = VariantOptions(
        max_variants=args.max_variants,
        allow_xtu_ltu=not args.no_xtu,
    )


    source_csv = Path(args.source)
    overrides_csv = Path(args.overrides) if args.overrides else None
    out_json = Path(args.out)

    d = build_dictionary(source_csv, overrides_csv, opt)

    quest = dict_to_quest_array(d)
    out_json.write_text(json.dumps(quest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"OK: wrote {out_json} ({len(quest)} entries)")



if __name__ == "__main__":
    main()
