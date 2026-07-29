import React, { useState } from 'react';
import {
  Bug,
  Camera,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  Pill,
  Leaf,
  UploadCloud,
  FileText,
  Check,
  History,
  Trees,
  MapPin,
  TrendingDown,
  Activity,
  AlertTriangle,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SectionCard } from '@/components/ui/section-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLiveWeather } from '@/hooks/use-weather-telemetry';
import { useFarmPlots } from '@/context/farm-plot-context';
import {
  useDetectDiseaseMutation,
  useDetectPestMutation,
  useUploadLeafImageMutation,
} from '@/hooks/use-disease-pest-agents';

export function DiseaseMonitoringPage() {
  const { data: weatherData } = useLiveWeather();
  const current = weatherData?.current;

  // Global Farm Plot Context
  const { farmPlots, addLeafDiseaseDiagnosis } = useFarmPlots();

  // Selected Farm Plot State
  const [selectedPlotId, setSelectedPlotId] = useState('plot-1');
  const selectedPlot = farmPlots.find((p) => p.id === selectedPlotId) || farmPlots[0];

  const liveHumidity = current?.humidity_percent ?? 97;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'discontinuous chlorotic streaks',
    'mosaic pattern on leaves',
  ]);

  const uploadImageMutation = useUploadLeafImageMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));

      // Trigger automatic Agentverse image diagnosis for selected plot
      uploadImageMutation.mutate(
        { file, cropZone: selectedPlot.name },
        {
          onSuccess: (data) => {
            if (data?.diagnosis) {
              // Dynamically update plot disease history & reduce plot health index based on severity
              addLeafDiseaseDiagnosis(
                selectedPlotId,
                data.diagnosis.disease_name,
                data.diagnosis.severity_rating,
                file.name
              );
            }
          },
        }
      );
    }
  };

  const handleDiagnoseDefect = (diseaseName: string, severity: string) => {
    addLeafDiseaseDiagnosis(selectedPlotId, diseaseName, severity, 'Manual Defect Diagnostic');
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="🌿 Leaf Defect Scanner & Crop Health Predictor"
        description="Select a farm plot, upload leaf photos with defects, and immediately update plot disease history and crop health scores."
        badgeText="Plot Health AI Active"
      />

      {/* 🎯 FEATURE 1: Select Farm Plot & Predict Crop Health Index */}
      <SectionCard
        title="🎯 Select Farm Plot for Disease Analysis & Health Prediction"
        description="Combines plot disease history, live satellite weather, and foliage diagnostics to predict crop health."
      >
        <div className="space-y-6">
          {/* Plot Selector Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <Trees className="w-5 h-5" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Select Monitored Plot:</label>
                <select
                  value={selectedPlotId}
                  onChange={(e) => setSelectedPlotId(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-slate-100 font-bold text-sm rounded-lg px-3 py-1.5 focus:border-emerald-500 focus:outline-none mt-1"
                >
                  {farmPlots.map((plot) => (
                    <option key={plot.id} value={plot.id}>
                      {plot.name} ({plot.variety}) - {plot.location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Predicted Crop Health Index</span>
                <span className={`text-2xl font-extrabold ${selectedPlot.healthIndex > 85 ? 'text-emerald-400' : selectedPlot.healthIndex > 70 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {selectedPlot.healthIndex}%
                </span>
              </div>
              <Badge variant={selectedPlot.healthIndex > 85 ? 'emerald' : selectedPlot.healthIndex > 70 ? 'warning' : 'danger'}>
                {selectedPlot.healthIndex > 85 ? 'Optimal Health' : selectedPlot.healthIndex > 70 ? 'Moderate Risk' : 'High Disease Alert'}
              </Badge>
            </div>
          </div>

          {/* Plot Evaluation Grid: Disease History + Weather Risk + Health Prediction */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1: Plot Disease History */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <History className="w-4 h-4 text-emerald-400" /> Historical Disease Outbreak Log ({selectedPlot.diseaseHistory.length}):
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedPlot.diseaseHistory.map((log, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    {log}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-amber-400 font-semibold">
                Total Severity Penalty: -{selectedPlot.severityPenalty}% health deduction
              </p>
            </div>

            {/* Column 2: Live Weather Factor */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-sky-400" /> Open-Meteo Microclimate Factor:
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 rounded-lg bg-slate-900 text-slate-300">
                  <span>Live Relative Humidity:</span>
                  <span className="font-bold text-sky-400">{liveHumidity}%</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-slate-900 text-slate-300">
                  <span>Fungal Spore Humidity:</span>
                  <span className="font-bold text-amber-400">{liveHumidity > 90 ? 'High Humidity' : 'Moderate'}</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-slate-900 text-slate-300">
                  <span>Monitored Block Region:</span>
                  <span className="font-bold text-emerald-400 truncate max-w-[50%]">{selectedPlot.location}</span>
                </div>
              </div>
            </div>

            {/* Column 3: Quick Test Defect Button */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" /> Test Defect Impact on {selectedPlot.name}:
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Click below to simulate logging a new leaf defect. Notice how <strong className="text-slate-100">{selectedPlot.name}</strong>'s crop health index immediately drops!
                </p>
              </div>

              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-xs border-amber-500/40 text-amber-300 hover:bg-amber-500/10"
                  onClick={() => handleDiagnoseDefect('Katte Mosaic Virus', 'Critical')}
                >
                  + Add Katte Virus Defect (-35% Health)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-xs border-rose-500/40 text-rose-300 hover:bg-rose-500/10"
                  onClick={() => handleDiagnoseDefect('Azhukal Rot Outbreak', 'High')}
                >
                  + Add Azhukal Rot Defect (-25% Health)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* 📸 Leaf Scanner Image Upload & Diagnostics */}
      <SectionCard
        title={`📸 Upload Leaf Photo for ${selectedPlot.name}`}
        description="Upload a leaf image with a defect to run vision diagnosis and automatically update plot health."
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-1 space-y-4">
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-2xl bg-slate-950/60 cursor-pointer transition-all text-center">
              <UploadCloud className="w-10 h-10 text-emerald-400 mb-2 animate-bounce" />
              <span className="text-sm font-semibold text-slate-200 mb-1">Click to Upload Leaf Photo</span>
              <span className="text-xs text-slate-400">Supports JPG, PNG, WEBP files</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>

            {imagePreview && (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                <img src={imagePreview} alt="Leaf Preview" className="w-16 h-16 rounded-lg object-cover border border-slate-700" />
                <div className="text-xs min-w-0">
                  <p className="font-semibold text-slate-200 truncate">{selectedFile?.name}</p>
                  <span className="text-emerald-400 font-bold text-[10px]">Scanning for {selectedPlot.name}</span>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            {uploadImageMutation.isPending && (
              <div className="p-12 text-center text-slate-400 space-y-3">
                <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm font-semibold animate-pulse text-emerald-400">Executing Disease Agent diagnosis for {selectedPlot.name}...</p>
              </div>
            )}

            {uploadImageMutation.data && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Diagnosed Condition:</span>
                      <h3 className="text-lg font-extrabold text-emerald-400">{uploadImageMutation.data.diagnosis.disease_name}</h3>
                    </div>
                    <Badge variant={uploadImageMutation.data.diagnosis.severity_rating === 'Critical' ? 'danger' : 'warning'}>
                      Severity: {uploadImageMutation.data.diagnosis.severity_rating}
                    </Badge>
                  </div>
                  <p className="text-xs text-rose-400 font-bold">
                    ✓ Disease history updated for {selectedPlot.name}! Health Index reduced to {selectedPlot.healthIndex}%.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-emerald-400" /> Prescribed Treatment & Medicines:
                  </h4>

                  <div className="grid grid-cols-1 gap-3">
                    {uploadImageMutation.data.recommended_medicines.map((med, i) => (
                      <div key={i} className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-100">{med.name}</span>
                            <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-800 text-slate-300 border border-slate-700">
                              {med.type}
                            </span>
                          </div>
                          <p className="text-xs text-emerald-400 font-semibold">Exact Dosage: {med.dosage}</p>
                          <p className="text-xs text-slate-300">{med.schedule}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!selectedFile && !uploadImageMutation.isPending && (
              <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-800 rounded-xl">
                Upload a cardamom leaf photo on the left to run AI disease diagnosis for {selectedPlot.name}.
              </div>
            )}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
