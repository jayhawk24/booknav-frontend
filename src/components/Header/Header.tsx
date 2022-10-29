import React, { RefObject, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import SwitchDarkMode from 'components/shared/SwitchDarkMode/SwitchDarkMode'
import SearchDropdown from './SearchDropdown'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import MenuBar from 'components/shared/MenuBar/MenuBar'
import useUser from 'hooks/useUser'
import AvatarDropdown from './AvatarDropdown'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ArrowLeftIcon } from '@heroicons/react/solid'

const Header = () => {
  const [isTop, setisTop] = useState(true)
  const { data } = useUser()
  useEffect(() => {
    window.onscroll = function () {
      scrollFunction()
    }
  }, [])

  function scrollFunction() {
    const $head = document.getElementById('nc-chifis-header')
    if (!$head) return
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      !!isTop && setisTop(false)
    } else {
      setisTop(true)
    }
  }

  const { data: user } = useUser()
  const { pathname } = useLocation()

  const head = () => {
    switch (pathname) {
      case '/':
        return (
          <div>
            {`Hi ${user?.title},`}
            <p>
              Find Best Boats
              {`\u{1F44D}`}
            </p>
          </div>
        )
      case '/account':
        return 'Account Details'
      case '/boats':
        return 'My Boats'
      case '/ghats':
        return 'My Ghats'
      case '/rides':
        return 'My Rides'
      case '/ghats/add':
        return 'Add Ghats'
      case '/boat_types':
        return 'My Boat Types'
      case '/boat_types/add':
        return 'Add Boat Types'
      case '/naavs':
        return 'My Naavs'
      case '/naav/add':
        return 'Add Naav'
      case '/bookings':
        return 'My Bookings'
      case '/banklist':
        return 'Bank List'
      default:
        'Booknaav'
        break
    }
  }

  const [parentRef] = useAutoAnimate()

  return (
    <div
      id="nc-chifis-header"
      className="nc-Header lg:sticky lg:top-0 w-full lg:left-0 lg:right-0 z-40"
    >
      {/* NAV */}
      <div
        className={`nc-MainNav1 relative z-10 ${
          isTop ? 'onTop ' : 'notOnTop backdrop-filter'
        }`}
      >
        <div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
          {!data ? (
            <>
              <div className="flex justify-start flex-grow items-center space-x-4 sm:space-x-10 2xl:space-x-14">
                {/* <Logo /> */}
                <span className="font-extrabold text-lg">{head()}</span>
              </div>
              <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
                <div className="hidden items-center xl:flex space-x-1">
                  <SwitchDarkMode />
                  <SearchDropdown />
                  <div className="px-1" />
                  <ButtonPrimary href="/login">Login / Signup</ButtonPrimary>
                </div>
                <div className="flex items-center xl:hidden">
                  <SwitchDarkMode />
                  <div className="px-1" />
                  <MenuBar />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-start flex-grow items-center space-x-3 sm:space-x-8 lg:space-x-10">
                {pathname !== '/' && (
                  <ArrowLeftIcon
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => history.back()}
                  />
                )}
                <span
                  ref={parentRef as RefObject<HTMLSpanElement>}
                  className="font-extrabold text-lg"
                >
                  {head()}
                </span>
              </div>
              <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
                <div className="items-center flex space-x-1">
                  {user?.role === 'naavik' && (
                    <Link
                      to="/naav/add"
                      className="
                text-opacity-90
                group px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      List Naav
                    </Link>
                  )}
                  <AvatarDropdown />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
