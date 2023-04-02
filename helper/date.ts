import { format, formatDistanceToNow, isYesterday } from "date-fns";

export function parseDate(date: string) {
  return new Date(date);
}

export function formatDateTime(date: Date | string) {
  if (typeof date === "string") {
    date = parseDate(date);
  }
  return format(date, "dd MMM yyyy, HH:mm");
}

export function formatDistance(date: Date | string) {
  if (typeof date === "string") {
    date = parseDate(date);
  }
  return formatDistanceToNow(date, {
    addSuffix: true,
  });
}

export function formatWhatsAppChatDate(date?: Date): string {
  console.log("🚀 ~ file: date.ts:24 ~ formatWhatsAppChatDate ~ date:", date);
  if (!date) {
    return "";
  }
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (isYesterday(date)) {
    return "yesterday";
  } else if (diffInDays === 0) {
    return format(date, "HH:mm");
  } else if (diffInDays < 7) {
    return format(date, "iiii");
  } else {
    return format(date, "MM/dd/yyyy");
  }
}
