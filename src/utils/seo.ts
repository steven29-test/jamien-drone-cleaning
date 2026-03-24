// src/utils/seo.ts
/**
 * Update page meta tags dynamically for better SEO
 */
export function updatePageMeta(
  title: string,
  description: string,
  canonicalUrl?: string
) {
  // Update title
  document.title = title

  // Update/create meta description
  let metaDescription = document.querySelector('meta[name="description"]')
  if (!metaDescription) {
    metaDescription = document.createElement('meta')
    metaDescription.setAttribute('name', 'description')
    document.head.appendChild(metaDescription)
  }
  metaDescription.setAttribute('content', description)

  // Update canonical URL
  if (canonicalUrl) {
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)
  }

  // Update Open Graph tags
  updateOGTag('og:title', title)
  updateOGTag('og:description', description)
  updateOGTag('og:url', canonicalUrl || window.location.href)

  // Scroll to top
  window.scrollTo(0, 0)
}

function updateOGTag(property: string, content: string) {
  let tag = document.querySelector(`meta[property="${property}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}
