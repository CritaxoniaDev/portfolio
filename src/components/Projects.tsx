import { useScrollReveal } from './hooks/useScrollReveal';

/* ──────────────────────────────────────────────────────────────
   TYPES
   ────────────────────────────────────────────────────────────── */
type Project = {
    title: string;
    description: string;
    technologies: string[];
    image: string;
    githubLink: string;
    liveLink: string;
    objective: string;
    highlight: string;
    category: 'industry' | 'academic' | 'personal' | string;
};

const projects: Project[] = [
    {
        title: 'CLaaS Mentor',
        description:
            'A smart learning platform that enables learners to access personalized courses, monitor academic progress, track MCQ and assignment scores, and receive subject or platform support seamlessly.',
        technologies: [
            'Laravel',
            'PHP',
            'Blade',
            'JavaScript',
            'Fabric API',
            'OpenEDX LMS API',
            'SQL Server',
            'Microsoft Auth API',
            'Microsoft Copilot Studio SDK',
            'Tailwind CSS',
        ],
        image: '/projects/adaptive-claas-mentor.png',
        githubLink: '#',
        liveLink: '#',
        objective:
            'Developed an adaptive learning management solution focused on personalized education, performance tracking, learner engagement, and integrated support assistance.',
        highlight: 'Adaptive Learning System',
        category: 'industry',
    },
    {
        title: 'Conversational Marketing AI App',
        description:
            'An enterprise-grade AI platform revolutionizing customer engagement through natural language processing, automated responses, and intelligent lead generation.',
        technologies: [
            'Laravel',
            'TinyMCE API',
            'PHP',
            'Blade',
            'JavaScript',
            'MySQL',
            'OpenAI API',
            'Microsoft Auth API',
            'CSS',
        ],
        image: '/projects/CMA.png',
        githubLink: '#',
        liveLink: '#',
        objective:
            'Developed an industry-level AI conversation platform that leverages natural language processing to automate customer interactions and improve lead generation.',
        highlight: 'OpenAI Integration',
        category: 'industry',
    },
    {
        title: "MarshalMuse",
        description: "A comprehensive suite of software development tools designed to streamline the development workflow, enhance collaboration, and improve code quality for development teams.",
        technologies: ["Svelte", "Tailwind CSS", "JavaScript", "Firebase", "Firebase Authentication", "Firebase Firestore"],
        image: "/projects/marshalmuse.png",
        githubLink: "https://github.com/CritaxoniaDev/MarshalMuse",
        liveLink: "https://marshalmuse.netlify.app/",
        objective: "Developed a comprehensive development tool suite that enhances team collaboration and streamlines the software development workflow.",
        highlight: "Firebase Integration",
        category: "educational"
    },
    {
        title: "MinstrelMuse",
        description: "A sleek music discovery platform with YouTube API integration, personalized playlists, and an immersive listening experience for music enthusiasts.",
        technologies: ["React", "Youtube API", "Tailwind", "CSS", "JavaScript", "Firebase Authentication", "Firebase Storage", "Firebase Firestore"],
        image: "/projects/minstrel-muse.png",
        githubLink: "https://github.com/CritaxoniaDev/MinstrelMuse",
        liveLink: "https://minstrel.vercel.app/",
        objective: "Create an engaging music discovery platform with seamless YouTube integration and personalized user experiences.",
        highlight: "YouTube API",
        category: "educational"
    },
    {
        title: "Meals on Wheels",
        description: "A compassionate solution enabling meal delivery to those in need, featuring volunteer management, meal planning, and real-time delivery tracking.",
        technologies: ["PHP", "Laravel", "Blade", "MySQL", "CSS", "JavaScript", "Tailwind", "Stripe API"],
        image: "/projects/project-6.png",
        githubLink: "https://github.com/CritaxoniaDev/Mealsonwheels",
        liveLink: "#",
        objective: "Design and develop a comprehensive software application for MerryMeal to streamline various processes including registration, meal planning, and delivery management.",
        highlight: "Stripe Integration",
        category: "educational"
    },
    {
        title: "ABC Cars Portal",
        description: "A feature-rich marketplace connecting buyers and sellers of used vehicles with advanced search, bidding system, and administrative controls.",
        technologies: ["JSP", "CSS", "Bootstrap", "JavaScript", "MySQL", "Java (Spring Framework)", "Spring Boot"],
        image: "/projects/project-5.png",
        githubLink: "https://github.com/CritaxoniaDev/ABCCarsPortal",
        liveLink: "#",
        objective: "Create a comprehensive online platform facilitating the buying and selling of used cars, with distinct functionalities for users and administrators.",
        highlight: "Advanced Search",
        category: "educational"
    },
    {
        title: "Enomy Finances",
        description: "A sophisticated financial management system with intuitive dashboards, secure transaction processing, and comprehensive reporting tools.",
        technologies: ["JSP", "CSS", "JavaScript", "Bootstrap", "MySQL", "Java (Spring Framework)"],
        image: "/projects/project-4.png",
        githubLink: "https://github.com/CritaxoniaDev/Enomy-Finances",
        liveLink: "#",
        objective: "Design and implement a new computer system for Enomy-Finances, including core system processes and software designs for client presentation.",
        highlight: "Secure Transactions",
        category: "educational"
    },
    {
        title: "DoBu Martial Arts",
        description: "An immersive digital platform for a martial arts gym showcasing various disciplines, personalized training programs, and membership management.",
        technologies: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"],
        image: "/projects/project-2.png",
        githubLink: "https://github.com/CritaxoniaDev/Dobu-Martial-Arts",
        liveLink: "#",
        objective: "Design and create an engaging website for DoBu Martial Arts, showcasing the gym's offerings and allowing users to manage their membership.",
        highlight: "Responsive Design",
        category: "educational"
    },
];

