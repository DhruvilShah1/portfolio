
import React, { useState } from "react";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Clock,
  Copy,
  ArrowLeft,
} from "lucide-react";

const contactDetails = [
  {
    label: "Email",
    value: "dhruvilshah3383@gmail.com",
    href: "mailto:dhruvilshah3383@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+91 7984480038",
    href: "tel:+917984480038",
    icon: Phone,
  },
  {
    label: "Location",
    value: "Gujarat, India",
    href: null,
    icon: MapPin,
  },
];

const socialLinks = [
  {
    label: "GitHub",
    username: "DhruvilShah1",
    href: "https://github.com/DhruvilShah1",
    icon: ArrowLeft,
  },
  {
    label: "LinkedIn",
    username: "Dhruvil Shah",
    href: "https://linkedin.com/in/dhruvil-shah-988a94204",
    icon: ArrowLeft,
  },
];

function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-white/70 bg-white/45 shadow-[0_8px_32px_rgba(31,38,135,0.07)] backdrop-blur-xl transition-all duration-300 hover:border-yellow-400/60 ${className}`}
    >
      {children}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.subject.trim()) {
      nextErrors.subject = "Please enter a subject.";
    }

    if (form.message.trim().length < 10) {
      nextErrors.message = "Please write at least 10 characters.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const subject = encodeURIComponent(form.subject.trim());

    const body = encodeURIComponent(
      `Hello Dhruvil,\n\n${form.message.trim()}\n\nRegards,\n${form.name.trim()}\n${form.email.trim()}`
    );

    const mailtoUrl =
      `mailto:dhruvilshah3383@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("dhruvilshah3383@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = "mailto:dhruvilshah3383@gmail.com";
    }
  };

  const inputClasses =
    "w-full rounded-xl border border-gray-200 bg-white/40 px-4 py-3.5 text-sm text-gray-900 outline-none backdrop-blur-md transition placeholder:text-gray-400 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-400/10";

  return (
    <main
      id="contact"
      className="relative isolate min-h-screen overflow-hidden bg-transparent px-5 py-20 text-gray-900 sm:px-8 sm:py-24 lg:px-16"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-24 top-20 -z-10 h-80 w-80 rounded-full bg-yellow-300/20 blur-[110px]" />

      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-80 w-80 rounded-full bg-blue-300/15 blur-[110px]" />

      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <section className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/70 bg-white/35 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-700 backdrop-blur-xl">
            <Sparkles size={15} className="text-yellow-600" />
            Get In Touch
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-7xl">
            Let's start a
            <span className="relative mt-2 block">
              conversation.
              <span className="absolute bottom-1 left-1/2 -z-10 h-3 w-[70%] -translate-x-1/2 bg-yellow-300/80 sm:h-4" />
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
            Have a project in mind, an opportunity to discuss, or just want to
            connect? Send me a message. I'd love to hear from you.
          </p>
        </section>

        {/* Main content */}
        <section className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left side */}
          <div className="space-y-6">
            <GlassCard className="p-6 sm:p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-400/60 bg-yellow-300/15 text-yellow-700">
                <MessageCircle size={27} />
              </div>

              <h2 className="text-2xl font-bold text-gray-950">
                Let's talk about your idea.
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Whether you need a full-stack application, a responsive
                frontend, backend APIs, or an AI-powered feature, I'm happy
                to discuss your requirements.
              </p>

              <div className="mt-7 flex items-center gap-3 text-sm text-gray-600">
                <Clock size={17} className="text-yellow-600" />
                Open to discussing new projects and opportunities
              </div>
            </GlassCard>

            {/* Contact information */}
            <GlassCard className="p-6 sm:p-8">
              <h3 className="mb-6 text-lg font-bold text-gray-950">
                Contact Information
              </h3>

              <div className="space-y-5">
                {contactDetails.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white/40 text-gray-700">
                        <Icon size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500">{item.label}</p>

                        {item.href ? (
                          <a
                            href={item.href}
                            className="mt-1 block break-words text-sm font-semibold text-gray-900 transition hover:text-yellow-700"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-1 text-sm font-semibold text-gray-900">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={copyEmail}
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/30 px-4 py-2.5 text-xs font-semibold text-gray-700 transition hover:border-yellow-400 hover:text-gray-950"
              >
                {copied ? (
                  <CheckCircle2 size={15} />
                ) : (
                  <Copy size={15} />
                )}
                {copied ? "Email copied" : "Copy email address"}
              </button>
            </GlassCard>

            {/* Social links */}
            <GlassCard className="p-6 sm:p-8">
              <h3 className="mb-5 text-lg font-bold text-gray-950">
                Find Me Online
              </h3>

              <div className="space-y-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-4 rounded-2xl border border-white/70 bg-white/25 p-4 transition hover:border-yellow-400/70 hover:bg-white/50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700">
                        <Icon size={20} />
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900">
                          {social.label}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {social.username}
                        </p>
                      </div>

                      <ArrowUpRight
                        size={17}
                        className="text-gray-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-yellow-700"
                      />
                    </a>
                  );
                })}
              </div>
            </GlassCard>
          </div>

          {/* Right side: contact form */}
          <GlassCard className="p-6 sm:p-9 lg:p-10">
            <div className="mb-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-yellow-700">
                Send a Message
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                Tell me what you're working on.
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Fill in the details below and your email application will open
                with the message prepared for you.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Your Name
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={updateField}
                    className={inputClasses}
                    aria-invalid={Boolean(errors.name)}
                  />

                  {errors.name && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Email Address
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={updateField}
                    className={inputClasses}
                    aria-invalid={Boolean(errors.email)}
                  />

                  {errors.email && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Subject
                </label>

                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="What would you like to discuss?"
                  value={form.subject}
                  onChange={updateField}
                  className={inputClasses}
                  aria-invalid={Boolean(errors.subject)}
                />

                {errors.subject && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Your Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  placeholder="Tell me a little about your project, goals, or opportunity..."
                  value={form.message}
                  onChange={updateField}
                  className={`${inputClasses} resize-y`}
                  aria-invalid={Boolean(errors.message)}
                />

                {errors.message && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-yellow-400 px-6 py-4 text-sm font-bold text-gray-950 transition hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-400/30"
              >
                Prepare Email
                <Send
                  size={17}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5"
                />
              </button>

              <p className="text-center text-xs leading-5 text-gray-500">
                This form opens your email app. It does not send or store
                messages directly on this website.
              </p>
            </form>
          </GlassCard>
        </section>

        {/* Bottom CTA */}
        <section className="mt-16">
          <GlassCard className="flex flex-col items-center justify-between gap-5 p-7 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="text-xl font-bold text-gray-950">
                Prefer email?
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Reach out directly and let's start a conversation.
              </p>
            </div>

            <a
              href="mailto:dhruvilshah3383@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl border border-yellow-400/70 bg-yellow-300/20 px-5 py-3 text-sm font-bold text-gray-900 transition hover:bg-yellow-300/50"
            >
              Email Me
              <ArrowUpRight size={17} />
            </a>
          </GlassCard>
        </section>

      
      </div>
    </main>
  );
}
