import React, { useState } from "react";
import {
  ArrowUpRight,
  Layers3,
  Video,
  Stethoscope,
  ShoppingBag,
  BrainCircuit,
  FileText,
  X,
  ExternalLink,
  CheckCircle2,
  Code2,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const projects = [
  {
    id: 1,
    name: "DevFlow",
    category: "Full Stack",
    type: "Project Management",
    description:
      "A collaborative project management platform for teams to organize projects, assign tasks, track progress, and manage workflows.",
    features: [
      "Project and team management",
      "Task assignment and status tracking",
      "Real-time updates with Socket.IO",
      "GitHub repository integration",
    ],
    technologies: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Socket.IO"],
    icon: Layers3,
    accent: "#EAB308",
    github: "",
    live: "",
  },
  {
    id: 2,
    name: "Video Conference",
    category: "Full Stack",
    type: "Communication",
    description:
      "A video conferencing application designed to support online meetings, communication, and collaboration between users.",
    features: [
      "Create and join meetings",
      "Video and audio communication",
      "Meeting room interface",
      "Responsive meeting controls",
    ],
    technologies: ["Laravel", "JavaScript", "WebRTC", "Socket.IO" , "MySQL"],
    icon: Video,
    accent: "#8B5CF6",
    github: "https://github.com/DhruvilShah1/Video_confernce",
    live: "",
  },
  {
    id: 3,
    name: "Doctor Appointment System",
    category: "Full Stack",
    type: "Healthcare",
    description:
      "A healthcare booking platform that helps patients discover doctors, schedule appointments, and manage their bookings.",
    features: [
      "Doctor discovery and profiles",
      "Appointment scheduling",
      "Patient and doctor dashboards",
      "Appointment management",
    ],
    technologies: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB" , "Socket.IO" , "JWT Authentication" , "RESTful APIs" , "Python" , ],
    icon: Stethoscope,
    accent: "#0D9488",
    github: "https://github.com/DhruvilShah1/DoctorAppointment",
    live: "https://doctor-appointment-kohl-phi.vercel.app/",
  },
  {
    id: 4,
    name: "E-Commerce Platform",
    category: "Web Apps",
    type: "Online Shopping",
    description:
      "An online shopping experience with product discovery, product details, cart management, and an intuitive checkout interface.",
    features: [
      "Product listing and search",
      "Product details",
      "Shopping cart management",
      "Responsive shopping experience",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap" , "PHP" , "MySQL" , "JavaScript" , "Ajax"],
    icon: ShoppingBag,
    accent: "#EA580C",
    github: "https://github.com/DhruvilShah1/E_commerce-Clothing-Website",
    live: "",
  },
  {
    id: 5,
    name: "AI PDF Assistant",
    category: "AI & ML",
    type: "AI Application",
    description:
      "A document question-answering assistant that retrieves relevant information from PDF files and generates context-grounded answers.",
    features: [
      "PDF text extraction",
      "Document chunking and embeddings",
      "Semantic similarity search",
      "Answers grounded in document context",
    ],
    technologies: ["Python", "LangChain", "Ollama", "Ollama Embeddings", "FAISS", "Hugging Face"],
    icon: BrainCircuit,
    accent: "#2563EB",
    github: "",
    live: "",
  },

];

const filters = ["All", "Full Stack", "Frontend", "AI & ML", "Web Apps"];

function ProjectPreview({ project }) {
  const Icon = project.icon;

  return (
    <div className="relative flex h-52 items-center justify-center overflow-hidden rounded-t-2xl border-b border-gray-100 bg-transparent">
      {/* Decorative elements without a filled background */}
      <div
        className="absolute left-8 top-8 h-16 w-16 rounded-full border opacity-40"
        style={{ borderColor: project.accent }}
      />

      <div
        className="absolute bottom-7 right-10 h-20 w-20 rounded-full border opacity-30"
        style={{ borderColor: project.accent }}
      />

      <div className="absolute left-5 top-5 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-gray-300" />
        <span className="h-2 w-2 rounded-full bg-gray-300" />
        <span className="h-2 w-2 rounded-full bg-gray-300" />
      </div>

      <div className="relative flex flex-col items-center justify-center gap-4">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-2xl border bg-transparent transition-transform duration-300 group-hover:scale-110"
          style={{
            borderColor: `${project.accent}70`,
            color: project.accent,
          }}
        >
          <Icon size={38} strokeWidth={1.5} />
        </div>

        <div className="text-center">
          <p className="text-lg font-bold tracking-tight text-gray-900">
            {project.name}
          </p>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
            {project.type}
          </p>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full"
        style={{ backgroundColor: project.accent }}
      />
    </div>
  );
}

function ProjectCard({ project, onViewDetails }) {
  return (
<article
  className="group overflow-hidden rounded-2xl
  border border-white/50
  bg-white/35
  backdrop-blur-xl
  shadow-[0_8px_32px_rgba(31,38,135,0.08)]
  transition-all duration-300
  hover:-translate-y-1
  hover:border-yellow-400/70
  hover:bg-white/50
  hover:shadow-[0_12px_40px_rgba(31,38,135,0.12)]"
>     
<div className="pointer-events-none absolute left-1/4 top-24 -z-10 h-72 w-72 rounded-full bg-yellow-300/20 blur-[100px]" />
<div className="pointer-events-none absolute right-10 top-1/2 -z-10 h-64 w-64 rounded-full bg-red-300/15 blur-[100px]" />

 <ProjectPreview project={project} />

      <div className="p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-yellow-700">
            {project.category}
          </span>

          <span className="text-xs text-gray-400">
            {String(project.id).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mb-3 text-xl font-bold tracking-tight text-gray-900">
          {project.name}
        </h3>

        <p className="mb-5 min-h-[72px] text-sm leading-6 text-gray-600">
          {project.description}
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600"
            >
              {tech}
            </span>
          ))}

          {project.technologies.length > 3 && (
            <span className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onViewDetails(project)}
          className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm font-semibold text-gray-900 transition-all hover:border-yellow-500 hover:text-yellow-700"
        >
          View Project Details
          <ArrowUpRight
            size={17}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      </div>
    </article>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const Icon = project.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative my-auto w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl sm:p-9"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-5 top-5 rounded-full border border-gray-200 p-2 text-gray-500 transition hover:border-gray-400 hover:text-gray-900"
        >
          <X size={19} />
        </button>

        <div className="mb-7 flex items-start gap-4 pr-10">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border"
            style={{
              borderColor: `${project.accent}70`,
              color: project.accent,
            }}
          >
            <Icon size={28} />
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-yellow-700">
              {project.category} / {project.type}
            </p>

            <h2
              id="project-modal-title"
              className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
            >
              {project.name}
            </h2>
          </div>
        </div>

        <div className="mb-8 border-b border-gray-100 pb-7">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-900">
            Project Overview
          </h3>

          <p className="text-sm leading-7 text-gray-600">
            {project.description}
          </p>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-900">
            <CheckCircle2 size={18} className="text-yellow-600" />
            Key Features
          </h3>

          <ul className="grid gap-3 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-sm leading-6 text-gray-600"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-900">
            <Code2 size={18} className="text-yellow-600" />
            Technologies Used
          </h3>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 transition hover:border-gray-900"
            >
              <Code2 size={17} />
              Source Code
              <ExternalLink size={14} />
            </a>
          )}

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-yellow-300"
            >
              Live Demo
              <ArrowUpRight size={17} />
            </a>
          )}

          {!project.github && !project.live && (
            <p className="text-sm text-gray-400">
              No external links available for this project.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Project() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : activeFilter === "Frontend"
        ? projects.filter((project) =>
            project.technologies.some((tech) =>
              ["React", "Tailwind CSS", "JavaScript"].includes(tech)
            )
          )
        : projects.filter((project) => project.category === activeFilter);

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden bg-transparent px-5 py-20 text-gray-900 sm:px-8 sm:py-24 lg:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-7 md:mb-16 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-700">
              <Sparkles size={15} className="text-yellow-600" />
              My Portfolio
            </div>

            <h2 className="text-4xl font-bold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              What I've Built
              <span className="relative ml-2 inline-block">
                So Far.
                <span className="absolute -bottom-1 left-0 -z-10 h-3 w-full bg-yellow-300/80" />
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              A collection of projects where I turn ideas into practical,
              user-focused applications using modern technologies.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="text-3xl font-bold text-gray-900">
              {String(projects.length).padStart(2, "0")}
            </span>
            <span className="max-w-20 leading-5">
              Projects built and explored
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap gap-3">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "border-yellow-400 bg-yellow-400 text-gray-950"
                    : "border-gray-200 bg-transparent text-gray-600 hover:border-yellow-400 hover:text-gray-950"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={setSelectedProject}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-gray-500">
              No projects found in this category.
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 flex flex-col justify-between gap-6
          border border-white/50
  bg-white/35
  backdrop-blur-xl
  shadow-[0_8px_32px_rgba(31,38,135,0.08)]
  transition-all duration-300
  hover:-translate-y-1
  hover:border-yellow-400/70
  hover:bg-white/50
  hover:shadow-[0_12px_40px_rgba(31,38,135,0.12)]
p-5
rounded-3xl text-gray-900 sm:px-8 
        
     pt-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-xl font-bold text-gray-900">
              Have a project in mind?
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Let's collaborate and build something meaningful.
            </p>
          </div>

          <a
            href="#contact"
            className="group inline-flex w-fit items-center gap-3 rounded-xl border border-gray-300 px-6 py-3.5 text-sm font-semibold text-gray-900 transition hover:border-yellow-400 hover:bg-yellow-400"
          >
            Let's Talk
            <ChevronRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}