import pdfParse from "pdf-parse";

const isText = (mimetype = "", fileName = "") =>
  mimetype.startsWith("text/") || fileName.toLowerCase().endsWith(".txt");

const isPdf = (mimetype = "", fileName = "") =>
  mimetype === "application/pdf" || fileName.toLowerCase().endsWith(".pdf");

export const extractTextFromFile = async (file) => {
  if (!file?.buffer) return "";

  if (isText(file.mimetype, file.originalname)) {
    return file.buffer.toString("utf-8");
  }

  if (isPdf(file.mimetype, file.originalname)) {
    const parsed = await pdfParse(file.buffer);
    return parsed.text || "";
  }

  // For unsupported binary/image formats we still return metadata-only analysis.
  return "";
};
