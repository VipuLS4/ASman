import React from 'react';
import { motion } from 'framer-motion';
import { LessonCard } from './LessonCard';
import { QACard } from './QACard';
import { GlobalModuleCard } from './GlobalModuleCard';
import { AudioPlayer } from './AudioPlayer';
import { ExportSection } from './ExportSection';
import { Button } from '../ui/Button';
import { BookOpen, Activity, ArrowLeft } from 'lucide-react';
import { LessonOutput } from '../../types';

interface ResultsDisplayProps {
  output: LessonOutput;
  classLevel: string;
  onBack: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  output, 
  classLevel,
  onBack 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Extract topic from the lesson content
  const extractTopic = (content: string): string => {
    if (!content) return 'the lesson topic';
    
    const firstSentence = content.split('.')[0] || content.substring(0, 100);
    const words = firstSentence.split(' ');
    
    const topicKeywords = words.filter(word => 
      word.length > 4 && 
      !['This', 'lesson', 'will', 'help', 'students', 'understand', 'learn', 'about'].includes(word)
    );
    
    return topicKeywords.slice(0, 2).join(' ') || 'the lesson topic';
  };

  const topic = extractTopic(output.simplified_explanation);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Your AI Lesson Pack is Ready! 🎨✨
          </h2>
          <p className="text-gray-600">
            Interactive content for Class {classLevel} - Topic: {topic}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <LessonCard
            title="AI Whiteboard Lesson"
            content={output.simplified_explanation}
            icon={<BookOpen className="w-6 h-6" />}
            color="bg-gradient-to-r from-orange-500 to-orange-600"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <LessonCard
            title="Interactive Classroom Activity"
            content={output.practical_activity}
            icon={<Activity className="w-6 h-6" />}
            color="bg-gradient-to-r from-green-500 to-green-600"
          />
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <QACard questions={output.questions_and_answers} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <GlobalModuleCard
          moduleName={output.global_module_used}
          content={`This lesson incorporates ${output.global_module_used} learning methodologies to provide students with a global perspective while maintaining strong Indian educational values.`}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <AudioPlayer 
          text={output.simplified_explanation} 
          classLevel={classLevel}
          topic={topic}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ExportSection lessonOutput={output} classLevel={classLevel} />
      </motion.div>
    </motion.div>
  );
};