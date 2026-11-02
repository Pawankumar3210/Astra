import { describe, expect, it } from 'vitest'
import { ALLOWED_COMMANDS, runCommand } from './terminal'
import { portfolio } from '@/content/portfolio'

describe('developer terminal', () => {
  it('exposes an allowlisted command set', () => {
    expect(ALLOWED_COMMANDS).toEqual([
      'help',
      'about',
      'projects',
      'skills',
      'contact',
      'clear',
      'exit',
    ])
  })

  it('reuses portfolio data for projects and about', () => {
    const about = runCommand('about')
    const projects = runCommand('projects')
    expect(about.type).toBe('output')
    expect(projects.type).toBe('output')
    if (about.type === 'output') {
      expect(about.lines.join(' ')).toContain(portfolio.owner.name)
    }
    if (about.type === 'output' && projects.type === 'output') {
      expect(about.lines.concat(projects.lines).join(' ')).not.toMatch(/PuzzleFlow/i)
      for (const project of portfolio.projects) {
        expect(projects.lines.join(' ')).toContain(project.title)
      }
    }
  })

  it('never treats input as executable code', () => {
    const result = runCommand('window.alert(1)')
    expect(result.type).toBe('output')
    if (result.type === 'output') {
      expect(result.lines[0]).toMatch(/not recognized/i)
      expect(result.lines.join(' ')).toContain('help')
    }
  })

  it('supports clear and exit', () => {
    expect(runCommand('clear')).toEqual({ type: 'clear' })
    expect(runCommand('exit')).toEqual({ type: 'exit' })
  })
})
