import React from 'react'

import { NavLink, useLocation } from 'react-router-dom'
import Avatar from 'components/shared/Avatar'

type Props = {
  imageUrl?: string
  title?: string
  links: SidbarLinkType[]
}

export type SidbarLinkType = {
  name: string
  pathname: string
  activeLinks?: string[]
}

function SidebarContainer({ imageUrl, title, links }: Props) {
  const location = useLocation()

  const linkActiveClassName =
    'inline-flex items-center font-normal text-neutral-6000 dark:text-neutral-300 py-1 px-2 rounded text-neutral-700 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-200'
  const linkClassName =
    'inline-flex items-center font-normal text-neutral-6000 dark:text-neutral-300 py-1 px-2 rounded hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200'

  return (
    <div className=" w-full flex flex-col  text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-2 px-0 sm:p-6 xl:p-8">
      <div className="items-center">
        <Avatar
          hasChecked
          hasCheckedClass="w-6 h-6 -top-0.5 right-2"
          sizeClass="w-28 h-28"
          imgUrl={imageUrl}
        />

        {/* ---- */}
        <div className="space-y-3 text-center flex flex-col items-center">
          <h2 className="text-3xl font-semibold mt-3 mb-3">{title}</h2>
          {/* <StartRating className="!text-base" /> */}
        </div>
        <div className="border-b border-neutral-200 dark:border-neutral-700 w-14 m-auto mt-3 "></div>
      </div>
      {/* ---- */}
      {links.map((link: SidbarLinkType) => {
        let className = linkClassName

        if (link.activeLinks)
          link.activeLinks.map(activeLink => {
            if (activeLink === location.pathname)
              className = linkActiveClassName
          })

        if (link.pathname === location.pathname) className = linkActiveClassName

        return (
          <NavLink
            key={link.name}
            exact
            strict
            rel="noopener noreferrer"
            to={{
              pathname: link.pathname,
            }}
            className={className}
            activeClassName="font-semibold text-neutral-900 dark:!text-neutral-200"
          >
            {link.name}
          </NavLink>
        )
      })}
    </div>
  )
}

export default SidebarContainer
