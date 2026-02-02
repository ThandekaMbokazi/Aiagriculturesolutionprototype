import { useState } from 'react';
import { Upload, Leaf, AlertCircle, CheckCircle2, Camera, X, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import { toast } from 'sonner';

interface DetectionResult {
  disease: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  treatment: string[];
  prevention: string[];
}

const mockDiseases = [
  {
    disease: 'Late Blight',
    confidence: 94.5,
    severity: 'high' as const,
    treatment: [
      'Remove and destroy infected plants immediately',
      'Apply copper-based fungicide every 7-10 days',
      'Improve air circulation around plants',
      'Reduce humidity by avoiding overhead watering'
    ],
    prevention: [
      'Plant resistant varieties',
      'Ensure proper spacing between plants',
      'Use drip irrigation instead of overhead watering',
      'Apply preventive fungicide before symptoms appear'
    ]
  },
  {
    disease: 'Powdery Mildew',
    confidence: 91.2,
    severity: 'medium' as const,
    treatment: [
      'Apply sulfur or potassium bicarbonate spray',
      'Remove heavily infected leaves',
      'Improve air circulation',
      'Apply neem oil solution every 7 days'
    ],
    prevention: [
      'Avoid overhead watering',
      'Plant in areas with good air circulation',
      'Maintain proper plant spacing',
      'Apply preventive sulfur spray'
    ]
  },
  {
    disease: 'Bacterial Spot',
    confidence: 88.7,
    severity: 'medium' as const,
    treatment: [
      'Apply copper-based bactericide',
      'Remove infected plant parts',
      'Avoid working with wet plants',
      'Use disease-free seeds for next planting'
    ],
    prevention: [
      'Use disease-resistant varieties',
      'Practice crop rotation',
      'Avoid overhead irrigation',
      'Sanitize tools between uses'
    ]
  },
  {
    disease: 'Healthy Plant',
    confidence: 96.8,
    severity: 'low' as const,
    treatment: [
      'No treatment needed',
      'Continue regular care and monitoring',
      'Maintain current watering schedule',
      'Keep monitoring for early signs of disease'
    ],
    prevention: [
      'Maintain proper nutrition',
      'Ensure adequate watering',
      'Monitor regularly for pests',
      'Practice good garden hygiene'
    ]
  }
];

export function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        toast.error('Invalid file type', {
          description: 'Please upload a PNG, JPG, or JPEG image.',
        });
        return;
      }

      // Validate file size (10MB max)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        toast.error('File too large', {
          description: 'Please upload an image smaller than 10MB.',
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResult(null);
        toast.success('Image uploaded successfully', {
          description: 'Click "Analyze Plant" to detect diseases.',
        });
      };
      reader.onerror = () => {
        toast.error('Upload failed', {
          description: 'There was an error reading the file. Please try again.',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    if (!selectedImage) {
      toast.error('No image selected', {
        description: 'Please upload an image first.',
      });
      return;
    }

    setIsAnalyzing(true);
    toast.info('Analyzing image...', {
      description: 'Our AI is processing your plant image.',
    });

    // Simulate AI analysis with random success/failure
    setTimeout(() => {
      // 95% success rate simulation
      const isSuccess = Math.random() > 0.05;
      
      if (isSuccess) {
        const randomResult = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];
        setResult(randomResult);
        
        if (randomResult.disease === 'Healthy Plant') {
          toast.success('Analysis complete!', {
            description: 'Great news! Your plant appears healthy.',
          });
        } else {
          toast.warning('Disease detected', {
            description: `${randomResult.disease} detected with ${randomResult.confidence.toFixed(1)}% confidence.`,
          });
        }
      } else {
        toast.error('Analysis failed', {
          description: 'Unable to process image. Please try again with a clearer photo.',
        });
      }
      
      setIsAnalyzing(false);
    }, 2000);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setResult(null);
    toast.info('Image cleared', {
      description: 'Upload a new image to start fresh.',
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Plant Disease Detection
          </CardTitle>
          <CardDescription>
            Upload an image of your plant to detect diseases using AI-powered image recognition
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!selectedImage ? (
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 mb-4 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 10MB)</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected plant"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={clearImage}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {!result && (
                <Button
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Leaf className="w-4 h-4 mr-2" />
                      Analyze Plant
                    </>
                  )}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4">
          <Alert variant={result.disease === 'Healthy Plant' ? 'default' : 'destructive'}>
            {result.disease === 'Healthy Plant' ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle className="flex items-center gap-2">
              Detection Result: {result.disease}
              <Badge className={getSeverityColor(result.severity)}>
                {result.confidence.toFixed(1)}% Confidence
              </Badge>
            </AlertTitle>
            <AlertDescription>
              {result.disease === 'Healthy Plant'
                ? 'Your plant appears to be healthy! Continue with regular care.'
                : `Disease detected with ${result.severity} severity. Follow the treatment recommendations below.`}
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Treatment Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.treatment.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prevention Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.prevention.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Leaf className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}