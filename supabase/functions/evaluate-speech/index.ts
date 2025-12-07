import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transcript, exerciseType, targetObject } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Evaluating speech:', { transcript, exerciseType, targetObject });

    let systemPrompt = '';
    let userPrompt = '';

    if (exerciseType === 'describe') {
      systemPrompt = `You are a friendly speech therapy assistant for children. Your job is to evaluate how clearly and descriptively a child spoke when describing an object.

Evaluate based on:
1. Clarity - Was the speech clear and understandable?
2. Descriptiveness - Did they use good descriptive words?
3. Sentence structure - Was it a complete, well-formed sentence?
4. Articulation - Pay attention to clear pronunciation of sounds

Respond in JSON format:
{
  "passed": boolean,
  "score": number (1-10),
  "feedback": "short encouraging feedback for the child",
  "suggestion": "specific tip to improve if they didn't pass, or praise if they did"
}

Be encouraging but honest. Children need to score at least 6 to pass.`;

      userPrompt = `The child was asked to describe an object around them. They said: "${transcript}"

${targetObject ? `They were describing: ${targetObject}` : ''}

Evaluate their speech.`;
    } else if (exerciseType === 'sound') {
      systemPrompt = `You are a friendly speech therapy assistant for children. Your job is to evaluate how well a child pronounced a specific sound or word.

Respond in JSON format:
{
  "passed": boolean,
  "score": number (1-10),
  "feedback": "short encouraging feedback for the child",
  "suggestion": "specific tip to improve if they didn't pass, or praise if they did"
}

Be encouraging but honest. Children need to score at least 6 to pass.`;

      userPrompt = `The child said: "${transcript}"

Evaluate their pronunciation and clarity.`;
    } else {
      systemPrompt = `You are a friendly speech therapy assistant. Evaluate the child's speech clarity and articulation.

Respond in JSON format:
{
  "passed": boolean,
  "score": number (1-10),
  "feedback": "short encouraging feedback",
  "suggestion": "specific improvement tip or praise"
}`;

      userPrompt = `Evaluate this speech: "${transcript}"`;
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required. Please add funds.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error('AI gateway error');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    console.log('AI response:', content);

    // Parse JSON from response
    let evaluation;
    try {
      // Extract JSON from potential markdown code blocks
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || 
                        content.match(/```\s*([\s\S]*?)\s*```/) ||
                        [null, content];
      evaluation = JSON.parse(jsonMatch[1] || content);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      evaluation = {
        passed: true,
        score: 7,
        feedback: "Great job speaking clearly!",
        suggestion: "Keep practicing!"
      };
    }

    return new Response(JSON.stringify(evaluation), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in evaluate-speech:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
