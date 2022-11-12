import React from 'react'
import ButtonClose from 'components/shared/Buttons/ButtonClose'
import Logo from 'components/shared/Logo/Logo'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import SocialsList from 'components/shared/SocialList/SocialList'
import SwitchDarkMode from 'components/shared/SwitchDarkMode/SwitchDarkMode'
import { NavItemType } from './NavTypes'
import useUser from 'hooks/useUser'
import { Link } from 'react-router-dom'
import { useOutsideFn } from 'hooks/useOutsideFn'

export interface NavMobileProps {
  data?: NavItemType[]
  onClickClose?: () => void
}
const NavMobile: React.FC<NavMobileProps> = ({ onClickClose }) => {
  const { data: user } = useUser()
  const divRef = React.useRef<HTMLDivElement>(null)
  useOutsideFn(divRef, onClickClose)

  const touchStartRef = React.useRef(0)
  const touchEndRef = React.useRef(0)

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = e.targetTouches[0].clientX
  }
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndRef.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    console.log(touchStartRef.current, touchEndRef.current)
    if (touchStartRef.current - touchEndRef.current > 150) {
      onClickClose?.()
    }
  }

  const solutions = [
    {
      name: 'Account',
      href: '/account',
    },
    ...(user?.role === 'admin'
      ? [
          {
            name: 'Ghats',
            href: '/ghats',
          },
          {
            name: 'Boat Type',
            href: '/boat_types',
          },
          {
            name: 'Bank List',
            href: '/banklist',
          },
        ]
      : []),
    ...(user?.role === 'naavik' || user?.role === 'admin'
      ? [
          {
            name: 'My Naav',
            href: '/naavs',
          },
        ]
      : []),
    {
      name: 'Bookings',
      href: '/bookings',
    },
  ]

  return (
    <div
      ref={divRef}
      className="overflow-y-auto w-80 max-w-sm h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="py-6 px-5">
        <Logo />
        <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
          <span>
            Discover the most outstanding articles on all topics of life. Write
            your stories and share them
          </span>

          <div className="flex justify-between items-center mt-4">
            <SocialsList itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300" />
            <span className="block">
              <SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
            </span>
          </div>
        </div>
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">
        <li className="text-neutral-900 dark:text-white">
          {solutions.map((item, index) => (
            <Link
              className="flex w-full px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
              to={item.href}
              key={index}
            >
              <span className="py-2.5 pr-3 block w-full">{item.name}</span>
            </Link>
          ))}
        </li>
      </ul>
      <div className="flex items-center justify-between py-6 px-5 space-x-4">
        {user ? (
          user.role === 'naavik' && (
            <ButtonPrimary href="/naav/add">List Naav</ButtonPrimary>
          )
        ) : (
          <ButtonPrimary href="/login">Login / Sign Up</ButtonPrimary>
        )}
      </div>
    </div>
  )
}

export default NavMobile
