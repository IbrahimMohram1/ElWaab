import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/Images/logo.png'

const links = [
  { id: 'home', type: 'section' },
  { id: 'who-we-serve', type: 'section' },
  { id: 'why-alwaab', type: 'section' },
  { id: 'contact', type: 'section' },
  { id: 'product-catalog', type: 'page', to: '/product' },
]

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'

  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // تحديد السيكشن النشط وانت بتعمل scroll (في الهوم بس)
  useEffect(() => {
    if (!isHome) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    links
      .filter((l) => l.type === 'section')
      .forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })

    return () => observer.disconnect()
  }, [isHome])

  const goTo = (id) => {
    setOpen(false)
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  const isActive = (link) =>
    link.type === 'page' ? pathname === link.to : isHome && activeId === link.id

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language.startsWith('ar') ? 'en' : 'ar')
    setOpen(false)
  }
  const linkLabels = t('nav.links', { returnObjects: true })
  const languageLabel = t(
    i18n.language.startsWith('ar') ? 'nav.languageEnglish' : 'nav.languageArabic'
  )
  const languageAriaLabel = t(
    i18n.language.startsWith('ar') ? 'nav.switchToEnglish' : 'nav.switchToArabic'
  )
  const solid = scrolled || open || !isHome

  return (
    <nav
      className={`fixed top-0 start-0 w-full z-20 transition-colors duration-300 ${
        solid ? 'bg-white text-black shadow-sm' : 'bg-transparent text-white'
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          onClick={() => {
            if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' })
            setOpen(false)
          }}
          className="flex items-center"
        >
          <img src={logo} className={`w-16 transition ${solid ? 'invert' : ''}`} alt={t('nav.logoAlt')} />
        </Link>

        <div className="flex md:order-2 items-center gap-3">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={languageAriaLabel}
            className="hidden md:inline-flex items-center bg-white text-black justify-center rounded-md px-2 py-2 text-sm font-medium"
          >
            {languageLabel}
          </button>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center p-2 w-10 h-10 rounded-md md:hidden focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-controls="navbar-sticky"
            aria-expanded={open}
          >
            <span className="sr-only">{t(open ? 'nav.closeMenu' : 'nav.openMenu')}</span>
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h14" />
            </svg>
          </button>
        </div>

        <div
          id="navbar-sticky"
          className={`${open ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1 items-center`}
        >
          <ul className="flex flex-col  md:flex-row md:gap-8 p-4 md:p-0 mt-4 md:mt-0 font-medium">
            {links.map((link, index) => {
              const className = `block w-full cursor-pointer text-start py-2 px-3 md:p-0 transition-opacity ${
                isActive(link) ? 'opacity-100' : 'opacity-70 hover:opacity-100'
              }`

              return (
                <li className="cursor-pointer" key={link.id}>
                  {link.type === 'page' ? (
                    <Link to={link.to} onClick={() => setOpen(false)} className={className}>
                      {linkLabels[index]}
                    </Link>
                  ) : (
                    <button type="button" onClick={() => goTo(link.id)} className={className}>
                      {linkLabels[index]}
                    </button>
                  )}
                </li>
              )
            })}
            <li className="md:hidden">
              <button
                type="button"
                onClick={toggleLanguage}
                aria-label={languageAriaLabel}
                className="block w-full text-start py-2 px-3 md:p-0"
              >
                {languageLabel}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}