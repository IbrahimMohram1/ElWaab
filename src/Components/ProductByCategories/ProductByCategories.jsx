import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import produceImg from '../../assets/Images/cat-produce-900.webp'
import meatImg from '../../assets/Images/cat-meat-900.webp'
import seafoodImg from '../../assets/Images/cat-seafood-900.webp'
import dairyImg from '../../assets/Images/cat-dairy-900.webp'
import frozenImg from '../../assets/Images/cat-frozen-900.webp'
import pantryImg from '../../assets/Images/cat-pantry-900.webp'
import bakeryImg from '../../assets/Images/cat-bakery-900.webp'
import oilsImg from '../../assets/Images/cat-oils-900.webp'
import leafyGreensImg from '../../assets/Images/LeafyGreens.webp'
import freshHerbsImg from '../../assets/Images/freshHerbs.webp'
import potOnion from '../../assets/Images/potato-onion.webp'
import Citrus from '../../assets/Images/Citrus-seasonal.webp'
import Lamb from '../../assets/Images/Lamb-veal.webp'
import Chicken from '../../assets/Images/Chicken.webp'
import Mincedmeat from '../../assets/Images/Minced-meat.webp'
import Sausages from '../../assets/Images/Sausages.webp'
import Prawns from '../../assets/Images/Prawns.webp'
import Squid from '../../assets/Images/Squid.webp'
import Salmon from '../../assets/Images/Salmon.webp'
import Milk from '../../assets/Images/Milk.webp'
import Butter from '../../assets/Images/Butter.webp'
import Eggs from '../../assets/Images/Eggs.webp'
import Yogurt from '../../assets/Images/Yogurt.webp'
import Frize from '../../assets/Images/Frize.webp'
import FrozenMeats from '../../assets/Images/FrozenMeats.webp'
import Rice from '../../assets/Images/Rice.webp'
import Flour from '../../assets/Images/Flour.webp'
import Pasta from '../../assets/Images/Pasta.webp'
import Sugar from '../../assets/Images/Sugar.webp'
import Canned from '../../assets/Images/Canned.webp'
import Pastries from '../../assets/Images/Pastries.webp'
import Pita from '../../assets/Images/Pita.webp'
import Part from '../../assets/Images/part-baked.webp'
import CookingOils from '../../assets/Images/CookingOils.webp'
import SpiceSeasonings from '../../assets/Images/Spice-seasonings.webp'
import Sauces from '../../assets/Images/Sauces.webp'
import TomatoPaste from '../../assets/Images/TomatoPaste.webp'


// صور الأقسام (fallback بس)
const categoryImages = {
  produce: produceImg,
  meat: meatImg,
  seafood: seafoodImg,
  dairy: dairyImg,
  frozen: frozenImg,
  pantry: pantryImg,
  bakery: bakeryImg,
  oils: oilsImg,
}

// صورة لكل منتج، المفتاح = product.id بالظبط من الـ JSON
const productImages = {
  // produce
  'leafy-greens': leafyGreensImg,
  'fresh-herbs': freshHerbsImg,
  'potatoes-onions': potOnion,
  'citrus-fruit': Citrus,

  // meat
  'lamb-veal': Lamb,
  poultry: Chicken,
  'minced-meat': Mincedmeat,
  sausages: Sausages,

  // seafood
  prawns: Prawns,
  'squid-calamari': Squid,
  'salmon-tuna': Salmon,

  // dairy
  dairy: Milk,
  'butter-ghee': Butter,
  eggs: Eggs,
  'yogurt-labneh': Yogurt,

  // frozen
  fries: Frize,
  'frozen-proteins': FrozenMeats,

  // pantry
  'rice-grains': Rice,
  'flour-pulses': Flour,
  'pasta-noodles': Pasta,
  'sugar-salt': Sugar,
  'canned-goods': Canned,

  // bakery
  pastries: Pastries,
  flatbread: Pita,
  'part-baked': Part,

  // oils
  'cooking-oils': CookingOils,
  'spices-seasonings': SpiceSeasonings,
  'sauces-dressings': Sauces,
  'tomato-paste': TomatoPaste,
}

const btnBase =
  'rounded-sm border px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D6A61]'
const btnActive = 'border-[#25382E] bg-[#25382E] text-white'
const btnIdle = 'border-[#B9B7AE] text-[#25382E] hover:bg-white'

export default function ProductByCategories() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const selectedCategory = searchParams.get('category')
  const selectedTag = searchParams.get('tag')

  const categories = t('categories.items', { returnObjects: true })
  const products = t('productCatalog.items', { returnObjects: true })
  const tags = [...new Set(categories.flatMap(({ tag }) => tag.split(/\s*·\s*/)))]
  const categoryById = Object.fromEntries(categories.map((category) => [category.id, category]))

const splitTags = (value) => value.split(/\s*·\s*/)

const getProductTags = (product) =>
  product.tags ?? splitTags(categoryById[product.categoryId]?.tag ?? '')

const visibleProducts = products.filter((product) => {
  if (selectedCategory) return product.categoryId === selectedCategory
  if (selectedTag) return getProductTags(product).includes(selectedTag)
  return true
})

  const isAll = !selectedCategory && !selectedTag

  return (
    <section className="bg-[#F6F2EA] px-6 py-16 md:px-10 my-12" aria-labelledby="product-catalog-title">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3">
          <h2 id="product-catalog-title" className="secondFont text-3xl font-light md:text-4xl">
            {t('productCatalog.title')}
          </h2>
          <p className="instrument-sans max-w-2xl leading-7 text-[#5D6A61]">
            {t('productCatalog.description')}
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2" aria-label={t('productCatalog.title')}>
          <button
            type="button"
            aria-pressed={isAll}
            onClick={() => setSearchParams({})}
            className={`${btnBase} ${isAll ? btnActive : btnIdle}`}
          >
            {t('productCatalog.allProducts')}
          </button>

          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              aria-pressed={selectedTag === tag}
              onClick={() => setSearchParams({ tag })}
              className={`${btnBase} ${selectedTag === tag ? btnActive : btnIdle}`}
            >
              {tag}
            </button>
          ))}
        </div>

        {selectedCategory && categoryById[selectedCategory] && (
          <p className="instrument-sans mb-6 text-sm text-[#5D6A61]">
            {categoryById[selectedCategory].title}
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className="ms-3 underline"
            >
              {t('productCatalog.allProducts')}
            </button>
          </p>
        )}

    {visibleProducts.length > 0 ? (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {visibleProducts.map((product) => {
      const category = categoryById[product.categoryId]
      const image = productImages[product.id] ?? categoryImages[product.categoryId]

      return (
        <article key={product.id} className="overflow-hidden rounded-md bg-white">
          <img
            src={image}
            alt={product.title}
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
          <div className="flex min-h-32 flex-col gap-2 p-4">
            <p className="instrument-sans text-xs uppercase text-[#7C806F]">
              {category?.title}
            </p>
            <h3 className="secondFont text-xl">{product.title}</h3>
            <p className="instrument-sans text-sm leading-6 text-[#5D6A61]">
              {product.description}
            </p>
          </div>
        </article>
      )
    })}
  </div>
) : (
  <p className="instrument-sans py-8 text-[#5D6A61]" role="status">
    {t('productCatalog.empty')}
  </p>
)}
      </div>
    </section>
  )
}