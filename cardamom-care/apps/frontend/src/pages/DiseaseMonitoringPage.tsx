import React, { useState } from 'react';
import {
  Bug,
  Camera,
  ShieldAlert,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
  Bot,
  Play,
  Check,
  UploadCloud,
  FileText,
  Pill,
  ShieldCheck,
  Leaf,
  Info,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SectionCard } from '@/components/ui/section-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  useDetectDiseaseMutation,
  useDetectPestMutation,
  useUploadLeafImageMutation,
} from '@/hooks/use-disease-pest-agents';

export function DiseaseMonitoringPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [cropZone, setCropZone] = useState('Block A - High Range Section');

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'discontinuous chlorotic streaks',
    'mosaic pattern on leaves',
  ]);
  const [selectedPestObs, setSelectedPestObs] = useState<string[]>([
    'scabs on capsules',
    'panicle curling',
  ]);

  const uploadImageMutation = useUploadLeafImageMutation();
  const diseaseMutation = useDetectDiseaseMutation();
  const pestMutation = useDetectPestMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));

      // Trigger automatic Agentverse image diagnosis
      uploadImageMutation.mutate({ file, cropZone });
    }
  };

  const handleRunDiagnosticSwarm = () => {
    diseaseMutation.mutate({ symptoms: selectedSymptoms, cropZone, humidity: 88.0 });
    pestMutation.mutate({ observations: selectedPestObs, cropZone, tempCelsius: 26.5 });
  };

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  const togglePestObs = (obs: string) => {
    setSelectedPestObs((prev) =>
      prev.includes(obs) ? prev.filter((o) => o !== obs) : [...prev, obs]
    );
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="🌿 Leaf Scanner, Disease & Pest Diagnostic Agents"
        description="Upload a cardamom leaf image to diagnose disease, identify symptoms, and receive exact medicine dosages & treatment schedules."
        badgeText="Image Vision Agent Ready"
      />

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Leaf Vision Classifier" value="Active (v2)" icon={Camera} subtitle="Upload Leaf Photo" />
        <StatCard title="Disease Detection Agent" value="Online" icon={Leaf} subtitle="Katte, Rot, Blight" />
        <StatCard title="Pest Detection Agent" value="Online" icon={Bug} subtitle="Thrips & Borer" />
        <StatCard title="Treatment Agent" value="Active" icon={Pill} subtitle="Prescriptions & Dosage" />
      </div>

      {/* 📸 FEATURE 1: Cardamom Leaf Image Upload & AI Diagnostic Scanner */}
      <SectionCard
        title="📸 Upload Cardamom Leaf Photo for AI Diagnosis"
        description="Upload any leaf photo (.jpg, .png) to diagnose disease, identify symptoms, and get medicine recommendations."
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* File Upload Dropzone */}
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
                  <p className="text-slate-400">{(selectedFile?.size || 0) / 1024 > 1024 ? `${((selectedFile?.size || 0) / 1024 / 1024).toFixed(1)} MB` : `${((selectedFile?.size || 0) / 1024).toFixed(0)} KB`}</p>
                  <span className="text-emerald-400 font-bold text-[10px]">Ready for Scan</span>
                </div>
              </div>
            )}
          </div>

          {/* AI Diagnostic & Prescribed Medicines Result Card */}
          <div className="lg:col-span-2">
            {uploadImageMutation.isPending && (
              <div className="p-12 text-center text-slate-400 space-y-3">
                <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm font-semibold animate-pulse text-emerald-400">Analyzing leaf image features & generating medicine prescription...</p>
              </div>
            )}

            {uploadImageMutation.data && (
              <div className="space-y-4 animate-in fade-in duration-300">
                {/* Diagnosis Header */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Diagnosed Condition:</span>
                      <h3 className="text-lg font-extrabold text-emerald-400">{uploadImageMutation.data.diagnosis.disease_name}</h3>
                    </div>
                    <Badge variant={uploadImageMutation.data.diagnosis.severity_rating === 'Critical' ? 'danger' : uploadImageMutation.data.diagnosis.severity_rating === 'High' ? 'warning' : 'emerald'}>
                      Severity: {uploadImageMutation.data.diagnosis.severity_rating}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-300">
                    Scientific Classification: <span className="italic font-semibold text-slate-200">{uploadImageMutation.data.diagnosis.scientific_name}</span>
                  </p>
                  <p className="text-xs text-slate-300">
                    Vector / Mode: <span className="text-slate-200">{uploadImageMutation.data.diagnosis.vector}</span> • Confidence: <strong className="text-emerald-400">{uploadImageMutation.data.diagnosis.confidence_percent}</strong>
                  </p>
                </div>

                {/* Detected Symptoms List */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-400" /> Characteristic Symptoms Identified:
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    {uploadImageMutation.data.symptoms.map((sym, i) => (
                      <li key={i} className="leading-relaxed">{sym}</li>
                    ))}
                  </ul>
                </div>

                {/* 💊 Recommended Medicines & Dosage */}
                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-emerald-400" /> Agentverse Recommended Medicines & Treatment:
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

                {/* Agronomic Prevention Tips */}
                {uploadImageMutation.data.prevention_tips && (
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-slate-200 block">Agronomic Prevention Tips:</span>
                    <ul className="list-disc list-inside space-y-1">
                      {uploadImageMutation.data.prevention_tips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {!selectedFile && !uploadImageMutation.isPending && (
              <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-800 rounded-xl">
                Upload a cardamom leaf photo on the left to run AI disease diagnosis, view symptoms, and receive exact medicine prescriptions.
              </div>
            )}
          </div>
        </div>
      </SectionCard>

      {/* Text Symptom & Pest Observation Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Disease Symptoms Input Panel */}
        <SectionCard
          title="🌿 Text Symptom Selector"
          description="Select foliage indicators to test the Crop Disease Detection Agent"
        >
          <div className="space-y-3">
            {[
              'discontinuous chlorotic streaks',
              'mosaic pattern on leaves',
              'stunted tiller growth',
              'water soaked lesions on capsules',
              'rotting capsules',
              'yellowing of foliage',
              'necrotic brown spots on leaves',
            ].map((sym) => {
              const isSelected = selectedSymptoms.includes(sym);
              return (
                <button
                  key={sym}
                  onClick={() => toggleSymptom(sym)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs font-medium flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span>{sym}</span>
                  {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </SectionCard>

        {/* Pest Observations Input Panel */}
        <SectionCard
          title="🐛 Pest Damage Observation Selector"
          description="Select capsule or tiller damage patterns to test the Pest Detection Agent"
        >
          <div className="space-y-3">
            {[
              'scabs on capsules',
              'corky encrustations on capsules',
              'panicle curling',
              'boreholes on tillers with frass',
              'central shoot drying (dead heart)',
              'chewed roots & tiller wilting',
            ].map((obs) => {
              const isSelected = selectedPestObs.includes(obs);
              return (
                <button
                  key={obs}
                  onClick={() => togglePestObs(obs)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs font-medium flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-sky-500/10 border-sky-500/40 text-sky-300'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span>{obs}</span>
                  {isSelected && <Check className="w-4 h-4 text-sky-400" />}
                </button>
              );
            })}
          </div>
        </SectionCard>
      </div>

      {/* Swarm Execution Results Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Disease Detection Agent Result Card */}
        <SectionCard
          title="🌿 Crop Disease Detection Agent Output"
          description="Agentverse protocol response payload"
        >
          {diseaseMutation.data ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-100">{diseaseMutation.data.diagnosis.disease_name}</span>
                  <Badge variant={diseaseMutation.data.diagnosis.quarantine_recommended ? 'danger' : 'emerald'}>
                    Severity: {diseaseMutation.data.diagnosis.severity_rating}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400">
                  Scientific Name: <span className="italic text-slate-200">{diseaseMutation.data.diagnosis.scientific_name}</span>
                </p>
                <p className="text-xs text-slate-400">
                  Vector / Mode: <span className="text-slate-200">{diseaseMutation.data.diagnosis.vector}</span>
                </p>
                <p className="text-xs text-emerald-400 font-bold">
                  Model Confidence: {diseaseMutation.data.diagnosis.confidence_percent}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="text-slate-400 font-bold block mb-1">Agentverse Swarm Protocol Message:</span>
                <p className="text-slate-300 leading-relaxed">{diseaseMutation.data.agentverse_action}</p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-800 rounded-xl">
              Click &quot;Run Agent Inspection Swarm&quot; above to execute the Disease Agent payload.
            </div>
          )}
        </SectionCard>

        {/* Pest Detection Agent Result Card */}
        <SectionCard
          title="🐛 Pest Detection Agent Output"
          description="Agentverse protocol response payload"
        >
          {pestMutation.data ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-sky-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-100">{pestMutation.data.pest_diagnosis.pest_name}</span>
                  <Badge variant={pestMutation.data.pest_diagnosis.threat_level === 'Critical' ? 'danger' : 'warning'}>
                    Threat: {pestMutation.data.pest_diagnosis.threat_level}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400">
                  Scientific: <span className="italic text-slate-200">{pestMutation.data.pest_diagnosis.scientific_name}</span>
                </p>
                <p className="text-xs text-slate-400">
                  Damage Pattern: <span className="text-slate-200">{pestMutation.data.pest_diagnosis.damage_pattern}</span>
                </p>
                <p className="text-xs text-sky-400 font-bold">
                  Confidence Score: {pestMutation.data.pest_diagnosis.confidence_percent}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="text-slate-400 font-bold block mb-1">Agentverse Swarm Protocol Message:</span>
                <p className="text-slate-300 leading-relaxed">{pestMutation.data.agentverse_action}</p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 border border-dashed border-slate-800 rounded-xl">
              Click &quot;Run Agent Inspection Swarm&quot; above to execute the Pest Agent payload.
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
