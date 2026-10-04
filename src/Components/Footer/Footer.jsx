import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
  FaFacebookF,
  FaArrowUp,
} from 'react-icons/fa6'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/Images/alwaab-02.png'

export default function Footer() {
  const { t, i18n } = useTranslation()
  const company = [
    { to: '/' },
    { to: '/#who-we-serve' },
    { to: '/#why-alwaab' },
    { to: '/#contact' },
  ]

const socials = [
  { icon: FaLinkedinIn, href: '#', id: 'linkedin' },
  { icon: FaInstagram, href: '#', id: 'instagram' },
  { icon: FaXTwitter, href: '#', id: 'x' },
  { icon: FaFacebookF, href: '#', id: 'facebook' },
]

const contactItems = [
  { icon: FiPhone, key: 'footer.phone' },
  { icon: FiMail, key: 'footer.email' },
  { icon: FiMapPin, key: 'footer.address' },
]

const headingClass =
  'instrument-sans uppercase rtl:normal-case tracking-widest rtl:tracking-normal text-[10px] text-amber-200/80 mb-6'
const linkClass =
  'instrument-sans text-xs text-gray-200 hover:text-white transition'

  return<>
  
  <footer className="bg-[#0B1F14] text-white">
      <div className="w-10/12 mx-auto pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-6 lg:gap-8">
          {/* Brand */}
          <div>
            <img src={logo} alt={t('footer.logoAlt')} className="h-32 w-44" />
            <p className="instrument-sans text-xs text-gray-300 mt-5 max-w-xs leading-relaxed">
              {t('footer.brandDescription')}
            </p>

            <div className="flex gap-2 mt-6">
              {socials.map(({ icon: Icon, href, id }) => (
                <a
                  key={id}
                  href={href}
                  aria-label={t(`footer.social.${id}`)}
                  className="size-9 rounded-full border border-white/20 flex items-center justify-center text-xs hover:bg-white hover:text-[#0B1F14] transition"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className={headingClass}>{t('footer.companyTitle')}</h4>
            <ul className="flex flex-col gap-2">
              {company.map(({ to }, index) => (
                <li key={to}>
                  <Link to={to} className={linkClass}>
                    {t('footer.companyLinks', { returnObjects: true })[index]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className={headingClass}>{t('footer.productsTitle')}</h4>
            <ul className="flex flex-col gap-2">
              {t('footer.products', { returnObjects: true }).map((item, index) => (
                <li key={index}>
                  <a href="#" className={linkClass}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className={headingClass}>{t('footer.contactTitle')}</h4>
            <ul className="flex flex-col gap-4">
              {contactItems.map(({ icon: Icon, key }) => (
                <li key={key} className="flex items-start gap-3">
                  <Icon className="text-xs text-amber-200/80 mt-0.5 shrink-0" />
                  <span className={linkClass}>{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 mt-14 pt-6">
          <p className="instrument-sans text-[11px] text-gray-400">
            {t('footer.copyright', { year: new Date().getFullYear().toLocaleString(i18n.resolvedLanguage || i18n.language) })}
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="instrument-sans inline-flex items-center gap-2 text-[11px] text-gray-300 hover:text-white transition"
          >
            {t('footer.backToTop')} <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  
  </>
}
