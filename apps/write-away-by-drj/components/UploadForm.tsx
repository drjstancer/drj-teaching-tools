"use client";

import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [sampleText, setSampleText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("Dr. J Coaching");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file && !sampleText.trim()) {
      setError(
        "Upload a file or paste a writing sample."
      );
      return;
    }

    setLoading(true);
    setError("");
    setFeedback("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file?.name,
          mode,
          sampleText,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      setFeedback(data.feedback);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to review document."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="border border-neutral-200 rounded-3xl p-8 shadow-sm bg-white space-y-6"
      >
        <div className="space-y-2">
          <label className="text-sm font-semibold tracking-wide uppercase text-neutral-500">
            Dissertation Upload
          </label>

          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) =>
              setFile(e.target.files?.[0] || null)
            }
            className="block w-full border border-neutral-200 rounded-xl p-4"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold tracking-wide uppercase text-neutral-500">
            Writing Sample
          </label>

          <textarea
            value={sampleText}
            onChange={(e) =>
              setSampleText(e.target.value)
            }
            placeholder="Paste a dissertation paragraph, literature review excerpt, or research writing sample here..."
            rows={8}
            className="w-full border border-neutral-200 rounded-2xl p-4 resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold tracking-wide uppercase text-neutral-500">
            Feedback Mode
          </label>

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="border border-neutral-200 rounded-xl p-4 w-full"
          >
            <option>Dissertation Structure</option>
            <option>Academic Tone</option>
            <option>APA Alignment</option>
            <option>Literature Review Strength</option>
            <option>Research Question Alignment</option>
            <option>Dr. J Coaching</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-8 py-4 rounded-2xl font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Reviewing Writing..." : "Review Writing"}
        </button>
      </form>

      {error && (
        <div className="border border-red-200 bg-red-50 text-red-700 rounded-2xl p-6">
          {error}
        </div>
      )}

      {feedback && (
        <div className="border border-neutral-200 rounded-3xl p-8 whitespace-pre-wrap shadow-sm bg-white space-y-6">
          <div className="border-b border-neutral-200 pb-4">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-500 font-semibold">
              Write Away Feedback
            </p>
          </div>

          <div className="text-neutral-800 leading-8 text-[15px]">
            {feedback}
          </div>
        </div>
      )}
    </div>
  );
}
