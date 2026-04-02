'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { correctEssay, EssayCorrectionResponse } from '@/lib/api';
import { Loader2, Send } from 'lucide-react';
import CorrectionResult from './CorrectionResult';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

export default function EssayForm() {
  const [content, setContent] = useState('');
  const [level, setLevel] = useState<(typeof LEVELS)[number]>('B1');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EssayCorrectionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await correctEssay({ content, level });
      setResult(response);
    } catch (error) {
      console.error(error);
      setError('批改失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {LEVELS.map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              level === l
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {l}
          </button>
        ))}
      </div>
      
      <Textarea
        placeholder="请输入你的德语作文..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[200px] text-lg"
      />
      
      <Button 
        onClick={handleSubmit} 
        disabled={loading || !content.trim()}
        className="w-full"
        size="lg"
      >
        {loading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Send className="mr-2 h-5 w-5" />
        )}
        {loading ? '批改中...' : '提交批改'}
      </Button>

      {error && (
        <div className="p-4 bg-red-50 text-red-500 rounded-lg">
          {error}
        </div>
      )}

      {result && <CorrectionResult result={result} />}
    </div>
  );
}
