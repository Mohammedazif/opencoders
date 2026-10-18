import { cn } from '@/lib/utils'

/** OpenCoders mark: three dots for C, M, D inside a rounded square, plus the wordmark. */
export function Logo({ symbolOnly, className }: { symbolOnly?: boolean; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        aria-hidden
        className="grid h-8 w-8 place-items-center rounded-lg bg-foreground text-background"
      >
        <span className="flex gap-[3px]">
          <span className="h-[5px] w-[5px] rounded-full bg-letter-c" />
          <span className="h-[5px] w-[5px] rounded-full bg-letter-m" />
          <span className="h-[5px] w-[5px] rounded-full bg-letter-d" />
        </span>
      </span>
      {symbolOnly ? (
        <span className="sr-only">OpenCoders</span>
      ) : (
        <span className="text-xl font-semibold tracking-tight">OpenCoders</span>
      )}
    </span>
  )
}
