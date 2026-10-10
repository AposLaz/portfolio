# Blog and private notes workflow

Publish stories, guides, and practical lessons from building and understanding systems, while keeping notes that help you remember an investigation. The Blog can cover troubleshooting, homelab setups, networking explanations, and other technical subjects. Keep original conversations, client evidence, and actual operational results in private local notes.

## Organize a guide

Every public entry has one primary topic, one category, and optional concept tags:

```yaml
topic: "Kafka"
category: "Troubleshooting"
tags: [Consumer groups, Polling, Offsets]
```

The topic names the technology or subject. The category describes the guide's purpose. Tags identify concepts within it. Use consistent topic and category spelling across guides; names become lowercase URL segments. Add future Kafka guides under the same topic, choosing the appropriate category.

Readers browse the Blog at `/notes/`, the Kafka topic at `/notes/topics/kafka/`, and its troubleshooting guides at `/notes/topics/kafka/troubleshooting/`. Topic and category pages are generated from published entries. Add Homelab or Networking as a topic when publishing the first post on that subject; categories can include Concepts, Guides, or Troubleshooting. Draft-only topics do not appear on the website.

## Create a private draft

From the repository root:

```bash
npm run notes -- new "Diagnosing consumer timeouts" --topic "Kafka" --category "Troubleshooting" --tags "Consumer groups,Offsets"
```

The command prints the path to a Markdown file in `.notes/`. Topic and category are required; tags are optional. Edit the file using [the guide template](note-template.md). Existing drafts need topic and category metadata before they can be published.

Capture useful evidence privately. Prepare a public write-up that explains symptoms, essential concepts, diagnostic checks and their interpretation, possible fixes, verification, and a checklist. Label hypotheses and untested proposals. A real incident may inspire the guide without supplying identifying details.

## Keep public examples generic

Remove company and client names, internal services, topic/group names, domains, addresses, account IDs, credentials, deployment configurations, incident dates, screenshots, and actual operational measurements. Changing names alone can leave a recognizable incident timeline or architecture.

Use placeholders for commands and clearly labeled illustrative figures. Keep publication dates separate from incident dates; the metadata `date` is the guide's publication date. Link to official documentation in public references, and keep original chat URLs and report links private.

The original Kafka write-ups are retained in `.notes/retired-public-drafts/`. Their detailed findings belong in private evidence, not the public guide. The public knowledge base contains one consolidated Kafka troubleshooting guide. The authoring instructions live here rather than appearing as an article in the knowledge base.

## Find a previous solution

```bash
npm run notes -- find "poll timeout"
npm run notes -- list
```

CLI search scans top-level Markdown files in `.notes/` and `content/notes/`, ignores case, and requires all supplied words to appear somewhere in a note. Results include paths and a matching line. Use your editor's search for nested evidence archives.

Website search covers only published guides. It includes title, summary, topic, category, tags, and complete content. Category and concept filters combine with the search; clearing them keeps you within the topic or category page you opened.

## Prepare a public copy

Review the entire draft for identifying details and replace the placeholder summary. Use the filename printed by the creation command:

```bash
npm run notes -- publish YYYY-MM-DD-diagnosing-consumer-timeouts.md
```

The command validates the entry and copies it into `content/notes/` with `published: true`. It retains the private draft and refuses to overwrite existing files. The copy includes only supported metadata fields: title, summary, publication date, topic, category, tags, and publication status. Extra private frontmatter annotations stay in the draft; the body still requires your review.

Publishing here prepares a local website entry; it does not deploy. Edit a public copy directly for updates. Filenames become article URLs and must contain lowercase words separated by hyphens. Use a quoted `YYYY-MM-DD` date and a list of text tags.

Only Markdown files in `content/notes/` explicitly marked `published: true` are loaded. Keep private material in `.notes/` so it is excluded from Git as well as the website.

## Preview and verify

Run `npm run dev` and open `/notes/`. Markdown supports headings, links, lists, tables, and fenced code blocks. Level-two and level-three headings form the article contents list; headings inside code blocks do not. Raw HTML is not rendered.

For a production preview, run `npm run build`, then `npm start`. The start command serves the static `out/` folder; rebuild after content changes.

Run `npm run test:notes` and `npm run build`. After a build, run `npm run check:notes-export` to verify generated article links, topic/category pages, section anchors, and exclusion of known private-source signatures. The privacy check also scans public Markdown and generated HTML, JavaScript, metadata, and search payloads. It complements manual content review; it cannot recognize every confidential detail.

`out/` contains the static site. The existing GitHub Pages workflow deploys when changes reach `main`; keep this revision local until it has been reviewed.

## Back up private notes

`.notes/` stays on this computer and has no automatic backup or sync. Keep a backup in a location you control. Git ignore prevents accidental tracking; it does not encrypt the files or restrict access by other users of this computer.
