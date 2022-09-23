import React, { useEffect, useRef } from 'react'
import { HeartIcon, UserCircleIcon } from '@heroicons/react/outline'
import { SearchCircleIcon } from '@heroicons/react/solid'
import { Link, useLocation } from 'react-router-dom'
import MenuBar from 'components/shared/MenuBar/MenuBar'
import isInViewport from 'utils/isInViewport'
import useUser from 'hooks/useUser'

let WIN_PREV_POSITION = window.pageYOffset

interface NavItem {
  name: string
  link?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
}

const FooterNav = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  //

  const { data: user } = useUser()

  const NAV: NavItem[] = [
    {
      name: 'Explore',
      link: '/',
      icon: SearchCircleIcon,
    },
    {
      name: 'Wishlists',
      link: '/account-savelists',
      icon: HeartIcon,
    },
    {
      name: user ? 'Account' : 'Log in',
      link: user ? '/account' : '/login',
      icon: UserCircleIcon,
    },
    {
      name: 'Menu',
      icon: MenuBar,
    },
  ]
  const location = useLocation()

  useEffect(() => {
    window.addEventListener('scroll', handleEvent)
  }, [])

  const handleEvent = () => {
    window.requestAnimationFrame(showHideHeaderMenu)
  }

  const showHideHeaderMenu = () => {
    const currentScrollPos = window.pageYOffset
    if (!containerRef.current) return

    // SHOW _ HIDE MAIN MENU
    if (currentScrollPos > WIN_PREV_POSITION) {
      if (
        isInViewport(containerRef.current) &&
        currentScrollPos - WIN_PREV_POSITION < 80
      ) {
        return
      }

      containerRef.current.classList.add('FooterNav--hide')
    } else {
      if (
        !isInViewport(containerRef.current) &&
        WIN_PREV_POSITION - currentScrollPos < 80
      ) {
        return
      }
      containerRef.current.classList.remove('FooterNav--hide')
    }

    WIN_PREV_POSITION = currentScrollPos
  }

  return (
    <div
      ref={containerRef}
      className="FooterNav p-2 bg-white dark:bg-neutral-800 fixed top-auto bottom-0 inset-x-0 z-30 border-t border-neutral-300 dark:border-neutral-700 
        transition-transform duration-300 ease-in-out"
    >
      <div className="w-full max-w-lg flex justify-around mx-auto text-sm text-center ">
        {/* MENU */}
        {NAV.map((item, index) => {
          const active = location.pathname === item.link
          return item.link ? (
            <Link
              key={index}
              to={item.link}
              className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
                active ? 'text-neutral-900 dark:text-neutral-100' : ''
              }`}
            >
              <item.icon
                className={`w-8 h-8 mt-2 ${active ? 'text-primary-700' : ''}`}
              />
              <span className="text-[11px] leading-none mt-1">{item.name}</span>
            </Link>
          ) : (
            <div
              key={index}
              className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
                active ? 'text-neutral-900 dark:text-neutral-100' : ''
              }`}
            >
              <item.icon iconClassName="w-6 h-6" className={``} />
              <span className="text-[11px] leading-none mt-1">{item.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FooterNav
