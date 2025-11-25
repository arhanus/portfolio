"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS", "Prisma"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Python", "PostgreSQL", "REST APIs", "GraphQL", "Fastify"],
  },
  {
    title: "Tools & Others",
    skills: ["Git", "Docker", "GCP", "Linux", "Postman"],
  },
]

export function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-secondary/30" id="skills">
      <div className="max-w-5xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-balance">My Toolkit</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <Card
                key={category.title}
                /* Enhanced card styling with shadows and rotation hover */
                className="p-6 bg-card border-2 border-border hover:border-primary/70 transition-all duration-300 hover:scale-105 hover:-rotate-1 shadow-md hover:shadow-xl"
                style={{
                  animationDelay: `${categoryIndex * 100}ms`,
                  animation: isVisible ? "fadeInUp 0.6s ease-out forwards" : "none",
                }}
              >
                <h3 className="text-xl font-bold mb-4 text-primary">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      /* Playful hover effect on badges */
                      className="text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110 cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
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
