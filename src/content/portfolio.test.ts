import { describe, expect, it } from 'vitest'
import { portfolio, publicContact } from './portfolio'

describe('portfolio content', () => {
  it('features the required missions and omits PuzzleFlow', () => {
    const titles = portfolio.projects.map((project) => project.title)
    expect(titles).toEqual(['ResuMint', 'Wisdom Vault', 'DoxDock'])
    expect(JSON.stringify(portfolio)).not.toMatch(/PuzzleFlow/i)
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
