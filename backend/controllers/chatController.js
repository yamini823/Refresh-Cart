const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const askAI = async (req, res) => {
  try {

    const { message } = req.body;

    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        model: "qwen/qwen3.8-27b",
      });

    res.json({
      reply:
        completion.choices[0].message.content,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "AI Error"
    });

  }
};

module.exports = {
  askAI,
};