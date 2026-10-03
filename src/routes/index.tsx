import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { APP_CONFIG } from "@/config";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

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
  {
    title: "Train",
    text: "Log sets, track PRs, and earn XP and gold for every session you finish.",
    accent: "border-strength text-strength",
    icon: "sword",
  },
  {
    title: "Eat",
    text: "Hit your macros, log meals, and watch your Vitality climb day by day.",
    accent: "border-vitality text-vitality",
    icon: "apple",
  },
  {
    title: "Quest",
    text: "Daily, weekly, and epic objectives — some paths are locked to your class.",
    accent: "border-agility text-agility",
    icon: "scroll_text",
  },
  {
    title: "Loot",
    text: "Equip gear, brew potions, and build a loadout that boosts your stats.",
    accent: "border-stamina text-stamina",
    icon: "backpack",
  },
] as const;

const classCards = [
  {
    name: "Warrior",
    tagline: "Heavy iron. Raw strength.",
    accent: "border-strength text-strength",
    stat: "STR",
  },
  {
    name: "Mage",
    tagline: "Flexibility and focus.",
    accent: "border-stamina text-stamina",
    stat: "STA",
  },
  {
    name: "Ranger",
    tagline: "Distance and speed.",
    accent: "border-agility text-agility",
    stat: "AGI",
  },
  {
    name: "Paladin",
    tagline: "Balance in all things.",
    accent: "border-vitality text-vitality",
    stat: "VIT",
  },
] as const;

const statGems = [
  { label: "STR", color: "bg-strength" },
  { label: "STA", color: "bg-stamina" },
  { label: "VIT", color: "bg-vitality" },
  { label: "AGI", color: "bg-agility" },
] as const;

const numbers = [
  { value: "41", label: "Quests" },
  { value: "42", label: "Gear" },
  { value: "7", label: "Potions" },
  { value: "46", label: "Exercises" },
  { value: "6", label: "Themes" },
] as const;

