import { cn } from '@/lib/cn'

type SectionHeadingProps = {
  kicker: string
  title: string
  description?: string
  align?: 'left' | 'center'
  id?: string
}

export function SectionHeading({
  kicker,
  title,
  description,
  align = 'left',
  id,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      <p className={cn('kicker', align === 'center' && 'justify-center')}>{kicker}</p>
      <h2 id={id} className="heading-lg mt-4 text-[var(--text)]">{title}</h2>
      {description ? (
        <p className="prose-narrow mt-4" style={{ marginInline: align === 'center' ? 'auto' : undefined }}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
