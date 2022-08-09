import { Popover, Transition } from '@headlessui/react'
import {
  UserCircleIcon,
  AnnotationIcon,
  HeartIcon,
  HomeIcon,
  LogoutIcon,
} from '@heroicons/react/outline'
import { Fragment } from 'react'
import Avatar from 'components/shared/Avatar'
import useUser, { logoutUser } from 'hooks/useUser'
import { NavLink } from 'react-router-dom'

const solutionsFoot = [
  {
    name: 'Logout',
    href: '/logout',
    icon: LogoutIcon,
  },
]

export default function AvatarDropdown() {
  const { data: user } = useUser()

  const solutions = [
    {
      name: 'Account',
      href: '/account',
      icon: UserCircleIcon,
    },
    {
      name: 'Messages',
      href: '/messages',
      icon: AnnotationIcon,
    },
    ...(user?.role === 'admin'
      ? [
          {
            name: 'Ghats',
            href: '/ghats',
            icon: HeartIcon,
          },
        ]
      : []),
    ...(user?.role === 'naavik'
      ? [
          {
            name: 'My Naav',
            href: '/naavs',
            icon: HeartIcon,
          },
        ]
      : []),
    {
      name: 'Bookings',
      href: '/bookings',
      icon: HomeIcon,
    },
  ]
  return (
    <div className="AvatarDropdown">
      <Popover className="relative">
        {({ close }) => (
          <>
            <Popover.Button
              className={`inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <Avatar
                userName={user?.title}
                imgUrl={user?.picture}
                radius="rounded-xl"
                sizeClass="w-10 h-10 sm:w-9 sm:h-9"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 mt-3 -right-4 sm:right-0 sm:px-0">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-6 bg-white dark:bg-neutral-800 p-7">
                    {solutions.map((item, index) => (
                      <NavLink
                        key={index}
                        to={item.href}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        onClick={() => {
                          item.name === 'Logout' && logoutUser()
                          close()
                        }}
                      >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                          <item.icon aria-hidden="true" className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium ">{item.name}</p>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                  <hr className="h-[1px] border-t border-neutral-300 dark:border-neutral-700" />
                  <div className="relative grid gap-6 bg-white dark:bg-neutral-800 p-7">
                    {solutionsFoot.map((item, index) => (
                      <NavLink
                        key={index}
                        to={item.href}
                        onClick={() => close()}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                          <item.icon aria-hidden="true" className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium ">{item.name}</p>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
