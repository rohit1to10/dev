'use client'

import dynamic from 'next/dynamic'
import { FlipLinks } from '@/components/ui/flip-links'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const GenerativeArtScene = dynamic(
  () => import('@/components/ui/anomalous-matter-hero').then((m) => m.GenerativeArtScene),
  { ssr: false }
)

// ─── Scroll-reveal wrapper ───────────────────────────────────────────────────
function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className,
}: {
  children: React.ReactNode
  direction?: 'up' | 'left' | 'right'
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x: direction === 'left' ? -36 : direction === 'right' ? 36 : 0,
        y: direction === 'up' ? 28 : 0,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

// ─── Section: Energy / Reason to Hire ──────────────────────────────────────
function EnergySection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-8 py-24">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-zinc-500 text-sm tracking-[0.3em] uppercase mb-4">Reason to hire me</p>
        <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-16 leading-tight">
          Energy I will bring
          <br />
          <span className="text-zinc-400">to the team</span>
        </h1>

        <div className="flex justify-center">
          <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl max-w-md w-full mx-auto">
            <Image
              src="/energy-meme.jpeg"
              alt="Energy meme"
              width={800}
              height={800}
              className="w-full h-auto object-contain"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Section: Stats bar ──────────────────────────────────────────────────────
const stats = [
  { value: '15–20%', label: 'Latency reduction' },
  { value: '12–15%', label: 'Revenue uplift' },
  { value: '10K+', label: 'Daily geo requests' },
  { value: '100+', label: 'Users unblocked' },
]

function StatsBar() {
  return (
    <section className="relative border-t border-zinc-900 px-8 py-16">
      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <Reveal key={s.label} direction="up" delay={i * 0.08}>
            <p className="text-white text-4xl sm:text-5xl font-black tracking-tight">{s.value}</p>
            <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase mt-2">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ─── Section: About ─────────────────────────────────────────────────────────
function AboutSection() {
  const traits = [
    'Event-driven systems (Kafka)',
    'Real-time pricing & forecasting',
    'Geospatial computation',
    'Microservices on Kubernetes',
    'Redis caching strategies',
    'A/B testing (GrowthBook)',
    'RBAC & secure data handling',
    'Cross-functional delivery',
  ]
  return (
    <section className="relative px-8 py-24 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_320px] gap-16 items-start">
        <Reveal direction="left">
          <p className="text-zinc-500 text-sm tracking-[0.3em] uppercase mb-6">About</p>
          <h2 className="text-white text-4xl sm:text-5xl font-black mb-8 leading-tight">
            Rohit Kagitha
          </h2>
          <p className="text-zinc-300 text-lg leading-relaxed mb-6">
            Backend Engineer with 4+ years of experience owning critical distributed systems at scale.
            I specialise in event-driven architecture, real-time computation engines, and microservices
            that move fast under load — built in Java + Spring Boot, deployed on Kubernetes, and
            wired together with Kafka and Redis.
          </p>
          <p className="text-zinc-400 text-base leading-relaxed mb-6">
            At Zoomcar I owned two production systems end-to-end: a real-time dynamic pricing engine
            that directly moved revenue, and a geospatial service processing 10K+ daily requests with
            sub-100ms latency. Before that I designed a config-driven no-code platform at Brane
            Enterprises that unblocked 100+ non-technical users from needing engineering involvement.
          </p>
          <p className="text-zinc-500 text-sm leading-relaxed">
            IIT Indore · Electrical Engineering · 2021
          </p>
        </Reveal>

        <Reveal direction="right" delay={0.15} className="space-y-4 pt-16">
          {traits.map((trait, i) => (
            <motion.div
              key={trait}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease: 'easeOut' }}
            >
              <span className="w-1 h-1 rounded-full bg-zinc-600 shrink-0" />
              <span className="text-zinc-400 text-sm">{trait}</span>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

// ─── Section: Experience ─────────────────────────────────────────────────────
type ExperienceSystem = { name: string; bullets: string[] }
type ExperienceItem = {
  role: string
  company: string
  duration: string
  systems: ExperienceSystem[]
  tech: string
}

const experiences: ExperienceItem[] = [
  {
    role: 'Software Engineer II',
    company: 'Zoomcar',
    duration: 'Aug 2024 – Present',
    systems: [
      {
        name: 'Pluto Pricing Service',
        bullets: [
          'Owned the real-time pricing engine impacting booking conversion and host earnings across thousands of vehicles',
          'Designed event-driven architecture with Apache Kafka, cutting end-to-end latency by 15–20%',
          'Integrated ARIMA-based demand forecasting and live search signals for dynamic price computation',
          'Led rollout of Commute Pricing and Limited KM Packages, driving 12–15% revenue uplift',
          'Improved host pricing recommendation logic, increasing host retention by ~30%',
          'Implemented Redis caching to handle high-throughput pricing queries with minimal DB pressure',
          'Enabled A/B experimentation via GrowthBook for pricing features without redeployments',
          'Deployed and scaled microservices on Kubernetes for fault tolerance and high availability',
        ],
      },
      {
        name: 'Geo Service',
        bullets: [
          'Designed and scaled a geospatial service handling distance computation across pricing and booking workflows',
          'Processed 10K+ daily geo requests with sub-100ms latency via caching and request batching',
          'Integrated Google Distance Matrix API with intelligent fallback and retry strategies',
          'Built geofencing system for city hotspots enabling location-based pricing and delivery logic',
          'Reduced external API costs by 30–40% through Redis caching and request deduplication',
          'Standardised geo computations across services, improving consistency in fare and trip calculations',
        ],
      },
    ],
    tech: 'Java · Spring Boot · Kafka · Redis · PostgreSQL · Kubernetes · GCP · GrowthBook · ARIMA',
  },
  {
    role: 'Software Development Engineer',
    company: 'Brane Enterprises',
    duration: '2023 – 2024',
    systems: [
      {
        name: 'No-Code Workflow Platform',
        bullets: [
          'Built the entire backend for a no-code platform enabling 100+ internal users to create and deploy workflows without engineering support',
          'Designed config-driven execution engine — workflow logic defined declaratively, zero code changes for new features',
          'Developed scalable REST APIs in Java + Spring Boot supporting dynamic workflow execution',
          'Improved API response times by 30–40% through query optimisation, indexing, and caching',
          'Decoupled workflow logic from core services to ensure scalability and ease of maintenance',
          'Collaborated with product and frontend teams to deliver highly customisable workflow capabilities',
        ],
      },
    ],
    tech: 'Java · Spring Boot · Microservices · MongoDB · REST APIs',
  },
  {
    role: 'Full Stack Developer',
    company: 'Accolite Digital',
    duration: '2020 – 2023',
    systems: [
      {
        name: 'Org-Wide Internal Platform',
        bullets: [
          'Built internal platforms used across multiple business teams, streamlining operations and eliminating manual workflows',
          'Designed and optimised PostgreSQL schemas and DAO layers, improving query efficiency significantly',
          'Integrated Google Sheets APIs to build automated data ingestion pipelines',
          'Implemented RBAC for secure handling of sensitive financial and employee data',
          'Built frontend components in Angular and React Native supporting internal operational workflows',
          'Delivered end-to-end across backend, database, and UI layers',
        ],
      },
    ],
    tech: 'Java · Angular · React Native · PostgreSQL · Google APIs · RBAC',
  },
]

function ExperienceSection() {
  return (
    <section className="relative px-8 py-24 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto">
        <p className="text-zinc-500 text-sm tracking-[0.3em] uppercase mb-12">Experience</p>

        <div className="space-y-20">
          {experiences.map((exp, i) => (
            <div key={i}>
              <Reveal direction={i % 2 === 0 ? 'left' : 'right'}>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 mb-8">
                  <div className="md:pt-1">
                    <p className="text-zinc-500 text-xs tracking-wide">{exp.duration}</p>
                    <p className="text-zinc-300 text-sm font-medium mt-1">{exp.company}</p>
                    <p className="text-zinc-600 text-xs mt-1">{exp.role}</p>
                  </div>
                  <div className="space-y-8">
                    {exp.systems.map((sys, j) => (
                      <div key={j}>
                        <p className="text-white text-base font-semibold mb-4 tracking-wide">
                          {sys.name}
                        </p>
                        <ul className="space-y-2.5">
                          {sys.bullets.map((b, k) => (
                            <li key={k} className="text-zinc-400 text-sm leading-relaxed flex gap-3">
                              <span className="text-zinc-700 mt-1.5 shrink-0">→</span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <p className="text-zinc-700 text-xs tracking-wide pt-2">{exp.tech}</p>
                  </div>
                </div>
              </Reveal>
              {i < experiences.length - 1 && <div className="border-t border-zinc-900" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section: Projects ───────────────────────────────────────────────────────
type Project = {
  title: string
  tag: string
  problem: string
  built: string[]
  impact: string[]
  tech: string
}

const projects: Project[] = [
  {
    title: 'Pluto Pricing Engine',
    tag: 'Zoomcar · Production',
    problem: 'Zoomcar needed pricing that adapts to real-time demand across thousands of vehicles — static pricing was leaving revenue on the table.',
    built: [
      'Real-time engine integrating ARIMA demand forecasting with live search signals',
      'Kafka event pipeline reducing end-to-end pricing latency by 15–20%',
      'Redis caching layer handling high-throughput queries with minimal DB load',
      'Commute Pricing & Limited KM Packages rolled out via GrowthBook A/B testing',
      'Kubernetes-deployed microservices with fault tolerance and auto-scaling',
    ],
    impact: ['12–15% revenue uplift', '15–20% latency reduction', '~30% improvement in host retention'],
    tech: 'Java · Spring Boot · Kafka · Redis · Kubernetes · GrowthBook · ARIMA · GCP',
  },
  {
    title: 'Geo Service',
    tag: 'Zoomcar · Production',
    problem: 'Pricing and booking workflows depended on expensive, slow external geo APIs with no resilience — any API blip caused cascading failures.',
    built: [
      'Geospatial service handling distance computation across all pricing and booking flows',
      'Request batching + Redis caching achieving sub-100ms p99 latency at 10K+ daily requests',
      'Google Distance Matrix integration with intelligent fallback and retry logic',
      'Geofencing engine for city hotspots enabling location-based pricing and delivery',
      'Request deduplication reducing external API spend by 30–40%',
    ],
    impact: ['10K+ daily requests at sub-100ms', '30–40% external API cost reduction', 'Zero cascading failures post-launch'],
    tech: 'Java · Spring Boot · Redis · Google Distance Matrix API · Kubernetes · PostgreSQL',
  },
  {
    title: 'No-Code Workflow Platform',
    tag: 'Brane Enterprises · Production',
    problem: 'Every workflow change required engineering involvement — product and ops teams were blocked for days on simple automations.',
    built: [
      'Config-driven execution engine — workflows defined declaratively, zero deployments for changes',
      'Dynamic REST API generation from workflow configuration at runtime',
      'Scalable Spring Boot backend supporting concurrent multi-tenant workflow execution',
      'API layer optimised with query tuning and caching, improving response times by 30–40%',
      'Modular service architecture decoupling workflow logic from core services',
    ],
    impact: ['100+ internal users unblocked', '30–40% API performance improvement', 'Zero-engineering workflow deployments'],
    tech: 'Java · Spring Boot · Microservices · MongoDB · REST APIs',
  },
]

function ProjectsSection() {
  return (
    <section className="relative px-8 py-24 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto">
        <p className="text-zinc-500 text-sm tracking-[0.3em] uppercase mb-12">Case Studies</p>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <Reveal key={i} direction="up" delay={i * 0.1}>
            <div
              className="border border-zinc-800 rounded-2xl p-8 hover:border-zinc-600 transition-colors duration-300 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-5">
                <div>
                  <h3 className="text-white text-2xl font-black">{project.title}</h3>
                  <p className="text-zinc-600 text-xs tracking-wide mt-1">{project.tag}</p>
                </div>
                <div className="flex flex-wrap gap-2 sm:text-right">
                  {project.impact.map((imp) => (
                    <span key={imp} className="text-xs text-zinc-400 border border-zinc-800 rounded-full px-3 py-1 group-hover:border-zinc-700 transition-colors">
                      {imp}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-zinc-500 text-sm leading-relaxed mb-6 italic">
                {project.problem}
              </p>

              <ul className="space-y-2 mb-6">
                {project.built.map((b, j) => (
                  <li key={j} className="text-zinc-300 text-sm flex gap-3 leading-relaxed">
                    <span className="text-zinc-700 shrink-0 mt-1">→</span>
                    {b}
                  </li>
                ))}
              </ul>

              <p className="text-zinc-700 text-xs tracking-wide">{project.tech}</p>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section: Skills ─────────────────────────────────────────────────────────
const skillGroups = [
  {
    label: 'Languages',
    items: ['Java', 'TypeScript', 'Python', 'SQL'],
  },
  {
    label: 'Backend',
    items: ['Spring Boot', 'Microservices', 'Kafka', 'Event-driven arch', 'REST APIs'],
  },
  {
    label: 'Data & Caching',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Query optimisation'],
  },
  {
    label: 'Infrastructure',
    items: ['Kubernetes', 'GCP', 'Docker', 'CI/CD'],
  },
  {
    label: 'Experimentation',
    items: ['GrowthBook', 'A/B testing', 'Feature flags', 'ARIMA forecasting'],
  },
  {
    label: 'APIs & Integrations',
    items: ['Google Maps / Distance Matrix', 'Geofencing', 'RBAC', 'Google Sheets API'],
  },
]

function SkillsSection() {
  return (
    <section className="relative px-8 py-24 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto">
        <p className="text-zinc-500 text-sm tracking-[0.3em] uppercase mb-12">Skills</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} direction="up" delay={i * 0.07}>
              <p className="text-zinc-500 text-xs tracking-wider uppercase mb-4">{group.label}</p>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-zinc-300 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-zinc-700 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Education ───────────────────────────────────────────────────────────────
function EducationSection() {
  return (
    <section className="relative px-8 py-16 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto">
        <p className="text-zinc-500 text-sm tracking-[0.3em] uppercase mb-6">Education</p>
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
          <p className="text-zinc-500 text-sm">2017 – 2021</p>
          <div>
            <h3 className="text-white text-xl font-bold">Indian Institute of Technology Indore</h3>
            <p className="text-zinc-400 text-sm mt-1">B.Tech — Electrical Engineering</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative border-t border-zinc-900 overflow-hidden">
      <div className="max-w-4xl mx-auto px-8 pt-16 pb-4">
        <p className="text-zinc-500 text-sm tracking-[0.3em] uppercase mb-2">Get in touch</p>
        <p className="text-zinc-400 text-base mb-2">Open to backend and distributed systems roles</p>
        <p className="text-zinc-600 text-sm mb-8">+91 83094 40714</p>
      </div>

      <FlipLinks
        links={[
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kagitha-rohit-85a0b81a1' },
          { label: 'GitHub', href: 'https://github.com/rohitkagitha' },
          { label: 'Email', href: 'mailto:rohitkagitha@gmail.com' },
          { label: 'Phone', href: 'tel:+918309440714' },
        ]}
      />

      <div className="max-w-4xl mx-auto px-8 pb-8 pt-4">
        <p className="text-zinc-700 text-xs">© 2025 Rohit Kagitha</p>
      </div>
    </footer>
  )
}

// ─── Portfolio Page ──────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const router = useRouter()
  const navigatingRef = useRef(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Scroll up at the very top → back to landing
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (window.scrollY === 0 && e.deltaY < -20 && !navigatingRef.current) {
        navigatingRef.current = true
        router.push('/')
      }
    }

    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY }
    const onTouchEnd = (e: TouchEvent) => {
      const swipedDown = e.changedTouches[0].clientY - touchStartY > 50
      if (window.scrollY === 0 && swipedDown && !navigatingRef.current) {
        navigatingRef.current = true
        router.push('/')
      }
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [router])

  return (
    <div className={`relative min-h-screen bg-black text-white transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Spiral animation — fixed background, paused */}
      {/* Three.js wireframe — fixed background, pointer-events disabled */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <GenerativeArtScene />
      </div>

      {/* Content overlay */}
      <div className="relative z-10">
        <EnergySection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <Footer />
      </div>
    </div>
  )
}
