// beatsRender.ts
import type { Beats } from "./conflictBeats";
import { createHash } from "./hash";

export const BEATS_START = '<span class="sx-hidden" data-sx-marker="beats-start"></span>';
export const BEATS_END   = '<span class="sx-hidden" data-sx-marker="beats-end"></span>';

function htmlEscape(s: string) {
  return s.replace(/[&<>"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]!));
}

export function buildBeatsHTML(conflictLabel: string, beats: Beats) {
  // Flatten text for fingerprinting
  const flat = [
    conflictLabel,
    ...beats.plotA, ...beats.subPlotB, ...beats.subPlotC, ...beats.twists, ...beats.hooks
  ].join("\n");
  const fp = createHash(flat); // stable small hash

  // Hidden meta to compare later (don't show; use sx-hidden class)
  const meta =
    `<span class="sx-hidden" data-sx-beats-meta='${htmlEscape(JSON.stringify({ conflictLabel, fp }))}'></span>`;

  const section = (title: string, bullets: string[], subtitle?: string) => `
    <p><strong>${title}</strong>${subtitle ? ` — ${subtitle}` : ""}</p>
    <ul style="margin:4px 0 12px 0; padding-left:20px;">
      ${bullets.map(b => `<li>${htmlEscape(b)}</li>`).join("")}
    </ul>
  `;

  return (
    BEATS_START +
    meta +
    `<p><strong>Story Beats</strong></p>` +
    section("Plot A", beats.plotA, "The high level description of the story's key sequential events of the main story") +
    section("Sub Plot B", beats.subPlotB, "The storyline's Secondary sequential story points that focus on relationships") +
    section("Sub Plot C", beats.subPlotC, "The storyline's Tertiary sequential story points that focus on background elements") +
    section("Plot Twists", beats.twists) +
    section("Emotional Hook", beats.hooks, "A powerful narrative element designed to evoke strong feelings") +
    BEATS_END
  );
}