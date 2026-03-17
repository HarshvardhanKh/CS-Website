'use client'

import { useEffect } from 'react'

import HeroSection from '@/src/app/team/HeroSection'
import MainContent from '@/src/app/team/MainContent'
import StackedSections from '@/src/app/team/StackedSections'
import SmoothScrollProvider from '@/src/app/team/SmoothScrollProvider'
import TeamsInfoComponent from '@/src/app/team/TeamsInfoComponent'

export default function TeamPage() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <SmoothScrollProvider>
      <main>
        <HeroSection />
        <MainContent />
        <TeamsInfoComponent />
        <StackedSections />
      </main>
    </SmoothScrollProvider>
  )
}
