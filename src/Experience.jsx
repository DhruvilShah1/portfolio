
import React from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  Code2,
  MapPin,
  CalendarDays,
  CheckCircle2,
  Layers3,
  Video,
  Stethoscope,
  ShoppingBag,
  Sparkles,
  Terminal,
  UserRound,
  ArrowUpRightFromCircleIcon,
} from "lucide-react";

const experiences = [
  {
    role: "MERN Developer",
    company: "Kenayos Technology",
    location: "Surat, India",
    period: "Sep 2025 – Sep 2026",
    type: "Work Experience",
    accent: "#EAB308",
    description:
      "Engineered a software development workflow management system with modules for project planning, task tracking, GitHub integration, and team collaboration.",
    achievements: [
      "Built a dynamic workflow system allowing team leads to define project stages, assign module ownership, and monitor developer progress in real time.",
      "Developed a structured pipeline covering To Do, In Progress, Code Review, QA Testing, Bug Fixing, and Completed.",
      "Improved project visibility and reduced reliance on manual task tracking.",
    ],
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JavaScript",
      "Socket.IO",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "AXE FORCE TECHNOLOGIES LLP",
    location: "Ahmedabad, India",
    period: "Jan 2025 – May 2025",
    type: "Internship",
    accent: "#8B5CF6",
    description:
      "Developed a browser-based video conferencing solution using WebRTC and real-time communication technologies.",
    achievements: [
      "Implemented camera and microphone controls, screen sharing, live chat, polls, and an AI chatbot.",
      "Built an admin dashboard to monitor meeting activity and host controls for managing participants.",
      "Developed the solution to work with shared hosting environments without requiring VPS or root-level server access.",
      "Applied clean-code practices to create maintainable and scalable application features.",
    ],
    technologies: [
      "Laravel",
      "PHP",
      "JavaScript",
      "Firestore",
      "WebRTC",
    ],
  },
];



const skillGroups = [
  {
    title: "Programming Languages",
    skills: ["JavaScript", "Python", "PHP", "HTML", "CSS"],
  },
  {
    title: "Frontend Development",
    skills: ["React.js", "Tailwind CSS", "jQuery", "Responsive UI"],
  },
  {
    title: "Backend Development",
    skills: ["Node.js", "Express.js", "Laravel", "REST APIs", "JWT"],
  },
  {
    title: "Databases & Tools",
    skills: ["MongoDB", "MySQL", "Firestore", "Socket.IO", "WebRTC", "GitHub"],
  },
];

const education = [
  {
    degree: "Bachelor of Engineering",
    field: "Information Technology",
    institution:
      "Madhuben and Bhanubhai Patel Institute of Technology",
    period: "Jun 2021 – May 2025",
    result: "CGPA: 7.83",
  },
  {
    degree : "S.B Vakil English Mediem School" , 
    period: "Jun 2008 – May 2021",
        result: "Percentage: 66 %",



  }
];

