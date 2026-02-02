import { useState } from 'react';
import { Leaf, MessageSquare, TrendingUp, Camera } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Toaster } from '@/app/components/ui/sonner';
import { DiseaseDetection } from '@/app/components/DiseaseDetection';
import { AIAssistant } from '@/app/components/AIAssistant';
import { PredictiveAnalytics } from '@/app/components/PredictiveAnalytics';
import { YieldPredictor } from '@/app/components/YieldPredictor';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Toaster position="top-right" expand={false} richColors />
      <div className="container mx-auto p-4 md:p-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AgriAI Solutions</h1>
              <p className="text-gray-600">AI-Powered Agricultural Intelligence Platform</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white rounded-lg border border-green-200 shadow-sm">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-green-600">Functional Prototype Features:</span> 
              Image Classification • Data Input Forms • Natural Language Processing • Predictive Analytics • Real-time Error Handling
            </p>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="detection" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="detection" className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span className="hidden sm:inline">Disease Detection</span>
              <span className="sm:hidden">Detect</span>
            </TabsTrigger>
            <TabsTrigger value="yield" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Yield Predictor</span>
              <span className="sm:hidden">Yield</span>
            </TabsTrigger>
            <TabsTrigger value="assistant" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">AI Assistant</span>
              <span className="sm:hidden">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
              <span className="sm:hidden">Data</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="detection" className="space-y-6">
            <DiseaseDetection />
          </TabsContent>

          <TabsContent value="yield" className="space-y-6">
            <YieldPredictor />
          </TabsContent>

          <TabsContent value="assistant" className="space-y-6 min-h-[600px]">
            <AIAssistant />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <PredictiveAnalytics />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500 space-y-2">
          <p>
            <span className="font-semibold">AI Technologies Used:</span> Image Classification (Disease Detection) • 
            Natural Language Processing (AI Assistant) • Predictive Analytics (Yield & Weather Forecasting)
          </p>
          <p className="text-xs">
            Note: This is a prototype demonstration. The AI models use simulated responses for demonstration purposes.
          </p>
        </div>
      </div>
    </div>
  );
}