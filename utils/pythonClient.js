// Placeholder utility for future Python ML integration.
// Keeps API shape stable so a real ML service can be plugged in without route changes.

const KNOWN_DRUGS = ["warfarin", "aspirin", "ibuprofen", "lisinopril", "metformin", "paracetamol"];

export const inferInteractionFromText = (text = "") => {
  const lower = text.toLowerCase();
  const parsedDrugs = KNOWN_DRUGS.filter((drug) => lower.includes(drug));

  if (parsedDrugs.includes("warfarin") && parsedDrugs.includes("aspirin")) {
    return { level: "danger", parsedDrugs };
  }
  if (parsedDrugs.includes("ibuprofen") && parsedDrugs.includes("lisinopril")) {
    return { level: "moderate", parsedDrugs };
  }
  return { level: "safe", parsedDrugs };
};

export const summarizeUploadAnalysis = (fileName, text = "") => {
  const inferred = inferInteractionFromText(text);
  const base = {
    safe: {
      level: "safe",
      title: "File Processed: No Major Conflict",
      message: `Scanned ${fileName}. No high-risk interaction markers detected in extracted text.`,
      recommendations: ["Review full prescription details manually", "Confirm final plan with your doctor"]
    },
    moderate: {
      level: "moderate",
      title: "File Processed: Review Recommended",
      message: `Scanned ${fileName}. Potential interaction markers found. Please verify with a clinician.`,
      recommendations: ["Cross-check listed medicines manually", "Consult a licensed professional before changes"]
    },
    danger: {
      level: "danger",
      title: "File Processed: Urgent Review Needed",
      message: `Scanned ${fileName}. High-risk interaction markers detected in uploaded content.`,
      recommendations: ["Do not self-adjust medications", "Contact your clinician immediately"]
    }
  };

  return base[inferred.level];
};
