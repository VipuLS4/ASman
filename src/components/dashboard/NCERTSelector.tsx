import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';

interface NCERTSelectorProps {
  onSelect: (content: string, classLevel: string) => void;
  onBack: () => void;
}

const NCERT_CONTENT = {
  '1': {
    'Mathematics': {
      'Numbers': 'Learning numbers 1 to 20. Understanding counting, more and less, addition and subtraction with objects.',
      'Shapes': 'Identifying basic shapes - circle, square, triangle, rectangle. Finding shapes in our environment.',
      'Patterns': 'Creating and continuing simple patterns with colors, shapes, and objects.'
    },
    'Environmental Studies': {
      'My Family': 'Understanding family members, their roles, and how families care for each other.',
      'Animals Around Us': 'Identifying domestic and wild animals, their sounds, homes, and what they eat.',
      'Plants': 'Learning about different plants, trees, flowers, and how they grow.'
    },
    'Hindi': {
      'Letters': 'Learning Hindi alphabets, vowels and consonants with examples.',
      'Simple Words': 'Reading and writing simple Hindi words and their meanings.',
      'Stories': 'Listening to simple stories and understanding their moral values.'
    }
  },
  '2': {
    'Mathematics': {
      'Numbers up to 100': 'Understanding place value, tens and ones, comparing numbers, and simple addition/subtraction.',
      'Measurement': 'Learning about length, weight, and capacity using everyday objects.',
      'Time': 'Reading time on clocks, understanding days, weeks, months, and seasons.'
    },
    'Environmental Studies': {
      'Our Body': 'Learning about body parts, senses, and keeping our body healthy and clean.',
      'Food': 'Understanding different types of food, healthy eating habits, and where food comes from.',
      'Water': 'Importance of water, sources of water, and how to save water.'
    },
    'English': {
      'Reading': 'Reading simple sentences and short stories with comprehension.',
      'Writing': 'Writing simple sentences, describing pictures, and basic grammar.',
      'Poems': 'Reciting poems, understanding rhythm, and expressing through actions.'
    }
  },
  '3': {
    'Mathematics': {
      'Numbers up to 1000': 'Place value, addition and subtraction with regrouping, multiplication tables.',
      'Geometry': 'Lines, angles, 2D and 3D shapes, symmetry in nature and art.',
      'Data Handling': 'Collecting data, making simple graphs and charts, interpreting information.'
    },
    'Environmental Studies': {
      'Living and Non-living': 'Characteristics of living things, life cycles, and interdependence in nature.',
      'Our Environment': 'Understanding pollution, conservation, and our responsibility towards nature.',
      'Means of Transport': 'Different modes of transport, their uses, and evolution over time.'
    },
    'Science': {
      'Matter': 'States of matter, properties of solids, liquids, and gases with examples.',
      'Light and Shadow': 'Sources of light, how shadows are formed, and uses of light.',
      'Sound': 'How sound is produced, different types of sounds, and noise pollution.'
    }
  },
  '4': {
    'Mathematics': {
      'Large Numbers': 'Numbers up to 10,000, place value, operations, and word problems.',
      'Fractions': 'Understanding parts of a whole, comparing fractions, and simple operations.',
      'Decimals': 'Introduction to decimal numbers and their use in daily life.'
    },
    'Science': {
      'Food and Nutrition': 'Balanced diet, nutrients, food groups, and malnutrition.',
      'Animals and Plants': 'Adaptation, habitats, food chains, and biodiversity.',
      'Materials and Objects': 'Properties of materials, changes in materials, and their uses.'
    },
    'Social Science': {
      'Our Past': 'Introduction to history, sources of history, and early human life.',
      'Maps and Directions': 'Understanding maps, symbols, directions, and scale.',
      'Government': 'Local government, democracy, and citizen responsibilities.'
    }
  },
  '5': {
    'Mathematics': {
      'Numbers and Operations': 'Large numbers, factors, multiples, prime numbers, and problem solving.',
      'Geometry and Measurement': 'Perimeter, area, volume, and geometric constructions.',
      'Data and Probability': 'Data collection, analysis, graphs, and introduction to probability.'
    },
    'Science': {
      'Human Body': 'Digestive system, respiratory system, circulatory system, and health.',
      'Natural Resources': 'Air, water, soil, forests, and their conservation.',
      'Simple Machines': 'Levers, pulleys, inclined planes, and their applications.'
    },
    'Social Science': {
      'Indian History': 'Ancient civilizations, medieval period, and freedom struggle.',
      'Geography': 'Physical features of India, climate, natural vegetation, and resources.',
      'Civics': 'Constitution, fundamental rights, duties, and democratic processes.'
    }
  }
};

export const NCERTSelector: React.FC<NCERTSelectorProps> = ({ onSelect, onBack }) => {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');

  const handleTopicSelect = (topic: string, content: string) => {
    onSelect(content, selectedClass);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Button>
        <h2 className="text-2xl font-bold text-gray-800">Select NCERT Content</h2>
      </div>

      {!selectedClass ? (
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-6">Choose Class Level</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.keys(NCERT_CONTENT).map((classNum) => (
              <motion.div
                key={classNum}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="cursor-pointer group"
                  onClick={() => setSelectedClass(classNum)}
                >
                  <div className="p-6 text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      Class {classNum}
                    </div>
                    <div className="text-sm text-gray-600">
                      Ages {parseInt(classNum) + 5}-{parseInt(classNum) + 6}
                    </div>
                    <ChevronRight className="w-5 h-5 mx-auto mt-3 text-gray-400 group-hover:text-orange-500 transition-colors" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ) : !selectedSubject ? (
        <div>
          <div className="flex items-center space-x-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => setSelectedClass('')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <h3 className="text-xl font-semibold text-gray-700">
              Class {selectedClass} - Choose Subject
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.keys(NCERT_CONTENT[selectedClass as keyof typeof NCERT_CONTENT]).map((subject) => (
              <motion.div
                key={subject}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="cursor-pointer group"
                  onClick={() => setSelectedSubject(subject)}
                >
                  <div className="p-6">
                    <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{subject}</h4>
                    <div className="text-sm text-gray-600">
                      {Object.keys(NCERT_CONTENT[selectedClass as keyof typeof NCERT_CONTENT][subject]).length} topics available
                    </div>
                    <ChevronRight className="w-5 h-5 mt-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center space-x-4 mb-6">
            <Button 
              variant="outline" 
              onClick={() => setSelectedSubject('')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <h3 className="text-xl font-semibold text-gray-700">
              Class {selectedClass} {selectedSubject} - Choose Topic
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(NCERT_CONTENT[selectedClass as keyof typeof NCERT_CONTENT][selectedSubject]).map(([topic, content]) => (
              <motion.div
                key={topic}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="cursor-pointer group"
                  onClick={() => handleTopicSelect(topic, content)}
                >
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">{topic}</h4>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-green-600 font-medium">✓ NCERT Aligned</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};