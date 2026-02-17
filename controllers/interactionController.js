import { inferInteractionFromText, summarizeUploadAnalysis } from "../utils/pythonClient.js";
import { extractTextFromFile } from "../utils/fileTextExtractor.js";

const classifyInteraction = (drugA = "", drugB = "") => {
  const pair = `${drugA} ${drugB}`.toLowerCase();
  if (pair.includes("warfarin") && pair.includes("aspirin")) return "danger";
  if (pair.includes("ibuprofen") && pair.includes("lisinopril")) return "moderate";
  return "safe";
};

const interactionResponse = (level) => {
  if (level === "danger") {
    return {
      level: "danger",
      title: "Severe Interaction Detected",
      message: "This combination may increase bleeding risk. Contact a clinician immediately.",
      recommendations: ["Avoid self-medication", "Request urgent medical guidance"]
    };
  }

  if (level === "moderate") {
    return {
      level: "moderate",
      title: "Moderate Caution",
      message: "This pair can reduce treatment effectiveness and may need dose timing changes.",
      recommendations: ["Monitor symptoms", "Consult your physician for dosage adjustment"]
    };
  }

  return {
    level: "safe",
    title: "No Major Conflict",
    message: "No high-risk interaction found in this quick check.",
    recommendations: ["Continue prescribed plan", "Keep your doctor informed"]
  };
};

export const analyzeInteraction = async (req, res) => {
  const { drugA = "", drugB = "", text = "" } = req.body || {};

  if (text && (!drugA || !drugB)) {
    const inferred = inferInteractionFromText(text);
    return res.json({
      endpoint: "/check-interaction",
      data: interactionResponse(inferred.level),
      parsedDrugs: inferred.parsedDrugs
    });
  }

  if (!drugA || !drugB) {
    return res.status(400).json({ error: "drugA and drugB are required." });
  }

  const level = classifyInteraction(drugA, drugB);
  return res.json({
    endpoint: "/check-interaction",
    data: interactionResponse(level)
  });
};

export const analyzeUploadedFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "File is required (field name: file)." });
  }

  const text = await extractTextFromFile(req.file);
  const analysis = summarizeUploadAnalysis(req.file.originalname, text);

  return res.json({
    endpoint: "/upload",
    fileName: req.file.originalname,
    mimeType: req.file.mimetype,
    extractedChars: text.length,
    data: analysis
  });
};
