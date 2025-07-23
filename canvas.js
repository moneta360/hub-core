const canvas = document.getElementById('evoCanvas');
const ctx = canvas.getContext('2d');
let agents = [];
let goal = { x: 150, y: 50 };

function drawAgent(agent) {
  ctx.fillStyle = "lime";
  ctx.beginPath();
  ctx.arc(agent.x, agent.y, 4, 0, 2 * Math.PI);
  ctx.fill();
}

function drawGoal() {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(goal.x, goal.y, 6, 0, 2 * Math.PI);
  ctx.fill();
}

function simulateFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGoal();

  agents.forEach(agent => {
    const dx = goal.x - agent.x;
    const dy = goal.y - agent.y;
    const angle = Math.atan2(dy, dx);
    agent.x += Math.cos(angle) * agent.genome.speed;
    agent.y += Math.sin(angle) * agent.genome.speed;
    agent.distanceToGoal = Math.hypot(goal.x - agent.x, goal.y - agent.y);
    drawAgent(agent);
  });
}