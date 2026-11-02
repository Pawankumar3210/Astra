import { ArrowUpRight } from 'lucide-react'
import { portfolio, publicContact } from '@/content/portfolio'
import { SectionHeading } from './SectionHeading'

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] px-6 py-16 sm:px-12 sm:py-20">
          <div
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full"
            style={{ background: 'radial-gradient(circle, var(--glow), transparent 70%)' }}
            aria-hidden="true"
          />
          <SectionHeading
            id="contact-heading"
            kicker="07 · Establish contact"
            title={portfolio.contact.heading}
          />
          <p className="prose-narrow mt-5">
            {portfolio.contact.body}
          </p>
          <ul className="relative mt-10 flex flex-wrap gap-3">
            {publicContact.map((channel) => (
              <li key={channel.id}>
                <a
                  href={channel.href}
                  className="btn btn-ghost"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {channel.label}
                  <span className="font-mono text-xs text-[var(--text-soft)]">{channel.handle}</span>
                  <ArrowUpRight size={16} />
                </a>
              </li>
            ))}
            {portfolio.resumeUrl ? (
              <li>
                <a className="btn btn-primary" href={portfolio.resumeUrl} download>
                  Download résumé
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </section>
  )
}
