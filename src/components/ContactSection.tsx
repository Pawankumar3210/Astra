import { ArrowUpRight, Mail } from 'lucide-react'
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
          <div className="relative z-10 grid gap-9 xl:grid-cols-[1.1fr_0.9fr] xl:items-center xl:gap-12">
            <div className="xl:col-start-1 xl:row-start-1">
              <SectionHeading
                id="contact-heading"
                kicker="07 · Establish contact"
                title={portfolio.contact.heading}
              />
              <p className="prose-narrow mt-5">{portfolio.contact.body}</p>
            </div>

            <div className="contact-signal xl:col-start-2 xl:row-span-2 xl:row-start-1" aria-hidden="true">
              <div className="contact-orbit">
                <span className="contact-orbit__ticks" />
                <span className="contact-orbit__ring contact-orbit__ring--outer" />
                <span className="contact-orbit__ring contact-orbit__ring--inner" />
                <span className="contact-orbit__ellipse contact-orbit__ellipse--one" />
                <span className="contact-orbit__ellipse contact-orbit__ellipse--two" />
                <span className="contact-orbit__sweep" />
                <span className="contact-orbit__axis contact-orbit__axis--x" />
                <span className="contact-orbit__axis contact-orbit__axis--y" />
                <span className="contact-orbit__satellite contact-orbit__satellite--one">
                  <span className="contact-orbit__dot" />
                </span>
                <span className="contact-orbit__satellite contact-orbit__satellite--two">
                  <span className="contact-orbit__dot" />
                </span>
                <span className="contact-orbit__satellite contact-orbit__satellite--three">
                  <span className="contact-orbit__dot" />
                </span>
                <span className="contact-orbit__core">
                  <span className="contact-orbit__ping" />
                  <span className="contact-orbit__ping contact-orbit__ping--late" />
                </span>
                <span className="contact-orbit__label contact-orbit__label--top">
                  Establishing link
                </span>
                <span className="contact-orbit__label contact-orbit__label--bottom">
                  Signal / seek
                </span>
              </div>
              <p className="contact-signal__readout">
                <span className="contact-signal__pulse" />
                Uplink ready · awaiting message
              </p>
            </div>

            <ul className="relative flex flex-wrap gap-3 xl:col-start-1 xl:row-start-2">
              {publicContact.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    className="btn btn-ghost max-w-full"
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel={channel.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  >
                    {channel.label}
                    {channel.id === 'email' ? <Mail size={16} /> : <ArrowUpRight size={16} />}
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
      </div>
    </section>
  )
}