/* ──────────────────────────────────────────────────────────────
   HELPERS
   ────────────────────────────────────────────────────────────── */
const getDisplayURL = (project: Project): string => {
    if (project.liveLink && project.liveLink !== '#') {
        try {
            return new URL(project.liveLink).hostname.replace(/^www\./, '');
        } catch {
            return project.liveLink.replace(/^https?:\/\//, '').replace(/^www\./, '');
        }
    }
    const slug = project.title
        .toLowerCase()
        .split(/\s+/)
        .slice(0, 3)
        .join('-')
        .replace(/[^a-z0-9-]/g, '');
    return `${slug}.demo`;
};

/* ──────────────────────────────────────────────────────────────
   LAPTOP — flat ink-on-paper laptop mockup with browser chrome
   ────────────────────────────────────────────────────────────── */
type LaptopProps = {
    image: string;
    title: string;
    url: string;
};

const Laptop = ({ image, title, url }: LaptopProps) => (
    <div className="relative w-full">
        {/* ── LID / SCREEN ── */}
        <div className="relative bg-[#0a0a0a] p-[10px] shadow-[6px_6px_0_rgba(10,10,10,0.12)] sm:p-[12px]">
            {/* Tiny camera dot on top bezel */}
            <span className="absolute left-1/2 top-[3px] block h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-white/35 sm:top-[4px]" />

            {/* Screen interior */}
            <div className="relative flex aspect-[16/10] flex-col overflow-hidden bg-[rgb(230,228,220)]">
                {/* Browser chrome */}
                <div className="flex shrink-0 items-center gap-2 border-b border-black/15 bg-[rgb(240,238,230)] px-2.5 py-1.5 sm:gap-3 sm:px-3 sm:py-2">
                    {/* traffic lights */}
                    <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
                        <span className="block h-[7px] w-[7px] rounded-full border border-black/30 sm:h-2 sm:w-2" />
                        <span className="block h-[7px] w-[7px] rounded-full border border-black/30 sm:h-2 sm:w-2" />
                        <span className="block h-[7px] w-[7px] rounded-full border border-black/30 sm:h-2 sm:w-2" />
                    </div>
                    {/* URL bar */}
                    <div className="mx-auto flex h-[18px] max-w-[70%] flex-1 items-center justify-center border border-black/20 bg-[rgb(244,243,238)] px-2 sm:h-5">
                        <span className="block h-[5px] w-[5px] shrink-0 rotate-45 border-r border-t border-black/50 sm:h-[6px] sm:w-[6px]" />
                        <span className="ml-1.5 truncate font-mono text-[0.5rem] tracking-[0.04em] text-black/55 sm:ml-2 sm:text-[0.58rem]">
                            {url}
                        </span>
                    </div>
                    {/* tiny menu hint */}
                    <span className="hidden shrink-0 font-mono text-[0.55rem] tracking-[0.2em] text-black/35 sm:inline">
                        ⋯
                    </span>
                </div>

                {/* The image */}
                <div className="relative flex-1 overflow-hidden bg-[rgb(225,222,212)]">
                    <img
                        src={image}
                        alt={`Screenshot of ${title}`}
                        loading="lazy"
                        className="absolute inset-0 block h-full w-full object-cover object-top"
                        onError={(e) => {
                            const el = e.currentTarget as HTMLImageElement;
                            el.style.display = 'none';
                        }}
                    />
                    {/* Subtle vignette / scanline texture for ink-on-paper feel */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.04]"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
                        }}
                    />
                </div>
            </div>
        </div>

        {/* ── HINGE LINE ── */}
        <div className="relative h-px w-full" />

        {/* ── BASE — trapezoid slightly wider than the lid ── */}
        <div className="relative mx-auto" style={{ width: '105%' }}>
            <div
                className="h-[10px] bg-[#0a0a0a] sm:h-[12px]"
                style={{ clipPath: 'polygon(2.5% 0%, 97.5% 0%, 100% 100%, 0% 100%)' }}
            />
            {/* Front edge notch — the dip where you'd open the lid */}
            <div
                aria-hidden="true"
                className="absolute left-1/2 top-[1px] h-[3px] w-[18%] -translate-x-1/2 bg-[rgb(240,238,230)]"
                style={{ clipPath: 'polygon(15% 0, 85% 0, 75% 100%, 25% 100%)' }}
            />
            {/* Soft shadow beneath laptop on the "paper" */}
            <div
                aria-hidden="true"
                className="mx-auto mt-1 h-[2px] w-[92%] bg-black/15 blur-[1px]"
            />
        </div>
    </div>
);

