import React from "react";
import {
  Atom,
  Command,
  StarCheck,
 
  ArrowUpRight,
  Code2,
  UserRoundPen,
} from "lucide-react";

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
      icon: UserRoundPen,
      href: "https://github.com/",
    },
    {
      name: "LinkedIn",
      icon: UserRoundPen,
      href: "https://linkedin.com/",
    },
    {
      name: "Instagram",
      icon: UserRoundPen,
      href: "https://instagram.com/",
    },
  ];

  return (
    <main className="relative flex  flex-col   text-white selection:text-black">
      {/* Background decorations */}
    

      {/* Hero heading */}
      <header className="relative mt-25 z-10 flex shrink-0 flex-col items-center px-4 pb-4 pt-10 text-center sm:pt-14 md:pt-1">
       

        <h1 className="font-sans text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          I'm{" "}
          <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Dhruvil Shah
          </span>
        </h1>

        <h2 className="mt-3 text-base font-medium text-gray-400 sm:text-lg md:text-xl">
          Software Developer based in India
        </h2>

      </header>

    <div className="fixed bottom-120 right-30 rotate-30 z-50">
  {/* Outer Circle */}
  <div className="w-24 h-24 rounded-full border-2 border-black flex items-center justify-center hover:border-yellow-400 transition-colors duration-300">
    {/* Inner Circle */}
    <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white text-sm font-semibold hover:bg-yellow-400 hover:text-black transition-colors duration-300 cursor-pointer">
      Hire me
    </div>
  </div>
</div>

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
                src="https://thumbs.dreamstime.com/b/portrait-handsome-smiling-young-man-folded-arms-smiling-joyful-cheerful-men-crossed-hands-isolated-studio-shot-172869765.jpg"
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