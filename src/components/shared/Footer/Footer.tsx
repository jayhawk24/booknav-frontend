import Logo from 'components/shared/Logo/Logo'
import { CustomLink } from 'utils/types'
import React from 'react'
import SocialsList2 from 'components/shared/SocialList/SocialList2'
import { Link } from 'react-router-dom'

export interface WidgetFooterMenu {
  id: string
  title: string
  menus: CustomLink[]
}
const widgetMenus: WidgetFooterMenu[] = [
  {
    id: '1',
    title: '',
    menus: [
      {
        href: '/privacy_policy',
        label: 'Privacy Policy',
      },
      { href: 'https://booknaav.com/about.html', label: 'About Us' },
      { href: '#', label: 'Contact Us' },
      {
        href: 'https://www.termsandconditionsgenerator.com/live.php?token=6yNhysk889kMFaQNVUr3DDr7qfimcA40',
        label: 'Terms & Conditions',
      },
      {
        href: '/cancel_and_refund_policy',
        label: 'Cancellation/Refund Policy',
      },
    ],
  },
]
const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
  return (
    <div key={index} className="text-sm">
      <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
        {menu.title}
      </h2>
      <ul className="mt-5 grid grid-cols-4 gap-2 mx-5 text-xs">
        {menu.menus.map((item, index) => (
          <li key={index}>
            <Link
              key={index}
              className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
              to={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Footer: React.FC = () => {
  return (
    <div className="nc-Footer py-6 lg:py-32 border-t border-neutral-200 dark:border-neutral-700">
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
      {widgetMenus.map(renderWidgetMenuItem)}
    </div>
  )
}

export default Footer
