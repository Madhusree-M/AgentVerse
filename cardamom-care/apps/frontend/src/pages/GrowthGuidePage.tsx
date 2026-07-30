import React, { useState } from 'react';
import {
  Sprout,
  Calendar,
  Pill,
  ShieldAlert,
  CheckCircle2,
  Bot,
  Search,
  Zap,
  Code2,
  AlertTriangle,
  BookOpen,
  ChevronRight,
  Activity,
  Layers,
  Droplets,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Badge } from '@/components/ui/badge';

export interface GrowthStage {
  id: number;
  stageName: string;
  months: string;
  season: string;
  focus: string;
  agentName: string;
  agentPort: string;
  actions: string[];
  medicines: {
    name: string;
    type: string;
    dosage: string;
    purpose: string;
  }[];
  warningNote?: string;
}

export function GrowthGuidePage() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'medicines' | 'swarmRules'>('timeline');
  const [searchQuery, setSearchQuery] = useState('');

  const growthStages: GrowthStage[] = [
    {
      id: 1,
      stageName: 'Step 1: Clean Plants & Cut Tree Leaves',
      months: 'Jan – Mar',
      season: 'Dry Summer',
      focus: 'Cut dry leaves, cut tree branches for 50% sunlight, cover roots with dry leaves',
      agentName: 'Water Agent',
      agentPort: '8005',
      actions: [
        'Cut tree branches so half sunlight (50%) comes to plants.',
        'Cut away old dry stems so new green shoots can grow.',
        'Put 5 kg dry leaves around plant roots to hold soil water.',
        'Water plant roots if there is no rain for 10 days.',
      ],
      medicines: [
        {
          name: 'Trichoderma Bio-Powder',
          type: 'Bio Medicine',
          dosage: '50g per plant mixed with compost',
          purpose: 'Stops root rot fungus in soil.',
        },
        {
          name: 'Neem Cake Powder',
          type: 'Organic',
          dosage: '500g per plant',
          purpose: 'Stops soil worms & feeds roots naturally.',
        },
        {
          name: 'Rock Phosphate Powder',
          type: 'Fertilizer',
          dosage: '100g per plant',
          purpose: 'Helps new roots grow fast.',
        },
      ],
      warningNote: 'Do not dig deep near roots. It can break young root tips.',
    },
    {
      id: 2,
      stageName: 'Step 2: Water & Protect Flowers',
      months: 'Apr – May',
      season: 'Flowering Time',
      focus: 'Daily drip watering (15L/plant), put bee boxes for flowers, spray insect medicine',
      agentName: 'Weather Agent',
      agentPort: '8001',
      actions: [
        'Give 15 Liters water daily to each plant through drip lines.',
        'Keep 4 to 6 bee boxes per acre to make more cardamom pods.',
        'Check flower stalks twice a week for small thrips insects.',
        'Spray plant food early morning before sun gets hot.',
      ],
      medicines: [
        {
          name: 'Chlorpyrifos Spray',
          type: 'Insect Spray',
          dosage: '2 ml in 1 Liter water',
          purpose: 'Kills small thrips insects on young flowers.',
        },
        {
          name: '17-17-17 Plant Food',
          type: 'Fertilizer',
          dosage: '10g in 1 Liter water spray',
          purpose: 'Feeds new flower stalks to grow strong.',
        },
        {
          name: 'Zinc + Boron Spray',
          type: 'Fertilizer',
          dosage: '2g Zinc + 1g Boron in 1 Liter water',
          purpose: 'Stops flowers from falling off.',
        },
      ],
      warningNote: 'Do not spray insect medicine during bee flying hours (9 AM to 1 PM).',
    },
    {
      id: 3,
      stageName: 'Step 3: Stop Rotting in Heavy Rain',
      months: 'Jun – Jul',
      season: 'Heavy Monsoon Rain',
      focus: 'Dig water drains, spray copper mixture against rot, remove yellow striped leaves',
      agentName: 'Disease Agent',
      agentPort: '8002',
      actions: [
        'Clean water ditches so rainwater flows away quickly.',
        'Remove and burn leaves with yellow mosaic stripes.',
        'Spray copper mixture before heavy continuous rains start.',
        'Cut extra tree leaves if sky stays cloudy for days.',
      ],
      medicines: [
        {
          name: 'Bordeaux Copper Mix (1%)',
          type: 'Fungicide',
          dosage: '10g Copper + 10g Lime in 1 Liter water',
          purpose: 'Strong copper shield against pod rot in heavy rain.',
        },
        {
          name: 'Pseudomonas Bio-Liquid',
          type: 'Bio Medicine',
          dosage: '20g in 1 Liter water poured at roots',
          purpose: 'Protects roots from rotting in wet mud.',
        },
        {
          name: 'Potassium Nitrate Spray',
          type: 'Fertilizer',
          dosage: '5g in 1 Liter water',
          purpose: 'Helps young pods swell bigger.',
        },
      ],
      warningNote: 'Never spray copper mix in hot direct sun. Spray on cloudy humid days.',
    },
    {
      id: 4,
      stageName: 'Step 4: Grow Big & Heavy Pods (8mm Target)',
      months: 'Aug – Sep',
      season: 'Pod Growth Time',
      focus: 'Clear weeds, lift flower stalks off damp mud with sticks, target big 8mm pods',
      agentName: 'Market Agent',
      agentPort: '8004',
      actions: [
        'Clear weeds around plant base so air flows easily.',
        'Support flower stalks on dry sticks so pods do not touch wet mud.',
        'Check pods for small borer insect holes.',
      ],
      medicines: [
        {
          name: 'Mancozeb Spray',
          type: 'Fungicide',
          dosage: '2g in 1 Liter water spray',
          purpose: 'Stops brown rot spots on growing pods.',
        },
        {
          name: 'Spinosad Safe Spray',
          type: 'Bio Insecticide',
          dosage: '0.3 ml in 1 Liter water',
          purpose: 'Kills pod borer worms safely.',
        },
        {
          name: 'Potash Fertilizer (MOP)',
          type: 'Fertilizer',
          dosage: '150g per plant',
          purpose: 'Makes pods dark green, heavy and thick.',
        },
      ],
      warningNote: 'Keep pods lifted off wet soil using dry bamboo forks.',
    },
    {
      id: 5,
      stageName: 'Step 5: Pick Green Pods & Dry in Kiln',
      months: 'Oct – Nov',
      season: 'Picking Time',
      focus: 'Pick dark green mature pods every 45 days, wash in water, dry in kiln at 45°C',
      agentName: 'Harvest Agent',
      agentPort: '8006',
      actions: [
        'Pick pods only when seeds inside turn dark brown or black.',
        'Wash picked green pods in clean water within 3 hours.',
        'Dry pods in kiln at 45°C to 50°C for 24 hours.',
        'Store dried green cardamom in plastic-lined bags in a cool room.',
      ],
      medicines: [
        {
          name: 'No Chemical Spray Rule (14 Days)',
          type: 'Safety Rule',
          dosage: 'Stop all chemical sprays 14 days before picking!',
          purpose: 'Ensures zero chemical pesticide residues on green pods.',
        },
        {
          name: 'Clean Water Pod Wash',
          type: 'Organic',
          dosage: 'Dip pods in clean water for 10 mins',
          purpose: 'Keeps pods bright green after drying in kiln.',
        },
      ],
      warningNote: 'Do not pick light green immature pods. They shrink in kiln and lose money.',
    },
    {
      id: 6,
      stageName: 'Step 6: Feed Compost & Prepare for Next Year',
      months: 'Dec',
      season: 'Winter Rest',
      focus: 'Cut old picked stems down to ground, add 5 kg cow manure per plant',
      agentName: 'Yield ML Agent',
      agentPort: '8003',
      actions: [
        'Cut old picked stems down to ground level.',
        'Add 5 kg rotted cow manure or vermicompost around each plant.',
        'Pour bio-fertilizer at plant roots to make soil rich.',
      ],
      medicines: [
        {
          name: 'Cow Manure / Vermicompost',
          type: 'Organic',
          dosage: '5 kg per plant',
          purpose: 'Recharges soil strength for next year.',
        },
        {
          name: 'Bio-Nitrogen Fixer',
          type: 'Bio Fertilizer',
          dosage: '25g per plant',
          purpose: 'Helps soil absorb natural air nitrogen.',
        },
        {
          name: 'Copper Powder',
          type: 'Fungicide',
          dosage: '3g in 1 Liter water poured at roots',
          purpose: 'Heals cut stem wounds from fungus.',
        },
      ],
      warningNote: 'Use only well-rotted cow manure to avoid soil worms.',
    },
  ];

  // Directory Filter
  const allMedicines = growthStages.flatMap((s) =>
    s.medicines.map((m) => ({ ...m, stageName: s.stageName, months: s.months }))
  );
  const filteredMedicines = allMedicines.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 py-2 max-w-6xl mx-auto">
      {/* Centered Simple Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20 inline-block">
          FARMER GUIDE
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Cardamom Simple Growth Guide
        </h1>
        <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto font-medium">
          Easy 6 steps to care for your cardamom plants, what work to do each month, and simple medicines to use.
        </p>
      </div>

      {/* Simple View Switcher Tabs */}
      <div className="flex justify-center border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'timeline'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" /> 6 Simple Growth Steps
          </button>
          <button
            onClick={() => setActiveTab('medicines')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'medicines'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Pill className="w-4 h-4" /> Medicines List
          </button>
          <button
            onClick={() => setActiveTab('swarmRules')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'swarmRules'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bot className="w-4 h-4" /> Safety Rules
          </button>
        </div>
      </div>

      {/* TAB 1: CLEAN SIMPLE ALTERNATING TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="relative py-4">
          {/* Continuous Central Line */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-sky-500 via-sky-400 to-sky-600 rounded-full shadow-lg shadow-sky-500/30" />

          <div className="space-y-10 lg:space-y-12">
            {growthStages.map((stage, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div key={stage.id} className="relative flex flex-col lg:flex-row items-center">
                  {/* Circle Step Node */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-slate-950 border-4 border-sky-400 text-sky-300 font-extrabold text-base items-center justify-center shadow-xl shadow-sky-500/30">
                    {stage.id}
                  </div>

                  {/* Card Content */}
                  <div
                    className={`w-full lg:w-[46%] ${
                      isEven ? 'lg:mr-auto lg:pr-6' : 'lg:ml-auto lg:pl-6'
                    }`}
                  >
                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4 hover:border-sky-500/80 transition-all group relative overflow-hidden">
                      {/* Top Accent Bar */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-sky-500" />

                      {/* Header Badge & Date Pill */}
                      <div className="pt-1">
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-sky-500/20 text-sky-300 border border-sky-500/40 inline-block">
                          {stage.months} • {stage.season}
                        </span>
                      </div>

                      {/* Title & Simple Focus */}
                      <div>
                        <h3 className="text-lg font-extrabold text-white group-hover:text-sky-300 transition-colors">
                          {stage.stageName}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium leading-relaxed">
                          Main Work: <strong className="text-sky-300">{stage.focus}</strong>
                        </p>
                      </div>

                      {/* Simple Field Actions */}
                      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                        <h4 className="text-xs font-extrabold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-sky-400" /> Simple Work to Do:
                        </h4>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200">
                          {stage.actions.map((act, aIdx) => (
                            <li key={aIdx} className="flex items-start gap-2 font-medium">
                              <span className="text-sky-400 font-bold">•</span>
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Simple Medicines & Dosages */}
                      <div className="space-y-2 pt-1 border-t border-slate-800">
                        <h4 className="text-xs font-extrabold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
                          <Pill className="w-4 h-4 text-sky-400" /> Recommended Medicines:
                        </h4>
                        <div className="space-y-2">
                          {stage.medicines.map((med, mIdx) => (
                            <div key={mIdx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm space-y-0.5">
                              <div className="flex items-center justify-between">
                                <span className="font-extrabold text-white">{med.name}</span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/10 text-sky-300 border border-sky-500/20">
                                  {med.type}
                                </span>
                              </div>
                              <p className="text-sky-300 font-mono font-bold text-xs">Mix Dose: {med.dosage}</p>
                              <p className="text-slate-200 text-xs font-medium">{med.purpose}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Safety Warning */}
                      {stage.warningNote && (
                        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span><strong>Important Safety Note:</strong> {stage.warningNote}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: MEDICINES SEARCH DIRECTORY */}
      {activeTab === 'medicines' && (
        <div className="space-y-6">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search medicine name, copper spray, neem cake, or fertilizer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {filteredMedicines.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 hover:border-sky-500/60 transition-all">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-extrabold text-sm sm:text-base text-white">{item.name}</span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    {item.type}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-sky-300 font-mono font-bold">Mix Dose: {item.dosage}</p>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">{item.purpose}</p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>{item.months}</span>
                  <span className="text-sky-400 font-semibold">{item.stageName.split(':')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SIMPLE SAFETY RULES */}
      {activeTab === 'swarmRules' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="text-base font-extrabold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-sky-400" /> Stop Chemical Sprays 14 Days Before Picking
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              Stop all chemical sprays 14 days before picking cardamom. This guarantees zero chemical poison on green pods so buyers give top price.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="text-base font-extrabold text-white flex items-center gap-2">
              <Droplets className="w-5 h-5 text-sky-400" /> Do Not Water During Heavy Rains
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              If heavy rain falls (&gt;20mm/day), stop drip watering completely to prevent root rotting in wet mud.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="text-base font-extrabold text-white flex items-center gap-2">
              <Sprout className="w-5 h-5 text-sky-400" /> Spray Copper Mix When Humidity is High
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              If damp humidity stays above 80% for 2 days, spray copper mixture to stop fungus rot before it damages pods.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="text-base font-extrabold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-sky-400" /> Potash Spray for Big 8.2mm Pods
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              Spray potash fertilizer in August to make pods heavy and big (8.2mm Extra Bold grade) for max auction rates.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
