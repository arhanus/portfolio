"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Canvas boyutlarını ayarla
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Pastel renkler
    const pastelColors = [
      "rgba(255, 182, 193, 0.3)", // Light pink
      "rgba(173, 216, 230, 0.3)", // Light blue
      "rgba(221, 160, 221, 0.3)", // Plum
      "rgba(176, 224, 230, 0.3)", // Powder blue
      "rgba(255, 218, 185, 0.3)", // Peach
      "rgba(230, 230, 250, 0.3)", // Lavender
      "rgba(152, 251, 152, 0.3)", // Pale green
    ]

    // Parçacıkları oluştur
    const particleCount = 50
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 2, // 2-6px arası
        speedX: (Math.random() - 0.5) * 0.5, // Yavaş yatay hareket
        speedY: (Math.random() - 0.5) * 0.5, // Yavaş dikey hareket
        opacity: Math.random() * 0.5 + 0.3, // 0.3-0.8 arası
        color: pastelColors[Math.floor(Math.random() * pastelColors.length)],
      })
    }

    // Animasyon loop
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Parçacığı çiz
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.shadowBlur = 15
        ctx.shadowColor = particle.color
        ctx.fill()

        // Hareketi güncelle
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Ekran sınırlarını kontrol et (wrap around)
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Opacity animasyonu
        particle.opacity += (Math.random() - 0.5) * 0.01
        particle.opacity = Math.max(0.2, Math.min(0.8, particle.opacity))
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}

