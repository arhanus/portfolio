"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IndieButton } from "@/components/indie-button"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"

const projects = [
  {
    title: "ClipFast.ai",
    description:
      "AI powered content creation app allows users to create viral short-form content without the need of editing skills.",
    image: "/clipfast.png",
    tags: ["Next.js", "TypeScript", "Fastify", "Python", "Stripe", "REST API", "Docker"],
    demo: "https://clipfast.ai",
  },
  {
    title: "E-Commerce Website",
    description:
      "Full-stack e-commerce website with a custom content editing panel.",
    image: "/ecommerce.png",
    tags: ["Next.js", "Sanity", "Algolia", "Stripe", "Node.js"],
    demo: "https://www.weezygo.com",
  },
  {
    title: "AI Chat Assistant",
    description:
      "An intelligent chatbot powered by openAI API and fine-tuned for OSU students.",
    image: "/chatbot.png",
    tags: ["Next.js", "REST API"],
    github: "https://github.com/arhanus/chatosu",
    demo: "https://chat-osu.vercel.app",
  },
]

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollPositions, setScrollPositions] = useState<{ [key: string]: number }>({})
  const badgeContainerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const getMaxScroll = (projectTitle: string) => {
    const container = badgeContainerRefs.current[projectTitle]
    if (!container || !container.parentElement) return 0
    
    // Padding'i hesaba kat (her iki tarafta 1.5rem = 24px)
    const visibleWidth = container.parentElement.clientWidth - 48
    const maxScroll = container.scrollWidth - visibleWidth
    return Math.max(0, maxScroll)
  }

  const handleScroll = (projectTitle: string, direction: "left" | "right") => {
    const currentPosition = scrollPositions[projectTitle] || 0
    const scrollAmount = 150 // Kaydırma miktarı
    const maxScroll = getMaxScroll(projectTitle)
    
    const newPosition =
      direction === "right" 
        ? Math.min(currentPosition + scrollAmount, maxScroll)
        : Math.max(currentPosition - scrollAmount, 0)

    setScrollPositions((prev) => ({
      ...prev,
      [projectTitle]: newPosition,
    }))
  }

  const canScrollRight = (projectTitle: string) => {
    const currentPosition = scrollPositions[projectTitle] || 0
    const maxScroll = getMaxScroll(projectTitle)
    return currentPosition < maxScroll - 1 // 1px tolerans
  }

  return (
    <section ref={sectionRef} className="py-20 px-4" id="projects">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-balance relative">
            <span className="relative inline-block text-primary">
              <span className="absolute inset-0 text-orange-800 dark:text-orange-900" style={{ transform: 'translate(2px, 2px)' }}>
                Stuff I&apos;ve Built
              </span>
              <span className="absolute inset-0 text-orange-800 dark:text-orange-900" style={{ transform: 'translate(4px, 4px)' }}>
                Stuff I&apos;ve Built
              </span>
              <span className="absolute inset-0 text-orange-800 dark:text-orange-900" style={{ transform: 'translate(6px, 6px)' }}>
                Stuff I&apos;ve Built
              </span>
              <span className="relative z-10">Stuff I&apos;ve Built</span>
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card
                key={project.title}
                className="bg-yellow-200/3 border border-[#D2B48C] shadow-[0px_5px_0px_0px_rgba(210,180,140,1)] overflow-hidden transition-all duration-300 group hover:shadow-[0px_8px_0px_0px_rgba(210,180,140,1)] hover:-translate-y-[2px]"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isVisible ? "fadeInUp 0.6s ease-out forwards" : "none",
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-card to-transparent opacity-40" />
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-balance">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed text-balance max-h-12 overflow-scroll">{project.description}</p>

                  <div className="relative">
                    {project.tags.length > 4 && (
                      <>
                        <button
                          onClick={() => handleScroll(project.title, "left")}
                          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-card/90 hover:bg-card border border-border rounded-full p-1 shadow-md transition-all hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm"
                          disabled={(scrollPositions[project.title] || 0) <= 0}
                          aria-label="Scroll left"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleScroll(project.title, "right")}
                          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-card/90 hover:bg-card border border-border rounded-full p-1 shadow-md transition-all hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm"
                          disabled={!canScrollRight(project.title)}
                          aria-label="Scroll right"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <div className="overflow-hidden" style={{ padding: project.tags.length > 4 ? "0 1.5rem" : "0" }}>
                      <div
                        ref={(el) => {
                          badgeContainerRefs.current[project.title] = el
                        }}
                        className="flex gap-2 transition-transform duration-500 ease-out"
                        style={{
                          transform: `translateX(-${scrollPositions[project.title] || 0}px)`,
                        }}
                      >
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs whitespace-nowrap shrink-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <IndieButton
                        size="sm"
                        variant="secondary"
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </IndieButton>
                    </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <IndieButton
                        size="sm"
                        variant="primary"
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View
                      </IndieButton>
                    </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
