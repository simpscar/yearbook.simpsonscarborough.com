#!/bin/bash

cd /Users/dloeffler/Sites/yearbook.simpsonscarborough.com

echo "Fixing hero section to use markdown-style italics..."

# Fix index.astro - change subtitle to use set:html for markdown processing
# Lines 67-71 approximately
perl -i -0777 -pe 's/(\{data\.hero\.title\}\s+<span class="font-serif font-normal">)\s+\{data\.hero\.subtitle\} <span class="italic">out<\/span><br\s*\/>\s+<\/span>/${1} set:html={data.hero.subtitle} \/>\n              <br \/>/gs' src/pages/index.astro

echo "✅ Fixed index.astro to process markdown in subtitle"
echo ""
echo "Next: Update YAML subtitle to use underscores for italic"
echo "Change: 'all out out' → 'all out _out_'"
