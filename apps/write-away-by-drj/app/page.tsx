import UploadForm from "@/components/UploadForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">
          Write Away by Dr.J
        </h1>

        <p className="text-lg mb-10 max-w-3xl">
          Upload your dissertation, thesis, or academic writing and receive AI-powered developmental feedback designed to support clarity, structure, scholarly voice, and dissertation completion.
        </p>

        <UploadForm />
      </div>
    </main>
  );
}
