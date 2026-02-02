import { useState } from 'react';
import { Calculator, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/app/components/ui/alert';
import { Progress } from '@/app/components/ui/progress';
import { toast } from 'sonner';

interface PredictionResult {
  predictedYield: number;
  confidence: number;
  recommendations: string[];
  riskFactors: string[];
}

export function YieldPredictor() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  
  const [formData, setFormData] = useState({
    cropType: '',
    landSize: '',
    soilType: '',
    irrigationType: '',
    fertilizer: '',
    previousYield: '',
    rainfall: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setResult(null);
  };

  const validateForm = (): boolean => {
    if (!formData.cropType) {
      toast.error('Validation Error', {
        description: 'Please select a crop type.',
      });
      return false;
    }

    if (!formData.landSize || parseFloat(formData.landSize) <= 0) {
      toast.error('Validation Error', {
        description: 'Please enter a valid land size greater than 0.',
      });
      return false;
    }

    if (!formData.soilType) {
      toast.error('Validation Error', {
        description: 'Please select a soil type.',
      });
      return false;
    }

    if (!formData.irrigationType) {
      toast.error('Validation Error', {
        description: 'Please select an irrigation type.',
      });
      return false;
    }

    if (!formData.fertilizer) {
      toast.error('Validation Error', {
        description: 'Please select fertilizer usage.',
      });
      return false;
    }

    if (!formData.rainfall || parseFloat(formData.rainfall) < 0) {
      toast.error('Validation Error', {
        description: 'Please enter a valid annual rainfall.',
      });
      return false;
    }

    return true;
  };

  const calculateYield = () => {
    if (!validateForm()) return;

    setIsCalculating(true);
    toast.info('Processing data...', {
      description: 'Our AI is analyzing your farm data.',
    });

    setTimeout(() => {
      // Simulate AI prediction with error handling
      const isSuccess = Math.random() > 0.03;

      if (isSuccess) {
        const landSize = parseFloat(formData.landSize);
        const previousYield = formData.previousYield ? parseFloat(formData.previousYield) : 0;
        const rainfall = parseFloat(formData.rainfall);

        // Base yield calculation (simplified for demo)
        let baseYield = landSize * 2500; // kg per acre

        // Apply multipliers based on inputs
        const soilMultiplier = formData.soilType === 'loamy' ? 1.2 : formData.soilType === 'clay' ? 1.0 : 0.9;
        const irrigationMultiplier = formData.irrigationType === 'drip' ? 1.3 : formData.irrigationType === 'sprinkler' ? 1.1 : 0.9;
        const fertilizerMultiplier = formData.fertilizer === 'organic' ? 1.15 : formData.fertilizer === 'synthetic' ? 1.25 : 0.85;
        const rainfallMultiplier = rainfall >= 30 && rainfall <= 50 ? 1.2 : rainfall > 50 ? 1.0 : 0.8;

        const predictedYield = Math.round(
          baseYield * soilMultiplier * irrigationMultiplier * fertilizerMultiplier * rainfallMultiplier
        );

        const confidence = Math.min(95, 70 + Math.random() * 20);

        const recommendations: string[] = [];
        const riskFactors: string[] = [];

        if (formData.irrigationType === 'flood') {
          recommendations.push('Consider upgrading to drip irrigation for 30% better water efficiency');
        }
        if (formData.soilType === 'sandy') {
          recommendations.push('Add organic matter to improve soil water retention');
          riskFactors.push('Sandy soil may require more frequent irrigation');
        }
        if (rainfall < 25) {
          recommendations.push('Implement water conservation techniques due to low rainfall');
          riskFactors.push('Below-average rainfall may impact yield');
        }
        if (formData.fertilizer === 'none') {
          recommendations.push('Apply balanced NPK fertilizer to improve yield');
          riskFactors.push('Lack of fertilization may significantly reduce yield');
        }
        if (rainfall > 60) {
          riskFactors.push('Excess rainfall may cause waterlogging issues');
          recommendations.push('Ensure proper drainage systems are in place');
        }

        if (recommendations.length === 0) {
          recommendations.push('Current farming practices are well-optimized');
          recommendations.push('Continue monitoring soil health regularly');
        }

        setResult({
          predictedYield,
          confidence,
          recommendations,
          riskFactors,
        });

        toast.success('Prediction complete!', {
          description: `Expected yield: ${predictedYield.toLocaleString()} kg`,
        });
      } else {
        toast.error('Prediction failed', {
          description: 'Unable to calculate yield. Please verify your inputs and try again.',
        });
      }

      setIsCalculating(false);
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      cropType: '',
      landSize: '',
      soilType: '',
      irrigationType: '',
      fertilizer: '',
      previousYield: '',
      rainfall: '',
    });
    setResult(null);
    toast.info('Form reset', {
      description: 'All fields have been cleared.',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Crop Yield Predictor
          </CardTitle>
          <CardDescription>
            Enter your farm data to get AI-powered yield predictions and optimization recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cropType">Crop Type *</Label>
              <Select value={formData.cropType} onValueChange={(value) => handleInputChange('cropType', value)}>
                <SelectTrigger id="cropType">
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="corn">Corn</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="soybeans">Soybeans</SelectItem>
                  <SelectItem value="tomatoes">Tomatoes</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="landSize">Land Size (acres) *</Label>
              <Input
                id="landSize"
                type="number"
                placeholder="e.g., 10"
                value={formData.landSize}
                onChange={(e) => handleInputChange('landSize', e.target.value)}
                min="0"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="soilType">Soil Type *</Label>
              <Select value={formData.soilType} onValueChange={(value) => handleInputChange('soilType', value)}>
                <SelectTrigger id="soilType">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="loamy">Loamy</SelectItem>
                  <SelectItem value="clay">Clay</SelectItem>
                  <SelectItem value="sandy">Sandy</SelectItem>
                  <SelectItem value="silty">Silty</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="irrigationType">Irrigation Type *</Label>
              <Select value={formData.irrigationType} onValueChange={(value) => handleInputChange('irrigationType', value)}>
                <SelectTrigger id="irrigationType">
                  <SelectValue placeholder="Select irrigation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drip">Drip Irrigation</SelectItem>
                  <SelectItem value="sprinkler">Sprinkler</SelectItem>
                  <SelectItem value="flood">Flood/Surface</SelectItem>
                  <SelectItem value="rainfed">Rainfed Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fertilizer">Fertilizer Usage *</Label>
              <Select value={formData.fertilizer} onValueChange={(value) => handleInputChange('fertilizer', value)}>
                <SelectTrigger id="fertilizer">
                  <SelectValue placeholder="Select fertilizer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="organic">Organic</SelectItem>
                  <SelectItem value="synthetic">Synthetic</SelectItem>
                  <SelectItem value="mixed">Mixed (Organic + Synthetic)</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rainfall">Annual Rainfall (inches) *</Label>
              <Input
                id="rainfall"
                type="number"
                placeholder="e.g., 35"
                value={formData.rainfall}
                onChange={(e) => handleInputChange('rainfall', e.target.value)}
                min="0"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="previousYield">Previous Year Yield (kg) - Optional</Label>
              <Input
                id="previousYield"
                type="number"
                placeholder="e.g., 25000"
                value={formData.previousYield}
                onChange={(e) => handleInputChange('previousYield', e.target.value)}
                min="0"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={calculateYield}
              disabled={isCalculating}
              className="flex-1"
            >
              {isCalculating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Calculating...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Predict Yield
                </>
              )}
            </Button>
            <Button onClick={resetForm} variant="outline" disabled={isCalculating}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4">
          <Alert>
            <TrendingUp className="h-4 w-4" />
            <AlertTitle>Predicted Yield</AlertTitle>
            <AlertDescription>
              <div className="mt-2">
                <div className="text-3xl font-bold text-green-600">
                  {result.predictedYield.toLocaleString()} kg
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Prediction Confidence</span>
                    <span className="font-medium">{result.confidence.toFixed(1)}%</span>
                  </div>
                  <Progress value={result.confidence} className="h-2" />
                </div>
              </div>
            </AlertDescription>
          </Alert>

          {result.riskFactors.length > 0 && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  Risk Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {result.riskFactors.map((risk, index) => (
                    <li key={index} className="text-sm text-yellow-800 flex items-start gap-2">
                      <span className="text-yellow-600 mt-0.5">•</span>
                      {risk}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{rec}</span>
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
