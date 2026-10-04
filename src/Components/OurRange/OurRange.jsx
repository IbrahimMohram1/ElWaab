import { useTranslation } from 'react-i18next'

import produceImg from '../../assets/Images/cat-produce-900.webp'
import meatImg from '../../assets/Images/cat-meat-900.webp'
import seafoodImg from '../../assets/Images/cat-seafood-900.webp'
import dairyImg from '../../assets/Images/cat-dairy-900.webp'
import frozenImg from '../../assets/Images/cat-frozen-900.webp'
import pantryImg from '../../assets/Images/cat-pantry-900.webp'
import bakeryImg from '../../assets/Images/cat-bakery-900.webp'
import oilsImg from '../../assets/Images/cat-oils-900.webp'
import { Link } from 'react-router-dom';

const categoryMedia = [
  { id: 'produce', img: produceImg, span: 'md:col-span-2 md:row-span-2' },
  { id: 'meat', img: meatImg, span: 'md:row-span-2' },
  { id: 'seafood', img: seafoodImg },
  { id: 'dairy', img: dairyImg },
  { id: 'frozen', img: frozenImg },
  { id: 'pantry', img: pantryImg },
  { id: 'bakery', img: bakeryImg },
  { id: 'oils', img: oilsImg },
]

export default function OurRange() {
  const { t } = useTranslation()
  const categories = t('categories.items', { returnObjects: true })
  const ranges = t('categories.ranges', { returnObjects: true })
  return <>
        <section className="max-w-full  py-20 px-8 bg-[#F6F2EA] ">


        <div className="max-w-11/12 mx-auto flex flex-col gap-y-6">


<p className="flex text-[#CCBB98] items-center gap-3 uppercase rtl:normal-case text-sm before:content-[''] before:block before:w-8 before:h-0.5 before:bg-[#CCBB98] tracking-widest rtl:tracking-normal instrument-sans ">
            
            {t('categories.kicker')}</p>


            <h1 className="md:text-6xl text-3xl tracking-normal rtl:tracking-normal font-extralight secondFont md:leading-18 text-wrap md:w-3/4">
              {t('categories.title')}
            </h1>

            <p className="instrument-sans text-wrap md:w-1/2 leading-8 text-[#5D6A61]">{t('categories.description')}</p>
        </div>

         <div className=" md:w-11/12 mx-auto py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-3 gap-2 md:auto-rows-[200px]">
      {categoryMedia.map(({ id, img, span = '' }, index) => {
  const { tag, title, desc } = categories[index]
  return (
    <Link
      key={id}
      to={`/product?category=${id}`}
      className={`relative overflow-hidden rounded-md min-h-[200px] group ${span}`}
    >
      <img
        src={img}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end p-5 text-white">
        <span className="text-[10px] uppercase rtl:normal-case tracking-widest rtl:tracking-normal text-amber-200/80">
          {tag}
        </span>
        <h3 className="text-xl md:text-2xl font-medium">{title}</h3>
        <p className="text-xs text-gray-300 mt-1 max-w-xs">{desc}</p>
      </div>
    </Link>
  )
})}
      </div>
    </div>
          <hr className="border-gray-400 mt-5" />

          <div className="w-10/12 mx-auto mt-10 flex flex-col lg:flex-row gap-8 lg:items-center lg:justify-between">
  <h3 className="secondFont text-2xl md:text-3xl font-light lg:w-1/4">
    {t('categories.rangesTitle')}
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:flex-1">
    {ranges.map(({ title, desc }, index) => (
      <div
        key={index}
        className="bg-[#CCBB9833] px-6 py-4 rounded-md flex flex-col justify-between gap-y-4 min-h-28"
      >
        <h6 className="secondFont font-medium">{title}</h6>
        <p className="instrument-sans text-sm font-light">{desc}</p>
      </div>
    ))}
  </div>
</div>
        </section>
  
  </> 
}
