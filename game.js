let birdY = 300;
let velocity = 0;
let gravity = 0.5;
let score = 0;
let obstacles = [];

function jump() {
  velocity = -10; // Adjust for "flap" feel
}

function createObstacle() {
  const gap = 150;
  const obstacleHeight = Math.random() * (400 - gap);
  obstacles.push({
    x: 400,
    topHeight: obstacleHeight,
    bottomHeight: 600 - obstacleHeight - gap
  });
}

function update() {
  velocity += gravity;
  birdY += velocity;
  document.getElementById("bird").style.top = birdY + "px";

  // Move obstacles
  obstacles.forEach(obstacle => {
    obstacle.x -= 2;
    if (obstacle.x < -80) {
      obstacles.shift();
      score++;
      document.getElementById("score").textContent = `Score: ${score}`;
    }
  });

  // Collision detection (simplified)
  if (birdY > 550 || birdY < 0) {
    alert("Game Over! Score: " + score);
    location.reload();
  }

  requestAnimationFrame(update);
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") jump();
});

// Spawn obstacles every 2 seconds
setInterval(createObstacle, 2000);
update();
