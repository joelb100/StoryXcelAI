// Simple hash utility for content fingerprinting
export function createHash(input: string): string {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) + hash) + input.charCodeAt(i);
  }
  return (hash >>> 0).toString(36); // Convert to positive number and base36
}