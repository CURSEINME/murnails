"use client";
import { 
	Navbar,
	NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

import { signOut } from 'next-auth/react'

export function NavbarDemo() {
  const navItems = [
    {
      name: "О нас",
      link: "/#about-us",
    },
    {
      name: "Работы",
      link: "/#gallery",
    },
    {
      name: "Вопросы",
      link: "/#faq",
    },
    {
      name: "Контакты",
      link: "/#contacts",
    }
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const { data: user } = useSession()

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {/* <NavbarButton variant="secondary">Login</NavbarButton> */}
            <NavbarButton href='/services' variant="gradient">Записаться</NavbarButton>
						{user?.user.role === 'admin' && (
							<NavbarButton
								onClick={async () => await signOut()}
								variant="primary"
								className="w-full"
							>
								Выйти
							</NavbarButton>
						)}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
								href='/service-sub'
                onClick={() => setIsMobileMenuOpen(false)}
                variant="gradient"
                className="w-full"
              >
                Записаться
              </NavbarButton>
							{user?.user.role === 'admin' && (
								<NavbarButton
									onClick={async () => await signOut()}
									variant="gradient"
									className="w-full"
								>
									Logout
								</NavbarButton>
							)}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}
