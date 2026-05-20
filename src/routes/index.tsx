import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portfolio — React Developer, Shopify Designer & Prompt Engineer" },
      {
        name: "description",
        content:
          "A minimal portfolio by a React JS developer, Shopify website designer and prompt engineer. Selected work, process, and a way to get in touch.",
      },
      { property: "og:title", content: "Portfolio — React Developer, Shopify Designer & Prompt Engineer" },
      {
        property: "og:description",
        content: "Selected work, process, and contact.",
      },
    ],
  }),
  component: Index,
});

const NAV = [
  { id: "intro", label: "01 — Intro" },
  { id: "about", label: "02 — About" },
  { id: "work", label: "03 — Work" },
  { id: "process", label: "04 — Process" },
  { id: "contact", label: "05 — Contact" },
];

function Index() {
  return (
    <div className="grain page-grid relative min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Intro />
        <About />
        <Work />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  const [active, setActive] = useState("intro");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-hairline/60">
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-14 flex items-center justify-between">
        <a href="#intro" className="relative text-[50px] font-serif text-[2vw] tracking-tight">
          Ps<span className="text-accent">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`transition-colors ${
                active === n.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="text-xs font-mono uppercase tracking-widest border-b border-foreground pb-0.5 hover:text-accent hover:border-accent transition-colors"
        >
          Say hello
        </a>
      </div>
    </header>
  );
}

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-12 md:mb-20">
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {index}
      </span>
      <span className="h-px flex-1 bg-hairline" />
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {title}
      </span>
    </div>
  );
}

function Intro() {
  const phrases = ["React apps.", "Shopify stores.", "WordPress websites.", "Interfaces.", "Prompts."];
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const current = phrases[i];
    const speed = del ? 50 : 90;
    const t = setTimeout(() => {
      if (!del && text === current) {
        setTimeout(() => setDel(true), 1400);
        return;
      }
      if (del && text === "") {
        setDel(false);
        setI((i + 1) % phrases.length);
        return;
      }
      setText(
        del ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1),
      );
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return (
    <section
      id="intro"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-4"
    >
      <div className="mx-auto w-full max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground fade-in">
          Portfolio — 2026 / Vol. 01
        </p>
        <h1 className="mt-8 font-serif text-[14vw] md:text-[9vw] leading-[0.95] tracking-tight text-balance fade-up">
          I develop <br />
          <span className="italic text-accent">thoughtful <br/> </span>{" "}
          <span className="caret">{text}</span>
        </h1>
        <div className="mt-12 grid md:grid-cols-12 gap-8 items-end">
          <p className="md:col-span-7 md:col-start-7 text-pretty text-lg md:text-xl leading-relaxed text-muted-foreground fade-up">
            A React developer, WordPress & Shopify website developer, and prompt engineer. I build digital experiences where development, design, commerce, and AI workflows come together — cleanly, thoughtfully, and with a strong sense of craft.
          </p>
        </div>
        <div className="mt-20 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-muted-foreground">
          <span>Scroll to begin</span>
          <span className="animate-pulse">↓</span>
          <span>Chapter 01 / 05</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      id="about"
      className="relative py-32 md:py-48 px-6 md:px-10 border-t border-hairline"
    >
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="02" title="About" />
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-6">
              The chapter where you meet me
            </p>
            <h2 className="font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight text-balance">
              A developer with a <em className="italic">vocabulary</em>.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 space-y-8 text-lg leading-relaxed text-pretty">
            <p>
I started as a website designer — focused on pixels, grids, and the small details that make a page feel right. Over time, I grew into a developer, building scalable experiences with React, WordPress, and Shopify. More recently, I’ve been using prompt engineering and AI tools to work faster, smarter, and with greater precision.            </p>
            <p className="text-muted-foreground">
Today I move between all of them. I build modern web applications, create Shopify and WordPress experiences, and use AI-assisted workflows to streamline development. For me, design, development, and prompt engineering are all part of the same discipline: creating clean, purposeful experiences by removing what doesn’t belong.            </p>
            <dl className="grid grid-cols-2 gap-x-[150px] gap-y-6 pt-8 border-t border-hairline">
              <Stat k="Years developing" v="1.5+" />
              <Stat k="Projects shipped" v="20+" />
              <Stat k="Disciplines" v="React · Shopify · Wordpress · Prompt" />
              <Stat k="Currently" v="Available" />
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
        {k}
      </dt>
      <dd className="font-serif text-2xl">{v}</dd>
    </div>
  );
}

const WORKS = [
  {
    n: "01",
    title: "TenderGrid",
    desc: "Tendergrid simplifies tendering with access to thousands of opportunities, automated alerts and corrigendum updates. We help bussinesses of all sizes to boost their chancesof wining contracts.",
    tags: ["WebApp · ", "React+JS ·", "2025"],
    link: "https://apps.growthgrids.com/tendergrid",
  },
  {
    n: "02",
    title: "Bidgrid ",
    desc: "The BidGrid, a platform that simplifies bid and procurement management.",
    tags: ["WebApp · ", "React+TS · ", "2025"],
    link: "https://yourwebsite.com",
  },
  {
    n: "03",
    title: "msRavinderKumar",
    desc: "Trusted Dry Fly Ash Supply & Logistics Partner Across India. Delivering quality dry fly ash and reliable transportation solutions to leading cement and infrastructure projects nationwide since 2010.",
    tags: ["Portfolio", "Wordpress", "2026"],
    link: "https://msravinderkumar.com",
  },
  {
    n: "04",
    title: "Bunaiwala",
    desc: "A place where designs come to life through careful craftsmanship and attention to detail. With vibrant colors, intricate embroidery, and signature mirror and lace work, every Bunaaiwalaa outfit is created to bring timeless elegance to your wardrobe.",
    tags: ["E-Commerce", "Shopify", "2025"],
    link: "https://bunaiwala.com",
  },
];

function Work() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <section
      id="work"
      className="relative py-32 md:py-48 px-6 md:px-10 border-t border-hairline"
    >
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="03" title="Selected Work" />

        <p className="font-serif text-3xl md:text-5xl leading-tight max-w-3xl mb-20 text-balance">
          Four projects I keep returning to —{" "}
          <span className="text-muted-foreground">
            each one a quiet argument for the kind of work I want to make next.
          </span>
        </p>

        <ul className="border-t border-hairline">
          {WORKS.map((w) => (
            <WorkRow
              key={w.n}
              {...w}
              open={openItem === w.n}
              onToggle={() =>
                setOpenItem(openItem === w.n ? null : w.n)
              }
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function WorkRow({
  n,
  title,
  desc,
  tags,
  link,
  open,
  onToggle,
}: {
  n: string;
  title: string;
  desc: string;
  tags: string[];
  link: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <li className="border-b border-hairline group">
      <button
        onClick={onToggle}
        className="w-full text-left py-8 md:py-10 flex items-baseline gap-6 md:gap-12 hover:px-4 transition-all duration-500"
      >
        <span className="font-mono text-xs text-muted-foreground">
          {n}
        </span>

        <span className="font-serif text-3xl md:text-5xl flex-1 group-hover:italic group-hover:text-accent transition-all">
          {title}
        </span>

        <span className="hidden md:flex gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
          {tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </span>

        <span className="font-mono text-xl text-muted-foreground w-6 text-right">
          {open ? "—" : "+"}
        </span>
      </button>

      <div
        className={`grid transition-all duration-700 ease-out ${
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-10 md:pl-24 max-w-2xl">
            <p className="text-lg text-muted-foreground text-pretty mb-6">
              {desc}
            </p>

            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-hairline px-5 py-3 text-sm uppercase tracking-widest font-mono hover:bg-foreground hover:text-background transition-all duration-300"
            >
              Visit Website →
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}

function Process() {
  const steps = [
    {
      n: "i.",
      t: "Listen",
      d: "Before the first component or prompt, I focus on understanding the product, the user, and the experience it should create.",
    },
    {
      n: "ii.",
      t: "Frame",
      d: "Ideas turn into systems — React apps, WordPress builds, Shopify stores, or AI-assisted workflows designed with purpose.",
    },
    {
      n: "iii.",
      t: "Shape",
      d: "I shape interfaces, logic, and user experiences together, where development and design naturally work as one.",
    },
    {
      n: "iv.",
      t: "Refine",
      d: "Then I simplify — improving performance, structure, and flow until everything feels clean, focused, and intentional.",
    },
  ];

  return (
    <section
      id="process"
      className="relative py-32 md:py-48 px-6 md:px-10 border-t border-hairline bg-foreground text-background"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-baseline gap-4 mb-12 md:mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-background/60">
            04
          </span>
          <span className="h-px flex-1 bg-background/20" />
          <span className="font-mono text-xs uppercase tracking-widest text-background/60">
            Process
          </span>
        </div>
        <h2 className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight max-w-5xl text-balance mb-16">
  <span className="italic text-accent">Building</span> digital <span className="italic text-accent">experiences</span>  <br />
  through development, design, and AI.
</h2>
        <ol className="grid md:grid-cols-2 gap-px bg-background/10">
          {steps.map((s) => (
            <li key={s.n} className="bg-foreground p-10 md:p-14">
              <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6">
                Step {s.n}
              </div>
              <h3 className="font-serif text-4xl md:text-5xl mb-4">{s.t}</h3>
              <p className="text-background/70 leading-relaxed text-pretty max-w-md">
                {s.d}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-24 overflow-hidden border-y border-background/15 py-6">
          <div className="marquee flex gap-12 whitespace-nowrap font-serif text-3xl md:text-5xl italic text-background/40">
            {Array.from({ length: 2 }).map((_, k) => (
              <span
                key={k}
                className="flex items-center gap-12 min-w-max"
              >
                <span>React Development.</span>
                <span className="text-accent not-italic font-sans text-2xl">✦</span>

                <span>WordPress Websites.</span>
                <span className="text-accent not-italic font-sans text-2xl">✦</span>

                <span>Shopify Stores.</span>
                <span className="text-accent not-italic font-sans text-2xl">✦</span>

                <span>UI/UX Design.</span>
                <span className="text-accent not-italic font-sans text-2xl">✦</span>

                <span>E-commerce Development.</span>
                <span className="text-accent not-italic font-sans text-2xl">✦</span>

                <span>Responsive Interfaces.</span>
                <span className="text-accent not-italic font-sans text-2xl">✦</span>

                <span>API Integrations.</span>
                <span className="text-accent not-italic font-sans text-2xl">✦</span>

                <span>Prompt Engineering.</span>
                <span className="text-accent not-italic font-sans text-2xl">✦</span>

                <span>AI-Assisted Development.</span>
                <span className="text-accent not-italic font-sans text-2xl">✦</span>

                <span>AI Workflows.</span>
                <span className="text-accent not-italic font-sans text-2xl">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="relative py-32 md:py-48 px-6 md:px-10 border-t border-hairline"
    >
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="05" title="Contact — The Last Chapter" />
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-6">
              Now you know me a little
            </p>
            <h2 className="font-serif text-5xl md:text-8xl leading-[0.98] tracking-tight text-balance">
              Let's write the <em className="italic">next</em> chapter
              <span className="text-accent">.</span>
            </h2>
            <a
              href="mailto:prateeksh03@gmail.com"
              className="group inline-flex items-center gap-4 mt-12 font-serif text-3xl md:text-5xl italic text-muted-foreground hover:text-accent transition-colors"
            >
              prateeksh03@gmail.com
              <span className="inline-block transition-transform group-hover:translate-x-2">
                →
              </span>
            </a>
          </div>
          <div className="md:col-span-4 md:col-start-9 space-y-10 mt-12 md:mt-0">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                Elsewhere
              </p>
              <ul className="space-y-2 text-lg">
                <li>
                  <a href="https://www.instagram.com/prateek._.650?igsh=MTM1aThzZDk3YTNycw%3D%3D&utm_source=qr" className="hover:text-accent transition-colors">
                    Instagram ↗
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/prateek-sharma-5064a7221" className="hover:text-accent transition-colors">
                    LinkedIn ↗
                  </a>
                </li>
                {/* <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Read.cv ↗
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    LinkedIn ↗
                  </a>
                </li> */}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                Currently
              </p>
              <p className="text-lg leading-relaxed text-pretty">
                Taking on one new project per month. Based remotely, working
                across time zones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-hairline px-6 md:px-10 py-10">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">
        <span>© 2026 — Built in React, designed for you, prompted with care.</span>
        <span>End of story. Refresh to read again.</span>
      </div>
    </footer>
  );
}
