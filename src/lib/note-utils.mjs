import { labelSlug } from "./note-schema.mjs";

export function filterNotes(notes, { query = "", topic = "", category = "", tag = "" } = {}) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return notes.filter((note) => {
    const text = [note.title, note.summary, note.topic, note.category, ...note.tags, note.content].join(" ").toLowerCase();
    return (!topic || note.topic === topic) && (!category || note.category === category)
      && (!tag || note.tags.includes(tag)) && terms.every((term) => text.includes(term));
  });
}

/**
 * @param {{ topic: string, category: string }[]} notes
 * @returns {{label: string, slug: string, count: number, categories: {label: string, slug: string, count: number}[]}[]}
 */
export function getNoteTopics(notes) {
  const topics = new Map();
  for (const note of notes) {
    const slug = labelSlug(note.topic);
    const existing = topics.get(slug);
    if (existing && existing.label !== note.topic) throw new Error(`Use one consistent topic name for the URL "${slug}".`);
    if (!existing) topics.set(slug, { label: note.topic, slug, count: 0, categories: new Map() });
    const topic = topics.get(slug);
    topic.count++;
    const categorySlug = labelSlug(note.category);
    const category = topic.categories.get(categorySlug);
    if (category && category.label !== note.category) throw new Error(`Use one consistent category name for the URL "${categorySlug}".`);
    if (!category) topic.categories.set(categorySlug, { label: note.category, slug: categorySlug, count: 0 });
    topic.categories.get(categorySlug).count++;
  }
  return [...topics.values()].map((topic) => ({ ...topic, categories: [...topic.categories.values()].sort((a, b) => a.label.localeCompare(b.label)) }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

function textOf(node) {
  if (node.type === "image") return node.alt ?? "";
  if (node.children) return node.children.map(textOf).join("");
  return node.value ?? "";
}

// The contents list and rendered headings use the same Markdown AST and ID rules.
export function addNoteHeadingIds(tree) {
  const used = new Set();
  const headings = [];
  function walk(node) {
    if (node.type === "heading") {
      const text = textOf(node);
      const base = `section-${labelSlug(text) || "heading"}`;
      let id = base;
      for (let suffix = 2; used.has(id); suffix++) id = `${base}-${suffix}`;
      used.add(id);
      node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } };
      if (node.depth === 2 || node.depth === 3) headings.push({ id, text, depth: node.depth });
    }
    node.children?.forEach(walk);
  }
  walk(tree);
  return headings;
}

export function remarkNoteHeadings() {
  return (tree) => { addNoteHeadingIds(tree); };
}
