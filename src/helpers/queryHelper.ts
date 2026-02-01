import { ParsedQs } from "qs";

// Convert query param to string safely
export const getQueryString = (
  value: string | string[] | ParsedQs | ParsedQs[] | undefined
): string | undefined => {
  if (!value) return undefined;

  // If array, take first element
  const v = Array.isArray(value) ? value[0] : value;

  // Only return if it's string
  return typeof v === "string" ? v : undefined;
};
