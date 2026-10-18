import Link from 'next/link'
import { ButtonLink, Eyebrow, ProductCover, StatusBadge, Tag, buttonClass, focus } from '@/components/kit'
import { products, type Product } from '@/lib/products'
import { cn } from '@/lib/utils'

/** The body of a product page. Used on /products/[slug] and inside the product drawer. */
export function ProductDetail({ product, inDrawer = false }: { product: Product; inDrawer?: boolean }) {
  const others = products.filter((item) => item.slug !== product.slug)
  const contactHref = inDrawer ? `/products/${product.slug}#contact` : '#contact'
  const Title = inDrawer ? 'h2' : 'h1'

  return (
    <article className={inDrawer ? 'pb-16' : undefined}>
      <header className={cn('container px-container', inDrawer ? 'pt-8 md:pt-12' : 'pt-10 md:pt-14 lg:pt-20')}>
        {inDrawer ? null : (
          <Link
            href="/products"
            className={cn('mb-6 inline-block rounded-sm text-sm font-medium text-foreground-secondary hover:text-foreground', focus)}
          >
            ← Products
          </Link>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={product.status} />
          <span className="text-sm text-foreground-secondary">{product.category}</span>
        </div>
        <Title className={cn('mt-4 font-semibold', inDrawer ? 'text-6xl' : 'text-7xl')}>
          <span className="block">{product.name}</span>
          <span className="block text-foreground-secondary">{product.tagline}</span>
        </Title>
        <p className="mt-8 max-w-2xl text-2xl text-foreground-secondary">{product.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {product.link ? (
            <a href={product.link.href} target="_blank" rel="noreferrer" className={buttonClass('primary')}>
              {product.link.label} ↗
            </a>
          ) : null}
          <a href={contactHref} className={buttonClass(product.link ? 'secondary' : 'primary')}>
            {product.status === 'Live' ? 'Get it for your team' : 'Ask for early access'}
          </a>
        </div>
      </header>

      <div className={cn('container px-container', inDrawer ? 'mt-12' : 'mt-14 md:mt-20')}>
        <ProductCover product={product} className="aspect-[16/9] w-full" />
      </div>

      <section className={cn('container px-container', inDrawer ? 'mt-16' : 'mt-24 md:mt-32')}>
        <div className="max-w-3xl">
          <h2 className="text-5xl font-medium text-foreground-secondary">What it does</h2>
          <p className="text-5xl font-medium">{product.tagline}</p>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border bg-line md:grid-cols-2">
          {product.features.map((feature, i) => (
            <li key={feature.title} className="flex flex-col gap-8 bg-background p-6 md:p-8">
              <span className="font-mono text-sm text-foreground-secondary">0{i + 1}</span>
              <div>
                <h3 className="text-2xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-lg text-foreground-secondary">{feature.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={cn('container px-container', inDrawer ? 'mt-16' : 'mt-24 md:mt-32')}>
        <Eyebrow>Built with</Eyebrow>
        <ul className="mt-4 flex flex-wrap gap-2">
          {product.stack.map((item) => (
            <li key={item}>
              <Tag className="h-9 px-3.5 text-base">{item}</Tag>
            </li>
          ))}
        </ul>
      </section>

      <section className={cn('container px-container', inDrawer ? 'mt-16' : 'mt-24 md:mt-32')}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl font-medium">More products</h2>
          {inDrawer ? null : (
            <ButtonLink href="/products" variant="secondary" arrow>
              All products
            </ButtonLink>
          )}
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {others.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/products/${item.slug}`}
                data-drawer={item.slug}
                className={cn('group block rounded-xl', focus)}
              >
                <ProductCover
                  product={item}
                  className="aspect-[4/3] transition-transform duration-500 ease-smooth group-hover:scale-[0.98]"
                />
                <p className="mt-4 text-xl font-medium">
                  {item.name} <span className="text-foreground-secondary">{item.tagline}</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
