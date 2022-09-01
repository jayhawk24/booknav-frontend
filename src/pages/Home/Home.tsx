import React from 'react'
import SectionHero from 'components/SectionHero/SectionHero'
import BackgroundSection from 'components/BackgroundSection/BackgroundSection'
import BgGlassmorphism from 'components/BgGlassmorphism'
import SectionGridFeaturePlaces from 'components/SectionGridFeaturePlaces'
import SectionSliderNewCategories from 'components/SectionSliderNewCategories'
import useGhats from 'hooks/useGhats'
import useBoatTypes from 'hooks/useBoatTypes'

function PageHome() {
  const { data: ghats } = useGhats()
  const { data: boatTypes } = useBoatTypes()

  return (
    <div className="nc-PageHome relative overflow-hidden">
      <BgGlassmorphism />

      <div className="container relative space-y-10 mb-24 lg:space-y-32 lg:mb-32">
        <SectionHero className="pt-10 lg:pt-20" />

        <div className="relative py-16">
          <SectionSliderNewCategories
            categories={ghats}
            categoryCardType={'card3'}
          />
          {/* <SectionClientSay /> */}
        </div>
        <div className="relative py-16 mb-10">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore By Types Of Boats"
            subHeading="The wealth of choice of different boat types is huge"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
            categories={boatTypes || []}
          />
        </div>
        <div className="relative py-16">
          <SectionGridFeaturePlaces />
        </div>
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div> */}
      </div>
    </div>
  )
}

export default PageHome
