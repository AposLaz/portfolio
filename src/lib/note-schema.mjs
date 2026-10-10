export function labelSlug(value) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** @param {Record<string, unknown>} data @param {string} content */
export function validateNoteMetadata(data, content) {
  for (const field of ["title", "summary", "topic", "category"]) {
    if (typeof data[field] !== "string" || !data[field].trim() || data[field].includes("{{")) {
      throw new Error(`Fill in ${field}. See docs/note-template.md.`);
    }
  }
  if (!labelSlug(String(data.topic)) || !labelSlug(String(data.category))) {
    throw new Error("Topic and category must include Latin letters or numbers for their URLs.");
  }
  if (
    typeof data.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
    Number.isNaN(Date.parse(data.date)) || new Date(data.date).toISOString().slice(0, 10) !== data.date
  ) throw new Error("Use a quoted YYYY-MM-DD publication date.");
  if (!Array.isArray(data.tags) || !data.tags.every((tag) => typeof tag === "string" && tag.trim())) {
    throw new Error("Tags must be a list of nonempty text values.");
  }
  if (!content.trim() || data.summary === "Add one sentence describing the symptoms and the solution.") {
    throw new Error("Replace the placeholder summary and write the guide before publishing.");
  }
  return {
    title: String(data.title).trim(), summary: String(data.summary).trim(),
    topic: String(data.topic).trim(), category: String(data.category).trim(),
    date: data.date, tags: [...new Set(data.tags.map((tag) => tag.trim()))],
  };
}
