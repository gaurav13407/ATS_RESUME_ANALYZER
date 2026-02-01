import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-5xl text-center">

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            ATS Resume Selector
          </h1>

          <p className="mt-6 text-gray-300 text-lg max-w-3xl mx-auto">
            A recruiter-style Applicant Tracking System that evaluates your resume
            against a job description and shows exactly how well you match.
          </p>

          {/* Feature Grid */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature
              title="ATS Score"
              desc="Instant numerical score showing resume relevance for a specific job role."
            />
            <Feature
              title="Skill Matching"
              desc="Clear breakdown of matched and missing skills based on the job description."
            />
            <Feature
              title="Recruiter Logic"
              desc="Rule-based matching inspired by how real ATS systems shortlist resumes."
            />
          </div>

          {/* CTA */}
          <div className="mt-16">
            <button
              onClick={() => navigate("/analyze")}
              className="bg-white text-gray-900 px-10 py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 transition"
            >
              Analyze My Resume
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-400">
        Built for job seekers • No signup • No data stored • Instant results
      </div>

    </div>
  );
}

/* Small reusable feature component */
function Feature({ title, desc }) {
  return (
    <div className="bg-white/5 p-8 rounded-2xl h-full flex flex-col justify-center">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

