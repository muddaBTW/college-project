import { useState } from "react";

const DrugInput = ({ onSubmit, loading }) => {
  const [drugA, setDrugA] = useState("");
  const [drugB, setDrugB] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const onFileSelect = (file) => {
    if (!file) return;
    setSelectedFile(file);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!drugA.trim() || !drugB.trim()) {
      setError("Please enter both medications or use file upload.");
      return;
    }
    setError("");
    onSubmit({ drugA, drugB });
  };

  const handleFileCheck = () => {
    if (!selectedFile) {
      setError("Please add an image/file first.");
      return;
    }
    setError("");
    onSubmit({ file: selectedFile });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    onFileSelect(event.dataTransfer.files?.[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 md:p-8">
      <h2 className="font-display text-2xl text-safeLight">Drug Interaction Checker</h2>
      <p className="mt-2 text-safeLight/70">Enter two medications for an instant safety analysis.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <input
          type="text"
          value={drugA}
          onChange={(e) => setDrugA(e.target.value)}
          placeholder="Medication A (e.g., Warfarin)"
          className="rounded-xl border border-safeLight/20 bg-safeNavy/60 px-4 py-3 text-safeLight placeholder-safeLight/40 outline-none focus:border-safeBlue"
        />
        <input
          type="text"
          value={drugB}
          onChange={(e) => setDrugB(e.target.value)}
          placeholder="Medication B (e.g., Aspirin)"
          className="rounded-xl border border-safeLight/20 bg-safeNavy/60 px-4 py-3 text-safeLight placeholder-safeLight/40 outline-none focus:border-safeBlue"
        />
      </div>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`mt-6 rounded-2xl border-2 border-dashed p-6 transition-colors ${
          isDragging ? "border-safeTeal bg-safeTeal/10" : "border-safeLight/25 bg-safeNavy/40"
        }`}
      >
        <p className="text-sm font-semibold text-safeLight">Drag and drop prescription image/file here</p>
        <p className="mt-1 text-xs text-safeLight/70">Supported: JPG, PNG, PDF, TXT</p>
        <label className="mt-4 inline-flex cursor-pointer rounded-xl bg-safeDarkTeal px-4 py-2 text-sm font-semibold text-white">
          Upload File
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf,.txt"
            onChange={(event) => onFileSelect(event.target.files?.[0])}
            className="hidden"
          />
        </label>
        {selectedFile && <p className="mt-3 text-sm text-safeLight">Image added: {selectedFile.name}</p>}
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={loading}
          className="cta-button rounded-xl bg-safeBlue px-6 py-3 font-semibold text-safeLight disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Analyzing..." : "Check Interaction"}
        </button>
        <button
          type="button"
          onClick={handleFileCheck}
          disabled={loading || !selectedFile}
          className="cta-button rounded-xl border border-safeDarkTeal bg-white px-6 py-3 font-semibold text-safeDarkTeal disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Analyzing..." : "Check Uploaded File"}
        </button>
      </div>
    </form>
  );
};

export default DrugInput;

