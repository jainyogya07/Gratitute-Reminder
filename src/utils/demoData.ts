import type { GratitudeEntry } from '../App';

export function generateDemoEntries(days = 14): GratitudeEntry[] {
  const texts = [
    'Grateful for my study group helping me understand a tough concept.',
    'Thankful for a warm cup of coffee and a focused morning.',
    'Appreciative of the encouraging message from a friend.',
    'Happy about finishing a difficult assignment ahead of time.',
    'Grateful for a sunny walk that cleared my head.',
    'Thankful for a supportive professor who answered my question.',
    'Appreciative of a productive study session today.',
    'Happy about small wins: solved a bug in my project.',
    'Grateful for a healthy meal and energy for study.',
    'Thankful for a group call that motivated me.',
    'Appreciative of finding a new study routine that works.',
    'Happy about progress on my practice problems.',
    'Grateful for patience when things got stressful.',
    'Thankful for a restful night and clearer focus today.'
  ];

  const today = new Date();
  const entries: GratitudeEntry[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    entries.push({
      id: Date.now() + i,
      date: d.toISOString().slice(0, 10),
      text: texts[i % texts.length]
    });
  }
  return entries;
}

export default generateDemoEntries;
