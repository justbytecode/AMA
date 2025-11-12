"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Mail, MessageCircle, Calendar, Github, Linkedin, ArrowLeft, CheckCircle, Zap, Clock } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

// Shooting Stars Animation Script
function initShootingStars(canvasId: string) {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  const stars: Array<{ x: number; y: number; size: number; opacity: number }> = []
  const shootingStars: Array<{ x: number; y: number; vx: number; vy: number; life: number }> = []

  // Create static stars
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5,
      opacity: Math.random() * 0.5 + 0.5,
    })
  }

  function drawStars() {
    ctx!.fillStyle = "rgba(255, 255, 255, 0.8)"
    stars.forEach((star) => {
      ctx!.globalAlpha = star.opacity
      ctx!.fillRect(star.x, star.y, star.size, star.size)
    })
    ctx!.globalAlpha = 1
  }

  function createShootingStar() {
    shootingStars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * (canvas.height * 0.6),
      vx: Math.random() * 4 + 2,
      vy: Math.random() * 2 + 1,
      life: 1,
    })
  }

  function drawShootingStars() {
    shootingStars.forEach((star, index) => {
      const gradient = ctx!.createLinearGradient(star.x - 20, star.y, star.x, star.y)
      gradient.addColorStop(0, `rgba(14, 165, 233, 0)`)
      gradient.addColorStop(0.5, `rgba(14, 165, 233, ${star.life})`)
      gradient.addColorStop(1, `rgba(255, 255, 255, ${star.life})`)

      ctx!.strokeStyle = gradient
      ctx!.lineWidth = 2
      ctx!.beginPath()
      ctx!.moveTo(star.x - 20, star.y)
      ctx!.lineTo(star.x, star.y)
      ctx!.stroke()

      star.x += star.vx
      star.y += star.vy
      star.life -= 0.01

      if (star.life <= 0) {
        shootingStars.splice(index, 1)
      }
    })
  }

  function animate() {
    ctx!.clearRect(0, 0, canvas.width, canvas.height)
    ctx!.fillStyle = "#000000"
    ctx!.fillRect(0, 0, canvas.width, canvas.height)

    drawStars()
    drawShootingStars()

    if (Math.random() < 0.02) {
      createShootingStar()
    }

    requestAnimationFrame(animate)
  }

  animate()

  window.addEventListener("resize", () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  })
}

