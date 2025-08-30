import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { ArrowLeft, Sparkles, Globe, Bot, Play } from 'lucide-react';
import { GLOBAL_MODULES, AI_CHARACTERS } from '../../config/constants';
import { LessonInput } from '../../types';

interface TeacherWorkflowProps {
  selectedContent: string;
  classLevel: string;
  onGenerate: (input: LessonInput) => Promise<void>;
  loading: boolean;
  onBack: () => void;
}

export const TeacherWorkflow: React.FC<TeacherWorkflowProps> = ({
  selectedContent,
  classLevel,
  onGenerate,
  loading,
  onBack
}) => {
  const [globalModule, setGlobalModule] = useState('auto');
  const [aiCharacter, setAiCharacter] = useState('friendly');
  const [includeGlobalModule, setIncludeGlobalModule] = useState(true);

  const handleGenerate = async () => {
    await onGenerate({
      text: selectedContent,
      classLevel,
      globalModule: includeGlobalModule ? globalModule : 'none',
      uploadType: 'text'
    });
  };

  const selectedGlobalModule = GLOBAL_MODULES.find(m => m.value === globalModule);
  const selectedCharacter = AI_CHARACTERS.find(c => c.value === aiCharacter);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
        <h2 className="text-2xl font-bold text-gray-800">Customize Your AI Lesson</h2>
      </div>

      {/* Content Preview */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-orange-500" />
          Selected Content - Class {classLevel}
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 line-clamp-3">{selectedContent}</p>
        </div>
      </Card>

      {/* Global Micro-Module Selection */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-green-500" />
            Global Micro-Module
          </h3>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeGlobalModule}
              onChange={(e) => setIncludeGlobalModule(e.target.checked)}
              className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-600">Include Global Perspective</span>
          </label>
        </div>

        {includeGlobalModule && (
          <>
            <Select
              label="Choose Global Learning Style"
              value={globalModule}
              onChange={(e) => setGlobalModule(e.target.value)}
              options={GLOBAL_MODULES.map(m => ({ value: m.value, label: m.label }))}
            />
            
            {selectedGlobalModule && (
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{selectedGlobalModule.character}</span>
                  <span className="text-2xl">{selectedGlobalModule.flag}</span>
                  <span className="font-semibold text-gray-800">{selectedGlobalModule.label}</span>
                </div>
                <p className="text-sm text-gray-700">{selectedGlobalModule.description}</p>
                
                {/* Example Activities */}
                <div className="mt-3 p-3 bg-white rounded-lg">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Example Activities:</p>
                  <div className="text-xs text-gray-600">
                    {globalModule === 'china' && '• Quick recall drills • Structured practice • Group recitation'}
                    {globalModule === 'japan' && '• Mindful observation • Group harmony activities • Respectful discussion'}
                    {globalModule === 'us' && '• Hands-on experiments • "What if" questions • Creative exploration'}
                    {globalModule === 'europe' && '• Artistic expression • Storytelling • Imaginative play'}
                    {globalModule === 'auto' && '• AI will choose the best approach for this topic'}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      {/* AI Character Selection */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Bot className="w-5 h-5 mr-2 text-purple-500" />
          AI Character Guide
        </h3>
        
        <Select
          label="Choose AI Teaching Assistant"
          value={aiCharacter}
          onChange={(e) => setAiCharacter(e.target.value)}
          options={AI_CHARACTERS.map(c => ({ value: c.value, label: c.label }))}
        />
        
        {selectedCharacter && (
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-3xl">{selectedCharacter.emoji}</span>
              <span className="font-semibold text-gray-800">{selectedCharacter.label}</span>
            </div>
            <p className="text-sm text-gray-700 mb-3">{selectedCharacter.description}</p>
            <div className="text-xs text-gray-600">
              <strong>Teaching Style:</strong> {selectedCharacter.teachingStyle}
            </div>
          </div>
        )}
      </Card>

      {/* Generate Button */}
      <div className="text-center">
        <Button
          onClick={handleGenerate}
          size="lg"
          loading={loading}
          className="px-12 py-4 text-xl"
        >
          <Sparkles className="w-6 h-6 mr-3" />
          Generate AI Whiteboard Lesson
        </Button>
        
        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            🎯 <strong>AI will create:</strong> Interactive whiteboard animations, student activities, Q&A responses, and complete teacher guides - all aligned with NCERT standards!
          </p>
        </div>
      </div>
    </div>
  );
};