type ProjectCardProps = {
    project: Project;
    index: number;
    total: number;
};

const ProjectCard = ({ project, index, total }: ProjectCardProps) => {
    const isAlternate = index % 2 === 1;
    const plateNum = String(index + 1).padStart(2, '0');
    const totalNum = String(total).padStart(2, '0');

    return (
        <article className="relative">
            {/* ── Card top meta strip ── */}
            <header className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-black/15 pb-3 sm:mb-8">
                <div className="flex items-center gap-3 font-mono text-[0.62rem] leading-none tracking-[0.18em] text-black/45 smallcaps">
                    <span className="block h-px w-5 bg-black/30" />
                    <span>Plate {plateNum} / {totalNum}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {/* Highlight tag */}
                    <span className="inline-flex items-center gap-1.5 border border-black/70 bg-[rgb(240,238,230)] px-2 py-0.5 font-mono text-[0.58rem] leading-none tracking-[0.16em] text-black smallcaps shadow-[2px_2px_0_rgba(10,10,10,0.85)]">
                        <span className="text-[0.7rem] leading-none">✦</span>
                        {project.highlight}
                    </span>
                    {/* Category stamp */}
                    <span className="inline-flex items-center font-mono text-[0.58rem] leading-none tracking-[0.2em] text-black/55 smallcaps">
                        Filed under — {project.category}
                    </span>
                </div>
            </header>

            {/* ── Card body: laptop + details ── */}
            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
                {/* Laptop side */}
                <div
                    className={`relative ${isAlternate ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7 lg:order-1'
                        }`}
                >
                    {/* Marginalia above the laptop */}
                    <div className="mb-4 flex items-center justify-between gap-3 font-mono text-[0.58rem] leading-none tracking-[0.18em] text-black/40 smallcaps">
                        <span className="flex items-center gap-2">
                            <span className="relative flex h-1.5 w-1.5">
                                <span
                                    className="absolute inset-0 rounded-full pulse-soft"
                                    style={{ background: 'rgb(118, 138, 102)' }}
                                />
                            </span>
                            Specimen — viewed on glass
                        </span>
                        <span className="hidden sm:inline">Fig. {plateNum}</span>
                    </div>

                    {/* Corner-ticked frame around the laptop */}
                    <div className="relative px-2 py-6 sm:px-4 sm:py-8">
                        <span className="corner-tick tl absolute top-0 left-0 block h-3 w-3" />
                        <span className="corner-tick tr absolute top-0 right-0 block h-3 w-3" />
                        <span className="corner-tick bl absolute bottom-0 left-0 block h-3 w-3" />
                        <span className="corner-tick br absolute bottom-0 right-0 block h-3 w-3" />

                        <Laptop
                            image={project.image}
                            title={project.title}
                            url={getDisplayURL(project)}
                        />
                    </div>

                    {/* Caption beneath the laptop */}
                    <p className="mt-4 text-center font-serif-alt text-sm italic leading-tight text-black/55 sm:text-base">
                        — {project.title}, on the screen.
                    </p>
                </div>

                {/* Details side */}
                <div
                    className={`relative flex flex-col gap-6 ${isAlternate ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5 lg:order-2'
                        }`}
                >
                    {/* Large plate number — ghost */}
                    <div className="relative">
                        <span
                            aria-hidden="true"
                            className="ghost-number absolute -top-6 right-0 select-none font-black leading-none pointer-events-none"
                            style={{ fontSize: 'clamp(4.5rem, 12vw, 9rem)' }}
                        >
                            {plateNum}
                        </span>
                    </div>

                    {/* Title */}
                    <div className="relative z-10">
                        <p className="mb-3 flex items-center gap-3 font-mono text-[0.62rem] leading-none tracking-[0.18em] text-black/55 smallcaps">
                            <span className="block h-px w-8 bg-black/40" />
                            The work
                        </p>
                        <h3
                            className="font-black leading-[0.95]"
                            style={{
                                fontSize: 'clamp(1.85rem, 4vw, 3rem)',
                                letterSpacing: '-0.01em',
                                textWrap: 'balance',
                            }}
                        >
                            {project.title}
                        </h3>
                    </div>

                    {/* Objective — pulled out as italic block quote */}
                    <blockquote className="relative border-l-2 border-black/40 pl-4 sm:pl-5">
                        <p className="font-serif-alt text-[1.05rem] italic leading-[1.55] text-black/75 sm:text-[1.15rem]">
                            — {project.objective}
                        </p>
                    </blockquote>

                    {/* Description */}
                    <div className="relative">
                        <p className="mb-2 flex items-center gap-3 font-mono text-[0.58rem] leading-none tracking-[0.18em] text-black/45 smallcaps">
                            <span className="block h-px w-5 bg-black/30" />
                            Notes from the field
                        </p>
                        <p style={{ fontFamily: 'Inter Variable' }} className="text-[0.95rem] leading-[1.65] text-black/75 sm:text-base">
                            {project.description}
                        </p>
                    </div>

                    {/* Technologies / Manifest */}
                    <div className="relative">
                        <div className="mb-3 flex items-center justify-between gap-3 font-mono text-[0.58rem] leading-none tracking-[0.18em] text-black/45 smallcaps">
                            <span className="flex items-center gap-3">
                                <span className="block h-px w-5 bg-black/30" />
                                Materials & instruments
                            </span>
                            <span className="text-black/35">
                                {String(project.technologies.length).padStart(2, '0')} items
                            </span>
                        </div>
                        <ul className="flex flex-wrap gap-1.5">
                            {project.technologies.map((tech) => (
                                <li
                                    key={tech}
                                    className="border border-black/30 bg-[rgb(240,238,230)] px-2 py-1 font-mono text-[0.62rem] leading-none tracking-[0.1em] text-black/65 smallcaps transition-all duration-300 hover:-translate-y-0.5 hover:border-black/75 hover:bg-[rgb(243,241,233)] hover:text-black hover:shadow-[2px_2px_0_rgba(10,10,10,0.85)]"
                                >
                                    {tech}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Action links */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        <a
                            href={project.liveLink}
                            target={project.liveLink !== '#' ? '_blank' : undefined}
                            rel={project.liveLink !== '#' ? 'noopener noreferrer' : undefined}
                            className="group relative inline-flex items-center gap-3 border border-black bg-[#0a0a0a] px-4 py-2.5 font-mono text-[0.62rem] leading-none tracking-[0.18em] text-[rgb(244,243,238)] smallcaps shadow-[4px_4px_0_rgba(10,10,10,0.85)] transition-all duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_rgba(10,10,10,0.85)] focus:outline-none focus:ring-1 focus:ring-black"
                        >
                            <span>Visit live site</span>
                            <span className="transition-transform group-hover:translate-x-1">↗</span>
                        </a>
                        <a
                            href={project.githubLink}
                            target={project.githubLink !== '#' ? '_blank' : undefined}
                            rel={project.githubLink !== '#' ? 'noopener noreferrer' : undefined}
                            className="group relative inline-flex items-center gap-3 border border-black bg-[rgb(244,243,238)] px-4 py-2.5 font-mono text-[0.62rem] leading-none tracking-[0.18em] text-black smallcaps shadow-[4px_4px_0_rgba(10,10,10,0.85)] transition-all duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_rgba(10,10,10,0.85)] focus:outline-none focus:ring-1 focus:ring-black"
                        >
                            <span>View source</span>
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* ── Card footer: closing line ── */}
            <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-black/15 pt-3 sm:mt-14">
                <span className="font-mono text-[0.58rem] tracking-[0.18em] text-black/40 smallcaps">
                    End of Plate {plateNum}
                </span>
                <span className="hidden font-serif-alt text-sm italic text-black/45 sm:inline">
                    — turn the page —
                </span>
                <span className="font-mono text-[0.58rem] tracking-[0.18em] text-black/40 smallcaps">
                    {plateNum} / {totalNum}
                </span>
            </footer>
        </article>
    );
};

export const Projects = () => {
    const [ref] = useScrollReveal();
    const total = projects.length;

    return (
        <section
            ref={ref}
            id="projects"
            className="relative w-full overflow-hidden border-b border-black/15 bg-[rgb(244,243,238)] px-5 py-20 sm:px-6 sm:py-24 md:px-12 md:py-28 lg:py-32"
        >
            {/* Backgrounds */}
            <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" />
            <div className="absolute inset-0 dot-grid pointer-events-none" />
            <div className="absolute inset-0 grain pointer-events-none" />

            {/* Radial highlights */}
            <div
                className="absolute -top-40 -right-32 h-[420px] w-[420px] rounded-full pointer-events-none sm:h-[520px] sm:w-[520px] md:-top-48 md:-right-40 md:h-[640px] md:w-[640px]"
                style={{ background: 'radial-gradient(circle, rgba(180,150,110,0.14), transparent 64%)' }}
            />
            <div
                className="absolute -bottom-40 -left-32 h-[380px] w-[380px] rounded-full pointer-events-none sm:h-[480px] sm:w-[480px] md:-bottom-48 md:-left-40 md:h-[600px] md:w-[600px]"
                style={{ background: 'radial-gradient(circle, rgba(150,160,140,0.12), transparent 64%)' }}
            />

            {/* Vertical archive label */}
            <span
                className="vertical-rl absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 text-[0.68rem] text-black/45 smallcaps fade-up sm:block md:left-6"
                style={{ animationDelay: '0.5s' }}
            >
                The Plates · {total} on file
            </span>

            <div className="relative z-10 mx-auto w-full max-w-[1400px]">
                {/* ── Top section plate ── */}
                <div
                    className="mb-14 flex items-center justify-between gap-4 border-b border-black/15 pb-3 fade-up sm:mb-20 md:mb-24"
                    style={{ animationDelay: '0.3s' }}
                >
                    <span className="flex items-center gap-3 font-mono text-[0.62rem] leading-none tracking-[0.18em] text-black/45 smallcaps">
                        <span className="block h-px w-6 bg-black/30" />
                        Vol. 003 / Projects
                    </span>
                    <span className="hidden font-mono text-[0.62rem] tracking-[0.18em] text-black/35 smallcaps sm:inline">
                        Selected plates · from the studio
                    </span>
                    <span className="font-mono text-[0.62rem] tracking-[0.18em] text-black/35 smallcaps">
                        {String(total).padStart(2, '0')} Plates
                    </span>
                </div>

                {/* ── Title area ── */}
                <div className="relative mb-16 sm:mb-24 md:mb-28">
                    <div
                        className="ghost-number absolute -top-8 left-0 select-none font-black leading-none pointer-events-none sm:-top-16 md:-top-24"
                        aria-hidden="true"
                    >
                        07
                    </div>

                    <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
                        <div className="relative z-10 lg:col-span-7">
                            <p
                                className="mb-5 flex items-center gap-3 text-[0.72rem] leading-none text-black/65 smallcaps fade-up sm:text-[0.76rem]"
                                style={{ animationDelay: '0.4s' }}
                            >
                                <span className="block h-px w-8 shrink-0 bg-black/40 sm:w-10" />
                                <span>Section 004 — The Plates</span>
                                <span className="hidden shrink-0 font-mono text-black/40 xs:inline">— 004</span>
                            </p>

                            <h2
                                className="hero-title font-black fade-up"
                                style={{ animationDelay: '0.55s' }}
                            >
                                <span className="title-word">Plates</span>{' '}
                                <span className="title-word"><em>of</em></span>{' '}
                                <span className="title-word">recent</span>
                                <br />
                                <span className="title-word">
                                    work
                                    <span className="hero-mark align-top font-normal italic text-black/40">IV</span>
                                </span>
                            </h2>
                        </div>

                        <div
                            className="relative z-10 lg:col-span-5 lg:pt-12 fade-up"
                            style={{ animationDelay: '0.75s' }}
                        >
                            <div className="mb-4 flex items-center gap-3 font-mono text-[0.6rem] leading-none tracking-[0.18em] text-black/40 smallcaps">
                                <span className="block h-px w-6 bg-black/25" />
                                Note to the Reader
                            </div>
                            <p className="font-serif-alt max-w-[30rem] text-[1.1rem] italic leading-[1.5] text-black/70 sm:text-[1.2rem]">
                                A small index of things made, examined under glass.
                                Each plate carries its objective, its materials, and a
                                window on the work itself.{' '}
                                <span className="not-italic font-mono text-[0.7rem] tracking-[0.1em] text-black/55 smallcaps">
                                    Hover any item to view in detail.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── The Plates ── */}
                <div className="relative border-t border-black/20 fade-up" style={{ animationDelay: '0.4s' }}>
                    {/* Top marginalia on the border */}
                    <span className="font-serif-alt absolute -top-[0.95rem] left-0 z-10 inline-block bg-[rgb(244,243,238)] pr-4 text-sm italic leading-none text-black/55">
                        The Plates.
                    </span>
                    <span className="font-mono absolute -top-[0.75rem] right-0 z-10 hidden bg-[rgb(244,243,238)] pl-3 text-[0.6rem] leading-none tracking-[0.18em] text-black/40 smallcaps sm:inline-block">
                        {String(total).padStart(2, '0')} entries · 001 — {String(total).padStart(3, '0')}
                    </span>

                    <div className="space-y-20 pt-14 sm:space-y-28 sm:pt-20 md:space-y-32 md:pt-24">
                        {projects.map((project, i) => (
                            <ProjectCard
                                key={project.title}
                                project={project}
                                index={i}
                                total={total}
                            />
                        ))}
                    </div>

                    <div className="mt-20 border-t border-black/20 sm:mt-28" aria-hidden="true" />
                </div>

                {/* ── Closing flourish ── */}
                <div
                    className="mt-10 flex items-center justify-center gap-4 fade-up sm:mt-14"
                    style={{ animationDelay: '0.9s' }}
                >
                    <span className="block h-px w-16 bg-black/20 sm:w-24" />
                    <span className="font-serif-alt text-base italic text-black/45 sm:text-lg">
                        — fin des plaques —
                    </span>
                    <span className="block h-px w-16 bg-black/20 sm:w-24" />
                </div>

                {/* ── Bottom meta ── */}
                <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-black/15 pt-4 sm:mt-16">
                    <span className="font-mono text-[0.62rem] tracking-[0.18em] text-black/40 smallcaps">
                        [ 003 / 005 ] - Projects
                    </span>
                    <span className="hidden font-mono text-[0.62rem] tracking-[0.18em] text-black/35 smallcaps sm:inline">
                        {total} plates · cataloged & dated
                    </span>
                    <a
                        href="#contact"
                        className="group inline-flex items-center gap-3 font-mono text-[0.62rem] leading-none tracking-[0.18em] text-black/55 smallcaps transition-colors hover:text-black"
                    >
                        Continue to Contact
                        <span className="relative block h-px w-10 overflow-hidden bg-black/25">
                            <span className="absolute inset-0 origin-left scale-x-0 bg-black transition-transform duration-500 group-hover:scale-x-100" />
                        </span>
                        <span className="transition-transform group-hover:translate-x-1">↓</span>
                    </a>
                </div>
            </div>
        </section>
    );
};