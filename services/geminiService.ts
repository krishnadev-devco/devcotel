import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedRoadmap } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const roadmapSchema = {
    type: Type.OBJECT,
    properties: {
        keySkills: {
            type: Type.ARRAY,
            description: "A list of key skill categories and the skills within them.",
            items: {
                type: Type.OBJECT,
                properties: {
                    category: { type: Type.STRING, description: "e.g., Programming Languages, Frameworks, Databases" },
                    skills: { type: Type.ARRAY, items: { type: Type.STRING, description: "A specific skill, e.g., Python, React, SQL" } }
                },
                required: ['category', 'skills']
            }
        },
        roadmap: {
            type: Type.ARRAY,
            description: "A step-by-step learning path.",
            items: {
                type: Type.OBJECT,
                properties: {
                    step: { type: Type.INTEGER, description: "The step number, starting from 1." },
                    duration: { type: Type.STRING, description: "Estimated duration for this step, e.g., 'Month 1-2', 'Weeks 3-4'." },
                    title: { type: Type.STRING, description: "A concise title for this step." },
                    description: { type: Type.STRING, description: "A brief description of what to learn or do in this step." }
                },
                required: ['step', 'duration', 'title', 'description']
            }
        },
        projectIdeas: {
            type: Type.ARRAY,
            description: "A list of project ideas to build a portfolio.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "The title of the project idea." },
                    description: { type: Type.STRING, description: "A brief description of the project idea." }
                },
                required: ['title', 'description']
            }
        }
    },
    required: ['keySkills', 'roadmap', 'projectIdeas']
};

export const generateCareerRoadmap = async (jobRole: string): Promise<GeneratedRoadmap> => {
    const prompt = `Create a detailed career roadmap for someone aspiring to become a "${jobRole}". The roadmap should include:
1.  A list of key skills, grouped by category.
2.  A step-by-step learning path with estimated durations for each step.
3.  A few practical project ideas to build a strong portfolio.

Please provide the output in a structured JSON format.`;

    try {
        const response = await ai.models.generateContent({
            // FIX: Use gemini-2.5-pro for complex text tasks like generating a career roadmap to ensure higher quality output.
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: roadmapSchema,
            },
        });

        // FIX: Per @google/genai guidelines, trim whitespace from the response text before parsing JSON for robustness.
        const data = JSON.parse(response.text.trim());
        
        if (!data.keySkills || !data.roadmap || !data.projectIdeas) {
            throw new Error("Invalid roadmap structure received from AI.");
        }

        return data as GeneratedRoadmap;
    } catch (error) {
        console.error("Error generating career roadmap:", error);
        throw new Error("Failed to generate career roadmap from AI service.");
    }
};
