// Vercel Serverless Function
import { readFileSync } from 'fs';
import { join } from 'path';

// Load verbatim Beers Criteria data
let beersCriteria;
try {
  const jsonPath = join(process.cwd(), 'api', 'beers_criteria_verbatim.json');
  beersCriteria = JSON.parse(readFileSync(jsonPath, 'utf8'));
} catch (error) {
  console.error('Error loading Beers Criteria:', error);
  beersCriteria = null;
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!beersCriteria) {
    return res.status(500).json({ error: 'Beers Criteria data not loaded' });
  }

  const { medList } = req.body;

  if (!medList) {
    return res.status(400).json({ error: 'Medication list is required' });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPICAPIKEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        temperature: 0,
        messages: [
          {
            role: "user",
            content: `You are analyzing medications against the 2023 AGS Beers Criteria for patients ≥65 years old.

CRITICAL INSTRUCTIONS - READ CAREFULLY:
You MUST return VERBATIM text from the Beers Criteria. DO NOT paraphrase, summarize, or reword ANYTHING.
Copy the EXACT "rationale" and "recommendation" text word-for-word from the criteria data below.
This is a medical application - accuracy requires exact wording from the official criteria.

2023 BEERS CRITERIA (VERBATIM):
${JSON.stringify(beersCriteria, null, 2)}

MEDICATION LIST TO ANALYZE:
${medList}

TASK:
1. Parse the medication list to identify individual drugs with doses/frequencies
2. Match each medication against ALL Beers Criteria tables (PIMs, drug-disease, use with caution, drug interactions, renal adjustment)
3. For matches, copy the EXACT verbatim "rationale" and "recommendation" text - do not change ANY words
4. Return only JSON (no markdown backticks)

JSON OUTPUT FORMAT:
{
  "medications_parsed": [{"drug":"name","dose":"X","frequency":"Y"}],
  "violations": [
    {
      "drug": "medication_name",
      "beers_category": "Table name (e.g., 'Potentially Inappropriate Medications')",
      "rationale": "EXACT_VERBATIM_RATIONALE_TEXT_FROM_CRITERIA",
      "recommendation": "EXACT_VERBATIM_RECOMMENDATION_TEXT_FROM_CRITERIA",
      "quality_of_evidence": "value_from_criteria",
      "strength": "value_from_criteria"
    }
  ],
  "safe_medications": ["list"],
  "summary": "X of Y medications parsed are mentioned in the 2023 Beers Criteria."
}`
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Claude API error:', error);
      return res.status(response.status).json({ 
        error: `API request failed: ${response.status}` 
      });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
}
