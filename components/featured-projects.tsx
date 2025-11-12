"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

interface PortfolioItem {
  slug: string
  title: string
  shortDescription: string
  mainImage: string
  link?: string
}

const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    slug: "recurx",
    title: "RecurX",
    shortDescription:
      "Decentralized recurring payment platform for Web3. Built with Solidity smart contracts and Next.js, supporting 10K+ wallet transactions.",
    mainImage: "/recurx-project.jpg",
    link: "https://recurx.io",
  },
  {
    slug: "predixai",
    title: "PredixAI",
    shortDescription:
      "AI-powered predictive analytics platform using machine learning models. Handles 100K+ daily inference requests with real-time data processing.",
    mainImage: "/predixai-project.jpg",
    link: "https://www.predixai.in",
  },
  {
    slug: "saas-dashboard-1",
    title: "SaaS Dashboard",
    shortDescription:
      "Full-stack web application with Next.js, PostgreSQL, and authentication. Features real-time analytics, user management, and payment integration.",
    mainImage: "/saas-dashboard.jpg",
    link: "https://example-saas.io",
  },
  {
    slug: "saas-dashboard-2",
    title: "SaaS Dashboard",
    shortDescription:
      "Full-stack web application with Next.js, PostgreSQL, and authentication. Features real-time analytics, user management, and payment integration.",
    mainImage: "/saas-dashboard.jpg",
    link: "https://example-saas.io",
  },
  {
    slug: "saas-dashboard-3",
    title: "SaaS Dashboard",
    shortDescription:
      "Full-stack web application with Next.js, PostgreSQL, and authentication. Features real-time analytics, user management, and payment integration.",
    mainImage: "/saas-dashboard.jpg",
    link: "https://example-saas.io",
  },
  {
    slug: "saas-dashboard-4",
    title: "SaaS Dashboard",
    shortDescription:
      "Full-stack web application with Next.js, PostgreSQL, and authentication. Features real-time analytics, user management, and payment integration.",
    mainImage: "/saas-dashboard.jpg",
    link: "https://example-saas.io",
  },
  {
    slug: "saas-dashboard-5",
    title: "SaaS Dashboard",
    shortDescription:
      "Full-stack web application with Next.js, PostgreSQL, and authentication. Features real-time analytics, user management, and payment integration.",
    mainImage: "/saas-dashboard.jpg",
    link: "https://example-saas.io",
  },
  {
    slug: "saas-dashboard-6",
    title: "SaaS Dashboard",
    shortDescription:
      "Full-stack web application with Next.js, PostgreSQL, and authentication. Features real-time analytics, user management, and payment integration.",
    mainImage: "/saas-dashboard.jpg",
    link: "https://example-saas.io",
  },
]

export function FeaturedProjects() {
  const [projects] = useState<PortfolioItem[]>(PORTFOLIO_DATA)
  const [isLoading, setIsLoading] = useState(true)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isInteracting, setIsInteracting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const carouselInnerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number>(0)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused || isInteracting) {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
      return
    }

    autoScrollRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 3000)

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [isPaused, isInteracting, projects.length])

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX
    setIsInteracting(true)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return

    const touchCurrentX = e.touches[0].clientX
    const diff = touchCurrentX - touchStartX.current
    const rect = carouselRef.current.getBoundingClientRect()

    const maxScroll = 100
    const newPosition = (diff / rect.width) * maxScroll * 0.3

    setScrollPosition(newPosition)
  }

  const handleTouchEnd = () => {
    setScrollPosition(0)
    setIsInteracting(false)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  const togglePause = () => {
    setIsPaused((prev) => !prev)
  }

  const duplicatedProjects = [...projects, ...projects]

  // Calculate transform based on currentIndex
  const calculateTransform = () => {
    if (isInteracting) {
      return `translateX(calc(${scrollPosition}%))`
    }
    
    const cardWidth = 320
    const gap = 32
    const totalWidth = cardWidth + gap
    const offset = -(currentIndex * totalWidth)
    
    return `translateX(calc(${offset}px + ${scrollPosition}%))`
  }

  return (
    <section className="my-8 sm:my-12 md:my-16 lg:my-20 xl:my-24">
      <div className="mb-8 sm:mb-10 md:mb-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2">
          Featured
          <span className="block text-[#0EA5E9]">Projects</span>
        </h2>
        <p className="max-w-2xl text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300">
          A collection of my best work showcasing full-stack development, Web3 integration, and AI-powered solutions.
          Explore my projects below.
        </p>
      </div>

      <div className="relative">
        <div
          className="relative overflow-hidden py-4 cursor-grab active:cursor-grabbing"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 lg:w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 lg:w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

          {isLoading ? (
            <div className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="flex-shrink-0 w-64 sm:w-72 md:w-80 rounded-2xl overflow-hidden shadow-lg animate-pulse"
                >
                  <div className="h-48 sm:h-56 md:h-64 lg:h-80 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="h-5 sm:h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-2 sm:mb-3"></div>
                    <div className="h-3 sm:h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              ref={carouselInnerRef}
              className="flex gap-4 sm:gap-5 md:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8"
              style={{
                transform: calculateTransform(),
                transition: isInteracting ? "none" : "transform 0.5s ease-out",
              }}
            >
              {duplicatedProjects.map((project, index) => (
                <div
                  key={`${project.slug}-${index}`}
                  className="group relative flex-shrink-0 w-64 sm:w-72 md:w-80"
                >
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transition-shadow duration-300 bg-white dark:bg-[#111111] h-full">
                    <div className="relative overflow-hidden h-48 sm:h-56 md:h-64 lg:h-80 bg-gradient-to-br from-gray-900 to-gray-800">
                      <Image
                        src={project.mainImage || "/placeholder.svg?height=600&width=800&query=portfolio+project"}
                        alt={project.title}
                        width={600}
                        height={500}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 lg:p-8">
                        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2">
                          {project.title}
                        </h3>
                        
                        <a
                          href={project.link || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[#0EA5E9] text-white font-semibold text-xs sm:text-sm md:text-base hover:bg-[#0EA5E9]/90 transition-all duration-300 group/link w-fit"
                        >
                          View Project
                          <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                        </a>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 md:p-6 lg:p-8">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-black dark:text-white mb-1.5 sm:mb-2 line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base line-clamp-3">
                        {project.shortDescription}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Controller */}
        {!isLoading && projects.length > 0 && (
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
            {/* Navigation Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handlePrevious}
                className="p-2 sm:p-2.5 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={togglePause}
                className="p-2 sm:p-2.5 rounded-full bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white transition-colors duration-200"
                aria-label={isPaused ? "Play" : "Pause"}
              >
                {isPaused ? (
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-2 sm:p-2.5 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Dot Indicators */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "w-6 sm:w-8 h-2 sm:h-2.5 bg-[#0EA5E9]"
                      : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
              {currentIndex + 1} / {projects.length}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}