import React from "react";
import { Award, CalendarDays, ExternalLink, Sparkles } from "lucide-react";

const certifications = [
  {
    name: "Data Science & AI Masters 2026 - From Python To Gen AI",
    issuer: "Udemy",
    issued: "Nov 2026",
    credentialId: "UC-08526f4b-8421-4e31-a0c1-65240e5de4b7",
    credentialUrl: "https://www.udemy.com/certificate/UC-08526f4b-8421-4e31-a0c1-65240e5de4b7/",
  },
  {
    name: "Mastering Laravel Framework and PHP",
    issuer: "Board Infinity",
    issued: "Apr 2025",
    credentialId: "PMAUJ60UCVK0",
    skills: ["Laravel"],
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/PMAUJ60UCVK0",
  },
  {
    name: "Python for Data Science, AI & Development",
    issuer: "IBM",
    issued: "Apr 2025",
    credentialId: "O3L87ONSJJ4P",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/O3L87ONSJJ4P",
  },
  {
    name: "Introduction to Structured Query Language (SQL)",
    issuer: "University of Michigan",
    issued: "Aug 2022",
    credentialId: "PB3EZKDTLMQX",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/PB3EZKDTLMQX",
  },
  {
    name: "Developing Responsive Web Pages Using HTML5 and CSS3",
    issuer: "NIIT Limited",
    issued: "Sep 2023",
    credentialId: "PU7CVGX2LX6R",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/PU7CVGX2LX6R",
  },
  {
    name: "Crash Course on Python",
    issuer: "Google",
    issued: "Apr 2025",
    credentialId: "K12IN20B5IXY",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/K12IN20B5IXY",
  },
];

function CertificationCard({ certification }) {
  const { name, issuer, issued, expires, credentialId, credentialUrl, skills } =
    certification;

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-white/70 bg-white/45 p-6 shadow-[0_8px_32px_rgba(31,38,135,0.07)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/70 hover:shadow-[0_14px_40px_rgba(31,38,135,0.11)] sm:p-7">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-yellow-500/30 bg-yellow-400/10 text-yellow-700">
          <Award size={24} />
        </div>
        <span className="rounded-full border border-yellow-500/30 px-3 py-1 text-xs font-semibold text-yellow-700">
          Certificate
        </span>
      </div>

      <div className="flex-1">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
          {issuer}
        </p>
        <h2 className="text-xl font-bold leading-snug tracking-tight text-gray-950">
          {name}
        </h2>

        <div className="mt-5 flex items-center gap-2 text-sm text-gray-600">
          <CalendarDays size={16} className="shrink-0 text-yellow-700" />
          <span>
            {issued ? `Issued ${issued}` : `Expires ${expires}`}
          </span>
        </div>

        {issued && expires && (
          <p className="mt-2 pl-6 text-sm text-gray-600">Expires {expires}</p>
        )}

        {skills?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 border-t border-gray-200/70 pt-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Credential ID
        </p>
        <p className="mt-2 break-all font-mono text-xs text-gray-700">
          {credentialId}
        </p>

        {credentialUrl ? (
          <a
            href={credentialUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition hover:text-yellow-700"
          >
            Show credential
            <ExternalLink size={16} />
          </a>
        ) : (
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-400">
            Credential link to be added
            <ExternalLink size={16} />
          </span>
        )}
      </div>
    </article>
  );
}

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative isolate min-h-screen overflow-hidden bg-transparent px-5 py-20 text-gray-900 sm:px-8 sm:py-24 lg:px-16 lg:py-28"
    >
      <div className="pointer-events-none absolute -left-24 top-20 -z-10 h-80 w-80 rounded-full bg-yellow-300/20 blur-[110px]" />
      <div className="pointer-events-none absolute right-0 top-[35%] -z-10 h-80 w-80 rounded-full bg-blue-300/15 blur-[110px]" />

      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex flex-col justify-between gap-7 md:mb-16 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-700">
              <Sparkles size={15} className="text-yellow-600" />
              Learning & Growth
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Certifications
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
              Professional learning across data science, AI, programming, and
              web development.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="text-3xl font-bold text-gray-900">
              {String(certifications.length).padStart(2, "0")}
            </span>
            <span className="max-w-28 leading-5">certifications earned</span>
          </div>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {certifications.map((certification) => (
            <CertificationCard
              key={certification.credentialId}
              certification={certification}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
