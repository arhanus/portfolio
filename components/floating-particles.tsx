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
  shape: 'circle' | 'square' | 'triangle'
  rotation: number
  rotationSpeed: number
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

    // Koyu bej tonları
    const beigeColors = [
      "rgba(160, 120, 80, 0.4)",   // Koyu bej
      "rgba(139, 90, 60, 0.4)",    // Kahverengi bej
      "rgba(150, 110, 75, 0.4)",   // Orta bej
      "rgba(130, 100, 70, 0.4)",   // Koyu kahve bej
      "rgba(145, 105, 70, 0.4)",   // Koyu tan
    ]
    
    const shapes: Array<'circle' | 'square' | 'triangle'> = ['circle', 'square', 'triangle']

    // Parçacıkları oluştur
    const particleCount = 30
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 6 + 4, // 4-10px arası
        speedX: (Math.random() - 0.5) * 0.3, // Yavaş yatay hareket
        speedY: (Math.random() - 0.5) * 0.3, // Yavaş dikey hareket
        opacity: Math.random() * 0.5 + 0.3, // 0.3-0.8 arası
        color: beigeColors[Math.floor(Math.random() * beigeColors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      })
    }

    // Animasyon loop
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate(particle.rotation)
        
        ctx.fillStyle = particle.color
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        
        // Şekle göre çiz
        if (particle.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2)
          ctx.fill()
        } else if (particle.shape === 'square') {
          ctx.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2)
        } else if (particle.shape === 'triangle') {
          ctx.beginPath()
          ctx.moveTo(0, -particle.size)
          ctx.lineTo(particle.size, particle.size)
          ctx.lineTo(-particle.size, particle.size)
          ctx.closePath()
          ctx.fill()
        }
        
        ctx.restore()

        // Hareketi güncelle
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.rotation += particle.rotationSpeed

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
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: 0.2, zIndex: -10 }}
    />
  )
}

