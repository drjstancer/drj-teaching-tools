"use client";

import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("Dr. J Coaching");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file) return;

    setLoading(true);

    const formData = new FormData();

    formData.append("file", file);
    formData.append("mode", mode);

    const response = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    setFeedback(data.feedback);
    setLoading(false);
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="border rounded-2xl p-6 shadow-sm space-y-4"
      >
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
          className="block w-full"
        />

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="border rounded-lg p-3 w-full"
        >
          <option>Dissertation Structure</option>
          <option>Academic Tone</option>
          <option>APA Alignment</option>
          <option>Literature Review Strength</option>
          <option>Research Question Alignment</option>
          <option>Dr. J Coaching</option>
        </select>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          {loading ? "Reviewing..." : "Review Writing"}
        </button>
      </form>

      {feedback && (
        <div className="border rounded-2xl p-6 whitespace-pre-wrap shadow-sm">
          {feedback}
        </div>
      )}
    </div>
  );
}
