import { useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'


import restaurantsImg from '../../assets/Images/ind-restaurants-1400.webp'
import hotelsImg from '../../assets/Images/ind-hotels-1400.webp'
import cafesImg from '../../assets/Images/ind-cafes-1400.webp'
import cateringImg from '../../assets/Images/ind-catering-1400.webp'
import retailImg from '../../assets/Images/ind-retail-1400.webp'
import institutionsImg from '../../assets/Images/ind-institutions-1400.webp'
const sectorMedia = [
  { id: 'restaurants', img: restaurantsImg },
  { id: 'hotels', img: hotelsImg },
  { id: 'cafes', img: cafesImg },
  { id: 'catering', img: cateringImg },
  { id: 'retail', img: retailImg },
  { id: 'institutions', img: institutionsImg },
]

export default function WeServe() {
  const { t, i18n } = useTranslation()
  const sectors = t('whoWeServe.sectors', { returnObjects: true })
  const [active, setActive] = useState(0)

  return <>
   <section id="who-we-serve" className="bg-[#193828] text-white py-16 md:py-24">
      <div className="w-10/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* LEFT */}
        <div>
          <p className="flex items-center gap-3 uppercase rtl:normal-case tracking-widest rtl:tracking-normal text-[10px] text-amber-200/80 before:content-[''] before:w-4 before:h-px before:bg-amber-200/80">
            {t('whoWeServe.kicker')}
          </p>

          <h2 className="secondFont text-3xl md:text-5xl font-light leading-tight mt-3 w-3/4">
            {t('whoWeServe.title')}
          </h2>

          <p className="instrument-sans text-sm text-gray-300 mt-5 pb-5 max-w-md">
            {t('whoWeServe.description')}
          </p>

          <ul className="border-t border-white/10">
            {sectorMedia.map(({ id }, i) => {
              const { title, desc } = sectors[i]
              const isActive = active === i
              return (
                <li
                  key={id}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  tabIndex={0}
                  className="group flex gap-5 py-5 border-b border-white/10  outline-none"
                >
                  <span className="instrument-sans text-[10px] font-semibold pt-2 w-6 shrink-0">
                    {(i + 1).toLocaleString(i18n.resolvedLanguage || i18n.language, { minimumIntegerDigits: 2, useGrouping: false })}
                  </span>

                  <div
                    className={`flex-1 transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-50'
                    }`}
                  >
                    <h3 className="secondFont text-2xl font-light">{title}</h3>
                    <p className="instrument-sans text-xs text-gray-300 mt-2 max-w-sm">
                      {desc}
                    </p>
                  </div>

                  <FaArrowRightLong
                    className={`text-xs mt-2 shrink-0 transition-opacity duration-300 rtl:rotate-180 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </li>
              )
            })}
          </ul>
        </div>

        {/* RIGHT */}
<div className="relative hidden lg:block w-full aspect-[5/6] rounded-md overflow-hidden lg:sticky lg:top-24">
          {sectorMedia.map(({ id, img }, i) => (
            <img
              key={id}
              src={img}
              alt={sectors[i].title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                active === i ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  
  </>
}
