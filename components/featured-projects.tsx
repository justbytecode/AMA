'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Home, ChevronLeft, ChevronRight } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  category: string
  image: string
  homeUrl: string
  viewUrl: string
  tags: string[]
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Digital Commerce Platform',
    description: 'A modern e-commerce solution with real-time inventory management and seamless checkout experience.',
    category: 'E-Commerce',
    image: '/modern-ecommerce-dashboard.png',
    homeUrl: '/',
    viewUrl: '#',
    tags: ['React', 'Next.js', 'Stripe'],
  },
  {
    id: '2',
    title: 'Creative Design Studio',
    description: 'Portfolio showcase platform for designers to display their work with interactive galleries and client testimonials.',
    category: 'Portfolio',
    image: '/creative-design-portfolio-website.jpg',
    homeUrl: '/',
    viewUrl: '#',
    tags: ['Design', 'Portfolio', 'Web'],
  },
  {
    id: '3',
    title: 'Health & Wellness App',
    description: 'Comprehensive wellness platform featuring personalized workout plans, nutrition tracking, and progress analytics.',
    category: 'Health',
    image: '/health-wellness-dashboard-app.jpg',
    homeUrl: '/',
    viewUrl: '#',
    tags: ['Health', 'Fitness', 'Analytics'],
  },
  {
    id: '4',
    title: 'Financial Dashboard',
    description: 'Enterprise-grade financial management system with real-time data visualization and advanced reporting tools.',
    category: 'Finance',
    image: '/financial-dashboard-analytics.png',
    homeUrl: '/',
    viewUrl: '#',
    tags: ['Finance', 'Analytics', 'Enterprise'],
  },
  {
    id: '5',
    title: 'Collaboration Suite',
    description: 'Team productivity platform with real-time collaboration, task management, and integrated communication tools.',
    category: 'Productivity',
    image: '/team-collaboration-workspace-interface.jpg',
    homeUrl: '/',
    viewUrl: '#',
    tags: ['Collaboration', 'Productivity', 'SaaS'],
  },
  {
    id: '6',
    title: 'Content Management Hub',
    description: 'Intuitive CMS platform allowing creators to manage, organize, and publish content across multiple channels efficiently.',
    category: 'CMS',
    image: '/content-management-interface-dashboard.jpg',
    homeUrl: '/',
    viewUrl: '#',
    tags: ['CMS', 'Content', 'Publishing'],
  },
  {
    id: '7',
    title: 'AI-Powered Analytics',
    description: 'Next-generation analytics engine leveraging machine learning to provide actionable insights from complex datasets.',
    category: 'AI/ML',
    image: '/artificial-intelligence-data-analytics.jpg',
    homeUrl: '/',
    viewUrl: '#',
    tags: ['AI', 'Analytics', 'ML'],
  },
  {
    id: '8',
    title: 'Social Network Platform',
    description: 'Community-driven social platform with real-time messaging, content feeds, and advanced networking capabilities.',
    category: 'Social',
    image: '/social-network-interface-community.jpg',
    homeUrl: '/',
    viewUrl: '#',
    tags: ['Social', 'Community', 'Network'],
  },
]

export default function FeaturedProjects() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="text-xs font-semibold tracking-widest text-accent uppercase px-4 py-2 bg-accent/10 rounded-full">
                  Featured Projects
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance leading-tight">
                Explore Our Digital Solutions
              </h1>
            </div>
            <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              Drag through our collection of innovative projects crafted with precision and creativity.
            </p>
          </div>
        </div>
      </section>

      {/* Draggable Carousel Section */}
      <section className="relative px-6 py-20 sm:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <DraggableCarousel projects={projects} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 border border-primary/20 overflow-hidden">
            <div className="px-8 py-16 sm:px-12 sm:py-20 text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                  Ready to Start Your Project?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Let's collaborate and create something extraordinary together.
                </p>
              </div>
              <button className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 gap-2 hover:scale-105">
                Get in Touch
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function DraggableCarousel({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0))
    setScrollLeft(containerRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (containerRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 1.5
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX - (containerRef.current?.offsetLeft || 0))
    setScrollLeft(containerRef.current?.scrollLeft || 0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const x = e.touches[0].pageX - (containerRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 1.5
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 400
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const index = Math.round(
          containerRef.current.scrollLeft / (containerRef.current.scrollWidth / projects.length)
        )
        setCurrentIndex(Math.min(index, projects.length - 1))
      }
    }

    containerRef.current?.addEventListener('scroll', handleScroll)
    return () => containerRef.current?.removeEventListener('scroll', handleScroll)
  }, [projects.length])

  return (
    <div className="space-y-8">
      {/* Carousel Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Project Showcase
          </h2>
          <p className="text-muted-foreground mt-2">Drag to explore our work</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => scroll('left')}
            className="p-3 rounded-full bg-secondary hover:bg-accent/20 text-foreground transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-3 rounded-full bg-secondary hover:bg-accent/20 text-foreground transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Draggable Container */}
      <div className="relative">
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          className={`flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-80 snap-center group"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <CarouselCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (containerRef.current) {
                containerRef.current.scrollTo({
                  left: (index * 352), // 320px card + 32px gap
                  behavior: 'smooth',
                })
              }
            }}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? 'h-2 w-8 bg-accent rounded-full'
                : 'h-2 w-2 bg-border rounded-full hover:bg-muted-foreground'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function CarouselCard({ project }: { project: Project }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card h-96 transition-all duration-500 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/20">
      {/* Image Container */}
      <div className="relative h-full overflow-hidden bg-secondary">
        <img
          src={project.image || '/placeholder.svg'}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="space-y-3 transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-widest text-accent uppercase bg-accent/20 px-3 py-1 rounded-full">
              {project.category}
            </span>
            <a
              href={project.homeUrl}
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
              aria-label="Go to project home"
            >
              <Home className="w-5 h-5" />
            </a>
          </div>

          <div>
            <h3 className="text-xl font-bold text-background leading-snug line-clamp-2">
              {project.title}
            </h3>
            <p className="text-background/90 text-sm leading-relaxed line-clamp-2 mt-2">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-background/80 bg-background/20 px-2.5 py-1 rounded-full backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={project.viewUrl}
            className="inline-flex items-center gap-2 text-background font-semibold hover:gap-3 transition-all duration-300 pt-3"
          >
            View Project
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
