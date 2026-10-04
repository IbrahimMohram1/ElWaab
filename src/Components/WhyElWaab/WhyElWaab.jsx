import React from 'react'
import { useTranslation } from 'react-i18next'
import whyImg from '../../assets/Images/why-supply-1400.webp'

export default function WhyElWaab() {
  const { t, i18n } = useTranslation()
  const reasons = t('whyAlwaab.reasons', { returnObjects: true })
  return <>
  
   <section id="why-alwaab" className="bg-[#E8E0D0] text-[#1B3326] grid grid-cols-1 lg:grid-cols-2">
      {/* IMAGE */}
      <div className="relative min-h-[320px] lg:min-h-full">
        <img
          src={whyImg}
          alt={t('whyAlwaab.imageAlt')}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="px-6 md:px-12 lg:px-16 py-16 lg:py-24 flex flex-col justify-center">
        <p className="flex items-center gap-3 uppercase rtl:normal-case tracking-widest rtl:tracking-normal text-[10px] text-[#8A6A2F] before:content-[''] before:w-4 before:h-px before:bg-[#8A6A2F]">
          {t('whyAlwaab.kicker')}
        </p>

        <h2 className="secondFont text-4xl md:text-5xl font-light leading-tight mt-3 max-w-md">
          {t('whyAlwaab.title')}
        </h2>

        <p className="instrument-sans text-sm text-[#1B3326]/70 mt-5 max-w-sm">
          {t('whyAlwaab.description')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 mt-12">
          {reasons.map(({ title, desc }, i) => (
            <div key={i} className="border-t border-[#1B3326]/15 pt-4">
              <span className="instrument-sans text-[10px] font-semibold text-[#8A6A2F]">
                {(i + 1).toLocaleString(i18n.resolvedLanguage || i18n.language, { minimumIntegerDigits: 2, useGrouping: false })}
              </span>
              <h3 className="secondFont text-xl font-normal mt-3 leading-snug">
                {title}
              </h3>
              <p className="instrument-sans text-xs text-[#1B3326]/70 mt-2 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  
  </>
}
