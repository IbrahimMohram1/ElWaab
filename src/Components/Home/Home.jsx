import { useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'
import OurRange from '../OurRange/OurRange';
import ProductByCategories from '../ProductByCategories/ProductByCategories'
import WeServe from '../WeServe/WeServe';
import WhyElWaab from '../WhyElWaab/WhyElWaab';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal'
import Seo from '../Seo/Seo'

export default function Home() {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openContactModal = () => setIsModalOpen(true)
  return <>
    <Seo />
  
    <section id="home" className="hero-section relative min-h-screen flex items-center justify-center text-white">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* content */}
      <div className=" z-10 flex flex-col items-start gap-6 px-6 py-32 max-w-full">
        <div className='md:w-7/12 sm:w-full flex flex-col gap-y-5'>
<p className="flex text-[#CCBB98] items-center gap-3 uppercase rtl:normal-case text-sm before:content-[''] before:block before:w-8 before:h-0.5 before:bg-[#CCBB98] tracking-widest rtl:tracking-normal instrument-sans ">
          {t('hero.kicker')}
        </p>

        <h1 className="text-4xl md:text-6xl tracking-wider rtl:tracking-normal font-light secondFont">
          {t('hero.title')}
        </h1>

        <p className="text-sm tracking-widest rtl:tracking-normal text-wrap md:w-3/4 font-serif leading-7 font-extralight text-gray-200">
          {t('hero.description')}
        </p>

        <button
          type="button"
          onClick={openContactModal}
          className="inline-flex items-center tracking-widest rtl:tracking-normal w-fit gap-2 rounded-md text-black bg-white hover:bg-gray-200 font-medium  text-sm px-5 py-3 transition focus:outline-none focus:ring-4 focus:ring-white/40"
        >
          {t('hero.contactCta')}
          <FaArrowRightLong className="rtl:rotate-180" />
        </button>
        </div>
      </div>
    </section>

    <OurRange/>


    <WeServe />

    <WhyElWaab />

    <Contact onOpenContactModal={openContactModal} />

<Footer/>
  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
</>
}