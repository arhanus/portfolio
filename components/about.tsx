"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"

export function About() {
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
    <section ref={sectionRef} className="py-20 px-4" id="about">
      <div className="max-w-5xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-balance relative">
            <span className="relative inline-block text-primary">
              <span className="absolute inset-0 text-orange-800 dark:text-orange-900" style={{ transform: 'translate(2px, 2px)' }}>
                About Me
              </span>
              <span className="absolute inset-0 text-orange-800 dark:text-orange-900" style={{ transform: 'translate(4px, 4px)' }}>
                About Me
              </span>
              <span className="absolute inset-0 text-orange-800 dark:text-orange-900" style={{ transform: 'translate(6px, 6px)' }}>
                About Me
              </span>
              <span className="relative z-10">About Me</span>
            </span>
          </h2>

          <Card className="p-8 md:p-12 bg-[#f0eae0] shadow-[0px_5px_0px_0px_rgba(210,180,140,1)] border border-[#D2B48C] transition-all duration-300 hover:shadow-[0px_8px_0px_0px_rgba(210,180,140,1)] hover:-translate-y-[2px] translate-y-2">
            <div className="space-y-6 text-lg leading-relaxed font-bold">
              <p className="text-[#6B4423]">
                I&apos;m a Computer Science student focused on building software that solves real problems. My work spans{" "}
                <span className="text-primary">web applications</span>,{" "}
                <span className="text-primary">algorithms and data structures</span>, and{" "}
                <span className="text-primary">applied AI</span>.
              </p>

              <p className="text-[#6B4423]">
                I care about writing clean, maintainable code and shipping products that deliver clear value to their users.
                Most of my experience comes from personal projects and hackathons, where I&apos;ve built and deployed full-stack applications end to end.
              </p>

              <p className="text-[#6B4423]">
                I&apos;m actively looking for internship and collaboration opportunities where I can contribute, learn from experienced engineers, and grow as a developer.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
