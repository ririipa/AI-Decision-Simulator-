type Result = {
  success: number;
  failure: number;
  reasoning: string;
};

export function runMonteCarlo(decision: string, iterations = 5000): Result {
  let riskFactor = 0.3; // default medium risk

  // "AI-like" logic based on keywords
  const text = decision.toLowerCase();

  if (text.includes("quit") || text.includes("start") || text.includes("move")) {
    riskFactor += 0.2;
  }

  if (text.includes("safe") || text.includes("stable") || text.includes("job")) {
    riskFactor -= 0.1;
  }

  if (text.includes("startup") || text.includes("business")) {
    riskFactor += 0.25;
  }

  // clamp between 0.1 and 0.9
  riskFactor = Math.max(0.1, Math.min(0.9, riskFactor));

  let successCount = 0;

  for (let i = 0; i < iterations; i++) {
    const outcome = Math.random();

    if (outcome > riskFactor) {
      successCount++;
    }
  }

  const success = Math.round((successCount / iterations) * 100);
  const failure = 100 - success;

  let reasoning = "";

  if (riskFactor < 0.3) {
    reasoning = "Low-risk decision based on your input.";
  } else if (riskFactor < 0.6) {
    reasoning = "Moderate-risk decision with mixed outcomes.";
  } else {
    reasoning = "High-risk decision with uncertain outcomes.";
  }

  return {
    success,
    failure,
    reasoning,
  };
}