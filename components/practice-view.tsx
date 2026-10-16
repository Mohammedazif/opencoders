import Link from 'next/link'
import { GroupGrid, Questions } from '@/components/blocks'
import { SiteFrame } from '@/components/site-frame'
import type { Practice } from '@/lib/site'

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'

export function PracticeView({ practice }: { practice: Practice }) {
  const { letter } = practice
  return (
    <SiteFrame current={letter.href}>
      <article>
        <header className="mx-auto max-w-5xl px-5 pb-12 pt-16 md:pt-24">
          <p className="font-mono text-xs uppercase tracking-[0.22em]" style={{ color: letter.color }}>
            {letter.letter}
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl text-white md:text-6xl">
            {letter.name}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-neutral-200">{practice.promise}</p>
        </header>
        <div className="mx-auto max-w-5xl px-5">
          <GroupGrid groups={practice.groups} />
        </div>
        <section className="mx-auto max-w-5xl px-5 py-16">
          <h2 className="text-sm font-mono uppercase tracking-[0.18em] text-neutral-500">
            Questions
          </h2>
          <div className="mt-6">
            <Questions items={practice.questions} />
          </div>
        </section>
        <footer className="mx-auto flex max-w-5xl flex-col gap-8 px-5 pb-20">
          <p className="font-mono text-sm tracking-wide" style={{ color: letter.color }}>
            {letter.beat}
          </p>
          <p className="text-sm text-neutral-400">
            With{' '}
            {practice.continues.map((item, index) => (
              <span key={item.href}>
                {index > 0 ? (index === practice.continues.length - 1 ? ' and ' : ', ') : null}
                <Link href={item.href} className={`text-white ${focus}`} style={{ color: item.color }}>
                  {item.name}
                </Link>
              </span>
            ))}
            .
          </p>
          <Link
            href={practice.id === 'development' ? '/start#build' : '/start#customers'}
            className={`w-fit border border-white/15 px-4 py-2 text-sm text-white hover:border-white/40 ${focus}`}
          >
            Work with us
          </Link>
        </footer>
      </article>
    </SiteFrame>
  )
}
