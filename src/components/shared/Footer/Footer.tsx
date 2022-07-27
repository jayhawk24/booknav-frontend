import Logo from 'components/shared/Logo/Logo'
import { CustomLink } from 'utils/types'
import React from 'react'
import SocialsList2 from 'components/shared/SocialList/SocialList2'

export interface WidgetFooterMenu {
  id: string
  title: string
  menus: CustomLink[]
}

const Footer: React.FC = () => {
  return (
    <div className="nc-Footer relative py-6 lg:py-32 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
        <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 md:col-span-1">
            <Logo />
          </div>
          <div className="col-span-2 flex items-center md:col-span-3">
            <SocialsList2 className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
