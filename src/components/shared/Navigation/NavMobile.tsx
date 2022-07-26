import React from 'react'
import ButtonClose from 'components/shared/Buttons/ButtonClose'
import Logo from 'components/shared/Logo/Logo'
import ButtonPrimary from 'components/shared/Buttons/ButtonPrimary'
import SocialsList from 'components/shared/SocialList/SocialList'
import SwitchDarkMode from 'components/shared/SwitchDarkMode/SwitchDarkMode'
import { NavItemType } from './NavTypes'
import useUser from 'hooks/useUser'

export interface NavMobileProps {
  data?: NavItemType[]
  onClickClose?: () => void
}
const NavMobile: React.FC<NavMobileProps> = ({ onClickClose }) => {
  const { data: user } = useUser()
  return (
    <div className="overflow-y-auto w-full max-w-sm h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
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
      <div className="flex items-center justify-between py-6 px-5 space-x-4">
        {user ? (
          <ButtonPrimary href="/add-listing/1">List your Yacht</ButtonPrimary>
        ) : (
          <ButtonPrimary href="/login">Login / Sign Up</ButtonPrimary>
        )}
      </div>
    </div>
  )
}

export default NavMobile
