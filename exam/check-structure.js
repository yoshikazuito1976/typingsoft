global.window = {};
require('./typingexam/quest.js');
const quest = window.quest;

let totalItems = 0;
let issues = [];

// Check structure
if (!Array.isArray(quest)) {
  console.error('❌ quest is not an array');
  process.exit(1);
}

console.log('📊 Quest Structure Check');
console.log('='.repeat(50));

quest.forEach((category, idx) => {
  if (!category.category) {
    issues.push(`Category ${idx}: missing 'category' field`);
  }
  if (!Array.isArray(category.items)) {
    issues.push(`Category ${idx} (${category.category}): items is not an array`);
    return;
  }
  
  const itemCount = category.items.length;
  totalItems += itemCount;
  console.log(`✓ ${category.category}: ${itemCount} items`);
  
  // Check items structure
  category.items.forEach((item, itemIdx) => {
    if (!item.display) issues.push(`  Item ${itemIdx}: missing display`);
    if (!item.kana) issues.push(`  Item ${itemIdx}: missing kana`);
    if (!Array.isArray(item.romaji)) issues.push(`  Item ${itemIdx}: romaji is not array`);
    if (item.romaji && item.romaji.some(r => r === '')) issues.push(`  Item ${itemIdx} (${item.display}): empty string in romaji`);
  });
});

console.log('='.repeat(50));
console.log(`📈 Total Categories: ${quest.length}`);
console.log(`📈 Total Items: ${totalItems}`);

if (issues.length > 0) {
  console.log('\n⚠️  Issues Found:');
  issues.forEach(issue => console.log('  ' + issue));
  process.exit(1);
} else {
  console.log('\n✅ All checks passed!');
}
