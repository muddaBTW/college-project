export const askChat = async (req, res) => {
  const { question = "", attachments = [] } = req.body || {};
  const cleanQuestion = String(question).trim();

  if (!cleanQuestion) {
    return res.status(400).json({ error: "question is required." });
  }

  const attachmentNote =
    Array.isArray(attachments) && attachments.length
      ? ` I also received ${attachments.length} attachment(s): ${attachments.join(", ")}.`
      : "";

  return res.json({
    endpoint: "/ask-ai",
    data: {
      reply: `AI guidance: ${cleanQuestion}${attachmentNote} For safety, verify with a licensed medical professional before changing medication.`
    }
  });
};
