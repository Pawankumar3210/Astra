import { describe, expect, it } from 'vitest'
import { portfolio, publicContact } from './portfolio'

describe('portfolio content', () => {
  it('features the required missions and omits PuzzleFlow', () => {
    const titles = portfolio.projects.map((project) => project.title)
    expect(titles).toEqual([
      'ResuMint',
      'Wisdom Vault',
      'DoxDock',
      'RepoWarp',
      'BioScope',
      'ResQChain',
      'TenderTrace AI',
    ])
    expect(JSON.stringify(portfolio)).not.toMatch(/PuzzleFlow/i)
  })

  it('credits Team Udbhav and keeps journey wording professional', () => {
    for (const id of ['resqchain', 'tendertrace']) {
      const project = portfolio.projects.find((item) => item.id === id)
      expect(project?.role).toContain('Team Udbhav')
    }

    const journey = new Map(portfolio.journey.map((item) => [item.id, item]))
    expect(journey.get('dsa')?.period).toBe('Present')
    expect(journey.get('doxdock')?.title).toBe('DoxDock open-source contributions')
    expect(journey.get('doxdock')?.title).not.toMatch(/\bten\b|\d+\s+merged/i)
    expect(journey.get('doxdock')?.period).toBe('Aug 2026 – Present')
    expect(journey.get('slug')?.period).toBe('May 2026 – Present')
  })

  it('does not publish empty contact destinations', () => {
    for (const channel of publicContact) {
      expect(channel.href.length).toBeGreaterThan(0)
    }
  })

  it('keeps journey entries complete', () => {
    for (const item of portfolio.journey) {
      expect(item.title.length).toBeGreaterThan(0)
      expect(item.description.length).toBeGreaterThan(0)
      expect(item.period.length).toBeGreaterThan(0)
    }
  })

  it('plots every requested journey category', () => {
    const categories = new Set(portfolio.journey.map((item) => item.category))
    for (const category of [
      'education',
      'opensource',
      'hackathon',
      'milestone',
      'future',
    ]) {
      expect(categories.has(category as (typeof portfolio.journey)[number]['category'])).toBe(true)
    }
  })

  it('publishes the confirmed profile, resume, and production origin', () => {
    expect(portfolio.siteUrl).toBe('https://pawankumarg.vercel.app')
    expect(portfolio.resumeUrl).toBe('/pawan-kumar-g-resume.pdf')
    expect(JSON.stringify(portfolio)).toContain('https://www.linkedin.com/in/pawan-kumar-g/')
    expect(portfolio.journey.some((item) => item.id === 'slug')).toBe(true)
  })

  it('publishes architecture, availability, now, and shortcut data', () => {
    expect(portfolio.owner.availability.length).toBeGreaterThan(0)
    expect(portfolio.now.items.length).toBeGreaterThanOrEqual(3)
    expect(portfolio.paletteShortcut).toBe('Ctrl/⌘ + K')
    expect(portfolio.terminalShortcut).toBe('Ctrl/⌘ + J')
    for (const project of portfolio.projects) {
      expect(project.architecture.length).toBeGreaterThanOrEqual(3)
      for (const node of project.architecture) {
        expect(node.label.length).toBeGreaterThan(0)
        expect(node.detail.length).toBeGreaterThan(0)
      }
    }
  })

  it('only publishes http(s) destinations', () => {
    for (const project of portfolio.projects) {
      for (const url of [project.repositoryUrl, project.liveUrl]) {
        if (url) expect(url).toMatch(/^https:\/\//)
      }
    }
    for (const channel of publicContact) {
      expect(channel.href).toMatch(/^(https:\/\/|mailto:)/)
    }
  })
})
