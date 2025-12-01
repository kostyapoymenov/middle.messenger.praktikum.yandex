export const normalizeTime = (dateStr?: string): string => {
  if (!dateStr) {
    return '';
  }
  const date = new Date(dateStr);
  return date.toLocaleTimeString();
};
