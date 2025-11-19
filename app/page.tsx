"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, ChevronDown, ArrowUpRight, Github, Linkedin, Mail, Moon, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"
import { fetchPortfolioData } from "@/utils/csv-parser"
import type { PortfolioItem } from "@/utils/csv-parser"
import  FeaturedProjects  from "@/components/featured-projects"

function useShootingStars() {
  useEffect(() => {
    const canvas = document.getElementById("shooting-stars") as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    // Create static stars
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0,
        vy: 0,
        size: Math.random() * 1.5,
        opacity: Math.random() * 0.5 + 0.5,
      })
    }

    // Shooting stars
    let shootingStarCounter = 0
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Add shooting stars periodically
      shootingStarCounter++
      if (shootingStarCounter > 80) {
        const sx = Math.random() * canvas.width
        const sy = Math.random() * canvas.height
        for (let i = 0; i < 40; i++) {
          const angle = Math.random() * Math.PI * 2
          particles.push({
            x: sx,
            y: sy,
            vx: Math.cos(angle) * (Math.random() * 4 + 3),
            vy: Math.sin(angle) * (Math.random() * 4 + 3),
            size: Math.random() * 1,
            opacity: 1,
          })
        }
        shootingStarCounter = 0
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].x += particles[i].vx
        particles[i].y += particles[i].vy
        particles[i].opacity -= 0.01

        if (particles[i].opacity <= 0) {
          particles.splice(i, 1)
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
}

// Header Component with Rounded Navbar
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <>
      <header
        className={`fixed top-4 left-4 right-4 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-[#111111]/90 backdrop-blur-sm shadow-lg"
            : "bg-white/80 dark:bg-[#111111]/80 backdrop-blur-sm shadow-md"
        } rounded-full md:rounded-2xl`}
      >
        <div className="px-4 md:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-lg md:text-xl font-bold text-black dark:text-white">Mani Pal</span>
            </Link>

            <div className="flex items-center space-x-3 md:space-x-6">
              <nav className="hidden md:block">
                <ul className="flex space-x-4 lg:space-x-6">
                  <li>
                    <a
                      href="#projects"
                      className="text-sm text-black dark:text-white hover:text-[#0EA5E9] dark:hover:text-[#0EA5E9] transition-colors"
                    >
                      Projects
                    </a>
                  </li>
                  <li>
                    <a
                      href="#skills"
                      className="text-sm text-black dark:text-white hover:text-[#0EA5E9] dark:hover:text-[#0EA5E9] transition-colors"
                    >
                      Skills
                    </a>
                  </li>
                  <li>
                    <a
                      href="#faq"
                      className="text-sm text-black dark:text-white hover:text-[#0EA5E9] dark:hover:text-[#0EA5E9] transition-colors"
                    >
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="text-sm text-black dark:text-white hover:text-[#0EA5E9] dark:hover:text-[#0EA5E9] transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/connect"
                      className="text-sm text-black dark:text-white hover:text-[#0EA5E9] dark:hover:text-[#0EA5E9] transition-colors"
                    >
                      Connect
                    </Link>
                  </li>
                </ul>
              </nav>

              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-800/20 transition-colors"
                aria-label="Toggle theme"
              >
                {mounted && (resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
              </button>

              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-full bg-transparent hover:bg-gray-200/50 dark:hover:bg-gray-800/20 md:hidden transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-black dark:text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-black dark:text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-30 md:hidden pt-20" onClick={closeMobileMenu} />
          <nav className="fixed top-20 left-4 right-4 bg-white dark:bg-[#111111] z-40 md:hidden rounded-2xl shadow-xl overflow-hidden">
            <ul className="flex flex-col space-y-2 p-6">
              <li>
                <a
                  href="#projects"
                  onClick={closeMobileMenu}
                  className="text-black dark:text-white hover:text-[#0EA5E9] transition-colors block py-3 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  onClick={closeMobileMenu}
                  className="text-black dark:text-white hover:text-[#0EA5E9] transition-colors block py-3 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={closeMobileMenu}
                  className="text-black dark:text-white hover:text-[#0EA5E9] transition-colors block py-3 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={closeMobileMenu}
                  className="text-black dark:text-white hover:text-[#0EA5E9] transition-colors block py-3 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  Contact
                </a>
              </li>
              <li>
                <Link
                  href="/connect"
                  onClick={closeMobileMenu}
                  className="text-black dark:text-white hover:text-[#0EA5E9] transition-colors block py-3 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  Connect
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="mailto:palmani2410@gmail.com"
                  onClick={closeMobileMenu}
                  className="inline-block w-full text-center px-4 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Get in Touch
                </a>
              </li>
            </ul>
          </nav>
        </>
      )}
    </>
  )
}

