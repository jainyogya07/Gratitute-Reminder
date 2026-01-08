export function devLog(...args: unknown[]) {
  const mode = ((import.meta as unknown) as { env?: { MODE?: string } }).env?.MODE || 'development';
  if (mode !== 'production') {
    console.info(...args);
  }
}
