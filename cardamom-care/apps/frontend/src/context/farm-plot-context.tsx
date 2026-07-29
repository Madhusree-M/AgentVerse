import React, { createContext, useContext, useState } from 'react';

export interface FarmPlot {
  id: string;
  name: string;
  variety: string;
  location: string;
  area: string;
  status: string;
  healthIndex: number;
  diseaseHistory: string[];
  severityPenalty: number;
}

interface FarmPlotContextType {
  farmPlots: FarmPlot[];
  addPlot: (plot: Omit<FarmPlot, 'id' | 'healthIndex' | 'diseaseHistory' | 'severityPenalty'>) => void;
  updatePlot: (plot: FarmPlot) => void;
  addLeafDiseaseDiagnosis: (plotId: string, diseaseName: string, severityRating: string, filename?: string) => void;
}

const DEFAULT_PLOTS: FarmPlot[] = [
  {
    id: 'plot-1',
    name: 'High-Range Block A',
    variety: 'Njallani Green Gold',
    location: 'Idukki High-Range, Kerala',
    area: '4.5 Acres',
    status: 'Active',
    healthIndex: 94,
    severityPenalty: 6,
    diseaseHistory: [
      'Jun 2025: Preventive Bordeaux spray applied (No disease detected)',
      'Nov 2024: Minor Leaf Blight spots resolved with Neem extract',
    ],
  },
  {
    id: 'plot-2',
    name: 'Mist Valley Block B',
    variety: 'Vazhukka Hybrid',
    location: 'Munnar Spice Valley',
    area: '5.2 Acres',
    status: 'Active',
    healthIndex: 88,
    severityPenalty: 12,
    diseaseHistory: [
      'Aug 2025: Mild Katte Aphid vector activity detected in lower canopy',
      'May 2024: Systemic Imidacloprid application completed',
    ],
  },
  {
    id: 'plot-3',
    name: 'Shade Reserve Block C',
    variety: 'Malabar Local',
    location: 'Bodinayakanur (Spice Hub)',
    area: '3.8 Acres',
    status: 'Active',
    healthIndex: 76,
    severityPenalty: 24,
    diseaseHistory: [
      'Jul 2025: Azhukal Capsule Rot outbreak due to waterlogging',
      'Aug 2024: Trichoderma FYM compost soil drench applied',
    ],
  },
  {
    id: 'plot-4',
    name: 'Slope Ridge Block D',
    variety: 'Yelagiri High-Yield',
    location: 'Vandanmedu, Idukki',
    area: '2.5 Acres',
    status: 'Active',
    healthIndex: 91,
    severityPenalty: 9,
    diseaseHistory: [
      'Sep 2025: Clean health record (Optimal slope wind drainage)',
      'Oct 2024: Annual organic neem cake soil amendment',
    ],
  },
];

const FarmPlotContext = createContext<FarmPlotContextType | undefined>(undefined);

export function FarmPlotProvider({ children }: { children: React.ReactNode }) {
  const [farmPlots, setFarmPlots] = useState<FarmPlot[]>(DEFAULT_PLOTS);

  const addPlot = (newPlotData: Omit<FarmPlot, 'id' | 'healthIndex' | 'diseaseHistory' | 'severityPenalty'>) => {
    const newPlot: FarmPlot = {
      ...newPlotData,
      id: `plot-${Date.now()}`,
      healthIndex: 96,
      severityPenalty: 4,
      diseaseHistory: ['Registered new block profile with clean initial health record.'],
    };
    setFarmPlots((prev) => [...prev, newPlot]);
  };

  const updatePlot = (updatedPlot: FarmPlot) => {
    setFarmPlots((prev) => prev.map((p) => (p.id === updatedPlot.id ? updatedPlot : p)));
  };

  const addLeafDiseaseDiagnosis = (plotId: string, diseaseName: string, severityRating: string, filename?: string) => {
    const penaltyMap: Record<string, number> = {
      Critical: 35,
      High: 25,
      Medium: 15,
      Low: 8,
    };
    const penalty = penaltyMap[severityRating] || 15;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setFarmPlots((prev) =>
      prev.map((plot) => {
        if (plot.id === plotId) {
          const newPenalty = plot.severityPenalty + penalty;
          const updatedHealth = Math.max(25, 100 - newPenalty);
          const newLogEntry = `${timestamp}: New leaf defect diagnosed - ${diseaseName} (Severity: ${severityRating}${filename ? `, Photo: ${filename}` : ''})`;
          return {
            ...plot,
            severityPenalty: newPenalty,
            healthIndex: updatedHealth,
            status: updatedHealth < 75 ? `${diseaseName} Alert` : plot.status,
            diseaseHistory: [newLogEntry, ...plot.diseaseHistory],
          };
        }
        return plot;
      })
    );
  };

  return (
    <FarmPlotContext.Provider value={{ farmPlots, addPlot, updatePlot, addLeafDiseaseDiagnosis }}>
      {children}
    </FarmPlotContext.Provider>
  );
}

export function useFarmPlots() {
  const context = useContext(FarmPlotContext);
  if (!context) {
    throw new Error('useFarmPlots must be used within a FarmPlotProvider');
  }
  return context;
}
