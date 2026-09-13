

const AI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const AI_URL =
  "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
const MODEL = "gemini-flash-latest"; 


const GIBBERISH_FLAG = "NOT_ENOUGH_CONTEXT";

///Actually sends the request to the AI API and returns the result text///////////////
async function askAI(instructions, pasteContent) {
  const response = await fetch(AI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.4, 
      messages: [
        { role: "system", content: instructions },
        { role: "user", content: pasteContent },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const detail = errorBody?.error?.message || `status ${response.status}`;
    throw new Error(`AI request failed: ${detail}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
/////Generate a short summary of the paste content using AI/////////////////
export async function generateSummary(pasteContent) {
  const instructions = `You will be given the text of a note or code paste.

If the text is gibberish, random keyboard mashing, or doesn't contain any
real meaning (for example "asdkjaskjd" or a wall of random characters),
reply with EXACTLY this and nothing else: ${GIBBERISH_FLAG}

Otherwise, reply with a clear summary in 3-4 short sentences. Plain text
only. No heading, no quotation marks, no "Summary:" prefix.`;

  const result = await askAI(instructions, pasteContent);

  if (result === GIBBERISH_FLAG) {
    return {
      success: false,
      message:
        "Hmm, this text doesn't look like it has enough real content to summarize. Try writing something more descriptive!",
    };
  }

  return { success: true, message: result };
}
///////////title suggestion using AI/////////////////
export async function generateTitleSuggestion(pasteContent) {
  const instructions = `You will be given the text of a note or code paste.

If the text is gibberish, random keyboard mashing, or doesn't contain any
real meaning, reply with EXACTLY this and nothing else: ${GIBBERISH_FLAG}

Otherwise, reply with ONE short, catchy title (around 4-8 words). No
quotation marks, no explanation, just the title itself.`;

  const result = await askAI(instructions, pasteContent);

  if (result === GIBBERISH_FLAG) {
    return {
      success: false,
      message:
        "Couldn't come up with a title — the text doesn't seem to have clear content yet.",
    };
  }

  return { success: true, message: result };
}
