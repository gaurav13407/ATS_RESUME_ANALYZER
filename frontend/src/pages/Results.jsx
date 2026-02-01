import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Safety check (direct access to /results)
  if (!state) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center text-white">
        <div className="text-center">
          <p className="mb-4">No analysis data found.</p>
          <button
            onClick={() => navigate("/analyze")}
            className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold"
          >
            Go Back to Analyze
          </button>
        </div>
      </div>
    );
  }

  const {
    final_ats_score,
    matched_skills,
    missing_skills,
    match_percentage,
    tfidf_similarity,
    improvement_suggestions,
  } = state;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white">ATS Analysis Result</h1>
          <p className="text-gray-400 mt-2">Resume vs Job Description Match</p>
        </div>

        {/* Final ATS Score - Main Display */}
        <div className="text-center mb-10 p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/20 rounded-2xl">
          <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            {final_ats_score.toFixed(1)}%
          </div>
          <p className="text-gray-300 mt-3 text-lg">Final ATS Score</p>

          {/* Secondary Metrics */}
          <div className="mt-6 grid grid-cols-2 gap-4 max-w-xs mx-auto">
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-gray-400 text-sm">Skill Match</p>
              <p className="text-white font-bold text-xl">
                {match_percentage.toFixed(1)}%
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-gray-400 text-sm">TF-IDF Similarity</p>
              <p className="text-white font-bold text-xl">
                {tfidf_similarity.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Matched Skills */}
          <div className="bg-white/5 rounded-xl p-6 border border-green-500/20">
            <h3 className="text-lg font-semibold text-green-300 mb-4 flex items-center">
              <span className="text-2xl mr-2">✓</span> Matched Skills ({matched_skills.length})
            </h3>
            <ul className="space-y-2">
              {matched_skills.length > 0 ? (
                matched_skills.map((skill, idx) => (
                  <li
                    key={idx}
                    className="bg-green-500/10 border border-green-500/30 text-green-300 px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </li>
                ))
              ) : (
                <p className="text-gray-400 text-sm italic">No matched skills found</p>
              )}
            </ul>
          </div>

          {/* Missing Skills */}
          <div className="bg-white/5 rounded-xl p-6 border border-red-500/20">
            <h3 className="text-lg font-semibold text-red-300 mb-4 flex items-center">
              <span className="text-2xl mr-2">✕</span> Missing Skills ({missing_skills.length})
            </h3>
            <ul className="space-y-2">
              {missing_skills.length > 0 ? (
                missing_skills.map((skill, idx) => (
                  <li
                    key={idx}
                    className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </li>
                ))
              ) : (
                <p className="text-gray-400 text-sm italic">All required skills matched!</p>
              )}
            </ul>
          </div>
        </div>

        {/* Improvement Suggestions */}
        <div className="mb-10 bg-white/5 rounded-xl p-6 border border-yellow-500/20">
          <h3 className="text-lg font-semibold text-yellow-300 mb-4 flex items-center">
            <span className="text-2xl mr-2">💡</span> Improvement Suggestions
          </h3>
          <ul className="space-y-3">
            {improvement_suggestions.length > 0 ? (
              improvement_suggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  className="bg-white/5 border border-white/20 text-gray-300 px-4 py-3 rounded-lg text-sm leading-relaxed"
                >
                  {suggestion}
                </li>
              ))
            ) : (
              <p className="text-gray-400 text-sm italic">
                No additional improvements suggested
              </p>
            )}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/analyze")}
            className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Analyze Another Resume
          </button>
        </div>
      </div>
    </div>
  );
}
