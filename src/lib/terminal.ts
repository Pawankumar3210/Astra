import { portfolio, publicContact, type Portfolio } from '@/content/portfolio'

export type TerminalResult =
  | { type: 'output'; lines: string[] }
  | { type: 'clear' }
  | { type: 'exit' }

const COMMANDS = [
  'help',
  'about',
  'projects',
  'skills',
  'contact',
  'clear',
  'exit',
] as const

export const ALLOWED_COMMANDS: readonly string[] = COMMANDS

function wrap(title: string, lines: string[]) {
  return [title, ...lines]
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
          'projects   mission archive',
          'skills     technology groups',
          'contact    public contact options',
          'clear      clear the buffer',
          'exit       close the terminal',
        ]),
      }
    case 'about':
      return {
        type: 'output',
        lines: wrap(`${data.owner.name} — ${data.owner.title}`, [
          data.owner.summary,
          data.motto,
        ]),
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
