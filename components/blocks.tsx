import Link from 'next/link'
import type { Group, Question } from '@/lib/site'

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'

export function GroupGrid({ groups }: { groups: Group[] }) {
  return (
    <ul className="grid border-y border-white/10 sm:grid-cols-2">
      {groups.map((group) => {
        const body = (
          <>
            <h3 className="text-base text-white">{group.title}</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-400">{group.body}</p>
          </>
        )
        return (
          <li key={group.title} className="border-b border-white/10 sm:[&:nth-child(odd)]:border-r">
            {group.href ? (
              <Link
                href={group.href}
                className={`block p-6 transition-colors hover:bg-white/[0.03] ${focus}`}
              >
                {body}
                <span className="mt-4 block font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                  Open
                </span>
              </Link>
            ) : (
              <div className="p-6">{body}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export function Questions({ items }: { items: Question[] }) {
  return (
    <div className="border-b border-white/10">
      {items.map((item) => (
        <details key={item.q} className="group border-t border-white/10">
          <summary
            className={`cursor-pointer list-none py-4 text-white [&::-webkit-details-marker]:hidden ${focus}`}
          >
            <span className="flex items-start justify-between gap-6">
              <span>{item.q}</span>
              <span
                aria-hidden
                className="mt-1 font-mono text-xs text-neutral-500 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </span>
          </summary>
          <p className="max-w-2xl pb-5 text-sm leading-6 text-neutral-400">{item.a}</p>
        </details>
      ))}
    </div>
  )
}
