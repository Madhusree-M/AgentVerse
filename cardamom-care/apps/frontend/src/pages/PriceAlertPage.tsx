import React, { useState } from 'react';
import {
  BellRing,
  UploadCloud,
  DollarSign,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Camera,
  Layers,
  Scale,
  ArrowUpRight,
  ShieldCheck,
  Bell,
  Check,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { SectionCard } from '@/components/ui/section-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { useLanguage } from '@/context/language-context';

export function PriceAlertPage() {
  const { t } = useLanguage();
  const liveMarketMaxPrice = 2680; // Current Spices Board India Max Rate (₹/kg)
  const liveMarketAvgPrice = 2320;

  // Expected Target Price State
  const [expectedPrice, setExpectedPrice] = useState<number>(2500);
  const [targetLotWeight, setTargetLotWeight] = useState<number>(50);
  const [isAlertActive, setIsAlertActive] = useState<boolean>(true);
  const [notificationPhone, setNotificationPhone] = useState<string>('+91 98470 12345');

  // Cardamom Image Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Check if live market price has crossed user's expected price
  const isTargetCrossed = liveMarketMaxPrice >= expectedPrice;
  const priceDifference = liveMarketMaxPrice - expectedPrice;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setIsAnalyzing(true);
      setAnalysisResult(null);

      // Simulate AI Vision Cardamom Quality & Price Prediction
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisResult({
          grade: '8.2mm Extra Bold Grade A',
          colorIndex: 'Deep Malabar Green (High Saturation)',
          moisturePercent: '10.2%',
          capsuleUniformity: '94% Premium',
          predictedPricePerKg: 2680,
          baseRate: 2320,
          qualityPremium: 360,
          recommendedMarket: 'KCPMC Ltd - Bodinayakanur (Spice Hub)',
        });
      }, 1500);
    }
  };

  const handleUpdateExpectedPrice = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Expected Target Price updated to ₹${expectedPrice.toLocaleString()} / kg!`);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title={t('priceAlertHeaderTitle')}
        description={t('priceAlertHeaderDesc')}
        badgeText="AI Price Valuer Active"
      />

      {/* LIVE TARGET PRICE ALERT BANNER */}
      {isTargetCrossed && isAlertActive && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/50 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500 text-slate-950 shrink-0 font-bold">
              <BellRing className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-100">
                  {t('targetReached')}! Market Rate Crossed Your Expected Price!
                </h3>
                <Badge variant="emerald">Live Alert Triggered</Badge>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Current Spices Board Max Price (<strong className="text-emerald-400">₹{liveMarketMaxPrice.toLocaleString()}/kg</strong>) has crossed your expected price (<strong className="text-slate-100">₹{expectedPrice.toLocaleString()}/kg</strong>) by <span className="text-emerald-400 font-bold">+₹{priceDifference}/kg</span>!
              </p>
            </div>
          </div>
          <Button variant="primary" size="sm" className="shrink-0">
            <ArrowUpRight className="w-4 h-4" /> Sell at Bodinayakanur Auction
          </Button>
        </div>
      )}

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('spicesBoardMaxPrice')}
          value={`₹${liveMarketMaxPrice.toLocaleString()} / kg`}
          icon={TrendingUp}
          change="+₹160"
          trend="up"
          subtitle="Bodinayakanur Peak Grade"
          iconColor="text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
        />
        <StatCard
          title={t('yourExpectedPrice')}
          value={`₹${expectedPrice.toLocaleString()} / kg`}
          icon={Bell}
          subtitle="Target Price Threshold"
          iconColor="text-amber-400 bg-amber-500/10 border-amber-500/20"
        />
        <StatCard
          title={t('alertThresholdStatus')}
          value={isTargetCrossed ? t('targetReached') : 'Monitoring'}
          icon={CheckCircle2}
          subtitle={isTargetCrossed ? `+₹${priceDifference}/kg above target` : `₹${Math.abs(priceDifference)}/kg below target`}
          iconColor={isTargetCrossed ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-slate-400 bg-slate-800'}
        />
        <StatCard
          title={t('aiLotValuation')}
          value={analysisResult ? `₹${(analysisResult.predictedPricePerKg * targetLotWeight).toLocaleString()}` : `₹${(liveMarketMaxPrice * targetLotWeight).toLocaleString()}`}
          icon={DollarSign}
          subtitle={`Estimated for ${targetLotWeight} kg batch`}
          iconColor="text-sky-400 bg-sky-500/10 border-sky-500/20"
        />
      </div>

      {/* Main Feature Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FEATURE 1: Cardamom Image Upload & AI Price Prediction */}
        <SectionCard
          title={t('uploadCardamomTitle')}
          description={t('uploadCardamomDesc')}
        >
          <div className="space-y-4">
            {/* File Upload Box */}
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-2xl bg-slate-950/60 cursor-pointer transition-all text-center">
              <UploadCloud className="w-10 h-10 text-emerald-400 mb-2" />
              <span className="text-sm font-semibold text-slate-200 mb-1">{t('clickToUpload')}</span>
              <span className="text-xs text-slate-400">Upload sample (.jpg, .png) to run vision grading & price model</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>

            {/* Preview & AI Result */}
            {imagePreview && (
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                <img src={imagePreview} alt="Cardamom Sample" className="w-16 h-16 rounded-lg object-cover border border-slate-700" />
                <div className="text-xs min-w-0">
                  <p className="font-semibold text-slate-200 truncate">{selectedFile?.name}</p>
                  <span className="text-emerald-400 font-bold text-[10px]">Sample Loaded for Vision AI Scan</span>
                </div>
              </div>
            )}

            {isAnalyzing && (
              <div className="p-8 text-center text-slate-400 space-y-2 border border-slate-800 rounded-xl">
                <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-semibold text-emerald-400">Scanning capsule diameter, color saturation, and calculating predicted market price...</p>
              </div>
            )}

            {analysisResult && (
              <div className="p-4 rounded-xl bg-slate-950/90 border border-emerald-500/30 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">AI Vision Capsule Diagnosis</span>
                    <h4 className="text-base font-bold text-emerald-400">{analysisResult.grade}</h4>
                  </div>
                  <Badge variant="emerald">Top Quality Grade</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Color & Texture:</span>
                    <span className="font-semibold text-slate-100">{analysisResult.colorIndex}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Moisture Content:</span>
                    <span className="font-semibold text-slate-100">{analysisResult.moisturePercent}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-slate-200 space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-slate-100">Predicted Selling Price:</span>
                    <span className="font-extrabold text-emerald-400 text-lg">₹{analysisResult.predictedPricePerKg.toLocaleString()} / kg</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Calculated from base market rate (₹{analysisResult.baseRate}/kg) + 8mm capsule premium (+₹{analysisResult.qualityPremium}/kg).
                  </p>
                </div>

                {/* Batch Valuation Calculator */}
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Estimated Batch Value for {targetLotWeight} kg:</span>
                    <span className="text-base font-extrabold text-sky-400">₹{(analysisResult.predictedPricePerKg * targetLotWeight).toLocaleString()}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-400">{analysisResult.recommendedMarket}</span>
                </div>
              </div>
            )}
          </div>
        </SectionCard>

        {/* FEATURE 2: Set Expected Target Price & Notification Settings */}
        <SectionCard
          title={t('expectedTargetPriceTitle')}
          description={t('expectedTargetPriceDesc')}
        >
          <form onSubmit={handleUpdateExpectedPrice} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">{t('yourExpectedPrice')} (₹/kg)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  required
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-bold focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                You will be notified immediately when Spices Board auction rates reach or exceed this price.
              </p>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Lot Quantity for Valuation (kg)</label>
              <input
                type="number"
                required
                value={targetLotWeight}
                onChange={(e) => setTargetLotWeight(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Alert Mobile Number (SMS / WhatsApp)</label>
              <input
                type="text"
                value={notificationPhone}
                onChange={(e) => setNotificationPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div>
                <span className="font-semibold text-slate-200 block">Enable Automated Price Monitoring</span>
                <span className="text-[11px] text-slate-400">Agentverse swarm continuously checks auction streams</span>
              </div>
              <button
                type="button"
                onClick={() => setIsAlertActive(!isAlertActive)}
                className={`w-11 h-6 rounded-full p-1 transition-colors ${isAlertActive ? 'bg-emerald-600' : 'bg-slate-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isAlertActive ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full">
              <Check className="w-4 h-4" /> Save Target Price & Notification Settings
            </Button>
          </form>

          {/* Alert Log History */}
          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <BellRing className="w-4 h-4 text-emerald-400" /> Recent Price Alert Trigger History:
            </h4>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span>Jul 28: Bodinayakanur Max Rate ₹2,680 crossed target ₹2,500</span>
                <span className="text-emerald-400 font-bold">+₹180 / kg</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span>Jul 27: Puttady Max Rate ₹2,650 crossed target ₹2,500</span>
                <span className="text-emerald-400 font-bold">+₹150 / kg</span>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
