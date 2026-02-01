import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export default function Home() {
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [extractedSkills, setExtractedSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // Step 1: Upload, Step 2: JD + Analysis

  // Step 1: Upload Resume
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".pdf") && !file.name.endsWith(".docx")) {
      setError("Only PDF and DOCX files allowed");
      return;
    }

    setResumeFile(file);
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${API_BASE_URL}/extract-resume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setExtractedText(response.data.raw_text_preview);
      setExtractedSkills(response.data.skills_found);
      setStep(2);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to extract resume. Make sure backend is running on http://localhost:8000"
      );
      setResumeFile(null);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Match with Job Description
  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError("Please enter a job description");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/match-jd`,
        {
          job_description: jobDescription,
          resume_skills: extractedSkills,
          resume_text: extractedText,
        }
      );

      // Navigate to results with the response data
      navigate("/results", {
        state: {
          final_ats_score: response.data.final_ats_score,
          matched_skills: response.data.matched_skills,
          missing_skills: response.data.missing_skills,
          match_percentage: response.data.match_percentage,
          tfidf_similarity: response.data.tfidf_similarity,
          improvement_suggestions: response.data.improvement_suggestions,
        },
      });
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to analyze resume. Make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-6 py-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white">
            {step === 1 ? "Upload Your Resume" : "Analyze Against Job Description"}
          </h1>
          <p className="text-gray-400 mt-2">
            {step === 1
              ? "Support PDF and DOCX formats"
              : "Paste the job description you're applying for"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300">
            {error}
          </div>
        )}

        {/* Step 1: Upload Resume */}
        {step === 1 && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
            <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-white/50 transition">
              <label className="cursor-pointer">
                <div className="text-gray-300 mb-4">
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-white font-semibold">
                    {resumeFile ? resumeFile.name : "Click to upload your resume"}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    PDF or DOCX • Max 10MB
                  </p>
                </div>
                <input
                  type="file"
                  onChange={handleResumeUpload}
                  disabled={loading}
                  className="hidden"
                  accept=".pdf,.docx"
                />
              </label>
            </div>

            {/* Extracted Info */}
            {extractedSkills.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Detected Skills ({extractedSkills.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {extractedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-500/20 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-gray-300 text-sm line-clamp-4">
                    <span className="font-semibold text-white">Resume Preview:</span>
                    <br />
                    {extractedText}
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className="mt-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                <p className="text-gray-400 mt-2">Extracting resume...</p>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Job Description & Analysis */}
        {step === 2 && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 space-y-6">
            {/* Resume Summary */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-sm text-gray-400">
                <span className="font-semibold text-white">Resume:</span> {resumeFile?.name}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                <span className="font-semibold text-white">Skills Found:</span>{" "}
                {extractedSkills.length} skills detected
              </p>
            </div>

            {/* Job Description Input */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                disabled={loading}
                placeholder="Paste the complete job description here..."
                className="w-full h-64 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 p-4 focus:outline-none focus:border-white/50 disabled:opacity-50"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                disabled={loading}
                className="flex-1 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition disabled:opacity-50"
              >
                Back
              </button>
              <button
                onClick={handleAnalyze}
                disabled={loading || !jobDescription.trim()}
                className="flex-1 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Analyze Resume"}
              </button>
            </div>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-white transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

