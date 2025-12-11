#!/bin/bash

cd /Users/dloeffler/Sites/yearbook.simpsonscarborough.com

echo "===== FIXING HERO SECTION ====="
echo ""
echo "Step 1: Updating YAML to use markdown underscores for italic..."

# Update the YAML file
sed -i '' 's/subtitle: all out out/subtitle: all out _out_/' src/data/index.yaml

echo "✅ YAML updated: 'all out out' → 'all out _out_'"
echo ""
echo "Step 2: Updating CMS config with markdown hint..."

# Update CMS config to show markdown hint for subtitle field
sed -i '' '/label: "Title Line 2", name: "subtitle"/ {
  N
  s/widget: "string"/widget: "text"/
  s/hint: "[^"]*"/hint: "Use _underscores_ for italic (e.g., '\''all out _out_'\'')"/ 
}' public/admin/config.yml

echo "✅ CMS config updated with markdown hint"
echo ""
echo "===== MANUAL STEP REQUIRED ====="
echo ""
echo "You need to manually update src/pages/index.astro around line 67."
echo ""
echo "FIND THIS (around line 67):"
echo "  {data.hero.title}"
echo "  <span class=\"font-serif font-normal\">"
echo "    {data.hero.subtitle} <span class=\"italic\">out</span><br />"
echo "  </span>"
echo "  in {data.hero.year}."
echo ""
echo "REPLACE WITH:"
echo "  {data.hero.title}"
echo "  <span class=\"font-serif font-normal\" set:html={data.hero.subtitle} />"
echo "  <br />"
echo "  in {data.hero.year}."
echo ""
echo "===== CHANGES MADE ====="
echo "✅ YAML: subtitle now uses '_out_' for italic markdown"
echo "✅ CMS config: Updated hint to show underscore pattern"
echo "⚠️  Astro template: Needs manual update (see instructions above)"
