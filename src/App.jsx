import React from "react";
import {
  Atom,
  Command,
  StarCheck,
  ArrowUpRight,
  Code2,
} from "lucide-react";

const GitHubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10Z" />
  </svg>
);

const LinkedInIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM6.814 20.452H3.86V9h2.954v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
  </svg>
);

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
  </svg>
);
import photo1 from "./assets/photo1.jpeg";


const App = () => {
  const rollable = [
    "Dashboard",
    "Backend Development",
    "Frontend Development",
    "UI/UX Design",
    "System Design",
  ];

  const skills = [
    { name: "Prototype", highlight: false },
    { name: "Dashboard", highlight: true },
    { name: "Technology", highlight: true, icon: true },
    { name: "UI/UX Design", highlight: false },
    { name: "Backend Development", highlight: false },
    { name: "System Design", highlight: true },
  ];

  const socials = [
    {
      name: "GitHub",
      icon: GitHubIcon,
      href: "https://github.com/",
    },
    {
      name: "LinkedIn",
      icon: LinkedInIcon,
      href: "https://linkedin.com/",
    },
    {
      name: "Instagram",
      icon: InstagramIcon,
      href: "https://instagram.com/",
    },
  ];

  return (
    <main className="relative flex  flex-col   text-white selection:text-black">
      {/* Background decorations */}
    

      {/* Hero heading */}
      <header className="relative mt-25 z-10 flex shrink-0 flex-col items-center px-4 pb-4 pt-10 text-center sm:pt-14 md:pt-1">
       

        <h1 className="font-sans text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl md:text-6xl lg:text-7xl">
          I'm{" "}
          <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Dhruvil Shah
          </span>
        </h1>

        <h2 className="mt-3 text-base font-medium text-gray-400 sm:text-lg md:text-xl">
          Software Developer based in India
        </h2>

      </header>

    <a
      href="#contact"
      aria-label="Hire me"
      className="fixed bottom-5 left-4 z-40 sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-10"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-black/70 bg-[#f7f6ec]/95 shadow-lg backdrop-blur transition-colors duration-300 hover:border-yellow-400 sm:h-20 sm:w-20">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white transition-colors duration-300 hover:bg-yellow-400 hover:text-black sm:h-16 sm:w-16 sm:text-sm">
          Hire me
        </div>
      </div>
    </a>

            {/* Main content */}
      <section className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-8 px-5 py-6 sm:px-8 md:grid-cols-[1fr_1.1fr_1fr] md:gap-8 lg:gap-12 lg:px-12">
        {/* Left section */}
        <aside className="order-2 flex min-w-0 flex-col items-center text-center md:order-1 md:items-start md:text-left">
          <div className="mb-3 flex items-center gap-2 text-yellow-400">
            <span className="h-px w-7 bg-yellow-400" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase">
              Connect with me
            </span>
          </div>

          <h3 className="text-2xl font-bold sm:text-3xl">
            <span className="text-gray-400">Follow</span> <span className="text-gray-500">On</span>
          </h3>

          <p className="mt-3 max-w-xs text-sm leading-6 text-gray-500">
            Let's connect, share ideas, and create something meaningful
            together.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
            {socials.map(({ name, icon: Icon, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                title={name}
                className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/50 hover:bg-yellow-400 hover:text-black"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          <div className="mt-7 hidden w-full max-w-xs rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:block">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                <Code2 size={21} />
              </div>
              <div>
                <p className="text-sm text-black font-semibold">Code. Create. Improve.</p>
                <p className="mt-1 text-xs text-black">
                  Turning ideas into products.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Center profile image */}
        <div className="order-1 flex min-w-0 items-center justify-center md:order-2">
          <div className="relative w-full max-w-[280px] sm:max-w-[310px] md:max-w-[340px]">
            {/* Image glow */}
            <div className="absolute inset-5 rounded-[2rem] bg-yellow-400/20 blur-3xl" />

            {/* Image frame */}
            <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-b from-red-400/30 via-white/5 to-transparent p-2 shadow-2xl shadow-black/40">
              <img
                className="aspect-[4/5] w-full rounded-[1.6rem] bg-[#1a1a1a] object-cover object-center"
                src={photo1}
                alt="Portrait of Dhruvil Shah"
                loading="eager"
              />
            </div>

            {/* Developer badge */}
            <div className="absolute -left-3 top-[35%] -rotate-6 animate-pulse rounded-full border border-yellow-300/30 bg-gradient-to-r from-yellow-300 to-amber-500 px-4 py-2 text-xs font-bold text-black shadow-lg shadow-yellow-500/10 sm:-left-8 sm:text-sm">
              Developer
            </div>

            {/* Designer badge */}
            <div className="absolute -right-3 bottom-[23%] rotate-6 animate-bounce rounded-full border border-yellow-300/30 bg-gradient-to-r from-yellow-300 to-amber-500 px-4 py-2 text-xs font-bold text-black shadow-lg shadow-yellow-500/10 sm:-right-8 sm:text-sm">
              Designer
            </div>

            {/* Experience card */}
            <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-2xl border border-white/10 bg-[#171717]/95 px-5 py-3 shadow-xl backdrop-blur-xl">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-400 text-black">
                <Atom size={21} />
              </div>
              <div>
                <p className="text-sm font-bold">Creative Mindset</p>
                <p className="mt-0.5 text-xs text-gray-500">
                  Design meets technology
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right section */}
        <aside className="order-3 flex min-w-0 flex-col items-center text-center md:items-start md:text-left">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-400/20 bg-yellow-400/10 text-yellow-400">
            <Command size={25} />
          </div>

          <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-yellow-400 uppercase">
            What I do
          </p>

          <h3 className="max-w-sm text-xl font-bold leading-relaxed text-gray-400 sm:text-2xl">
            Highly skilled software developer passionate about{" "}
            <span className="text-yellow-400">
              creating innovative solutions.
            </span>
          </h3>

          {/* Skill badges */}
          <div className="mt-6 grid w-full max-w-sm grid-cols-2 gap-3">
            {skills.map(({ name, highlight, icon }) => (
              <span
                key={name}
                className={`flex min-w-0 items-center justify-center gap-2 rounded-full border px-3 py-3 text-center text-xs font-semibold transition-all duration-300 hover:-translate-y-1 sm:text-sm ${
                  highlight
                    ? "border-yellow-400 bg-yellow-400 text-black hover:bg-yellow-300"
                    : "border-white/10 bg-black text-gray-200 hover:border-yellow-400/40"
                }`}
              >
                {icon && <Atom size={16} className="shrink-0" />}
                <span>{name}</span>
              </span>
            ))}
          </div>

          <a
            href="mailto:hello@example.com"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition-all hover:bg-yellow-400"
          >
            Let's work together
            <ArrowUpRight size={17} />
          </a>
        </aside>
      </section>

      {/* Scrolling skills banner */}
      <footer className="relative z-10 mt-auto shrink-0 overflow-hidden border-y border-yellow-500/20 bg-[#15120e] py-4">
        <div className="marquee-track flex w-max items-center">
          {[...rollable, ...rollable].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="mx-5 flex shrink-0 items-center gap-4 text-sm font-semibold text-gray-300 sm:mx-8 sm:text-base"
            >
              {item}
              <StarCheck className="h-5 w-5 shrink-0 text-yellow-400" />
            </span>
          ))}
        </div>
      </footer>

      {/* Marquee animation */}
      <style>{`
        .marquee-track {
          animation: marquee 28s linear infinite;
          will-change: transform;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
};

export default App;