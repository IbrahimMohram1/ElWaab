import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'
import contactBg from '../../assets/Images/contact-bg-1600.webp'
export default function Contact({ onOpenContactModal }) {
  const { t } = useTranslation()
  return <>
  
   <section id="contact"
      className="relative   flex items-center text-white bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${contactBg})` }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/75 " />

      <div className="relative z-10 w-10/12 mx-auto py-40">
<p className="flex text-[#CCBB98] items-center gap-3 uppercase rtl:normal-case text-sm before:content-[''] before:block before:w-8 before:h-0.5 before:bg-[#CCBB98] tracking-widest rtl:tracking-normal instrument-sans ">
          {t('contact.kicker')}
        </p>

        <h2 className="secondFont text-4xl md:text-6xl font-light leading-tight mt-3 max-w-lg">
          {t('contact.title')}
        </h2>

        <p className="instrument-sans text-sm text-gray-200 mt-5 max-w-sm leading-relaxed">
          {t('contact.description')}
        </p>

        <button
          type="button"
          onClick={onOpenContactModal}
          className="inline-flex items-center gap-2 mt-8 bg-[#F5F0E6] text-[#1B3326] hover:bg-white transition text-sm font-medium rounded-md px-5 py-3"
        >
          {t('contact.cta')}
          <FaArrowRightLong className="text-xs rtl:rotate-180" />
        </button>
      </div>
    </section>
  
  </>
}