function Hero() {
  useShootingStars()

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20">
      <canvas id="shooting-stars" className="absolute inset-0 w-full h-full" style={{ display: "block" }} />

      {/* Hero Content - positioned above canvas */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4">
              Hi, I{"'"}m<span className="block text-[#0EA5E9]">Mani Pal</span>
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-gray-300 mb-6 leading-relaxed">
              <strong>Full-Stack, Web3 & AI Developer</strong> | Founder @ RecurX & PredixAI
            </p>
            <p className="text-xs md:text-sm lg:text-base text-gray-400 mb-8 leading-relaxed max-w-lg">
              Building scalable SaaS applications, decentralized systems, and AI-driven solutions. With 5+ years of
              experience and 15+ delivered projects, I{"'"}ve served 10K+ users across multiple markets.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="mailto:palmani2410@gmail.com"
                className="px-6 md:px-8 py-2.5 md:py-3 rounded-lg bg-[#0EA5E9] text-white hover:bg-[#0EA5E9]/90 transition-all text-sm md:text-base font-medium shadow-md"
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                className="px-6 md:px-8 py-2.5 md:py-3 border-2 border-[#0EA5E9] text-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white transition-all rounded-lg text-sm md:text-base font-medium"
              >
                View my work
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              <div className="p-3 md:p-4 bg-[#0EA5E9]/20 rounded-lg">
                <p className="text-[#0EA5E9] font-bold text-lg md:text-2xl">5+</p>
                <p className="text-gray-400 text-xs md:text-sm mt-1">Years Exp</p>
              </div>
              <div className="p-3 md:p-4 bg-[#0EA5E9]/20 rounded-lg">
                <p className="text-[#0EA5E9] font-bold text-lg md:text-2xl">15+</p>
                <p className="text-gray-400 text-xs md:text-sm mt-1">Projects</p>
              </div>
              <div className="p-3 md:p-4 bg-[#0EA5E9]/20 rounded-lg">
                <p className="text-[#0EA5E9] font-bold text-lg md:text-2xl">10K+</p>
                <p className="text-gray-400 text-xs md:text-sm mt-1">Users</p>
              </div>
            </div>
          </div>

          {/* Right Image/Illustration */}
          <div className="hidden md:flex items-center justify-center">
            <Image
              src="/mani.svg"
              alt="Mani Pal - Full Stack Developer"
              width={400}
              height={400}
              className="w-full h-auto max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// Tech Stack Component
function TechStack() {
  const technologies = [
    {
      category: "Frontend",
      items: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Responsive Design"],
      color: "bg-blue-500/20 text-blue-700 dark:text-blue-400",
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "Prisma", "REST APIs", "GraphQL"],
      color: "bg-green-500/20 text-green-700 dark:text-green-400",
    },
    {
      category: "Databases",
      items: ["PostgreSQL", "Neon", "MySQL", "MongoDB", "Vector DBs"],
      color: "bg-purple-500/20 text-purple-700 dark:text-purple-400",
    },
    {
      category: "Blockchain & Web3",
      items: ["Solidity", "Web3.js", "Ethers.js", "Smart Contracts", "DAO Governance"],
      color: "bg-orange-500/20 text-orange-700 dark:text-orange-400",
    },
    {
      category: "AI & ML",
      items: ["OpenAI API", "LangChain", "Vector Embeddings", "Model Optimization", "NLP"],
      color: "bg-red-500/20 text-red-700 dark:text-red-400",
    },
    {
      category: "DevOps & Tools",
      items: ["Docker", "AWS", "Vercel", "GitHub Actions", "CI/CD", "Git", "Jest", "Postman"],
      color: "bg-cyan-500/20 text-cyan-700 dark:text-cyan-400",
    },
  ]

  return (
    <section id="tech-stack" className="my-16 md:my-20 lg:my-24">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2">
        Complete
        <span className="block text-[#0EA5E9]">Tech Stack</span>
      </h2>
      <p className="mb-10 md:mb-12 max-w-2xl text-sm md:text-base text-gray-700 dark:text-gray-300">
        Proficient in modern technologies across the full stack. From frontend frameworks to blockchain development, AI
        integrations, and cloud infrastructure.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {technologies.map((tech, index) => (
          <div key={index} className="rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-lg md:text-xl font-bold text-black dark:text-white mb-4">{tech.category}</h3>
            <div className="flex flex-wrap gap-2">
              {tech.items.map((item, itemIndex) => (
                <span
                  key={itemIndex}
                  className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium ${tech.color}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// Skills Component
function Skills() {
  const skills = [
    {
      id: 1,
      title: "Full-Stack Development",
      description:
        "End-to-end web applications with Next.js, React, Node.js, and PostgreSQL. Built 10+ production SaaS apps.",
      icon: "💻",
      color: "bg-[#0EA5E9]",
    },
    {
      id: 2,
      title: "Web3 & Blockchain",
      description:
        "Decentralized systems using Solidity, Web3.js, and Ethers.js. Architected RecurX for 10K+ wallet transactions.",
      icon: "🔐",
      color: "bg-[#0EA5E9]",
    },
    {
      id: 3,
      title: "AI & Machine Learning",
      description:
        "AI-driven solutions with OpenAI API and LangChain. Built systems handling 100K+ daily inference requests.",
      icon: "🤖",
      color: "bg-[#0EA5E9]",
    },
  ]

  return (
    <section id="skills" className="my-16 md:my-20 lg:my-24">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2">
        My
        <span className="block text-[#0EA5E9]">Expertise</span>
      </h2>
      <p className="mb-10 md:mb-12 max-w-2xl text-sm md:text-base text-gray-700 dark:text-gray-300">
        5+ years building scalable systems. Specializing in full-stack applications, Web3 integrations, and AI
        automation. Strong in microservices, system design, and production-grade code.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className={`${skill.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 text-2xl`}>
              {skill.icon}
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-3 text-black dark:text-white">{skill.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">{skill.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  const [projects, setProjects] = useState<PortfolioItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchPortfolioData()
        setProjects(data.slice(0, 3))
      } catch (error) {
        console.error("Error loading projects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [])

  return (
    <section id="projects" className="my-16 md:my-20 lg:my-24">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2">
        Featured
        <span className="block text-[#0EA5E9]">Projects</span>
      </h2>
      <p className="mb-10 md:mb-12 max-w-2xl text-sm md:text-base text-gray-700 dark:text-gray-300">
        A collection of full-stack applications, web platforms, and digital solutions I{"'"}ve built. Each project
        showcases my expertise in modern development technologies and problem-solving.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="rounded-2xl overflow-hidden shadow-lg animate-pulse">
                <div className="h-48 md:h-56 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4 md:p-6">
                  <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))
          : projects.map((project) => (
              <div
                key={project.slug}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredId(project.slug)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Link href={`/portfolio/${project.slug}`}>
                  <div
                    className="rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl"
                    style={{
                      animation: hoveredId !== project.slug ? "float 3s ease-in-out infinite" : "none",
                    }}
                  >
                    <div className="relative overflow-hidden h-48 md:h-56">
                      <Image
                        src={project.mainImage || "/placeholder.svg?height=600&width=800&query=project"}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 md:p-6">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-xs md:text-sm text-gray-200 line-clamp-2 mb-3">{project.shortDescription}</p>
                        <div className="inline-flex items-center text-[#0EA5E9] text-xs md:text-sm font-semibold">
                          View Full Project{" "}
                          <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 ml-1.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4 md:p-6 opacity-100 group-hover:opacity-30 transition-opacity duration-300">
                      <h3 className="text-lg md:text-xl font-bold text-black dark:text-white">{project.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 line-clamp-2">
                        {project.shortDescription}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>
    </section>
  )
}

// Hire Freelancer Component
function HireFreelancer() {
  const benefits = [
    {
      icon: "💼",
      title: "Full-Stack Expert",
      description: "Complete end-to-end development from design to deployment",
    },
    { icon: "⚡", title: "Fast Turnaround", description: "Quick project completion with regular status updates" },
    {
      icon: "🔒",
      title: "Secure & Scalable",
      description: "Production-grade code following best practices and security standards",
    },
    {
      icon: "🤝",
      title: "Flexible Engagement",
      description: "Part-time, full-time, or hourly - whatever works for you",
    },
    {
      icon: "🌍",
      title: "Global Availability",
      description: "Remote work across all time zones, available 9 AM - 10 PM IST",
    },
    {
      icon: "💬",
      title: "Clear Communication",
      description: "Regular updates, quick responses, transparent about timelines",
    },
  ]

  return (
    <section id="hire-freelancer" className="my-16 md:my-20 lg:my-24">
      <div className="rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-lg bg-gradient-to-br from-[#0EA5E9]/10 to-transparent">
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Hire Me As A<span className="block text-[#0EA5E9]">Freelancer</span>
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base mb-8 leading-relaxed max-w-xl">
                Looking for a dedicated full-stack developer? I{"'"}m available for hourly, part-time, and full-time
                freelance projects. Specializing in web applications, Web3 integration, and AI-powered solutions.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-bold text-[#0EA5E9]">$10</span>
                  <div>
                    <p className="font-semibold text-black dark:text-white">Per Hour</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Flexible project-based rates available</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-300 dark:border-gray-700">
                  <p className="font-semibold text-black dark:text-white mb-3">Available For:</p>
                  <ul className="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
                    <li>✓ Full-Stack Web Application Development</li>
                    <li>✓ Frontend Development (React, Next.js)</li>
                    <li>✓ Backend Development (Node.js, APIs)</li>
                    <li>✓ Web3 & Blockchain Integration</li>
                    <li>✓ AI/ML Integration & Automation</li>
                    <li>✓ Database Design & Optimization</li>
                    <li>✓ DevOps & Infrastructure Setup</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/connect"
                  className="px-6 md:px-8 py-3 rounded-lg bg-[#0EA5E9] text-white hover:bg-[#0EA5E9]/90 transition-all text-sm md:text-base font-medium shadow-md text-center"
                >
                  Hire Me Now
                </Link>
                <a
                  href="https://calendly.com/mani-pal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 md:px-8 py-3 border-2 border-[#0EA5E9] text-[#0EA5E9] hover:bg-[#0EA5E9]/10 transition-all rounded-lg text-sm md:text-base font-medium text-center"
                >
                  Schedule a Consultation
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white dark:bg-[#111111] rounded-xl p-4 md:p-6 shadow-md">
                  <div className="text-3xl mb-3">{benefit.icon}</div>
                  <h3 className="font-semibold text-black dark:text-white mb-2 text-sm md:text-base">
                    {benefit.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Engagement Models */}
        <div className="border-t border-gray-300 dark:border-gray-700 pt-8 md:pt-12">
          <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-8">Engagement Models</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white dark:bg-[#111111] rounded-xl p-6 md:p-8 shadow-md">
              <h4 className="text-lg md:text-xl font-bold text-black dark:text-white mb-3">Hourly</h4>
              <p className="text-2xl md:text-3xl font-bold text-[#0EA5E9] mb-4">$10/hr</p>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6">
                Perfect for flexible projects, ongoing support, or when scope isn{"'"}t fully defined.
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-gray-700 dark:text-gray-300">
                <li>✓ Detailed time tracking</li>
                <li>✓ Flexible start/end dates</li>
                <li>✓ Weekly invoicing</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-[#111111] rounded-xl p-6 md:p-8 shadow-md border-2 border-[#0EA5E9]">
              <h4 className="text-lg md:text-xl font-bold text-black dark:text-white mb-3">Project-Based</h4>
              <p className="text-2xl md:text-3xl font-bold text-[#0EA5E9] mb-4">Custom Quote</p>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6">
                For well-defined projects. Includes timeline, deliverables, and revision rounds.
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-gray-700 dark:text-gray-300">
                <li>✓ Fixed price guarantee</li>
                <li>✓ Milestone-based payments</li>
                <li>✓ Dedicated attention</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-[#111111] rounded-xl p-6 md:p-8 shadow-md">
              <h4 className="text-lg md:text-xl font-bold text-black dark:text-white mb-3">Retainer</h4>
              <p className="text-2xl md:text-3xl font-bold text-[#0EA5E9] mb-4">Flexible</p>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6">
                Ongoing support and maintenance. Reserve my availability for your project needs.
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-gray-700 dark:text-gray-300">
                <li>✓ Priority support</li>
                <li>✓ Discounted rates</li>
                <li>✓ Monthly planning</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// FAQ Component
function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null)

  const faqs = [
    {
      id: 1,
      question: "What can I expect when we work together?",
      answer:
        "We start with a discovery call to understand your needs, then provide a detailed proposal with timeline and cost estimates. Once approved, we begin development with regular updates and feedback sessions.",
    },
    {
      id: 2,
      question: "How long do projects take to build?",
      answer:
        "Project timelines vary based on complexity. Simple websites might take 2-4 weeks, while complex platforms can take 3-6 months. We provide detailed timelines during the proposal phase.",
    },
    {
      id: 3,
      question: "What tools do you use to build?",
      answer:
        "We use modern frameworks like React, Next.js, and Node.js, along with AI tools and cloud services. Our stack is tailored to each project's specific requirements.",
    },
    {
      id: 4,
      question: "How much does a typical project cost?",
      answer:
        "Project costs vary widely based on requirements. Simple websites start around $5,000, while complex platforms can range from $25,000 to $100,000+. We provide detailed quotes after our discovery process.",
    },
    {
      id: 5,
      question: "How do you manage payments?",
      answer:
        "We typically work with a 50% upfront deposit and the remaining 50% upon project completion. For larger projects, we may establish milestone-based payment schedules.",
    },
    {
      id: 6,
      question: "Can you manage my app's technical support with users?",
      answer:
        "Yes, we offer ongoing technical support and maintenance packages. These can include user support, bug fixes, feature updates, and performance monitoring.",
    },
  ]

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <section id="faq" className="my-16 md:my-20 lg:my-24">
      <div className="rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-lg">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2">
          Frequently Asked
          <span className="block text-[#0EA5E9]">Questions</span>
        </h2>
        <p className="mb-8 md:mb-10 max-w-2xl text-sm md:text-base text-gray-700 dark:text-gray-300">
          Have questions about our services? Find answers to the most common questions and learn how our team can
          enhance your creative process.
        </p>

        <div className="space-y-2 md:space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="border-b pb-3 md:pb-4 border-gray-300 dark:border-gray-700">
              <button
                onClick={() => toggleItem(faq.id)}
                className="flex justify-between items-start md:items-center w-full text-left py-2 md:py-3 font-medium text-black dark:text-white hover:text-[#0EA5E9] dark:hover:text-[#0EA5E9] transition-colors"
                aria-expanded={openItem === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="font-semibold text-sm md:text-base pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform flex-shrink-0 ${
                    openItem === faq.id ? "rotate-180 text-[#0EA5E9]" : ""
                  }`}
                />
              </button>
              {openItem === faq.id && (
                <div
                  id={`faq-answer-${faq.id}`}
                  className="mt-3 md:mt-4 text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <footer
      id="contact"
      className="container py-12 md:py-16 border-t border-gray-200 dark:border-gray-800 mt-16 md:mt-20 lg:mt-24"
    >
      <div className="flex flex-col items-center text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4">Mani Pal</h3>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-6 leading-relaxed">
          Full-Stack, Web3 & AI Developer. Founder @ RecurX & PredixAI. Architecting scalable systems and innovative
          solutions. Based in Delhi, India. Open to remote & freelance roles.
        </p>

        <div className="flex gap-6 mb-8">
          <a
            href="https://github.com/justbytecode"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-[#0EA5E9] dark:hover:text-[#0EA5E9] transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/mani-pal-68b570163"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-[#0EA5E9] dark:hover:text-[#0EA5E9] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:palmani2410@gmail.com"
            className="text-gray-600 dark:text-gray-400 hover:text-[#0EA5E9] dark:hover:text-[#0EA5E9] transition-colors"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>

        <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-4 space-y-1">
          <p>📍 Delhi, India | Open to Remote & Freelance Roles</p>
          <p>📱 +91 73806 26997 | palmani2410@gmail.com</p>
        </div>

        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Mani Pal. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

// Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <Header />
      <div className="container px-4 md:px-6 mt-28 md:mt-24">
        <Hero />
        <TechStack />
        {/* <FeaturedProjects /> */}
        <HireFreelancer />
        <Skills />
        {/* <Projects /> */}
        <FAQ />
      </div>
      <Footer />
    </main>
  )
}
