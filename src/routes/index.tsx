import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { APP_CONFIG } from "@/config";

const installSteps = [
  {
    title: "Download the APK",
    text: "Tap the gold button. If your browser asks to keep the file, say yes.",
  },
  {
    title: "Allow the install",
    text: "Open the file. When Android asks, let your browser install unknown apps.",
  },
  {
    title: "Open FitQuest",
    text: "Tap Install, then launch the app and create your hero.",
  },
] as const;

const features = [
  { title: "Train", text: "Every set you log pays XP, gold, and stats.", accent: "border-strength text-strength" },
  { title: "Eat", text: "Log meals, hit your macros, and gain vitality.", accent: "border-vitality text-vitality" },
  { title: "Quest", text: "Daily, weekly, and epic objectives to claim.", accent: "border-agility text-agility" },
  { title: "Loot", text: "Class gear sets and potion buffs for your next session.", accent: "border-stamina text-stamina" },
] as const;

const questions = [
  {
    question: "Why not Google Play?",
    answer: "FitQuest is an indie project and is not on the store yet. Sharing the app directly gets it to you sooner.",
  },
  {
    question: "Why does Android show a warning?",
    answer: "Android warns about any app installed outside the store. Check the checksum above if you want to be sure.",
  },
  {
    question: "Will it update itself?",
    answer: "Not yet. Come back to this page for new versions.",
  },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FitQuest: download the app" },
      { name: "description", content: "Download FitQuest for Android and turn every workout into a pixel-art RPG quest." },
      { name: "theme-color", content: "#002029" },
      { property: "og:title", content: "FitQuest: download the app" },
      { property: "og:description", content: "Download FitQuest for Android and turn every workout into a pixel-art RPG quest." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function vibrate() {
  navigator.vibrate?.(12);
}

function Crest() {
  return (
    <svg className="h-24 w-24" viewBox="0 0 16 16" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="1" y="8" width="2" height="6" fill="#71717a" />
      <rect x="3" y="9" width="1" height="4" fill="#94a3b8" />
      <rect x="4" y="10" width="8" height="2" fill="#94a3b8" />
      <rect x="12" y="9" width="1" height="4" fill="#94a3b8" />
      <rect x="13" y="8" width="2" height="6" fill="#71717a" />
      <rect x="7" y="0" width="2" height="1" fill="#f1faee" />
      <rect x="7" y="1" width="1" height="8" fill="#ffffff" />
      <rect x="8" y="1" width="1" height="8" fill="#a8dadc" />
      <rect x="5" y="9" width="6" height="1" fill="#ffc300" />
      <rect x="7" y="10" width="2" height="3" fill="#b38900" />
      <rect x="7" y="13" width="2" height="1" fill="#ffc300" />
    </svg>
  );
}

function Torch({ side }: { side: "left" | "right" }) {
  return (
    <div className={`torch torch-${side}`} aria-hidden="true">
      <span className="torch-flame" />
      <span className="torch-bracket" />
    </div>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="mb-4 flex items-center gap-3 text-[13px] leading-[1.7] text-gold">
      <span className="h-2 w-2 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
      {children}
    </h2>
  );
}

function Index() {
  const [copied, setCopied] = useState(false);
  const [isAppleMobile, setIsAppleMobile] = useState(false);
  const checksum = APP_CONFIG.sha256 || "Published with each release.";

  useEffect(() => {
    setIsAppleMobile(/iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  const copyChecksum = async () => {
    if (!APP_CONFIG.sha256) return;
    await navigator.clipboard.writeText(APP_CONFIG.sha256);
    setCopied(true);
  };

  return (
    <main className="min-h-screen overflow-x-hidden px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-[720px]">
        <section className="guild-gate relative px-5 py-12 text-center sm:px-10 sm:py-14" aria-labelledby="fitquest-title">
          <span className="rivet left-2 top-2" aria-hidden="true" />
          <span className="rivet right-2 top-2" aria-hidden="true" />
          <span className="rivet bottom-2 left-2" aria-hidden="true" />
          <span className="rivet right-2 bottom-2" aria-hidden="true" />
          <Torch side="left" />
          <Torch side="right" />

          <div className="flex flex-col items-center">
            <Crest />
            <h1 id="fitquest-title" className="pixel-title mt-5 text-gold">FitQuest</h1>
            <p className="mt-5 max-w-md text-[10px] leading-[1.9] text-ink">Every rep is a quest. Forge your hero.</p>

            <div className="mt-8 flex w-full max-w-[340px] flex-col gap-[18px]">
              {APP_CONFIG.apkUrl ? (
                <Button asChild onClick={vibrate}>
                  <a href={APP_CONFIG.apkUrl} download>Download for Android</a>
                </Button>
              ) : (
                <Button disabled>Android build coming soon</Button>
              )}
              {APP_CONFIG.webUrl ? (
                <Button asChild variant="secondary" onClick={vibrate}>
                  <a href={APP_CONFIG.webUrl}>Play in browser</a>
                </Button>
              ) : null}
            </div>

            {isAppleMobile ? (
              <p className="mt-6 max-w-md border-2 border-gold px-4 py-3 text-left text-[9px] text-ink">
                The APK is Android only.
                {APP_CONFIG.webUrl ? " Open the web version and choose Add to Home Screen." : ""}
              </p>
            ) : null}

            <p className="mt-7 text-[9px] text-frost">Version {APP_CONFIG.version} ({APP_CONFIG.size})</p>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="install-title">
          <SectionHeading>Install in three steps</SectionHeading>
          <div id="install-title" className="grid gap-3">
            {installSteps.map((step, index) => (
              <article key={step.title} className="grid grid-cols-[32px_1fr] gap-4 border-2 border-line bg-panel p-[14px]">
                <span className="number-badge flex h-8 w-8 items-center justify-center bg-gold text-[11px] text-panel">{index + 1}</span>
                <div>
                  <h3 className="text-[11px] leading-[1.6] text-ink">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="features-title">
          <SectionHeading>What waits inside</SectionHeading>
          <div id="features-title" className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
            {features.map((feature) => (
              <article key={feature.title} className={`border-2 border-line border-t-[6px] bg-panel p-[14px] ${feature.accent}`}>
                <h3 className="text-[11px] leading-[1.6]">{feature.title}</h3>
                <p className="mt-3 text-muted-foreground">{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="checksum-title">
          <SectionHeading>Check your download</SectionHeading>
          <div id="checksum-title">
            <p className="text-ink">Compare this SHA-256 checksum with your file to confirm it is the one we published.</p>
            <div className="mt-4 overflow-x-auto whitespace-nowrap border-2 border-line bg-deep px-4 py-3 text-frost" tabIndex={0} aria-label="SHA-256 checksum">
              {checksum}
            </div>
            <Button className="mt-4 w-full sm:w-auto" disabled={!APP_CONFIG.sha256} onClick={copyChecksum}>
              {copied ? "Copied" : "Copy checksum"}
            </Button>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="questions-title">
          <SectionHeading>Questions</SectionHeading>
          <div id="questions-title" className="divide-y-2 divide-line border-y-2 border-line">
            {questions.map((item) => (
              <details key={item.question} className="group bg-panel">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-[14px] py-3 text-gold focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-frost [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <span className="text-frost group-open:hidden" aria-hidden="true">+</span>
                  <span className="hidden text-frost group-open:inline" aria-hidden="true">−</span>
                </summary>
                <p className="px-[14px] pb-4 text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="mt-14 border-t-2 border-dashed border-line py-7 text-center text-[9px] text-frost">
          FitQuest is an indie project built by one adventurer.
        </footer>
      </div>
    </main>
  );
}
