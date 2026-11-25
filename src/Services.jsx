
import React from "react";
import {
  ArrowUpRight,
  Code2,
  PanelsTopLeft,
  Server,
  Palette,
  Radio,
  BrainCircuit,
  CheckCircle2,
  Sparkles,
  Workflow,
  Database,
  ShieldCheck,
  Layers3,
  MessageCircle,
} from "lucide-react";

const services = [
  {
    id: "01",
    title: "Full Stack Development",
    subtitle: "End-to-end web applications",
    description:
      "I build complete web applications, combining responsive frontend experiences with reliable backend services and database integration.",
    icon: Code2,
    accent: "#CA8A04",
    features: [
      "Full-stack application development",
      "REST API integration",
      "Database design and integration",
      "Authentication and authorization",
    ],
    tags: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    id: "02",
    title: "Frontend Development",
    subtitle: "Interfaces people enjoy using",
    description:
      "I create responsive, accessible, and interactive interfaces that look polished across desktops, tablets, and mobile devices.",
    icon: PanelsTopLeft,
    accent: "#7C3AED",
    features: [
      "Responsive website development",
      "Reusable React components",
      "Interactive UI elements",
      "Performance-conscious interfaces",
    ],
    tags: ["React", "JavaScript", "Tailwind CSS"],
  },
  {
    id: "03",
    title: "Backend Development",
    subtitle: "Reliable application foundations",
    description:
      "I develop backend systems, API endpoints, authentication flows, and database operations to support application requirements.",
    icon: Server,
    accent: "#2563EB",
    features: [
      "RESTful API development",
      "JWT-based authentication",
      "Database operations",
      "Server-side application logic",
    ],
    tags: ["Node.js", "Express", "Laravel", "MongoDB"],
  },
  {
    id: "04",
    title: "UI/UX Design",
    subtitle: "Clean, thoughtful experiences",
    description:
      "I translate product ideas into intuitive layouts, clear user journeys, and consistent visual experiences for web applications.",
    icon: Palette,
    accent: "#DB2777",
    features: [
      "Page layout and visual hierarchy",
      "Reusable design patterns",
      "User-friendly navigation",
      "Responsive design implementation",
    ],
    tags: ["UI Design", "UX", "Tailwind CSS"],
  },
  {
    id: "05",
    title: "Real-Time Applications",
    subtitle: "Live, connected experiences",
    description:
      "I build interactive features that keep users synchronized, from collaborative task updates to live communication experiences.",
    icon: Radio,
    accent: "#0D9488",
    features: [
      "Real-time task updates",
      "Live notifications and events",
      "Video and audio communication",
      "Interactive collaboration tools",
    ],
    tags: ["Socket.IO", "WebRTC", "Firestore"],
  },
  {
    id: "06",
    title: "AI & RAG Integration",
    subtitle: "Useful AI-powered features",
    description:
      "I explore document-aware AI assistants that retrieve relevant information from source documents and generate context-grounded responses.",
    icon: BrainCircuit,
    accent: "#EA580C",
    features: [
      "PDF-based question answering",
      "Retrieval-augmented generation",
      "Semantic document search",
      "LLM integration with application data",
    ],
    tags: ["Python", "LangChain", "Ollama", "RAG"],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand your goals, requirements, users, and the problem to solve.",
    icon: MessageCircle,
  },
  {
    number: "02",
    title: "Plan & Design",
    description:
      "Organize the features, application structure, and user experience.",
    icon: Workflow,
  },
  {
    number: "03",
    title: "Develop",
    description:
      "Build the interface, backend services, and required integrations.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Refine",
    description:
      "Test functionality, fix issues, and polish the final experience.",
    icon: CheckCircle2,
  },
];

