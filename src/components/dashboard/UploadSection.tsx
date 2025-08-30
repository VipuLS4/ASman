import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { ArrowLeft, Upload, FileText, Mic, Sparkles } from 'lucide-react';
import { LessonInput } from '../../types';
import { processOCR, processSpeechToText } from '../../services/aiService';
import toast from 'react-hot-toast';

interface UploadSectionProps {
  onGenerate: (input: LessonInput) => Promise<void>;
  loading: boolean;
  onBack: () => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onGenerate, loading, onBack }) => {
  const [uploadType, setUploadType] = useState<'text' | 'pdf' | 'audio'>('text');
  const [text, setText] = useState('');
  const [processing, setProcessing] = useState(false);
  const [classLevel, setClassLevel] = useState('3');
  const [globalModule, setGlobalModule] = useState('auto');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'audio/*': ['.mp3', '.wav', '.m4a']
    },
    onDrop: async (files) => {
      const file = files[0];
      if (file) {
        setProcessing(true);
        try {
          let extractedText = '';
          
          if (file.type.includes('pdf') || file.type.includes('image')) {
            setUploadType('pdf');
            toast.loading('Processing document...', { id: 'processing' });
            extractedText = await processOCR(file);
          } else if (file.type.includes('audio')) {
            setUploadType('audio');
            toast.loading('Transcribing audio...', { id: 'processing' });
            extractedText = await processSpeechToText(file);
          }
          
          setText(extractedText);
          toast.success('File processed successfully!', { id: 'processing' });
        } catch (error) {
          console.error('File processing error:', error);
          toast.error('Failed to process file. Please try again.', { id: 'processing' });
        } finally {
          setProcessing(false);
        }
      }
    }
  });

  const handleGenerate = async () => {
    if (!text.trim()) return;
    
    try {
      await onGenerate({
        text,
        classLevel,
        globalModule,
        uploadType
      });
    } catch (error) {
      console.error('Generation error:', error);
      toast.error('Failed to generate lesson pack. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Button>
        <h2 className="text-2xl font-bold text-gray-800">Upload Your Own Material</h2>
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <Sparkles className="w-6 h-6 mr-3 text-orange-500" />
          Teacher's Content Upload
        </h3>

        {/* Upload Type Selector */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { type: 'text', icon: FileText, label: 'Text Content', desc: 'Copy-paste lesson text' },
            { type: 'pdf', icon: Upload, label: 'PDF/Image', desc: 'Upload documents/photos' },
            { type: 'audio', icon: Mic, label: 'Voice Notes', desc: 'Audio recordings' }
          ].map(({ type, icon: Icon, label, desc }) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setUploadType(type as any)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                uploadType === type
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Icon className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm font-medium">{label}</div>
              <div className="text-xs text-gray-500 mt-1">{desc}</div>
            </motion.button>
          ))}
        </div>

        {/* Content Input */}
        {uploadType === 'text' ? (
          <Textarea
            label="Your Lesson Content"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your lesson content here... For example: 'Chapter 3: Water Cycle - Water is everywhere around us. It falls as rain, flows in rivers...'"
            rows={8}
          />
        ) : (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-orange-500 bg-orange-50'
                : processing 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input {...getInputProps()} />
            {processing ? (
              <div className="w-12 h-12 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            )}
            <p className="text-lg font-medium text-gray-700 mb-2">
              {processing 
                ? 'Processing your file...' 
                : isDragActive 
                  ? 'Drop your file here' 
                  : `Upload ${uploadType === 'pdf' ? 'PDF or Image' : 'Audio'} file`
              }
            </p>
            <p className="text-sm text-gray-500">
              {processing
                ? 'Please wait while we extract the content...'
                : uploadType === 'pdf' 
                  ? 'Supports PDF, PNG, JPG files' 
                  : 'Supports MP3, WAV, M4A files'
              }
            </p>
          </div>
        )}

        {text && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Content Preview:</p>
            <p className="text-sm text-gray-800 line-clamp-3">{text}</p>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Class Level</label>
          <select
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="1">Class 1 (Ages 6-7)</option>
            <option value="2">Class 2 (Ages 7-8)</option>
            <option value="3">Class 3 (Ages 8-9)</option>
            <option value="4">Class 4 (Ages 9-10)</option>
            <option value="5">Class 5 (Ages 10-11)</option>
          </select>
        </Card>

        <Card className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Global Module</label>
          <select
            value={globalModule}
            onChange={(e) => setGlobalModule(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="auto">Auto-Suggest</option>
            <option value="china">China Focus (Drills)</option>
            <option value="japan">Japan Focus (Discipline)</option>
            <option value="us">USA Focus (Curiosity)</option>
            <option value="europe">Europe Focus (Creativity)</option>
          </select>
        </Card>
      </div>

      <div className="text-center">
        <Button
          onClick={handleGenerate}
          size="lg"
          loading={loading || processing}
          disabled={!text.trim() || processing}
          className="px-12 py-4 text-xl"
        >
          <Sparkles className="w-6 h-6 mr-3" />
          {processing ? 'Processing File...' : 'Generate AI Lesson Pack'}
        </Button>
      </div>
    </div>
  );
};