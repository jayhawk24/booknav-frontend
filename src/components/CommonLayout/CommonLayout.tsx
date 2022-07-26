import { CustomerSidebar } from 'components/shared/Sidebars'
import { OwnerSidebar } from 'components/shared/Sidebars/OwnerSidebar'
import useUser from 'hooks/useUser'
import React from 'react'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'

export interface CommonLayoutProps {
  isCustomer?: boolean
}

const CommonLayout: FC<CommonLayoutProps> = ({ isCustomer, children }) => {
  const { data: user } = useUser()

  const sidebar = user?.groups.includes('Yacht Owner') ? (
    <OwnerSidebar />
  ) : (
    // ) : user === "agent" ? (
    //     <AgentSidebar active="profile" />
    // ) : user === "admin" ? (
    //     <AdminSidebar active="profile" />
    // ) : (
    <CustomerSidebar />
  )
  // );

  return (
    <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
      <div className="block flex-grow mb-24 lg:mb-0">
        <div className="lg:sticky lg:top-24">{sidebar}</div>
      </div>
      <div className="w-full lg:w-9/12 xl:w-9/12  space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
        <div className="listingSection__wrap p-0 overflow-hidden">
          <div className="nc-CommonLayoutProps bg-neutral-50 dark:bg-neutral-900">
            <div className="border-b border-neutral-200 dark:border-neutral-700 pt-12 bg-white dark:bg-neutral-800">
              <div className="container">
                <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar ">
                  <NavLink
                    activeClassName="!border-primary-500"
                    to="/account/general"
                    className="block py-5 md:py-8 border-b-2 border-transparent flex-shrink-0"
                  >
                    General Info
                  </NavLink>
                  <NavLink
                    activeClassName="!border-primary-500"
                    to="/account/profile"
                    className="block py-5 md:py-8 border-b-2 border-transparent flex-shrink-0"
                  >
                    Account Info
                  </NavLink>
                  {!isCustomer && (
                    <NavLink
                      activeClassName="!border-primary-500"
                      to="/account-billing"
                      className="block py-5 md:py-8 border-b-2 border-transparent flex-shrink-0"
                    >
                      Payment Methods
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
            <div className="container pt-14 sm:pt-20 pb-24 lg:pb-32 ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CommonLayout
