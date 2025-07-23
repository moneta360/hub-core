function createGenome() {
  return {
    speed: Math.random() * 5,
    turnRate: Math.random() * 180,
    vision: Math.random() * 20,
  };
}

function mutateGenome(genome, mutationRate = 0.1) {
  const keys = Object.keys(genome);
  const newGenome = { ...genome };

  keys.forEach(key => {
    if (Math.random() < mutationRate) {
      newGenome[key] += (Math.random() - 0.5) * 2;
    }
  });

  return newGenome;
}

function evaluateFitness(agent) {
  return 100 - agent.distanceToGoal;
}