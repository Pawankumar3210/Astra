import { portfolio, publicContact, type Portfolio } from '@/content/portfolio'

export type TerminalResult =
  | { type: 'output'; lines: string[] }
  | { type: 'clear' }
  | { type: 'exit' }
  | { type: 'effect'; effect: 'theme-toggle' | 'warp'; lines: string[] }

const PUBLIC_COMMANDS = [
  'help',
  'about',
  'now',
  'projects',
  'skills',
  'contact',
  'github',
  'resume',
  'theme',
  'motto',
  'clear',
  'exit',
] as const

const SECRET_COMMANDS = ['warp', 'sudo', 'coffee', '42'] as const

export const AUTOCOMPLETE_COMMANDS: readonly string[] = PUBLIC_COMMANDS
export const ALLOWED_COMMANDS: readonly string[] = [...PUBLIC_COMMANDS, ...SECRET_COMMANDS]

function wrap(title: string, lines: string[]) {
  return [title, ...lines]
}

function getContact(data: Portfolio, id: string) {
  return (
    publicContact.find((channel) => channel.id === id) ??
    data.contact.channels.find((channel) => channel.id === id)
  )
}

export function runCommand(
  raw: string,
  data: Portfolio = portfolio,
): TerminalResult {
  const input = raw.trim().toLowerCase()

  if (!input) {
    return { type: 'output', lines: [] }
  }

  switch (input) {
    case 'help':
      return {
        type: 'output',
        lines: wrap('Available commands', [
          'help       list commands',
          'about      profile introduction',
          'now        current focus threads',
          'projects   mission archive',
          'skills     technology groups',
          'contact    public contact options',
          'github     GitHub profile',
          'resume     résumé location',
          'theme      toggle light / dark',
          'motto      mission motto',
          'clear      clear the buffer',
          'exit       close the terminal',
        ]),
      }
    case 'about':
      return {
        type: 'output',
        lines: wrap(`${data.owner.name} — ${data.owner.title}`, [
          data.owner.summary,
          data.owner.availability,
          data.motto,
        ]),
      }
    case 'now':
      return {
        type: 'output',
        lines: wrap(`Now — updated ${data.now.updated}`, data.now.items.map(
          (item) => `${item.label}: ${item.detail}`,
        )),
      }
    case 'projects':
      return {
        type: 'output',
        lines: wrap(
          'Mission archive',
          data.projects.map(
            (project) =>
              `${project.missionId}  ${project.title} — ${project.shortDescription}`,
          ),
        ),
      }
    case 'skills':
      return {
        type: 'output',
        lines: wrap(
          'Technology groups',
          data.tech.map(
            (group) => `${group.title}: ${group.items.map((item) => item.name).join(', ')}`,
          ),
        ),
      }
    case 'contact': {
      const channels = publicContact.length
        ? publicContact
        : data.contact.channels.filter((channel) => channel.href)
      if (!channels.length) {
        return {
          type: 'output',
          lines: ['No public contact channels are configured yet.'],
        }
      }
      return {
        type: 'output',
        lines: wrap(
          'Contact',
          channels.map((channel) => `${channel.label}: ${channel.href}`),
        ),
      }
    }
    case 'github': {
      const github = getContact(data, 'github')
      return {
        type: 'output',
        lines: github
          ? [`GitHub: ${github.href}`]
          : ['GitHub profile is not configured yet.'],
      }
    }
    case 'resume':
      return {
        type: 'output',
        lines: wrap('Résumé', [
          `PDF: ${data.resumeUrl}`,
          'Use the résumé button in the interface to download the latest copy.',
        ]),
      }
    case 'theme':
      return {
        type: 'effect',
        effect: 'theme-toggle',
        lines: ['Switching theme preference.'],
      }
    case 'motto':
      return { type: 'output', lines: [data.motto] }
    case 'warp':
      return {
        type: 'effect',
        effect: 'warp',
        lines: ['Initiating warp drive. Hold onto your orbit.'],
      }
    case 'sudo':
      return {
        type: 'output',
        lines: ['Nice try. ASTRA does not grant orbital root access.'],
      }
    case 'coffee':
      return {
        type: 'output',
        lines: ['Coffee module offline. Tea subroutine remains fully operational.'],
      }
    case '42':
      return {
        type: 'output',
        lines: ['The answer is confirmed. The question is still in orbit.'],
      }
    case 'clear':
      return { type: 'clear' }
    case 'exit':
      return { type: 'exit' }
    default:
      return {
        type: 'output',
        lines: [
          `Command not recognized: ${raw.trim()}`,
          'Try `help` for the available commands.',
        ],
      }
  }
}
