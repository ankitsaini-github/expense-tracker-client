import confetti from "canvas-confetti"

var end = Date.now() + 0.5 * 1000;

// var colors = ['#84cc16', '#22c55e', '#27272a'];

export const generateConfetti = (colors) => {
  (function frame() {
    // left
    confetti({
      particleCount: 7,
      angle: 60,
      spread: 85,
      origin: { x: 0 },
      colors:colors,
    });
    // right
    confetti({
      particleCount: 7,
      angle: 120,
      spread: 85,
      origin: { x: 1 },
      colors:colors,
    });
  
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}