function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-white/70 bg-white/45 shadow-[0_8px_32px_rgba(31,38,135,0.07)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/70 hover:shadow-[0_14px_40px_rgba(31,38,135,0.11)] ${className}`}
    >
      {children}
    </div>
  );
}

function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <GlassCard className="group relative flex h-full flex-col overflow-hidden p-6 sm:p-7">
      {/* Decorative glass glow */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-15 blur-3xl transition-opacity duration-300 group-hover:opacity-35"
        style={{ backgroundColor: service.accent }}
      />

      <div className="relative mb-7 flex items-start justify-between">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl border bg-white/35 backdrop-blur-lg"
          style={{
            color: service.accent,
            borderColor: `${service.accent}55`,
          }}
        >
          <Icon size={27} strokeWidth={1.7} />
        </div>

        <span className="text-sm font-medium tracking-widest text-gray-400">
          {service.id}
        </span>
      </div>

      <div className="relative flex-1">
        <p
          className="mb-2 text-xs font-semibold uppercase tracking-[0.16em]"
          style={{ color: service.accent }}
        >
          {service.subtitle}
        </p>

        <h3 className="text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
          {service.title}
        </h3>

        <p className="mt-4 text-sm leading-7 text-gray-600">
          {service.description}
        </p>

        <ul className="mt-6 space-y-3">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm text-gray-700"
            >
              <CheckCircle2
                size={16}
                className="mt-0.5 shrink-0 text-yellow-600"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-7 border-t border-gray-200/70 pt-5">
        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/80 bg-white/40 px-3 py-1.5 text-xs font-medium text-gray-600 backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

export default function Services() {
  return (
    <main
      id="services"
      className="relative isolate min-h-screen overflow-hidden bg-transparent px-5 py-20 text-gray-900 sm:px-8 sm:py-24 lg:px-16"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute -left-24 top-20 -z-10 h-80 w-80 rounded-full bg-yellow-300/20 blur-[110px]" />
      <div className="pointer-events-none absolute right-0 top-[30%] -z-10 h-80 w-80 rounded-full bg-blue-300/15 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-20 left-1/3 -z-10 h-72 w-72 rounded-full bg-purple-300/10 blur-[110px]" />

      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <section className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/70 bg-white/35 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-700 backdrop-blur-xl">
            <Sparkles size={15} className="text-yellow-600" />
            What I Can Do For You
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-7xl">
            Services that turn
            <span className="relative mt-2 block">
              ideas into reality.
              <span className="absolute bottom-1 left-1/2 -z-10 h-3 w-[75%] -translate-x-1/2 bg-yellow-300/80 sm:h-4" />
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
            From frontend interfaces to backend architecture and AI-powered
            applications, I help transform ideas into practical digital
            experiences.
          </p>

          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3.5 text-sm font-bold text-gray-950 transition hover:bg-yellow-300"
          >
            Let's Discuss Your Project
            <ArrowUpRight size={18} />
          </a>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <Code2 size={17} className="text-yellow-600" />
              Modern Web Development
            </span>

            <span className="flex items-center gap-2">
              <Database size={17} className="text-yellow-600" />
              Backend & Databases
            </span>

            <span className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-yellow-600" />
              Thoughtful Implementation
            </span>
          </div>
        </section>

        {/* Services grid */}
        <section id="service-list" className="scroll-mt-24">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-yellow-700">
                My Expertise
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                What I Do Best.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-gray-500">
              Practical development services focused on usability,
              maintainability, and real application needs.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mt-24 scroll-mt-24" id="process">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-yellow-700">
              How I Work
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              From concept to completion.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600">
              A straightforward process keeps the work organized and the
              development focused on your goals.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step) => {
              const Icon = step.icon;

              return (
                <GlassCard key={step.number} className="p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-sm font-bold tracking-widest text-yellow-700">
                      {step.number}
                    </span>

                    <Icon size={23} className="text-gray-500" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-950">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {step.description}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="mt-24 scroll-mt-24">
          <GlassCard className="relative overflow-hidden p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full bg-yellow-300/25 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-yellow-700">
                  <Layers3 size={16} />
                  Have a Project?
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                  Let's create something meaningful.
                </h2>

                <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                  Tell me what you're building, what problem you're solving,
                  and how I can help bring your idea to life.
                </p>
              </div>

              <a
                href="mailto:dhruvilshah3383@gmail.com"
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-yellow-400 px-6 py-4 text-sm font-bold text-gray-950 transition hover:bg-yellow-300"
              >
                <MessageCircle size={18} />
                Get In Touch
                <ArrowUpRight size={17} />
              </a>
            </div>
          </GlassCard>
        </section>

        {/* Footer */}
        <footer className="mt-12 flex flex-col justify-between gap-3 border-t border-gray-200/70 pt-6 text-xs text-gray-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Dhruvil Shah</p>
          <p>Designed with care. Built with code.</p>
        </footer>
      </div>
    </main>
  );
}
