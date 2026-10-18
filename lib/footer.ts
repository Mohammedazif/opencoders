import { letters } from '@/lib/nav'
import { products } from '@/lib/products'

export const footerColumns = [
  {
    title: 'Disciplines',
    links: [
      { href: '/services', label: 'All disciplines' },
      ...letters.map((item) => ({ href: item.href, label: item.name })),
    ],
  },
  {
    title: 'Products',
    links: products.map((product) => ({
      href: `/products/${product.slug}`,
      label: product.name,
    })),
  },
  {
    title: 'Company',
    links: [
      { href: '/work', label: 'Work' },
      { href: '/about', label: 'About' },
      { href: '/community', label: 'Community' },
      { href: '/development/teams', label: 'Teams' },
      { href: '/start', label: 'Start a project' },
    ],
  },
]
