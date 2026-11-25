
import React from "react";
import { ArrowUpRight, Sparkles, Code2, MapPin } from "lucide-react";
import photo from "./assets/photo.jpeg";

export const AboutMe = () => {
  return (
    <section
      id="about"
      className="min-h-screen bg-[#f8f8f5] px-5 py-24 text-black sm:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-14">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
            <Sparkles size={16} className="text-yellow-500" />
            Get to know me
          </p>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            A little bit <span className="text-yellow-400">about me.</span>
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Side - Photo */}
          <div className="relative mx-auto w-full max-w-lg">
            {/* Decorative Background */}
            <div className="absolute -left-4 -top-4 h-32 w-32 rounded-tl-[60px] border-l-2 border-t-2 border-yellow-400 sm:-left-6 sm:-top-6" />

            <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-br-[60px] border-b-2 border-r-2 border-black sm:-bottom-6 sm:-right-6" />

            {/* Photo Container */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-yellow-100">
              <img
                src={photo}
                alt="Dhruvil Shah"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />

              {/* Photo Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 pt-24 sm:p-8 sm:pt-28">
                <p className="text-sm font-medium text-yellow-400">
                  SOFTWARE DEVELOPER
                </p>
                <h3 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                  Dhruvil Shah
                </h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
                  <MapPin size={15} />
                  India
                </p>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -right-2 top-6 flex h-20 w-20 rotate-12 flex-col items-center justify-center rounded-full bg-yellow-400 text-center shadow-lg sm:-right-6 sm:top-8 sm:h-24 sm:w-24">
              <Code2 size={20} className="sm:h-[23px] sm:w-[23px]" />
              <span className="mt-1 text-[11px] font-bold leading-tight sm:text-sm">BUILD &amp; CREATE</span>
            </div>
          </div>

          {/* Right Side - About Text */}
          <div className="pt-4 lg:pt-0">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Who is Dhruvil Shah?
            </p>

            <h3 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              I turn ideas into
              <span className="text-yellow-400"> digital experiences.</span>
            </h3>

            <p className="mt-7 text-base leading-8 text-gray-600 sm:text-lg">
              Hey, I'm Dhruvil Shah, a software developer based in India who
              enjoys building modern web applications and solving real-world
              problems with technology.
            </p>

            <p className="mt-5 text-base leading-8 text-gray-600 sm:text-lg">
              I work across frontend and backend development, creating
              responsive interfaces, building APIs, and connecting everything
              with reliable databases. I care about writing clean code,
              thoughtful design, and building products that are genuinely
              useful.
            </p>

            {/* Highlights */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-black/10 p-5 transition hover:border-yellow-400 hover:bg-white">
                <h4 className="text-lg font-bold">Frontend</h4>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Clean, responsive user interfaces.
                </p>
              </div>

              <div className="rounded-2xl border border-black/10 p-5 transition hover:border-yellow-400 hover:bg-white">
                <h4 className="text-lg font-bold">Backend</h4>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  APIs, databases, and application logic.
                </p>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-yellow-400 hover:text-black"
            >
              Let's talk about your project
              <ArrowUpRight size={19} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
