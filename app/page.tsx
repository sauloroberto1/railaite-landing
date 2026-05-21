'use client'

import { useEffect } from 'react'
import { LandingPage } from '@/components/LandingPage'

export default function Page() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <LandingPage />
}
