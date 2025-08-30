export const BRAND = {
  name: 'ASman Learning',
  tagline: 'Where Technology, Culture & Creativity Unite',
  description: 'AI Whiteboard Assistant for NCERT Lessons'
};

export const COLORS = {
  saffron: '#FF9933',
  white: '#FFFFFF',
  green: '#138808',
  blue: '#1A73E8',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827'
  }
};

export const CLASS_LEVELS = [
  { value: '1', label: 'Class 1 (Ages 6-7)' },
  { value: '2', label: 'Class 2 (Ages 7-8)' },
  { value: '3', label: 'Class 3 (Ages 8-9)' },
  { value: '4', label: 'Class 4 (Ages 9-10)' },
  { value: '5', label: 'Class 5 (Ages 10-11)' }
];

export const GLOBAL_MODULES = [
  { 
    value: 'auto', 
    label: 'Auto-Suggest', 
    character: '🤖', 
    flag: '🌍',
    description: 'AI will choose the best cultural learning approach for this topic',
    color: 'bg-gradient-to-r from-blue-500 to-blue-600'
  },
  { 
    value: 'china', 
    label: 'China Focus (Drills)', 
    character: '👨‍🏫', 
    flag: '🇨🇳',
    description: 'Structured drills, repetition exercises, and disciplined learning practices',
    color: 'bg-gradient-to-r from-red-500 to-red-600'
  },
  { 
    value: 'japan', 
    label: 'Japan Focus (Discipline)', 
    character: '👩‍🏫', 
    flag: '🇯🇵',
    description: 'Mindful activities, group harmony, and respectful learning methods',
    color: 'bg-gradient-to-r from-pink-500 to-pink-600'
  },
  { 
    value: 'us', 
    label: 'USA Focus (Curiosity)', 
    character: '👨‍🎓', 
    flag: '🇺🇸',
    description: 'Curiosity-driven experiments, hands-on exploration, and creative problem-solving',
    color: 'bg-gradient-to-r from-blue-500 to-blue-600'
  },
  { 
    value: 'europe', 
    label: 'Europe Focus (Creativity)', 
    character: '👩‍🎨', 
    flag: '🇪🇺',
    description: 'Artistic expression, creative storytelling, and imaginative learning approaches',
    color: 'bg-gradient-to-r from-purple-500 to-purple-600'
  }
];

export const AI_CHARACTERS = [
  {
    value: 'friendly',
    label: 'Friendly Guide',
    emoji: '😊',
    description: 'Warm, encouraging, and supportive teaching assistant',
    teachingStyle: 'Patient and nurturing, celebrates every small achievement'
  },
  {
    value: 'curious',
    label: 'Curious Explorer',
    emoji: '🤔',
    description: 'Asks questions and encourages discovery',
    teachingStyle: 'Inquiry-based learning, "What do you think?" approach'
  },
  {
    value: 'playful',
    label: 'Playful Buddy',
    emoji: '😄',
    description: 'Fun-loving and energetic learning companion',
    teachingStyle: 'Game-based learning, songs, and interactive play'
  },
  {
    value: 'wise',
    label: 'Wise Mentor',
    emoji: '🧙‍♂️',
    description: 'Knowledgeable guide with stories and wisdom',
    teachingStyle: 'Story-based teaching, cultural connections, life lessons'
  }
];