export const getMoonPhase = (date: Date): number => {
  // Simple moon phase calculation (0-1)
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // Approximate moon phase calculation
  const c = year / 100;
  const n = month + 12 * year;
  const k = day + 2415020 + Math.floor((n - 1) / 12);
  
  return ((k - 2451550.1) / 29.530588853) % 1;
};

export const getMoonPhaseEmoji = (phase: number): string => {
  const phases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
  const index = Math.floor(phase * 8) % 8;
  return phases[index];
};