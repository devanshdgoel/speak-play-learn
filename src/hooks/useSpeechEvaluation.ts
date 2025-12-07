import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EvaluationResult {
  passed: boolean;
  score: number;
  feedback: string;
  suggestion: string;
}

interface UseSpeechEvaluationReturn {
  isEvaluating: boolean;
  result: EvaluationResult | null;
  error: string | null;
  evaluate: (transcript: string, exerciseType: string, targetObject?: string) => Promise<EvaluationResult | null>;
  reset: () => void;
}

export const useSpeechEvaluation = (): UseSpeechEvaluationReturn => {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const evaluate = useCallback(async (
    transcript: string, 
    exerciseType: string, 
    targetObject?: string
  ): Promise<EvaluationResult | null> => {
    if (!transcript.trim()) {
      toast.error("No speech detected. Please try again.");
      return null;
    }

    setIsEvaluating(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('evaluate-speech', {
        body: { transcript, exerciseType, targetObject }
      });

      if (fnError) {
        throw fnError;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to evaluate speech';
      console.error('Speech evaluation error:', err);
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setIsEvaluating(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setIsEvaluating(false);
  }, []);

  return {
    isEvaluating,
    result,
    error,
    evaluate,
    reset,
  };
};
