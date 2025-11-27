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
                A Bit About Me
              </span>
              <span className="absolute inset-0 text-orange-800 dark:text-orange-900" style={{ transform: 'translate(4px, 4px)' }}>
                A Bit About Me
              </span>
              <span className="absolute inset-0 text-orange-800 dark:text-orange-900" style={{ transform: 'translate(6px, 6px)' }}>
                A Bit About Me
              </span>
              <span className="relative z-10">A Bit About Me</span>
            </span>
          </h2>

          <Card className="p-8 md:p-12 bg-yellow-200/3 shadow-[0px_5px_0px_0px_rgba(210,180,140,1)] border border-[#D2B48C] transition-all duration-300 hover:shadow-[0px_8px_0px_0px_rgba(210,180,140,1)] hover:-translate-y-[2px] translate-y-2">
            <div className="space-y-6 text-lg leading-relaxed font-bold">
              <p className="text-[#6B4423]">
                I&apos;m a CS student who loves turning  ideas into reality through code. Whether it&apos;s building{" "}
                <span className="text-primary">web apps</span>,{" "}
                <span className="text-primary">solving algorithms</span>, or{" "}
                <span className="text-primary">experimenting with new tech</span>, I&apos;m always up for a
                challenge.
              </p>

              <p className="text-[#6B4423]">
                Currently learning everything I can about software development, from frontend magic to backend wizardry.
                I believe the best code is clean code, and the best projects are the ones that actually help people.
              </p>

              <p className="text-[#6B4423]">
                When I&apos;m not debugging at 2 AM, I like going to the gym, or watching movies.
                I&apos;m always looking for new opportunities to learn and grow, and I&apos;m always open to new challenges.
              </p>

              <p className="text-[#6B4423]">
                In the future, I want to work on projects that are meaningful and impactful, and I want to work with people who are passionate about their work.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
