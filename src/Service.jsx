
import React, { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  LayoutDashboard,
  Server,
  Code2,
  Palette,
  Plus,
  Minus,
  Sparkles,
} from "lucide-react";

const services = [
  {
    id: "01",
    title: "Dashboard Development",
    subtitle: "Data into decisions",
    description:
      "I build clean, interactive dashboards that transform complex data into useful insights. From analytics to admin panels, every screen is designed for clarity and usability.",
    icon: LayoutDashboard,
    tags: ["React", "Tailwind CSS", "Charts", "API Integration"],
  },
  {
    id: "02",
    title: "Backend Development",
    subtitle: "Power behind the product",
    description:
      "I develop secure and scalable backend systems with well-structured APIs, database integration, authentication, and reliable business logic.",
    icon: Server,
    tags: ["Node.js", "Express", "MongoDB", "REST APIs"],
  },
  {
    id: "03",
    title: "Frontend Development",
    subtitle: "Ideas into experiences",
    description:
      "I turn ideas and designs into responsive web applications with reusable components, smooth interactions, and maintainable code.",
    icon: Code2,
    tags: ["React", "JavaScript", "Tailwind CSS", "Responsive UI"],
  },
];

export default function Services() {
  const [openService, setOpenService] = useState(null);

  const toggleService = (id) => {
    setOpenService((current) => (current === id ? null : id));
  };

  return (
    <section
      id="services"
      className="min-h-screen bg-[#f8f8f5] text-black px-5 py-24 sm:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
              <Sparkles size={16} className="text-yellow-500" />
              What I Bring to You
            </div>

            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Services that
              <br />
              <span className="text-yellow-400">make an impact.</span>
            </h1>
          </div>

          <p className="max-w-md text-base leading-7 text-gray-600 md:justify-self-end">
            From the first idea to the final product, I bring together
            thoughtful design, modern development, and practical solutions
            to build digital experiences that work.
          </p>
        </div>

        {/* Services */}
        <div className="border-t border-black/15">
          {services.map((service) => {
            const isOpen = openService === service.id;
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                className={`border-b border-black/15 transition-colors duration-300 ${
                  isOpen ? "bg-white" : "bg-transparent"
                }`}
              >
                {/* Clickable Row */}
                <button
                  type="button"
                  onClick={() => toggleService(service.id)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center gap-4 py-7 text-left sm:gap-8 sm:py-9"
                >
                  <span className="w-8 shrink-0 text-sm text-gray-400 sm:w-12">
                    {service.id}
                  </span>

                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors duration-300 sm:h-14 sm:w-14 ${
                      isOpen
                        ? "bg-yellow-400 text-black"
                        : "bg-black text-white group-hover:bg-yellow-400 group-hover:text-black"
                    }`}
                  >
                    <Icon size={23} strokeWidth={1.7} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                      {service.title}
                    </span>
                    <span className="mt-1 block text-sm text-gray-500 sm:text-base">
                      {service.subtitle}
                    </span>
                  </span>

                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-12 sm:w-12 ${
                      isOpen
                        ? "rotate-45 border-yellow-400 bg-yellow-400"
                        : "border-black/20 group-hover:border-black group-hover:bg-black group-hover:text-white"
                    }`}
                  >
                    {isOpen ? <Plus size={21} /> : <ArrowDownRight size={22} />}
                  </span>
                </button>

                {/* Slide-down Details */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-6 pb-8 pl-0 sm:pb-10 md:grid-cols-[1fr_1fr] md:gap-16 md:pl-24 lg:pl-28">
                      <div>
                        <p className="max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
                          {service.description}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            document
                              .getElementById("contact")
                              ?.scrollIntoView({ behavior: "smooth" })
                          }
                          className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-yellow-400 hover:text-black"
                        >
                          Let's work together
                          <ArrowUpRight size={17} />
                        </button>
                      </div>

                      <div>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                          Tools & Expertise
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-black/10 px-4 py-2 text-sm text-gray-700 transition hover:border-yellow-400 hover:bg-yellow-100"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="mt-8 flex items-center gap-2 text-sm font-medium">
                          <span className="h-2 w-2 rounded-full bg-yellow-400" />
                          Built around your goals
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          id="contact"
          className="mt-16 flex flex-col justify-between gap-6 rounded-3xl bg-black p-8 text-white sm:flex-row sm:items-center sm:p-12"
        >
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-yellow-400">
              Have a project in mind?
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Let's build something great.
            </h2>
          </div>

          <a
            href="mailto:your.email@example.com"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-yellow-400 px-6 py-4 font-semibold text-black transition hover:bg-white"
          >
            Get in touch
            <ArrowUpRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
