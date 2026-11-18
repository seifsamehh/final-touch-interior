import { notFound } from "next/navigation";

// Any unknown address under a language shows that language's "not here" page.
export default function Unknown() {
  notFound();
}
