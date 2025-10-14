export function formatDate(dateString, mode = "display") {
  if (!dateString) return "";

  // ✅ Case 1: plain "YYYY-MM-DD" (no time part) → parse manually
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split("-");
    if (mode === "form") {
      return `${year}-${month}-${day}`; // YYYY-MM-DD
    }
    return `${day}/${month}/${year}`; // DD/MM/YYYY
  }

  // ✅ Case 2: full ISO date → use UTC to avoid timezone shift
  const date = new Date(dateString);

  if (mode === "form") {
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  }

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`; // DD/MM/YYYY
}
