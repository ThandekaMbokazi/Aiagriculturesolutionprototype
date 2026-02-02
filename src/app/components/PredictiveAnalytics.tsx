import { useState } from 'react';
import { TrendingUp, Droplets, Sun, Wind, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const yieldPredictionData = [
  { month: 'Mar', predicted: 2400, actual: 2300, optimal: 2800 },
  { month: 'Apr', predicted: 3200, actual: 3100, optimal: 3500 },
  { month: 'May', predicted: 4100, actual: 4200, optimal: 4500 },
  { month: 'Jun', predicted: 5300, actual: 5100, optimal: 5800 },
  { month: 'Jul', predicted: 6200, actual: 6400, optimal: 6800 },
  { month: 'Aug', predicted: 6800, actual: null, optimal: 7200 },
  { month: 'Sep', predicted: 5900, actual: null, optimal: 6400 },
];

const weatherForecastData = [
  { day: 'Mon', temp: 72, rainfall: 0.2, humidity: 65 },
  { day: 'Tue', temp: 75, rainfall: 0.0, humidity: 60 },
  { day: 'Wed', temp: 78, rainfall: 0.8, humidity: 70 },
  { day: 'Thu', temp: 74, rainfall: 1.2, humidity: 75 },
  { day: 'Fri', temp: 71, rainfall: 0.5, humidity: 68 },
  { day: 'Sat', temp: 73, rainfall: 0.1, humidity: 62 },
  { day: 'Sun', temp: 76, rainfall: 0.0, humidity: 58 },
];

const cropHealthData = [
  { crop: 'Tomatoes', health: 92, risk: 'Low', yield: 95 },
  { crop: 'Corn', health: 78, risk: 'Medium', yield: 82 },
  { crop: 'Wheat', health: 85, risk: 'Low', yield: 88 },
  { crop: 'Soybeans', health: 68, risk: 'High', yield: 70 },
  { crop: 'Lettuce', health: 94, risk: 'Low', yield: 96 },
];

const soilMoistureData = [
  { date: '2/24', zone1: 65, zone2: 58, zone3: 72, zone4: 61 },
  { date: '2/26', zone1: 62, zone2: 55, zone3: 68, zone4: 59 },
  { date: '2/28', zone1: 58, zone2: 52, zone3: 65, zone4: 56 },
  { date: '3/1', zone1: 70, zone2: 68, zone3: 75, zone4: 72 },
  { date: '3/2', zone1: 68, zone2: 65, zone3: 73, zone4: 70 },
];

export function PredictiveAnalytics() {
  const [selectedCrop, setSelectedCrop] = useState('all');

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'high':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              Avg. Yield Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+15.3%</div>
            <p className="text-xs text-gray-500">vs. last season</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              Soil Moisture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-gray-500">Optimal range</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Sun className="w-4 h-4 text-orange-500" />
              Weather Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5/10</div>
            <p className="text-xs text-gray-500">Next 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              Risk Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-500">Require attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="yield" className="space-y-4">
        <TabsList>
          <TabsTrigger value="yield">Yield Prediction</TabsTrigger>
          <TabsTrigger value="weather">Weather Forecast</TabsTrigger>
          <TabsTrigger value="health">Crop Health</TabsTrigger>
          <TabsTrigger value="moisture">Soil Moisture</TabsTrigger>
        </TabsList>

        <TabsContent value="yield" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Yield Prediction Analysis</CardTitle>
              <CardDescription>
                AI-powered predictions based on historical data, weather patterns, and soil conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={yieldPredictionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Actual Yield (kg)"
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Predicted Yield (kg)"
                  />
                  <Line
                    type="monotone"
                    dataKey="optimal"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    name="Optimal Yield (kg)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weather" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>7-Day Weather Forecast</CardTitle>
              <CardDescription>
                Temperature, rainfall, and humidity predictions for optimal farming decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={weatherForecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="temp"
                    stackId="1"
                    stroke="#f59e0b"
                    fill="#fbbf24"
                    name="Temperature (°F)"
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="rainfall"
                    stackId="2"
                    stroke="#3b82f6"
                    fill="#60a5fa"
                    name="Rainfall (inches)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Crop Health Monitoring</CardTitle>
              <CardDescription>
                Real-time health scores and risk assessments for all crops
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cropHealthData.map((crop) => (
                  <div key={crop.crop} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{crop.crop}</span>
                        <Badge className={getRiskColor(crop.risk)}>
                          {crop.risk} Risk
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">
                        Health: {crop.health}%
                      </span>
                    </div>
                    <Progress value={crop.health} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Expected yield: {crop.yield}%</span>
                      <span>Last updated: 2 hours ago</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moisture" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Soil Moisture Tracking</CardTitle>
              <CardDescription>
                Monitor moisture levels across different zones for irrigation planning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={soilMoistureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="zone1" fill="#10b981" name="Zone 1" />
                  <Bar dataKey="zone2" fill="#3b82f6" name="Zone 2" />
                  <Bar dataKey="zone3" fill="#f59e0b" name="Zone 3" />
                  <Bar dataKey="zone4" fill="#8b5cf6" name="Zone 4" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <Droplets className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Irrigation Recommendation</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Zone 2 showing lower moisture levels. Recommend irrigation within 24 hours.
                      Zones 1 and 3 are in optimal range. Zone 4 may need irrigation in 2-3 days.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
