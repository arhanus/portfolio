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
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-balance">A Bit About Me</h2>

          <Card className="p-8 md:p-12 bg-card border-2 border-border hover:border-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-foreground">
                I&apos;m a CS student who loves turning ideas into reality through code. Whether it&apos;s building{" "}
                <span className="text-primary font-semibold">web apps</span>,{" "}
                <span className="text-primary font-semibold">solving algorithms</span>, or{" "}
                <span className="text-primary font-semibold">experimenting with new tech</span>, I&apos;m always up for a
                challenge.
              </p>

              <p className="text-muted-foreground">
                Currently learning everything I can about software development, from frontend magic to backend wizardry.
                I believe the best code is clean code, and the best projects are the ones that actually help people.
              </p>

              <p className="text-muted-foreground">
                When I&apos;m not debugging at 2 AM, I like going to the gym, or watching movies.
                I&apos;m always looking for new opportunities to learn and grow, and I&apos;m always open to new challenges.
              </p>

              <p className="text-muted-foreground">
                In the future, I want to work on projects that are meaningful and impactful, and I want to work with people who are passionate about their work.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
