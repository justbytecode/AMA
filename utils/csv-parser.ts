export interface PortfolioItem {
  slug: string
  title: string
  shortDescription: string
  mainImage: string
  link?: string
}

export async function fetchPortfolioData(): Promise<PortfolioItem[]> {
  // Sample portfolio data - replace with your actual CSV data or API
  const portfolioData: PortfolioItem[] = [
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
      slug: "saas-dashboard",
      title: "SaaS Dashboard",
      shortDescription:
        "Full-stack web application with Next.js, PostgreSQL, and authentication. Features real-time analytics, user management, and payment integration.",
      mainImage: "/saas-dashboard.jpg",
      link: "https://example-saas.io",
    },
     {
      slug: "saas-dashboard",
      title: "SaaS Dashboard",
      shortDescription:
        "Full-stack web application with Next.js, PostgreSQL, and authentication. Features real-time analytics, user management, and payment integration.",
      mainImage: "/saas-dashboard.jpg",
      link: "https://example-saas.io",
    },
     {
      slug: "saas-dashboard",
      title: "SaaS Dashboard",
      shortDescription:
        "Full-stack web application with Next.js, PostgreSQL, and authentication. Features real-time analytics, user management, and payment integration.",
      mainImage: "/saas-dashboard.jpg",
      link: "https://example-saas.io",
    },
     {
      slug: "saas-dashboard",
      title: "SaaS Dashboard",
      shortDescription:
        "Full-stack web application with Next.js, PostgreSQL, and authentication. Features real-time analytics, user management, and payment integration.",
      mainImage: "/saas-dashboard.jpg",
      link: "https://example-saas.io",
    },
     {
      slug: "saas-dashboard",
      title: "SaaS Dashboard",
      shortDescription:
        "Full-stack web application with Next.js, PostgreSQL, and authentication. Features real-time analytics, user management, and payment integration.",
      mainImage: "/saas-dashboard.jpg",
      link: "https://example-saas.io",
    },
     {
      slug: "saas-dashboard",
      title: "SaaS Dashboard",
      shortDescription:
        "Full-stack web application with Next.js, PostgreSQL, and authentication. Features real-time analytics, user management, and payment integration.",
      mainImage: "/saas-dashboard.jpg",
      link: "https://example-saas.io",
    },
  ]

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return portfolioData
}
