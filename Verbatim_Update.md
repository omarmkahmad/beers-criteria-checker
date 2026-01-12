# Beers Criteria Checker - Verbatim Update

## What Changed
The app now returns **verbatim text** from the 2023 AGS Beers Criteria instead of AI paraphrasing.

### Key Changes:
1. **New JSON database**: All verbatim Beers Criteria text extracted from your spreadsheet
2. **Updated backend**: Clear instructions to Claude to copy exact text, not paraphrase
3. **Increased accuracy**: Physicians get official wording for clinical decisions

## Files to Update

### 1. `api/analyze.js`
- Loads verbatim Beers Criteria from JSON file
- Instructs Claude to return exact text only
- Increased max_tokens to 4000 (verbatim text is longer)

### 2. `api/beers_criteria_verbatim.json` (NEW)
- Complete 2023 Beers Criteria verbatim text
- 87 total entries across 5 tables:
  - PIMs: 36 entries
  - Drug-Disease: 9 entries
  - Use with Caution: 6 entries
  - Drug Interactions: 12 entries
  - Renal Adjustment: 24 entries
- 44.5 KB file size

## Deployment Steps

### Option 1: GitHub (Recommended)
1. Go to your GitHub repo: `beers-criteria-checker`
2. Navigate to `api/` folder
3. **Replace** `analyze.js` with the new version
4. **Add** `beers_criteria_verbatim.json` to the `api/` folder
5. Commit changes
6. Vercel will auto-deploy

### Option 2: Vercel CLI
```bash
cd your-project-folder
# Replace files
cp analyze.js api/
cp beers_criteria_verbatim.json api/
# Deploy
vercel --prod
```

## Testing
After deployment, test with the same medication list you used before:

**Example**: "Lorazepam 1mg, Oxybutynin ER, Nitrofurantoin, Ibuprofen"

**Expected**: Should now show the exact verbatim text from Beers Criteria, not paraphrased summaries.

**Compare**:
- **Before**: "Avoid benzodiazepines for sleep disorders, agitation, or delirium"
- **After**: Full verbatim recommendation from official criteria

## Cost Impact
- Slightly higher token usage (~20% more) due to:
  - Larger context (44.5 KB JSON)
  - Longer verbatim responses
- Estimated cost per query: ~$0.004 (still very cheap)

## Notes
- Frontend (`App.jsx`) needs **no changes** - same JSON structure
- Temperature still set to `0` for consistency
- Environment variable `ANTHROPICAPIKEY` must still be set in Vercel
