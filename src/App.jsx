import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export default function BeersCriteriaChecker() {
  const [medList, setMedList] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeMedications = async () => {
    if (!medList.trim()) {
      setError('Please enter a medication list');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Call our serverless function instead of Claude API directly
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ medList })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }

      const data = await response.json();
      let responseText = data.content[0].text;
      
      // Strip markdown code blocks if present
      responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      
      const parsedResults = JSON.parse(responseText);
      setResults(parsedResults);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "An error occurred while analyzing medications");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              AGS Beers Criteria Checker
            </h1>
            <p className="text-gray-600">
              2023 AGS Beers Criteria® for Potentially Inappropriate Medications in Older Adults (≥65 years)
            </p>
          </div>

          {/* Input Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medication List
            </label>
            <textarea
              className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              placeholder="Enter medications (e.g., 'diphenhydramine 25mg daily, diazepam 5mg BID, lisinopril 10mg daily')"
              value={medList}
              onChange={(e) => setMedList(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-2">
              Enter medications in any format. Include doses and frequencies if available.
            </p>
          </div>

          {/* Analyze Button */}
          <button
            onClick={analyzeMedications}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Analyzing...
              </>
            ) : (
              'Analyze Medications'
            )}
          </button>

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )}

          {/* Results Display */}
          {results && (
            <div className="mt-8 space-y-6">
              {/* Summary */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Summary</h3>
                <p className="text-blue-800">{results.summary}</p>
              </div>

              {/* Violations */}
              {results.violations && results.violations.length > 0 ? (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertCircle className="text-red-600" />
                    Beers Criteria Violations ({results.violations.length})
                  </h3>
                  <div className="space-y-4">
                    {results.violations.map((violation, idx) => (
                      <div key={idx} className="border border-red-200 rounded-lg p-4 bg-red-50">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-lg font-semibold text-red-900">{violation.drug}</h4>
                          <span className="px-3 py-1 bg-red-200 text-red-900 rounded-full text-sm font-medium">
                            {violation.strength}
                          </span>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Category: </span>
                            <span className="text-gray-900">{violation.beers_category}</span>
                          </div>
                          
                          <div>
                            <span className="font-medium text-gray-700">Recommendation: </span>
                            <span className="text-gray-900">{violation.recommendation}</span>
                          </div>
                          
                          <div>
                            <span className="font-medium text-gray-700">Rationale: </span>
                            <span className="text-gray-900">{violation.rationale}</span>
                          </div>
                          
                          <div className="flex gap-4 mt-2">
                            <span className="text-xs text-gray-600">
                              Quality of Evidence: {violation.quality_of_evidence}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={24} />
                    <div>
                      <h3 className="font-semibold text-green-900">No Beers Criteria Violations</h3>
                      <p className="text-green-800 text-sm">All medications appear appropriate per 2023 AGS Beers Criteria</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Safe Medications */}
              {results.safe_medications && results.safe_medications.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Medications Not on Beers Criteria
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.safe_medications.map((med, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {med}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Parsed Medications */}
              {results.medications_parsed && results.medications_parsed.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Medications Parsed
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {results.medications_parsed.map((med, idx) => (
                        <li key={idx} className="text-sm text-gray-700">
                          <span className="font-medium">{med.drug}</span>
                          {med.dose && <span className="text-gray-600"> - {med.dose}</span>}
                          {med.frequency && <span className="text-gray-600"> {med.frequency}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              <strong>Disclaimer:</strong> This tool is for educational purposes only. Results should be reviewed by qualified healthcare professionals. 
              Clinical decision-making should consider individual patient factors, goals of care, and shared decision-making. 
              Based on 2023 AGS Beers Criteria® for Potentially Inappropriate Medication Use in Older Adults.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
