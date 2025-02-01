export function getTimeFromISO(isoString: string): string {
  const date = new Date(isoString);
  return date.toISOString().substring(11, 16); // Extracts "hh:mm"
}

export function formatTimeAMPM(isoString: string): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0]; // Extracts YYYY-MM-DD
};

export function formatDuration(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const hrText = hrs > 0 ? `${hrs} hr` : "";
  const minText = mins > 0 ? `${mins} min` : "";

  return [hrText, minText].filter(Boolean).join(" "); // Removes empty parts
}

export function getType(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) {
    if (value.length === 0) return "any[]";
    return `(${getType(value[0])})[]`;
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    return `{
      ${entries.map(([key, val]) => `${key}: ${getType(val)}`).join(";\n  ")}
    }`;
  }
  return typeof value;
}
