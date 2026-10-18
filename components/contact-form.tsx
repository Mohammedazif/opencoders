'use client'

import { useState } from 'react'
import { buttonClass, focus } from '@/components/kit'
import { letters } from '@/lib/nav'
import { products } from '@/lib/products'
import { contactEmail } from '@/lib/url'
import { cn } from '@/lib/utils'

const interests = [
  ...letters.map((item) => item.name),
  'All three',
  'A product',
  'An engineering team',
]

const field =
  'w-full rounded-lg border bg-background px-3 py-2.5 text-base text-foreground placeholder:text-foreground-tertiary focus:border-foreground focus:outline-none'

/** Builds an email to the studio from the form; no backend needed. */
export function ContactForm({ defaultInterest }: { defaultInterest?: string }) {
  const [picked, setPicked] = useState<string[]>(defaultInterest ? [defaultInterest] : [])

  const toggle = (value: string) =>
    setPicked((current) =>
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    )

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const name = String(data.get('name') ?? '')
        const company = String(data.get('company') ?? '')
        const message = String(data.get('message') ?? '')
        const product = String(data.get('product') ?? '')
        const subject = `New project${picked.length ? `: ${picked.join(', ')}` : ''}`
        const lines = [`Name: ${name}`]
        if (company) lines.push(`Company: ${company}`)
        if (picked.length) lines.push(`Interested in: ${picked.join(', ')}`)
        if (product) lines.push(`Product: ${product}`)
        const body = [...lines, '', message].join('\n')
        window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      }}
    >
      <fieldset>
        <legend className="mb-3 text-sm font-medium text-foreground-secondary">
          What can we help with?
        </legend>
        <div className="flex flex-wrap gap-2">
          {interests.map((value) => {
            const on = picked.includes(value)
            return (
              <button
                key={value}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(value)}
                className={cn(
                  'h-9 rounded-full border px-4 text-sm font-medium transition-colors',
                  on
                    ? 'border-foreground bg-foreground text-background'
                    : 'bg-background hover:bg-background-offset',
                  focus
                )}
              >
                {value}
              </button>
            )
          })}
        </div>
      </fieldset>

      {picked.includes('A product') ? (
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Which product?
          <select name="product" className={field} defaultValue="">
            <option value="" disabled>
              Choose a product
            </option>
            {products.map((product) => (
              <option key={product.slug}>{product.name}</option>
            ))}
          </select>
        </label>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Name
          <input required name="name" autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Company
          <input name="company" autoComplete="organization" className={field} placeholder="Optional" />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Tell us about it
        <textarea
          required
          name="message"
          rows={4}
          className={cn(field, 'resize-y')}
          placeholder="What do you need help with?"
        />
      </label>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-foreground-secondary">
          Opens your email app, addressed to{' '}
          <a href={`mailto:${contactEmail}`} className={cn('underline underline-offset-2', focus)}>
            {contactEmail}
          </a>
          .
        </p>
        <button type="submit" className={buttonClass('primary')}>
          Send message
        </button>
      </div>
    </form>
  )
}
