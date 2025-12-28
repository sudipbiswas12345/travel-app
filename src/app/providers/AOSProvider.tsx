"use client"

import { useEffect, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

export default function AOSProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    AOS.init({
      once: true,
      duration: 700,
      easing: "ease-out",
    })
  }, [mounted])

  return <>{children}</>
}
