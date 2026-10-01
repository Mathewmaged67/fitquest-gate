# FitQuest download page

## Goal
Build the supplied single-page, static FitQuest download site exactly as specified, with no extra sections or services.

## Implementation
1. Add `src/config.ts` as the single place for APK URL, browser URL, version, file size, and SHA-256 checksum.
2. Replace the placeholder home page with the guild-gate hero, install steps, feature cards, checksum copier, questions, and footer.
3. Apply the specified pixel-art palette, typography, hard shadows, focus states, torch motion, compact mobile layout, and reduced-motion handling.
4. Add Android-download fallback states, iPhone/iPad guidance, copy feedback, and press vibration.
5. Set the page metadata and theme color, then verify the page at desktop and 320px widths.

## Technical details
- React and Tailwind only; no backend, forms, tracking, or persistence.
- Google font loaded in the document head.
- Semantic HTML details/summary elements provide the accessible accordion behavior.
- All release-dependent values and conditional states read from `APP_CONFIG`.
