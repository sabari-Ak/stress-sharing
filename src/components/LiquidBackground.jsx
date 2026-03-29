import React, { useEffect, useRef } from 'react'

const LiquidBackground = () => {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const initBackground = async () => {
      try {
        // Dynamically import the liquid background library from CDN
        const module = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.27/build/backgrounds/liquid1.min.js')
        const LiquidBackgroundFn = module.default

        const canvas = document.getElementById('canvas')
        if (!canvas) return

        const app = LiquidBackgroundFn(canvas)

        app.loadImage('ChatGPT Image Mar 29, 2026, 12_14_40 PM.png')
        app.liquidPlane.material.metalness = 0.75
        app.liquidPlane.material.roughness = 0.25
        app.liquidPlane.uniforms.displacementScale.value = 5
        app.setRain(false)

        window.addEventListener('resize', () => {
          app.resize()
        })
      } catch (error) {
        console.error('Failed to load LiquidBackground:', error)
      }
    }

    initBackground()

    return () => {
      // Cleanup if needed, though this library usually manages its own canvas
    }
  }, [])

  return <canvas id="canvas" />
}

export default LiquidBackground
