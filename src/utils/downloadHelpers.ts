import confetti from 'canvas-confetti';

export function downloadTextFile(filename: string, content: string, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  triggerConfetti();
}

export function triggerConfetti() {
  try {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#4F46E5', '#10B981', '#F59E0B', '#6366F1']
    });
  } catch {
    // Ignore if canvas-confetti is not available
  }
}
