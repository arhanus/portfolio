"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { IndieButton } from "@/components/indie-button"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl animate-[float_6s_ease-in-out_infinite]" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-chart-2/10 rounded-[40%_60%_70%_30%/40%_60%_30%_70%] blur-3xl animate-[float_8s_ease-in-out_infinite]" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
            Hi! I&apos;m Arhan
            <br />
            <span className="text-primary block">CS Student and</span>
            <span className="text-primary block">Full-Stack Dev</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance">
            Turning caffeine into code and ideas into reality. Let&apos;s make something awesome together.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <IndieButton
              size="lg"
              variant="primary"
              className="group"
              onClick={() => scrollToSection("projects")}
            >
              View My Work
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
            </IndieButton>
            <IndieButton
              size="lg"
              variant="secondary"
              onClick={() => scrollToSection("contact")}
            >
              Let&apos;s Chat
            </IndieButton>
          </div>

          <div className="flex gap-4 justify-center">
            {[
              { icon: Github, href: "https://github.com/arhanus" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/arhan-us-48539a249/" },
              { icon: Twitter, href: "https://x.com/arhanus" },
              { icon: Mail, href: "mailto:arhanus0@gmail.com" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                className="w-12 h-12 rounded-xl bg-card border-2 border-border flex items-center justify-center hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:rotate-6 shadow-md"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
      `}</style>
    </section>
  )
}
