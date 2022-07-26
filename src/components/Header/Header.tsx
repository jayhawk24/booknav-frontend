import React, { useCallback, useEffect, useState } from "react";
import Logo from "components/shared/Logo/Logo";
import SwitchDarkMode from "components/shared/SwitchDarkMode/SwitchDarkMode";
import SearchDropdown from "./SearchDropdown";
import ButtonPrimary from "components/shared/Buttons/ButtonPrimary";
import MenuBar from "components/shared/MenuBar/MenuBar";

const Header = () => {
    const [isTop, setisTop] = useState(true);
    const scrollFunction = useCallback(() => {
        const $head = document.getElementById("nc-chifis-header");
        if (!$head) return;
        if (
            document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
        ) {
            !!isTop && setisTop(false);
        } else {
            setisTop(true);
        }
    }, [isTop]);

    useEffect(() => {
        window.onscroll = function () {
            scrollFunction();
        };
    }, [scrollFunction]);

    return (
        <div
            id="nc-chifis-header"
            className="nc-Header lg:sticky lg:top-0 w-full lg:left-0 lg:right-0 z-40"
        >
            {/* NAV */}
            <div
                className={`nc-MainNav1 relative z-10 ${
                    isTop ? "onTop " : "notOnTop backdrop-filter"
                }`}
            >
                <div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
                    <div className="flex justify-start flex-grow items-center space-x-4 sm:space-x-10 2xl:space-x-14">
                        <Logo />
                    </div>
                    <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
                        <div className="hidden items-center xl:flex space-x-1">
                            <SwitchDarkMode />
                            <SearchDropdown />
                            <div className="px-1" />
                            <ButtonPrimary href="/login">Sign up</ButtonPrimary>
                        </div>
                        <div className="flex items-center xl:hidden">
                            <SwitchDarkMode />
                            <div className="px-1" />
                            <MenuBar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
