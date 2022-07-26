import Glide from '@glidejs/glide'
import React, { FC, useEffect } from 'react'
import NcImage from 'components/shared/NcImage'
import NextPrev from 'components/shared/NextPrev'
import ncNanoId from 'utils/ncNanoId'

export interface GallerySliderProps {
  className?: string
  galleryImgs: string[]
  ratioClass?: string
  uniqueID?: string
}

const GallerySlider: FC<GallerySliderProps> = ({
  className = '',
  galleryImgs,
  ratioClass = 'aspect-w-4 aspect-h-3',
  uniqueID,
}) => {
  const UNIQUE_CLASS = uniqueID || 'nc_glide2_gallery_' + ncNanoId()

  useEffect(() => {
    new Glide(`.${UNIQUE_CLASS}`, {
      perView: 1,
      gap: 0,
      keyboard: false,
    }).mount()
  }, [UNIQUE_CLASS, galleryImgs])

  const renderDots = () => {
    return (
      <div
        className="glide__bullets flex items-center justify-center absolute bottom-2 left-1/2 transform -translate-x-1/2 space-x-1.5"
        data-glide-el="controls[nav]"
      >
        {galleryImgs.map((_, i) => (
          <button
            className="glide__bullet w-1.5 h-1.5 rounded-full bg-neutral-300"
            key={i}
            data-glide-dir={`=${i}`}
          />
        ))}
      </div>
    )
  }

  const renderSliderGallery = () => {
    return (
      <div className={`${UNIQUE_CLASS} relative group overflow-hidden`}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {galleryImgs.map((item, index) => (
              <li key={index} className="glide__slide">
                <div className={ratioClass}>
                  <NcImage src={item} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* DOTS */}
        <div className="absolute -bottom-4 inset-x-0 h-10 bg-gradient-to-t from-neutral-900"></div>
        {renderDots()}

        {/* NAV */}
        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity flex top-1/2 transform -translate-y-1/2 inset-x-2 justify-between">
          <NextPrev className="w-full justify-between" btnClassName="w-8 h-8" />
        </div>
      </div>
    )
  }

  return (
    <div className={`nc-GallerySlider ${className}`} data-nc-id="GallerySlider">
      {renderSliderGallery()}
    </div>
  )
}

export default GallerySlider
