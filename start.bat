@echo off
setlocal
cd /d "%~dp0"

set PORT=8000

REM 優先：同梱Python（tools\python）
if exist "tools\python\python.exe" (
  start "" http://localhost:%PORT%/
  "tools\python\python.exe" -m http.server %PORT%
  goto :eof
)

REM 次点：PCに入っているPython
python -V >nul 2>&1
if %errorlevel%==0 (
  start "" http://localhost:%PORT%/
  python -m http.server %PORT%
  goto :eof
)

echo [ERROR] Python が見つかりません。
echo このフォルダに tools\python\python.exe を同梱するか、Python をインストールしてください。
pause
