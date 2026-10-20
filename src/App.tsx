import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider'
import { Preloader } from '@/components/layout/Preloader'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PipelineBackground } from '@/components/pipeline/PipelineBackground'
import { PipelineRail } from '@/components/ui/PipelineRail'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { NoiseOverlay } from '@/components/ui/NoiseOverlay'
import { Hero } from '@/components/sections/Hero'
import { Experience } from '@/components/sections/Experience'
import { Skills } from '@/components/sections/Skills'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { usePointerTracking } from '@/hooks/usePointerTracking'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export default function App() {
  usePrefersReducedMotion()
  usePointerTracking()

  return (
    <SmoothScrollProvider>
      <Preloader />
      <ProgressBar />

      <PipelineBackground />

      <NoiseOverlay />
      <Header />
      <PipelineRail />

      <main id="story" className="relative z-10">
        <Hero />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>

      <Footer />
    </SmoothScrollProvider>
  )
}
