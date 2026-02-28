import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Google Gemini SDK
// If GEMINI_API_KEY is defined in .env, it will automatically use it.
const ai = new GoogleGenAI({});

app.use(cors());
app.use(express.json());

// API Endpoint for Chatbot
app.post('/api/chat', async (req, res) => {
    try {
        const { message, contextData, previousMessages } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!process.env.GEMINI_API_KEY) {
            console.warn("GEMINI_API_KEY is not set. Returning mock response.");
            return res.json({
                response: "MOCK AI RESPONSE: You haven't configured the GEMINI_API_KEY in your .env file yet. Please add it so I can answer your questions properly! Here's the context I received: " + JSON.stringify(contextData)
            });
        }

        // Build the system instructions
        let contextStr = 'No specific user context provided.';
        if (contextData) {
            contextStr = `Recent Time Tracking Data:\n${JSON.stringify(contextData.timeData || [])}\n\nRecent Expense Data:\n${JSON.stringify(contextData.expenseData || [])}\n`;
        }

        const currentDateTime = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDayName = days[currentDateTime.getDay()];

        const systemPrompt = `You are a supportive, encouraging, and highly personalized AI mentor for a student. 
You are embedded in a productivity app called CogniTrack.
Your goal is to help them manage their time, expenses, and studies based on their specific data. 
Be concise, friendly, and practical. Do not be overly generic.
Always refer to their provided data to give personalized advice.

IMPORTANT CONTEXT:
Today's Date and Time is: ${currentDateTime.toLocaleString()}
The current day of the week is: ${currentDayName}

Here is the student's current context data:
${contextStr}

Use this context to inform your response. If they ask about their expenses or time today, cross-reference the current day of the week (${currentDayName}) with the Time Tracking Data, which is organized by day of the week (e.g., 'Mon', 'Tue', 'Wed', etc.).`;

        // Process previous messages into the format expected by GenAI SDK
        // @google/genai format: { role: 'user' | 'model', parts: [{ text: '...' }] }
        const history = (previousMessages || []).map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        }));

        // Append the new message to history
        history.push({
            role: 'user',
            parts: [{ text: message }]
        });

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: history,
            config: {
                systemInstruction: systemPrompt,
                temperature: 0.7,
            }
        });

        res.json({ response: response.text });
    } catch (error) {
        console.error('Error generating AI response:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
