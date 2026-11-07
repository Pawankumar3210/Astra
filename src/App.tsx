import { useCallback, useState } from 'react'
import { AboutSection } from '@/components/AboutSection'
import { AppIntro } from '@/components/AppIntro'
import { CommandPalette } from '@/components/CommandPalette'
import { ContactSection } from '@/components/ContactSection'
import { ConstellationTimeline } from '@/components/ConstellationTimeline'
import { CosmicHero } from '@/components/CosmicHero'
import { DeveloperTerminal } from '@/components/DeveloperTerminal'
import { Footer } from '@/components/Footer'
import { FutureTrajectory } from '@/components/FutureTrajectory'
import { MissionArchive } from '@/components/MissionArchive'
import { Navbar } from '@/components/Navbar'
import { NotFound } from '@/components/NotFound'
import { OrbitalMinimap } from '@/components/OrbitalMinimap'
import { Starfield } from '@/components/Starfield'
import { TechStack } from '@/components/TechStack'
import { ThemeProvider } from '@/context/ThemeContext'
import { WarpExperience } from '@/components/WarpExperience'
import { useSmoothAnchorNavigation } from '@/hooks/useSmoothAnchorNavigation'

function App() {
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [notFound] = useState(
    () => !['/', '/index.html'].includes(window.location.pathname),
  )
  useSmoothAnchorNavigation()

  const openTerminal = useCallback(() => {
    setPaletteOpen(false)
    setTerminalOpen(true)
  }, [])

  const closeTerminal = useCallback(() => setTerminalOpen(false), [])
  const openPalette = useCallback(() => {
    setTerminalOpen(false)
    setPaletteOpen(true)
  }, [])
  const closePalette = useCallback(() => setPaletteOpen(false), [])

  return (
    <ThemeProvider>
      <AppIntro />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Starfield />
      <WarpExperience />
      {notFound ? (
        <NotFound />
      ) : (
        <>
          <Navbar onOpenPalette={openPalette} />
          <OrbitalMinimap />
          <main id="main-content" tabIndex={-1} className="relative z-10">
            <CosmicHero />
            <AboutSection onOpenTerminal={openTerminal} />
            <MissionArchive />
            <TechStack />
            <ConstellationTimeline />
            <FutureTrajectory />
            <ContactSection />
          </main>
          <Footer onOpenTerminal={openTerminal} />
        </>
      )}
      <DeveloperTerminal open={terminalOpen} onOpen={openTerminal} onClose={closeTerminal} />
      <CommandPalette
        open={paletteOpen}
        onOpen={openPalette}
        onClose={closePalette}
        onOpenTerminal={openTerminal}
      />
    </ThemeProvider>
  )
}

export default App
