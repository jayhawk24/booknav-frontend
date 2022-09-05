import React, { FC, useEffect } from 'react'
import Heading from 'components/shared/Heading'
import Glide from '@glidejs/glide'
import ncNanoId from 'utils/ncNanoId'
import CardCategory3 from 'components/CardCategory3'
import NextPrev from 'components/shared/NextPrev'
import CardCategory5 from 'components/CardCategory5'
import { GhatType } from 'hooks/useGhats'
import { BoatType } from 'hooks/useBoatTypes'

export interface SectionSliderNewCategoriesProps {
  className?: string
  itemClassName?: string
  heading?: string
  subHeading?: string
  categories?: GhatType[] | BoatType[]
  categoryCardType?: 'card3' | 'card4' | 'card5'
  itemPerRow?: 4 | 5
  sliderStyle?: 'style1' | 'style2'
}

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
  heading = 'Selection From The Community',
  subHeading = 'Popular Naavs',
  className = '',
  itemClassName = '',
  categories = [],
  itemPerRow = 5,
  categoryCardType,
  sliderStyle = 'style1',
}) => {
  const UNIQUE_CLASS = 'glide_' + ncNanoId()

  useEffect(() => {
    if (document.querySelector(`.${UNIQUE_CLASS}`)) {
      new Glide(`.${UNIQUE_CLASS}`, {
        perView: itemPerRow,
        gap: 32,
        bound: true,
        breakpoints: {
          1280: {
            perView: itemPerRow - 1,
          },
          1024: {
            gap: 20,
            perView: itemPerRow - 1,
          },
          768: {
            gap: 20,
            perView: itemPerRow - 2,
          },
          640: {
            gap: 20,
            perView: itemPerRow - 3,
          },
          500: {
            gap: 20,
            perView: 1.3,
          },
        },
      }).mount()
    }
  }, [categories])
  const renderCards = (categories: GhatType[] | BoatType[]) => {
    return (
      <div className="glide__track h-full" data-glide-el="track">
        <ul className="glide__slides">
          {categories.map((item, index) => (
            <li key={index} className={`glide__slide ${itemClassName}`}>
              {categoryCardType === 'card3' ? (
                <CardCategory3 taxonomy={item as GhatType} />
              ) : (
                <CardCategory5 taxonomy={item as BoatType} />
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className={`nc-SectionSliderNewCategories ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`}>
        <Heading
          desc={subHeading}
          hasNextPrev={sliderStyle === 'style1'}
          isCenter={sliderStyle === 'style2'}
        >
          {heading}
        </Heading>

        {renderCards(categories)}

        {sliderStyle === 'style2' && (
          <NextPrev className="justify-center mt-16" />
        )}
      </div>
    </div>
  )
}

export default SectionSliderNewCategories
