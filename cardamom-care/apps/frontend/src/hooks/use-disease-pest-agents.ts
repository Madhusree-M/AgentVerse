import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface DiseaseDetectionResponse {
  agent_id: string;
  agent_name: string;
  protocol: string;
  timestamp: string;
  status: string;
  input_scan: {
    crop_zone: string;
    symptoms_submitted: string[];
    relative_humidity: number;
  };
  diagnosis: {
    disease_name: string;
    scientific_name: string;
    vector: string;
    confidence_percent: string;
    severity_rating: string;
    quarantine_recommended: boolean;
  };
  agentverse_action: string;
}

export interface PestDetectionResponse {
  agent_id: string;
  agent_name: string;
  protocol: string;
  timestamp: string;
  status: string;
  input_observations: {
    crop_zone: string;
    observations: string[];
    temperature: number;
  };
  pest_diagnosis: {
    pest_name: string;
    scientific_name: string;
    damage_pattern: string;
    threat_level: string;
    affected_parts: string[];
    confidence_percent: string;
  };
  agentverse_action: string;
}

export interface MedicineRecommendation {
  name: string;
  dosage: string;
  type: string;
  schedule: string;
}

export interface ImageDiseaseDetectionResponse {
  agent_id: string;
  agent_name: string;
  protocol: string;
  timestamp: string;
  status: string;
  uploaded_file: {
    filename: string;
    file_size_kb: number;
    crop_zone: string;
  };
  diagnosis: {
    disease_name: string;
    scientific_name: string;
    vector: string;
    severity_rating: string;
    confidence_percent: string;
  };
  symptoms: string[];
  recommended_medicines: MedicineRecommendation[];
  prevention_tips: string[];
  agentverse_action: string;
}

export function useUploadLeafImageMutation() {
  return useMutation<ImageDiseaseDetectionResponse, Error, { file: File; cropZone?: string }>({
    mutationFn: async ({ file, cropZone }) => {
      const formData = new FormData();
      formData.append('file', file);
      if (cropZone) formData.append('crop_zone', cropZone);

      const res = await apiClient.post('/agents/disease-detect-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    },
  });
}

export function useDetectDiseaseMutation() {
  return useMutation<DiseaseDetectionResponse, Error, { symptoms: string[]; cropZone?: string; humidity?: number }>({
    mutationFn: async (payload) => {
      const res = await apiClient.post('/agents/disease-detect', payload);
      return res.data;
    },
  });
}

export function useDetectPestMutation() {
  return useMutation<PestDetectionResponse, Error, { observations: string[]; cropZone?: string; tempCelsius?: number }>({
    mutationFn: async (payload) => {
      const res = await apiClient.post('/agents/pest-detect', payload);
      return res.data;
    },
  });
}
