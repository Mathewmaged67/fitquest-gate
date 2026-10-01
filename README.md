# FitQuest Download Gate

Build a single-page download website for "FitQuest", an indie fitness RPG mobile app. Static site only: React + Tailwind, no backend, auth, database, forms, or analytics. Visitors are gym-goers who like pixel-art RPG games; the page lets Android users download an APK and explains how to install it.

VISUAL IDENTITY
Maximalist pixel-art dark-fantasy "guild gate", not clean minimal.
Color tokens (CSS variables, mapped into the Tailwind theme):
- night #002029 (page background), panel #040f16, deep #000b0f
- gold #ffc300, ridge #b38900, frost #a8dadc, ink #f1faee
- line rgba(241,250,238,0.22)
- stat accents: strength #ff6d00, vitality #4ade80, agility #ffd20a, stamina #9381ff
Background: dotted star grid (radial-gradient rgba(168,218,220,0.16) 1px, 28px grid) over a diagonal gradient #002029, #01181f at 45%, #000b0f.
Typography: "Press Start 2P" (Google Fonts) for everything, fallback ui-monospace. Body 10px/1.9, h1 clamp(22px, 8vw, 40px) in gold with hard text-shadow (3px 3px 0 #b38900, 6px 6px 0 #000b0f), h2 13px gold, small text 9px.
Shape language: border-radius 0 everywhere (override shadcn's radius to 0), hard pixel shadows only, no blur shadows, no glassmorphism, no gradients on buttons. Sentence case for all text. No emojis, no ALL CAPS labels, no arrows in button text.

LAYOUT (one centered column, max-width 720px, 16px side padding)
1. Hero "guild gate" panel: panel background, 4px gold border, an outer 4px #000b0f ring plus a 10px hard drop shadow, four 8px frost squares at 50% opacity in the corners as rivets. Two torches at the top corners (8x12px gold flame with a 16px gold glow, on a 6x14px slate #4a5568 bracket). Centered inside: the crest (SVG below, 96px), h1 "FitQuest", tagline "Every rep is a quest. Forge your hero.", two stacked buttons (max-width 340px, 18px gap), primary "Download for Android" and secondary "Play in browser", then the line "Version {version} ({size})".
2. h2 "Install in three steps": three cards (panel background, 2px line border, 14px padding), each with a 32px gold square numeral badge with a 3px ridge shadow:
   - "Download the APK": "Tap the gold button. If your browser asks to keep the file, say yes."
   - "Allow the install": "Open the file. When Android asks, let your browser install unknown apps."
   - "Open FitQuest": "Tap Install, then launch the app and create your hero."
3. h2 "What waits inside": four cards in an auto-fit grid (min 150px), each with a 6px top border and title in a stat color:
   - Train (strength): "Every set you log pays XP, gold, and stats."
   - Eat (vitality): "Log meals, hit your macros, and gain vitality."
   - Quest (agility): "Daily, weekly, and epic objectives to claim."
   - Loot (stamina): "Class gear sets and potion buffs for your next session."
4. h2 "Check your download": the sentence "Compare this SHA-256 checksum with your file to confirm it is the one we published.", a horizontally scrollable no-wrap checksum box (deep background, 2px line border), and a "Copy checksum" button that copies it and changes to "Copied".
5. h2 "Questions": three accordion items restyled to match (48px summaries in gold):
   - "Why not Google Play?": "FitQuest is an indie project and is not on the store yet. Sharing the app directly gets it to you sooner."
   - "Why does Android show a warning?": "Android warns about any app installed outside the store. Check the checksum above if you want to be sure."
   - "Will it update itself?": "Not yet. Come back to this page for new versions."
6. Footer: dashed top border, 9px frost text: "FitQuest is an indie project built by one adventurer."
Every h2 has an 8px gold diamond (rotated square) before it.

BUTTON STATES
- Default: gold fill, panel-colored 11px text, 48px min height, hard 4px #b38900 ridge shadow underneath.
- Pressed: translateY(4px) with the ridge shadow removed, 60ms. Also call navigator.vibrate?.(12) when supported.
- Secondary: transparent, frost text, 2px frost inset border, ridge shadow in frost at 35%.
- Disabled: 50% opacity, no pointer events.
- Keyboard focus: 3px frost outline, 3px offset, on every interactive element.

CONFIG
Keep every editable value in src/config.ts: export const APP_CONFIG = { apkUrl: "", webUrl: "", version: "0.1.0", size: "", sha256: "" } with a short comment.
- If apkUrl is empty: primary button disabled, label "Android build coming soon", checksum box reads "Published with each release."
- If webUrl is empty: hide the secondary button.
- On iPhone or iPad: show a gold-bordered note under the buttons, "The APK is Android only." and, only when webUrl is set, add " Open the web version and choose Add to Home Screen."

MOTION
Only the torches move: flicker 1.3s steps(2) infinite (at 50%: opacity 0.75, scaleY 0.85, origin bottom), right torch delayed 0.65s. Disable it and the button transition under prefers-reduced-motion. No scroll animations.

ACCESSIBILITY
Semantic headings, 48px minimum touch targets, crest is aria-hidden, AA contrast, no horizontal page scroll down to 320px width (only the checksum box scrolls).

CREST (inline SVG)
<svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true"><rect x="1" y="8" width="2" height="6" fill="#71717a"/><rect x="3" y="9" width="1" height="4" fill="#94a3b8"/><rect x="4" y="10" width="8" height="2" fill="#94a3b8"/><rect x="12" y="9" width="1" height="4" fill="#94a3b8"/><rect x="13" y="8" width="2" height="6" fill="#71717a"/><rect x="7" y="0" width="2" height="1" fill="#f1faee"/><rect x="7" y="1" width="1" height="8" fill="#ffffff"/><rect x="8" y="1" width="1" height="8" fill="#a8dadc"/><rect x="5" y="9" width="6" height="1" fill="#ffc300"/><rect x="7" y="10" width="2" height="3" fill="#b38900"/><rect x="7" y="13" width="2" height="1" fill="#ffc300"/></svg>

Set the page title to "FitQuest: download the app" and theme-color to #002029. Don't add any sections or features beyond these.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/89322399-51ec-481f-bf75-8032d02f85f6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
