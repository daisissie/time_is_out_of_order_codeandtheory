// Generate multiple clocks with random time and ticking speed
const clocksContainer = document.getElementById('clocks');
const NUM_CLOCKS = 5;
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createClock() {
  const clock = document.createElement('div');
  clock.className = 'clock';
  // Random initial time
  let hour = randomInt(0, 11);
  let minute = randomInt(0, 59);
  let second = randomInt(0, 59);
  // Random ticking speed (some go forward, some backward, some fast, some slow)
  const speed = (Math.random() * 1.5 + 0.5) * (Math.random() > 0.5 ? 1 : -1);
  // Create hands
  const hourHand = document.createElement('div');
  hourHand.className = 'hand hour';
  const minuteHand = document.createElement('div');
  minuteHand.className = 'hand minute';
  const secondHand = document.createElement('div');
  secondHand.className = 'hand second';
  const center = document.createElement('div');
  center.className = 'center';
  clock.appendChild(hourHand);
  clock.appendChild(minuteHand);
  clock.appendChild(secondHand);
  clock.appendChild(center);
  // Animate
  setInterval(() => {
    second += speed;
    if (second >= 60) { second = 0; minute++; }
    if (second < 0) { second = 59; minute--; }
    if (minute >= 60) { minute = 0; hour++; }
    if (minute < 0) { minute = 59; hour--; }
    if (hour >= 12) { hour = 0; }
    if (hour < 0) { hour = 11; }
    // Calculate angles
    const secondAngle = (second / 60) * 360;
    const minuteAngle = (minute / 60) * 360 + (second / 60) * 6;
    const hourAngle = (hour / 12) * 360 + (minute / 60) * 30;
    hourHand.style.transform = `rotate(${hourAngle}deg)`;
    minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
    secondHand.style.transform = `rotate(${secondAngle}deg)`;
  }, 1000 / Math.abs(speed));
  return clock;
}
for (let i = 0; i < NUM_CLOCKS; i++) {
  clocksContainer.appendChild(createClock());
} 