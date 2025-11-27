"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { IndieButton } from "@/components/indie-button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, CheckCircle2, XCircle } from "lucide-react"

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      // Status mesajını 5 saniye sonra kaldır
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-secondary/30" id="contact">
      <div className="max-w-5xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-balance relative">
            <span className="relative inline-block text-primary">
              <span className="absolute inset-0 text-orange-800 dark:text-orange-900" style={{ transform: 'translate(2px, 2px)' }}>
                Let&apos;s Work Together
              </span>
              <span className="absolute inset-0 text-orange-800 dark:text-orange-900" style={{ transform: 'translate(4px, 4px)' }}>
                Let&apos;s Work Together
              </span>
              <span className="absolute inset-0 text-orange-800 dark:text-orange-900" style={{ transform: 'translate(6px, 6px)' }}>
                Let&apos;s Work Together
              </span>
              <span className="relative z-10">Let&apos;s Work Together</span>
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-yellow-200/3 border border-[#D2B48C] transition-all duration-300 shadow-[0px_5px_0px_0px_rgba(210,180,140,1)] hover:shadow-[0px_8px_0px_0px_rgba(210,180,140,1)] hover:-translate-y-[2px]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    className="bg-background border-2"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="bg-background border-2"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Input
                    name="subject"
                    placeholder="Subject"
                    className="bg-background border-2"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    className="bg-background border-2"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Status mesajları */}
                {submitStatus === "success" && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-600/30 p-3 rounded-lg border border-green-200 dark:border-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Message sent successfully!</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-950/30 p-3 rounded-lg border border-red-200 dark:border-red-900">
                    <XCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Failed to send message. Please try again.</span>
                  </div>
                )}

                <IndieButton type="submit" className="w-full" size="lg" variant="primary" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </IndieButton>
              </form>
            </Card>

            <div className="space-y-6">
              <Card className="p-6 bg-yellow-200/3 border border-[#D2B48C] transition-all duration-300 shadow-[0px_5px_0px_0px_rgba(210,180,140,1)] hover:shadow-[0px_8px_0px_0px_rgba(210,180,140,1)] hover:-translate-y-[2px]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border-2 border-primary/20">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">arhanus0@gmail.com</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-yellow-200/3 border border-[#D2B48C] transition-all duration-300 shadow-[0px_5px_0px_0px_rgba(210,180,140,1)] hover:shadow-[0px_8px_0px_0px_rgba(210,180,140,1)] hover:-translate-y-[2px]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border-2 border-primary/20">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+1 (541) 740-2126</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-yellow-200/3 border border-[#D2B48C] transition-all duration-300 shadow-[0px_5px_0px_0px_rgba(210,180,140,1)] hover:shadow-[0px_8px_0px_0px_rgba(210,180,140,1)] hover:-translate-y-[2px]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border-2 border-primary/20">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-muted-foreground">Corvallis, Oregon</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
