import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-username-german-essay-corrector.hf.space';

// 确保API基础URL以斜杠结尾
const normalizedBaseURL = API_BASE_URL.endsWith('/') ? API_BASE_URL : API_BASE_URL + '/';

export const api = axios.create({
  baseURL: normalizedBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface EssayCorrectionRequest {
  content: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
}

export interface EssayCorrectionResponse {
  score: number;
  grammar_errors: string[];
  vocabulary_feedback: string;
  structure_feedback: string;
  overall_feedback: string;
  corrected_version: string;
}

export const correctEssay = async (data: EssayCorrectionRequest) => {
  const response = await api.post<EssayCorrectionResponse>('/correct', data);
  return response.data;
};
