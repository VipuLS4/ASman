import { GoogleGenerativeAI } from '@google/generative-ai';
import { LessonInput, LessonOutput } from '../types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateLessonPack(input: LessonInput): Promise<LessonOutput> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const globalModulePrompts = {
      china: "Include structured drills, repetition exercises, and disciplined learning approaches",
      japan: "Include mindful activities, group harmony, and respectful learning practices", 
      us: "Include curiosity-driven experiments, hands-on exploration, and creative problem-solving",
      europe: "Include artistic expression, creative storytelling, and imaginative activities",
      auto: "Automatically select the most appropriate global learning approach"
    };

    const prompt = `
You are ASman Learning's AI assistant helping teachers create engaging NCERT lessons for Class ${input.classLevel} students.

TEACHER'S CONTENT: ${input.text}

GLOBAL MICRO-MODULE: ${globalModulePrompts[input.globalModule as keyof typeof globalModulePrompts] || globalModulePrompts.auto}

Create a comprehensive lesson pack that:

1. SIMPLIFIED EXPLANATION (Age-appropriate for Class ${input.classLevel})
   - Use simple, clear language for ${getAgeGroup(input.classLevel)} year olds
   - Include [AI DRAWS: description] markers where whiteboard animations appear
   - Make concepts visual and interactive
   - Keep sentences short and engaging

2. PRACTICAL ACTIVITY 
   - Create 3-4 hands-on activities that teachers can do in class
   - Include both digital whiteboard interactions and physical activities
   - Make activities fun and educational
   - Include the global micro-module approach if selected

3. QUESTIONS & ANSWERS (5-6 pairs)
   - Create questions that encourage thinking and participation
   - Provide clear, simple answers with examples
   - Include follow-up activities or discussions

4. GLOBAL MODULE INTEGRATION
   - Show how this lesson connects to ${input.globalModule} learning style
   - Provide specific examples and activities
   - Maintain NCERT alignment while adding global perspective

Return as JSON with keys: simplified_explanation, practical_activity, questions_and_answers (array of {q, a}), global_module_used.

Focus on helping teachers save prep time while making lessons more engaging for students.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    
    return {
      simplified_explanation: parsed.simplified_explanation || "AI will create engaging visual explanations for this topic.",
      practical_activity: parsed.practical_activity || "Interactive activities will be generated based on the content.",
      questions_and_answers: parsed.questions_and_answers || [
        { q: "What did you learn today?", a: "Students will share their understanding of the topic." }
      ],
      global_module_used: parsed.global_module_used || input.globalModule
    };
  } catch (error) {
    console.error('Error generating lesson pack:', error);
    throw new Error('Failed to generate lesson pack. Please check your API key and try again.');
  }
}

function getAgeGroup(classLevel: string): string {
  const ageMap: { [key: string]: string } = {
    '1': '6-7',
    '2': '7-8', 
    '3': '8-9',
    '4': '9-10',
    '5': '10-11'
  };
  return ageMap[classLevel] || '6-11';
}

export async function processOCR(file: File): Promise<string> {
  return `Content extracted from ${file.name}. This would contain the actual text from the uploaded file.`;
}

export async function processSpeechToText(audioBlob: Blob): Promise<string> {
  return "Transcribed text from audio would appear here.";
}