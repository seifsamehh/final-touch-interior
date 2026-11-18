import { contact, copy } from "@/content/copy";
import { services } from "@/content/services";
import { SITE } from "@/lib/site";

// A plain-text summary of the site for AI assistants (llmstxt.org), written from the same content the pages use.
export const dynamic = "force-static";

export function GET() {
  const en = copy.en;
  const body = `# Final Touch

> ${en.meta.description}

Final Touch (Arabic: فينال تاتش) is an interior design and finishing company in Egypt, working since 1996 across Egypt and the Arab countries. ${en.about.body}

The website is in English (${SITE}/en) and Arabic (${SITE}/ar). Both languages carry the same pages.

## Fields of work

${services.map((s) => `- [${s.name.en}](${SITE}/en/work/${s.slug}): ${s.line.en}. ${s.intro.en}`).join("\n")}

## How a project runs

${en.process.steps.map((s, i) => `${i + 1}. ${s.name}. ${s.text} (${s.inc.join(", ")})`).join("\n")}

## Disciplines

${en.about.disciplines.map((d) => `- ${d}`).join("\n")}

## Contact

There is no contact form and no published phone number. To start a project, write to the company.

- Mail: ${contact.mail}
- Instagram: ${contact.instagram.url}
- Facebook: ${contact.facebook.url}

## Arabic pages

${services.map((s) => `- [${s.name.ar}](${SITE}/ar/work/${s.slug}): ${s.line.ar}`).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
