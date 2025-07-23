let generation = 1;
let bestFitness = 0;

function startSim() {
  const count = parseInt(document.getElementById('agentCount').value);
  agents = [];

  for (let i = 0; i < count; i++) {
    agents.push({
      x: Math.random() * canvas.width,
      y: canvas.height - 30,
      genome: createGenome(),
      distanceToGoal: 0
    });
  }

  runSim();
}

function runSim() {
  let steps = 60;
  const interval = setInterval(() => {
    simulateFrame();
    if (--steps <= 0) {
      clearInterval(interval);
      evaluateGen();
    }
  }, 100);
}

function evaluateGen() {
  agents.sort((a, b) => evaluateFitness(b) - evaluateFitness(a));
  bestFitness = evaluateFitness(agents[0]);
  document.getElementById("bestFit").textContent = bestFitness.toFixed(2);
}

function nextGen() {
  const mutationRate = parseInt(document.getElementById('mutation').value) / 100;
  const survivors = agents.slice(0, 10);
  const newAgents = [];

  while (newAgents.length < agents.length) {
    const parent = survivors[Math.floor(Math.random() * survivors.length)];
    newAgents.push({
      x: Math.random() * canvas.width,
      y: canvas.height - 30,
      genome: mutateGenome(parent.genome, mutationRate),
      distanceToGoal: 0
    });
  }

  agents = newAgents;
  generation++;
  document.getElementById("genCount").textContent = generation;
  runSim();
}

function reset() {
  generation = 1;
  bestFitness = 0;
  document.getElementById("genCount").textContent = "1";
  document.getElementById("bestFit").textContent = "0";
  startSim();
}