export default function ConnectPage() {
  const [showQR, setShowQR] = useState(false)
  const [whatsappHovered, setWhatsappHovered] = useState(false)
  const whatsappNumber = "+91 9455792321"
  const whatsappMessage = "Hi Mani, I’d love to discuss a freelance project that I believe aligns well with your expertise."
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
  const calendlyLink = "https://calendly.com/mani-pal"

  useEffect(() => {
    initShootingStars("shooting-stars-connect")
  }, [])

  return (
    <main className="min-h-screen w-full bg-white dark:bg-[#1a1a1a]">
      {/* Header with Back Button */}
      <header className="fixed top-4 left-4 right-4 z-40 transition-all duration-300 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-sm shadow-lg rounded-full md:rounded-2xl">
        <div className="px-4 md:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 text-black dark:text-white hover:text-[#0EA5E9] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-lg md:text-xl font-bold">Back</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container px-4 md:px-6 mt-28 md:mt-24 pb-12 md:pb-16">
        {/* Hire Me Hero Section */}
        <div className="mb-16 md:mb-24">
          <div className="relative overflow-hidden rounded-3xl md:rounded-4xl bg-black border border-[#0EA5E9]/30 p-8 md:p-12 lg:p-16 hero-gradient-animation">
            {/* Shooting Stars Canvas Background */}
            <canvas
              id="shooting-stars-connect"
              className="absolute inset-0 w-full h-full rounded-3xl md:rounded-4xl"
              style={{ display: "block" }}
            />

            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#0EA5E9]/10 rounded-full blur-3xl -z-10"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-[#0EA5E9] fill-[#0EA5E9]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.87 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span className="text-sm md:text-base font-semibold text-[#0EA5E9]">AVAILABLE FOR FREELANCE</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Hire Me as Your
                <span className="block text-[#0EA5E9]">Freelance Developer</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl">
                Full-Stack, Web3 & AI Developer with 5+ years of experience. I build scalable, production-ready
                applications with expertise in modern tech stacks.
              </p>

              {/* Pricing and Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                <div className="bg-white/10 dark:bg-gray-900/50 backdrop-blur rounded-xl p-4 md:p-6 border border-white/20">
                  <p className="text-xs md:text-sm text-gray-300 mb-1">Hourly Rate</p>
                  <p className="text-2xl md:text-3xl font-bold text-[#0EA5E9]">$10/hr</p>
                </div>
                <div className="bg-white/10 dark:bg-gray-900/50 backdrop-blur rounded-xl p-4 md:p-6 border border-white/20">
                  <p className="text-xs md:text-sm text-gray-300 mb-1">Response Time</p>
                  <p className="text-2xl md:text-3xl font-bold text-white">&lt;24hrs</p>
                </div>
                <div className="bg-white/10 dark:bg-gray-900/50 backdrop-blur rounded-xl p-4 md:p-6 border border-white/20">
                  <p className="text-xs md:text-sm text-gray-300 mb-1">Experience</p>
                  <p className="text-2xl md:text-3xl font-bold text-white">5+ yrs</p>
                </div>
                <div className="bg-white/10 dark:bg-gray-900/50 backdrop-blur rounded-xl p-4 md:p-6 border border-white/20">
                  <p className="text-xs md:text-sm text-gray-300 mb-1">Projects Done</p>
                  <p className="text-2xl md:text-3xl font-bold text-white">15+</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#0EA5E9] text-white rounded-xl hover:bg-[#0EA5E9]/90 transition-all font-semibold text-base md:text-lg shadow-lg hover:shadow-xl"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
                <a
                  href={calendlyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 border-2 border-[#0EA5E9] text-[#0EA5E9] rounded-xl hover:bg-[#0EA5E9]/10 transition-all font-semibold text-base md:text-lg"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule Meeting
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Why Hire Me Section */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4 text-center">Why Hire Me?</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Proven expertise in building scalable, production-ready applications
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Zap, title: "Fast & Efficient", desc: "Quick turnaround with optimized code and best practices" },
              {
                icon: CheckCircle,
                title: "Quality Assured",
                desc: "Production-ready code with proper testing and documentation",
              },
              { icon: Clock, title: "Always Available", desc: "9 AM - 10 PM IST, Monday to Sunday for support" },
              { icon: Zap, title: "Full-Stack Expert", desc: "Frontend, Backend, Web3, AI/ML - complete solutions" },
              {
                icon: MessageCircle,
                title: "Clear Communication",
                desc: "Regular updates and transparent project communication",
              },
              { icon: Zap, title: "Modern Stack", desc: "Next.js, React, Node.js, PostgreSQL, Solidity & more" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="card rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0EA5E9]/20 mb-4">
                  <item.icon className="w-6 h-6 text-[#0EA5E9]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-black dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Connection Options Grid */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4 text-center">Contact Me</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Choose your preferred way to connect. I'll get back to you as soon as possible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* WhatsApp Option */}
            <div
              className="card rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              onMouseEnter={() => setWhatsappHovered(true)}
              onMouseLeave={() => setWhatsappHovered(false)}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#0EA5E9]/20 mb-6">
                  <MessageCircle className="w-7 h-7 text-[#0EA5E9]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-3">WhatsApp</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-6 flex-grow">
                  Quick chat to discuss your project or ask any questions. Hover to scan QR code.
                </p>
                <div className="space-y-3">
                  {whatsappHovered ? (
                    <div className="flex flex-col items-center qr-dropdown animate-in fade-in duration-300">
                      <QRCodeSVG value={whatsappLink} size={180} level="H" includeMargin={true} />
                      <p className="text-xs text-gray-500 mt-3 text-center">Scan to open WhatsApp</p>
                    </div>
                  ) : (
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-4 py-3 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0EA5E9]/90 transition-colors text-center font-medium"
                    >
                      Send Message
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Email Option */}
            <div className="card rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#0EA5E9]/20 mb-6">
                  <Mail className="w-7 h-7 text-[#0EA5E9]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-3">Email</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-6 flex-grow">
                  Send me detailed project requirements and timeline for a custom proposal.
                </p>
                <div className="space-y-3">
                  <a
                    href="mailto:palmani2410@gmail.com?subject=Freelance%20Project%20Inquiry&body=Hi%20Mani,%0A%0AI%20have%20a%20project%20for%20you..."
                    className="block w-full px-4 py-3 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0EA5E9]/90 transition-colors text-center font-medium"
                  >
                    Send Email
                  </a>
                  <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-lg text-center">
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 break-all">
                      palmani2410@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendly Option */}
            <div className="card rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#0EA5E9]/20 mb-6">
                  <Calendar className="w-7 h-7 text-[#0EA5E9]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-3">Schedule Meeting</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-6 flex-grow">
                  Book a detailed call to discuss project scope, timeline, and deliverables.
                </p>
                <a
                  href={calendlyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-3 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0EA5E9]/90 transition-colors text-center font-medium"
                >
                  Schedule Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Information */}
        <div className="card rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-lg mb-12 md:mb-16 bg-gradient-to-br from-white/50 to-white/20 dark:from-gray-900/50 dark:to-gray-900/20">
          <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-8">Quick Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="space-y-2">
              <h3 className="font-semibold text-black dark:text-white flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#0EA5E9]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.87 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                Location
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Delhi, India</p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">Remote & Freelance</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-black dark:text-white flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#0EA5E9]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.87 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                Phone
              </h3>
              <p className="text-gray-600 dark:text-gray-400">+91 73806 26997</p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">Calls & Messages</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-black dark:text-white flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#0EA5E9]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.87 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                Response Time
              </h3>
              <p className="text-gray-600 dark:text-gray-400">&lt;24 hours</p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">Usually faster</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-black dark:text-white flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#0EA5E9]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.87 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                Availability
              </h3>
              <p className="text-gray-600 dark:text-gray-400">9 AM - 10 PM IST</p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">Mon - Sun</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">Also find me on</p>
          <div className="flex justify-center gap-6 mb-12">
            <a
              href="https://github.com/justbytecode"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-[#0EA5E9] hover:text-white hover:scale-110 transition-all shadow-md"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/mani-pal-68b570163"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-[#0EA5E9] hover:text-white hover:scale-110 transition-all shadow-md"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:palmani2410@gmail.com"
              className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-[#0EA5E9] hover:text-white hover:scale-110 transition-all shadow-md"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>

          <p className="text-gray-500 dark:text-gray-500 text-sm">
            Ready to work together? Let's build something amazing!
          </p>
        </div>
      </div>
    </main>
  )
}
