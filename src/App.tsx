import { useState } from 'react'
import { AboutSection } from '@/components/AboutSection'
import { ContactSection } from '@/components/ContactSection'
import { ConstellationTimeline } from '@/components/ConstellationTimeline'
import { CosmicHero } from '@/components/CosmicHero'
import { DeveloperTerminal } from '@/components/DeveloperTerminal'
import { Footer } from '@/components/Footer'
import { FutureTrajectory } from '@/components/FutureTrajectory'
import { MissionArchive } from '@/components/MissionArchive'
import { Navbar } from '@/components/Navbar'
import { Starfield } from '@/components/Starfield'
import { TechStack } from '@/components/TechStack'
import { ThemeProvider } from '@/context/ThemeContext'

function App() {
  const [terminalOpen, setTerminalOpen] = useState(false)

  return (
    <ThemeProvider>
      <a className="skip-link" href="#home">
        Skip to content
      </a>
      <Starfield />
      <Navbar />
      <main className="relative z-10">
        <CosmicHero />
        <AboutSection />
        <MissionArchive />
        <TechStack />
        <ConstellationTimeline />
        <FutureTrajectory />
        <ContactSection />
      </main>
      <Footer onOpenTerminal={() => setTerminalOpen(true)} />
      <DeveloperTerminal
        open={terminalOpen}
        onOpen={() => setTerminalOpen(true)}
        onClose={() => setTerminalOpen(false)}
      />
    </ThemeProvider>
  )
}

export default App
