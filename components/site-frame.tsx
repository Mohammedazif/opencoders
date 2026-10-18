import Link from 'next/link'
import type { ReactNode } from 'react'
import { ContactForm } from '@/components/contact-form'
import { focus } from '@/components/kit'
import { Logo } from '@/components/logo'
import { ProductDrawer } from '@/components/product-drawer'
import { Slogan } from '@/components/slogan'
import { TopNav } from '@/components/top-nav'
import { footerColumns } from '@/lib/footer'
import { siteName, tagline } from '@/lib/nav'
import { contactEmail } from '@/lib/url'
import { cn } from '@/lib/utils'

export function PreFooter({ defaultInterest }: { defaultInterest?: string }) {
  return (
    <section id="contact" className="container scroll-mt-24 px-container">
      <div className="grid overflow-hidden rounded-xl border lg:grid-cols-3">
        <div className="flex flex-col justify-between gap-10 bg-background-panel p-8">
          <div>
            <h2 className="text-4xl font-medium tracking-tight">
              Have a project?
              <br />
              <span className="text-foreground-secondary">Let’s talk.</span>
            </h2>
            <p className="mt-4 text-xl text-foreground-secondary">
              Tell us about your project and we will get back to you.
            </p>
          </div>
          <a
            href={`mailto:${contactEmail}`}
            className={cn('w-fit rounded-sm text-lg font-medium underline underline-offset-4', focus)}
          >
            {contactEmail}
          </a>
        </div>
        <div className="bg-background-panel p-6 pt-8 lg:col-span-2 lg:border-l lg:p-8">
          <ContactForm defaultInterest={defaultInterest} />
        </div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer>
      <div className="container grid grid-cols-8 gap-8 px-container py-20">
        <div className="col-span-8 flex flex-col justify-between gap-8 md:col-span-3 lg:col-span-4">
          <Logo />
          <Slogan animate={false} className="hidden font-semibold md:block" />
        </div>
        <div className="col-span-8 flex flex-col gap-8 xs:flex-row md:col-span-5 lg:col-span-4">
          {footerColumns.map((column) => (
            <div key={column.title} className="flex-1">
              <p className="mb-4 text-xs font-medium uppercase tracking-wider text-foreground-secondary">
                {column.title}
              </p>
              <ul className="text-lg leading-normal">
                {column.links.map((link) => (
                  <li key={link.href} className="mb-2">
                    <Link href={link.href} className={cn('rounded-sm hover:text-foreground-secondary', focus)}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="container flex flex-col items-start justify-between gap-1 px-container py-4 text-sm text-foreground-secondary xs:flex-row xs:items-center">
        <span>
          © {new Date().getFullYear()} {siteName}
        </span>
        <span>{tagline}</span>
      </div>
    </footer>
  )
}

export function SiteFrame({
  children,
  prefooter = true,
  defaultInterest,
}: {
  current?: string
  children: ReactNode
  prefooter?: boolean
  defaultInterest?: string
}) {
  return (
    <>
      <TopNav />
      <main id="content">{children}</main>
      <div className="mt-24 md:mt-32">
        {prefooter ? <PreFooter defaultInterest={defaultInterest} /> : null}
        <SiteFooter />
      </div>
      <ProductDrawer />
    </>
  )
}
