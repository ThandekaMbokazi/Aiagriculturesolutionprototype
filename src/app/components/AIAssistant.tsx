import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const knowledgeBase = {
  keywords: {
    tomato: 'For tomato cultivation, ensure plants receive 6-8 hours of direct sunlight daily. Water deeply 2-3 times per week. Use stakes or cages for support. Apply balanced fertilizer every 2 weeks. Watch for common diseases like blight and blossom end rot.',
    pest: 'For pest management, use integrated pest management (IPM) approaches: inspect plants regularly, use physical barriers, encourage beneficial insects, apply neem oil for minor infestations, and use organic pesticides as a last resort.',
    fertilizer: 'Fertilizer needs vary by crop stage. Use nitrogen-rich fertilizer during vegetative growth, balanced NPK during flowering, and potassium-rich during fruiting. Conduct soil tests every 2-3 years to optimize nutrient management.',
    irrigation: 'Efficient irrigation: Use drip irrigation to conserve water and reduce disease. Water early morning to reduce evaporation. Monitor soil moisture - most crops need 1-2 inches weekly. Avoid overwatering which can lead to root rot.',
    soil: 'Healthy soil is key to successful farming. Maintain pH between 6.0-7.0 for most crops. Add organic matter like compost regularly. Practice crop rotation to prevent nutrient depletion. Test soil annually for nutrient levels.',
    weather: 'Monitor weather patterns for optimal farming decisions. Use frost protection for sensitive crops. Adjust irrigation based on rainfall. Plant according to last frost dates. Consider climate-appropriate varieties.',
    organic: 'Organic farming focuses on natural methods: use compost and green manure for nutrients, practice crop rotation, use natural pest controls, avoid synthetic pesticides and fertilizers, and maintain biodiversity.',
    yield: 'Maximize yield through proper spacing, adequate nutrition, consistent watering, pest management, pruning techniques, and selecting high-yielding varieties suited to your climate zone.',
  },
  default: 'I can help you with various agricultural topics including crop management, pest control, soil health, irrigation, fertilization, weather considerations, and organic farming practices. What specific challenge are you facing?'
};

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI Agricultural Assistant. I can help you with crop management, pest control, soil health, fertilization, irrigation strategies, and more. What agricultural challenge can I help you with today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keywords in the message
    for (const [keyword, response] of Object.entries(knowledgeBase.keywords)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    // Check for question words to provide contextual responses
    if (lowerMessage.includes('how') || lowerMessage.includes('what') || lowerMessage.includes('when')) {
      if (lowerMessage.includes('plant')) {
        return 'Planting timing depends on your crop and climate zone. Generally, plant after the last frost date for warm-season crops (tomatoes, peppers, cucumbers) and in early spring or fall for cool-season crops (lettuce, broccoli, peas). Check your USDA hardiness zone for specific timing.';
      }
      if (lowerMessage.includes('water')) {
        return 'Water requirements vary by crop and growth stage. Most vegetables need 1-2 inches of water per week. Water deeply but less frequently to encourage deep root growth. Check soil moisture 2-3 inches deep - water when soil feels dry. Early morning watering is best.';
      }
      if (lowerMessage.includes('harvest')) {
        return 'Harvest timing varies by crop. Look for these signs: firm fruits with full color development, vegetables at mature size, easy separation from the plant. Harvest regularly to encourage continued production. Morning harvests often have better quality.';
      }
    }
    
    return knowledgeBase.default;
  };

  const handleSend = async () => {
    if (!input.trim()) {
      toast.error('Empty message', {
        description: 'Please enter a question or message.',
      });
      return;
    }

    // Validate message length
    if (input.length > 500) {
      toast.error('Message too long', {
        description: 'Please keep your message under 500 characters.',
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing time with error handling
    setTimeout(() => {
      // 98% success rate
      const isSuccess = Math.random() > 0.02;

      if (isSuccess) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: generateResponse(userMessage.content),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        toast.error('AI Assistant Error', {
          description: 'Failed to process your request. Please try again.',
        });
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'I apologize, but I encountered an error processing your request. Please try asking your question again.',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
      
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          AI Agricultural Assistant
        </CardTitle>
        <CardDescription>
          Get instant advice on crop management, pest control, and farming best practices
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <ScrollArea className="flex-1 pr-4 mb-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about crop management, pests, soil health..."
            className="resize-none"
            rows={3}
          />
          <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}