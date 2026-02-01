import { useState } from "react";

export default function Home() {
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeFile) return;

    setLoading(true);

    try {
      // TEMP: simulate backend delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-6">
      
      {/* Glass Card */}
      <div
        className="w-full max-w-4xl rounded-2xl p-8 md:p-10
        bg-white/5 backdrop-blur-xl
        border border-white/10 shadow-2xl"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            ATS Resume Selector
          </h1>
          <p className="text-gray-400 mt-2">
            Check how well your resume matches the job description
          </p>
        </div>

        {/* Resume Upload */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Upload Resume
          </label>

          <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/40 transition">
            <input
              type="file"
              id="resumeUpload"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResumeFile(e.target.files[0])}
            />

            <label htmlFor="resumeUpload" className="cursor-pointer text-gray-300">
              <span className="font-medium text-white">Click to upload</span>{" "}
              or drag & drop
              <br />
              <span className="text-xs text-gray-400">PDF or DOCX only</span>
            </label>
          </div>

          {resumeFile && (
            <p className="mt-3 text-sm text-gray-300 text-center">
              Selected file:{" "}
              <span className="font-medium text-white">
                {resumeFile.name}
              </span>
            </p>
          )}
        </div>

        {/* Job Description */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Job Description
          </label>

          <textarea
            rows="6"
            className="w-full rounded-lg p-4 text-sm resize-none
              bg-white/10 text-white placeholder-gray-400
              border border-white/20
              focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="Paste the job description here..."
          />
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          disabled={loading || !resumeFile}
          className={`w-full py-3 rounded-xl text-sm font-semibold tracking-wide
            flex items-center justify-center gap-3 transition
            ${
              loading || !resumeFile
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-900 hover:bg-gray-200"
            }`}
        >
          {loading && (
            <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? "Analyzing Resume..." : "Analyze Resume"}
        </button>

        {/* Footer Note */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Resume analysis is processed locally. No data is stored.
        </p>
      </div>
    </div>
  );
}

