import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../layout/Header';
import { TeacherWorkflow } from './TeacherWorkflow';
import { NCERTSelector } from './NCERTSelector';
import { UploadSection } from './UploadSection';
import { ResultsDisplay } from '../results/ResultsDisplay';
import { Card } from '../ui/Card';
import { BookOpen, Users, Sparkles, TrendingUp, FileText, Upload, Globe, Bot } from 'lucide-react';
import { LessonInput, LessonOutput } from '../../types';
import { generateLessonPack } from '../../services/aiService';
import toast from 'react-hot-toast';

interface DashboardProps {
  user: { name: string; email: string };
  onLogout: () => void;
}

type WorkflowStep = 'dashboard' | 'ncert' | 'upload' | 'global' | 'character' | 'results';

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('dashboard');
  const [lessonOutput, setLessonOutput] = useState<LessonOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentClassLevel, setCurrentClassLevel] = useState('');
  const [selectedContent, setSelectedContent] = useState('');

  const handleGenerate = async (input: LessonInput) => {
    setLoading(true);
    setCurrentClassLevel(input.classLevel);
    
    try {
      const output = await generateLessonPack(input);
      setLessonOutput(output);
      setCurrentStep('results');
      toast.success('AI Lesson Pack generated successfully!');
    } catch (error) {
      console.error('Generation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate lesson pack. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleNCERTSelect = (content: string, classLevel: string) => {
    setSelectedContent(content);
    setCurrentClassLevel(classLevel);
    setCurrentStep('global');
  };

  const stats = [
    { icon: BookOpen, label: 'NCERT Chapters Ready', value: '150+', color: 'text-orange-600' },
    { icon: Users, label: 'Teachers Empowered', value: '500+', color: 'text-green-600' },
    { icon: Sparkles, label: 'AI Lessons Created', value: '2.5K', color: 'text-blue-600' },
    { icon: TrendingUp, label: 'Student Engagement', value: '95%', color: 'text-purple-600' }
  ];

  const workflowButtons = [
    {
      icon: FileText,
      title: 'NCERT Chapters',
      description: 'Preloaded curriculum content',
      color: 'from-orange-500 to-orange-600',
      onClick: () => setCurrentStep('ncert')
    },
    {
      icon: Upload,
      title: 'Upload Own Material',
      description: 'PDF, image, text, or voice',
      color: 'from-blue-500 to-blue-600',
      onClick: () => setCurrentStep('upload')
    },
    {
      icon: Globe,
      title: 'Global Micro-Module',
      description: 'China / Japan / US / Europe',
      color: 'from-green-500 to-green-600',
      onClick: () => setCurrentStep('global')
    },
    {
      icon: Bot,
      title: 'AI Character',
      description: 'Select friendly guide',
      color: 'from-purple-500 to-purple-600',
      onClick: () => setCurrentStep('character')
    }
  ];

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'ncert':
        return (
          <NCERTSelector 
            onSelect={handleNCERTSelect}
            onBack={() => setCurrentStep('dashboard')}
          />
        );
      case 'upload':
        return (
          <UploadSection 
            onGenerate={handleGenerate} 
            loading={loading}
            onBack={() => setCurrentStep('dashboard')}
          />
        );
      case 'global':
        return (
          <TeacherWorkflow
            selectedContent={selectedContent}
            classLevel={currentClassLevel}
            onGenerate={handleGenerate}
            loading={loading}
            onBack={() => setCurrentStep(selectedContent ? 'ncert' : 'dashboard')}
          />
        );
      case 'results':
        return (
          <ResultsDisplay 
            output={lessonOutput!} 
            classLevel={currentClassLevel}
            onBack={() => {
              setLessonOutput(null);
              setCurrentStep('dashboard');
            }}
          />
        );
      default:
        return (
          <>
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Welcome, <span className="text-orange-600">{user.name.split(' ')[0]}</span>! 👩‍🏫
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your AI Teaching Partner - Save prep time, make lessons engaging, give students global exposure while staying rooted in NCERT
              </p>
              <div className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-green-50 rounded-lg">
                <p className="text-lg font-semibold text-gray-800">
                  🎯 <span className="text-orange-600">Teacher is always in control:</span> AI suggests, you decide
                </p>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center">
                    <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                    <div className="text-2xl font-bold text-gray-800 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Teacher Workflow Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {workflowButtons.map((button, index) => (
                <motion.div
                  key={button.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="cursor-pointer group" onClick={button.onClick}>
                    <div className={`bg-gradient-to-r ${button.color} p-6 text-white`}>
                      <button.icon className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="text-lg font-bold mb-2">{button.title}</h3>
                      <p className="text-sm opacity-90">{button.description}</p>
                    </div>
                    <div className="p-4">
                      <div className="text-center">
                        <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                          Click to start →
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Header user={user} onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentStep()}
      </main>
    </div>
  );
};