const questions = [
  {
    question: "Why not Google Play?",
    answer:
      "FitQuest is an indie project and is not on the store yet. Sharing the app directly gets it to you sooner.",
  },
  {
    question: "Why does Android show a warning?",
    answer:
      "Android warns about any app installed outside the store. Check the checksum above if you want to be sure.",
  },
  {
    question: "Will it update itself?",
    answer: "Not yet. Come back to this page for new versions.",
  },
  {
    question: "Is my progress saved?",
    answer:
      "Yes. Your character, workouts, nutrition, quests, and gear sync to the cloud automatically when you sign in.",
  },
  {
    question: "Can I change how it looks?",
    answer:
      "The app ships with multiple colour themes and lets you build your own custom palette from scratch.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Route                                                              */
/* ------------------------------------------------------------------ */

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FitQuest — Turn every workout into a quest" },
      {
        name: "description",
        content:
          "Download FitQuest for Android — the pixel-art fitness RPG where every rep earns XP, every meal fuels your stats, and every habit forges a hero.",
      },
      { name: "theme-color", content: "#002029" },
      { property: "og:title", content: "FitQuest — Turn every workout into a quest" },
      {
        property: "og:description",
        content:
          "Download FitQuest for Android — the pixel-art fitness RPG where every rep earns XP, every meal fuels your stats, and every habit forges a hero.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

/* ------------------------------------------------------------------ */
/*  Pixel-art SVG components                                           */
/* ------------------------------------------------------------------ */

function vibrate() {
  navigator.vibrate?.(12);
}

function PixelGlyph({ name, className = "h-8 w-8" }: { name: string; className?: string }) {
  return (
    <span
      className={`pixel-glyph ${className}`}
      style={{
        WebkitMaskImage: `url(/glyphs/${name}.png)`,
        maskImage: `url(/glyphs/${name}.png)`,
      }}
      aria-hidden="true"
    />
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

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-2 py-1" aria-hidden="true">
      <span className="h-[2px] w-8 bg-gold/30" />
      <span className="h-2 w-2 rotate-45 bg-gold/50" />
      <span className="h-[2px] w-8 bg-gold/30" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

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
        {/* ── Hero / Guild Gate ── */}
        <section
          className="guild-gate relative px-5 py-12 text-center sm:px-10 sm:py-14"
          aria-labelledby="fitquest-title"
        >
          <span className="rivet left-2 top-2" aria-hidden="true" />
          <span className="rivet right-2 top-2" aria-hidden="true" />
          <span className="rivet bottom-2 left-2" aria-hidden="true" />
          <span className="rivet right-2 bottom-2" aria-hidden="true" />
          <Torch side="left" />
          <Torch side="right" />

          <div className="flex flex-col items-center">
            <img
              src="/app-icon.png"
              alt="FitQuest"
              className="h-24 w-24 rounded-2xl border-2 border-gold shadow-[0_0_24px_rgba(255,195,0,0.35)] object-contain"
            />
            <h1 id="fitquest-title" className="pixel-title mt-5 text-gold">
              FitQuest
            </h1>
            <p className="mt-5 max-w-md text-[10px] leading-[1.9] text-ink">
              Every rep is a quest. Forge your hero.
            </p>
            <p className="mt-3 max-w-sm text-[9px] leading-[1.8] text-frost">
              The pixel-art fitness RPG where your workouts, meals, and habits
              build a hero only you can create.
            </p>

            {/* Stat gems */}
            <div className="mt-6 flex items-center gap-4" aria-label="Core stats">
              {statGems.map((gem) => (
                <div key={gem.label} className="flex flex-col items-center gap-[6px]">
                  <span className={`stat-gem ${gem.color}`} aria-hidden="true" />
                  <span className="text-[8px] text-frost">{gem.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex w-full max-w-[340px] flex-col gap-[18px]">
              {APP_CONFIG.apkUrl ? (
                <Button asChild variant="fitquest" onClick={vibrate}>
                  <a href={APP_CONFIG.apkUrl} download>
                    Download for Android
                  </a>
                </Button>
              ) : (
                <Button className="whitespace-normal" variant="fitquest" disabled>
                  Android build coming soon
                </Button>
              )}
              {APP_CONFIG.webUrl ? (
                <Button asChild variant="fitquest-secondary" onClick={vibrate}>
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

            <p className="mt-7 text-[9px] text-frost">
              Version {APP_CONFIG.version} ({APP_CONFIG.size})
            </p>
          </div>
        </section>

        {/* ── Tagline Banner ── */}
        <section className="mt-14 text-center">
          <p className="text-[11px] leading-[2] text-ink">
            Your gym. Your nutrition. Your quest line.
          </p>
          <p className="mt-1 text-[9px] text-frost">
            One app that turns all of it into an RPG you actually want to grind.
          </p>
          <div className="mt-4">
            <GoldDivider />
          </div>
        </section>

        {/* ── Features ── */}
        <section className="mt-10" aria-labelledby="features-title">
          <SectionHeading>What waits inside</SectionHeading>
          <div
            id="features-title"
            className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3"
          >
            {features.map((feature) => (
              <article
                key={feature.title}
                className={`border-2 border-line border-t-[6px] bg-panel p-[14px] ${feature.accent}`}
              >
                <div className="mb-2 opacity-80">
                  <PixelGlyph name={feature.icon} />
                </div>
                <h3 className="text-[11px] leading-[1.6]">{feature.title}</h3>
                <p className="mt-3 text-muted-foreground">{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Choose Your Class ── */}
        <section className="mt-12" aria-labelledby="class-title">
          <SectionHeading>Choose your path</SectionHeading>
          <p className="mb-4 text-muted-foreground">
            Pick a class during onboarding. It shapes your quests, your gear, and your journey.
          </p>
          <div id="class-title" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {classCards.map((cls) => (
              <div
                key={cls.name}
                className={`border-2 border-line border-l-[5px] bg-panel p-3 ${cls.accent}`}
              >
                <span className="text-[11px]">{cls.name}</span>
                <p className="mt-2 text-[8px] leading-[1.8] text-muted-foreground">
                  {cls.tagline}
                </p>
                <span className="mt-2 inline-block text-[8px] opacity-50">{cls.stat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Numbers Strip ── */}
        <section className="mt-12" aria-labelledby="numbers-title">
          <SectionHeading>By the numbers</SectionHeading>
          <div id="numbers-title" className="flex flex-wrap justify-center gap-3">
            {numbers.map((item) => (
              <div
                key={item.label}
                className="flex min-w-[100px] flex-1 flex-col items-center border-2 border-line bg-panel py-4"
              >
                <span className="text-[18px] leading-none text-gold">{item.value}</span>
                <span className="mt-2 text-[8px] text-frost">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Progression Teaser ── */}
        <section className="mt-12 text-center">
          <div className="border-2 border-line bg-panel px-5 py-8 sm:px-10">
            <p className="text-[11px] text-gold">Level 1 is just the beginning</p>
            <div className="mx-auto mt-4 max-w-xs">
              <div className="h-3 w-full border-2 border-line bg-deep">
                <div className="xp-bar-fill h-full bg-gold" />
              </div>
            </div>
            <p className="mt-4 text-[9px] leading-[1.8] text-frost">
              Every workout. Every meal. Every quest claimed. It all stacks.
            </p>
            <p className="mt-1 text-[9px] text-muted-foreground">
              How far can you push it?
            </p>
          </div>
        </section>

        {/* ── Install Steps ── */}
        <section className="mt-14" aria-labelledby="install-title">
          <SectionHeading>Install in three steps</SectionHeading>
          <div id="install-title" className="grid gap-3">
            {installSteps.map((step, index) => (
              <article
                key={step.title}
                className="grid grid-cols-[32px_1fr] gap-4 border-2 border-line bg-panel p-[14px]"
              >
                <span className="number-badge flex h-8 w-8 items-center justify-center bg-gold text-[11px] text-panel">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-[11px] leading-[1.6] text-ink">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Checksum ── */}
        <section className="mt-12" aria-labelledby="checksum-title">
          <SectionHeading>Check your download</SectionHeading>
          <div id="checksum-title">
            <p className="text-ink">
              Compare this SHA-256 checksum with your file to confirm it is the one we published.
            </p>
            <div
              className="mt-4 overflow-x-auto whitespace-nowrap border-2 border-line bg-deep px-4 py-3 text-frost"
              tabIndex={0}
              aria-label="SHA-256 checksum"
            >
              {checksum}
            </div>
            <Button
              className="mt-4 w-full sm:w-auto"
              variant="fitquest"
              disabled={!APP_CONFIG.sha256}
              onClick={copyChecksum}
            >
              {copied ? "Copied" : "Copy checksum"}
            </Button>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mt-12" aria-labelledby="questions-title">
          <SectionHeading>Questions</SectionHeading>
          <div id="questions-title" className="divide-y-2 divide-line border-y-2 border-line">
            {questions.map((item) => (
              <details key={item.question} className="group bg-panel">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-[14px] py-3 text-gold focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-frost [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <span className="text-frost group-open:hidden" aria-hidden="true">
                    +
                  </span>
                  <span className="hidden text-frost group-open:inline" aria-hidden="true">
                    −
                  </span>
                </summary>
                <p className="px-[14px] pb-4 text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="mt-14 text-center">
          <div className="border-2 border-gold bg-panel px-5 py-10 sm:px-10">
            <p className="text-[13px] leading-[1.7] text-gold">Ready to begin?</p>
            <p className="mt-3 text-[9px] text-frost">
              Your quest board is waiting. Download FitQuest and create your hero.
            </p>
            <div className="mx-auto mt-6 max-w-[300px]">
              {APP_CONFIG.apkUrl ? (
                <Button asChild variant="fitquest" className="w-full" onClick={vibrate}>
                  <a href={APP_CONFIG.apkUrl} download>
                    Download for Android
                  </a>
                </Button>
              ) : (
                <Button className="w-full whitespace-normal" variant="fitquest" disabled>
                  Android build coming soon
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="mt-14 border-t-2 border-dashed border-line py-7 text-center text-[9px] text-frost">
          <p>FitQuest is an indie project built by one adventurer.</p>
          <p className="mt-2 text-[8px] text-frost/50">
            React Native · Expo · TypeScript · Neon Postgres
          </p>
        </footer>
      </div>
    </main>
  );
}
