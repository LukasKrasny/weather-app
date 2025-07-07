export function formatDateTime(unix: number): string {
  return new Date(unix * 1000).toLocaleString('cs-CZ', {
    timeZone: "Europe/Prague",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