function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-white/70 bg-white/45 shadow-[0_8px_32px_rgba(31,38,135,0.07)] backdrop-blur-xl transition-all duration-300 hover:border-yellow-400/70 hover:shadow-[0_12px_38px_rgba(31,38,135,0.11)] ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-10 max-w-2xl">
      <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-yellow-700">
        <span className="h-2 w-2 rounded-full bg-yellow-400" />
        {eyebrow}
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function ExperienceCard({ experience, index }) {
  return (
    <div className="relative pl-8 sm:pl-10">
      {/* Timeline */}
      <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-yellow-400 via-gray-200 to-transparent" />

      <div
        className="absolute left-[-5px] top-7 h-[11px] w-[11px] rounded-full border-2 border-yellow-500 bg-white"
        style={{ boxShadow: "0 0 0 5px rgba(234,179,8,0.10)" }}
      />

      <GlassCard className="mb-7 p-5 sm:p-7">
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <span
              className="mb-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold"
              style={{
                color: experience.accent,
                borderColor: `${experience.accent}50`,
              }}
            >
              {experience.type}
            </span>

            <h3 className="text-xl font-bold text-gray-950 sm:text-2xl">
              {experience.role}
            </h3>

            <p className="mt-1 font-medium text-gray-700">
              {experience.company}
            </p>
          </div>

          <div className="flex flex-col gap-2 text-xs text-gray-500 sm:items-end">
            <span className="flex items-center gap-2">
              <CalendarDays size={14} />
              {experience.period}
            </span>

            <span className="flex items-center gap-2">
              <MapPin size={14} />
              {experience.location}
            </span>
          </div>
        </div>

        <p className="mb-5 text-sm leading-7 text-gray-600">
          {experience.description}
        </p>

        <ul className="mb-6 space-y-3">
          {experience.achievements.map((achievement) => (
            <li
              key={achievement}
              className="flex items-start gap-3 text-sm leading-6 text-gray-600"
            >
              <CheckCircle2
                size={17}
                className="mt-1 shrink-0 text-yellow-600"
              />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-white/80 bg-white/40 px-3 py-1.5 text-xs font-medium text-gray-700 backdrop-blur-md"
            >
              {technology}
            </span>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function ProjectCard({ project }) {
  const Icon = project.icon;

  return (
    <GlassCard className="group overflow-hidden">
      <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-white/60">
        <div
          className="absolute h-32 w-32 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: project.accent }}
        />

        <div
          className="relative flex h-20 w-20 items-center justify-center rounded-2xl border bg-white/25 backdrop-blur-xl transition-transform duration-300 group-hover:scale-110"
          style={{
            borderColor: `${project.accent}70`,
            color: project.accent,
          }}
        >
          <Icon size={36} strokeWidth={1.5} />
        </div>

        <span className="absolute right-4 top-4 rounded-full border border-white/70 bg-white/35 px-3 py-1 text-xs text-gray-600 backdrop-blur-md">
          {project.category}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-950">
          {project.name}
        </h3>

        <p className="mt-3 min-h-[84px] text-sm leading-7 text-gray-600">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-white/80 bg-white/35 px-3 py-1.5 text-xs text-gray-700"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

export default function Experience() {
  return (
    <main
      id="about"
      className="relative isolate w-full overflow-hidden bg-transparent px-5 py-20 text-gray-900 sm:px-8 sm:py-24 lg:px-16"
    >
      {/* Soft background glows; no solid black section background */}
      <div className="pointer-events-none absolute -left-24 top-24 -z-10 h-72 w-72 rounded-full bg-yellow-300/20 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-[35%] -z-10 h-80 w-80 rounded-full bg-blue-300/15 blur-[110px]" />

      <div className="mx-auto max-w-7xl">
        {/* ABOUT ME */}
        <section className="mb-24 scroll-mt-24" id="about-me">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/70 bg-white/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-700 backdrop-blur-lg">
                <UserRound size={15} className="text-yellow-600" />
                About Me
              </div>

              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                Hi, I'm Dhruvil Shah.
                <span className="mt-2 block">
                  I build{" "}
                  <span className="relative inline-block">
                    digital products.
                    <span className="absolute bottom-1 left-0 -z-10 h-3 w-full bg-yellow-300/80" />
                  </span>
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-gray-600">
                I'm a software developer from India specializing in
                full-stack web development. I enjoy turning ideas into
                practical applications, building responsive interfaces,
                developing reliable backend systems, and creating real-time
                experiences that solve everyday problems.
              </p>

              <p className="mt-4 max-w-2xl text-base leading-8 text-gray-600">
                My experience spans project workflow management, real-time
                video communication, healthcare applications, REST APIs, and
                database-driven systems. I focus on writing maintainable code
                and continuously expanding my skills.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://github.com/DhruvilShah1"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white/30 px-5 py-3 text-sm font-semibold text-gray-900 backdrop-blur-lg transition hover:border-yellow-400 hover:bg-yellow-300/20"
                >
                  <Code2 size={18} />
                  GitHub
                  <ArrowUpRight size={15} />
                </a>

                <a
                  href="https://linkedin.com/in/dhruvil-shah-988a94204"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white/30 px-5 py-3 text-sm font-semibold text-gray-900 backdrop-blur-lg transition hover:border-yellow-400 hover:bg-yellow-300/20"
                >
                  <ArrowUpRightFromCircleIcon size={18} />
                  LinkedIn
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>

            <GlassCard className="relative p-7 sm:p-9">
              <div className="absolute right-7 top-7 text-yellow-600">
                <Sparkles size={25} />
              </div>

              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-400/60 bg-yellow-300/15 text-yellow-700">
                <Terminal size={32} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                My Development Approach
              </p>

              <h2 className="mt-3 text-2xl font-bold leading-snug text-gray-950 sm:text-3xl">
                From an idea to a working application.
              </h2>

              <div className="mt-7 space-y-5">
                {[
                  {
                    title: "Understand",
                    description:
                      "Understand the problem and define the right solution.",
                  },
                  {
                    title: "Build",
                    description:
                      "Create clean interfaces, APIs, and database systems.",
                  },
                  {
                    title: "Improve",
                    description:
                      "Test, refine, and improve usability and maintainability.",
                  },
                ].map((step, index) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-yellow-400/60 bg-white/40 text-sm font-bold text-yellow-700">
                      0{index + 1}
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section
          id="experience"
          className="mb-24 scroll-mt-24"
        >
          <SectionHeading
            eyebrow="Professional Journey"
            title="My Experience."
            description="My professional journey developing web applications, real-time systems, and collaborative software solutions."
          />

          <div className="max-w-4xl">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.company}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </section>

  

        {/* SKILLS */}
        <section
          id="skills"
          className="mb-24 scroll-mt-24"
        >
          <SectionHeading
            eyebrow="Technical Toolkit"
            title="Skills & Technologies."
            description="The technologies I use to develop user interfaces, backend services, and database-driven applications."
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <GlassCard key={group.title} className="p-6 sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-400/60 text-yellow-700">
                    <Code2 size={21} />
                  </div>

                  <h3 className="font-bold text-gray-950">
                    {group.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/80 bg-white/35 px-3 py-2 text-sm text-gray-700 backdrop-blur-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section
          id="education"
          className="scroll-mt-24"
        >
          <SectionHeading
            eyebrow="Academic Background"
            title="Education."
            description="My academic foundation in information technology and software development."
          />

          <div className="max-w-5xl flex gap-2">
            {education.map((item) => (
              <GlassCard key={item.institution} className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-yellow-400/60 text-yellow-700">
                    <GraduationCap size={25} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-950">
                      {item.degree}
                    </h3>

                    <p className="mt-1 font-medium text-gray-700">
                      {item.field}
                    </p>

                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {item.institution}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-500">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays size={14} />
                        {item.period}
                      </span>

                      <span className="rounded-full border border-yellow-400/60 bg-yellow-300/15 px-3 py-1 font-semibold text-gray-800">
                        {item.result}
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* CONTACT CTA */}
        <section id="contact" className="mt-24 scroll-mt-24">
          <GlassCard className="relative overflow-hidden p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-yellow-300/25 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-7 sm:flex-row sm:items-center">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-yellow-700">
                  Let's Connect
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                  Let's build something great.
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-gray-600">
                  Have an idea, a project, or an opportunity? I'd love to
                  connect and discuss how we can make it happen.
                </p>
              </div>

              <a
                href="mailto:dhruvilshah3383@gmail.com"
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3.5 text-sm font-bold text-gray-950 transition hover:bg-yellow-300"
              >
                Get In Touch
                <ArrowUpRight size={18} />
              </a>
            </div>
          </GlassCard>
        </section>
      </div>
    </main>
  );
}
