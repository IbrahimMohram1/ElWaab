import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import heroImage from '../../assets/Images/hero-bg-1600.webp'
import logoImage from '../../assets/Images/alwaab-02.png'

export default function Seo() {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage || i18n.language
  const locale = language.startsWith('ar') ? 'ar' : 'en'
  const siteOrigin = typeof window === 'undefined' ? '' : window.location.origin
  const pageUrl = siteOrigin ? `${siteOrigin}${window.location.pathname}` : ''
  const imageUrl = siteOrigin ? new URL(heroImage, siteOrigin).href : heroImage
  const logoUrl = siteOrigin ? new URL(logoImage, siteOrigin).href : logoImage
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': pageUrl ? `${pageUrl}#organization` : undefined,
        name: 'Alwaab Food Supplies',
        alternateName: 'الوعب',
        ...(pageUrl && { url: pageUrl }),
        logo: logoUrl,
        description: t('seo.description'),
      },
      {
        '@type': 'WebSite',
        '@id': pageUrl ? `${pageUrl}#website` : undefined,
        name: 'Alwaab Food Supplies',
        ...(pageUrl && { url: pageUrl }),
        inLanguage: locale,
        publisher: pageUrl ? { '@id': `${pageUrl}#organization` } : undefined,
      },
    ],
  }
  const structuredDataJson = JSON.stringify(structuredData).replace(/</g, '\\u003c')

  return (
    <Helmet>
      <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} />
      <title>{t('seo.title')}</title>
      <meta name="description" content={t('seo.description')} />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#193828" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Alwaab Food Supplies" />
      <meta property="og:title" content={t('seo.title')} />
      <meta property="og:description" content={t('seo.description')} />
      {pageUrl && <meta property="og:url" content={pageUrl} />}
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={t('seo.imageAlt')} />
      <meta property="og:locale" content={locale === 'ar' ? 'ar_EG' : 'en_US'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t('seo.title')} />
      <meta name="twitter:description" content={t('seo.description')} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={t('seo.imageAlt')} />
      <script type="application/ld+json">{structuredDataJson}</script>
    </Helmet>
  )
}