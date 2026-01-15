'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';

export const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="custom-container mb-10! pt-3!">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-lg font-bold text-pink-400">
              Murnails
            </Link>

            <nav className="space-x-6 md:flex">
              <Link
                href="/service-sub"
                className="text-gray-300 transition-colors hover:text-pink-400"
              >
                Услуги
              </Link>
            </nav>
          </div>

          {session ? (
            <div className="flex items-center space-x-4">
              <div className="hidden flex-col items-end sm:flex">
                <span className="text-sm font-medium text-gray-200">{session.user?.name}</span>
                <span className="text-xs text-gray-400">{session.user?.email}</span>
              </div>

              {session.user?.image && (
                <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-pink-500">
                  <Image src={session.user.image} alt="User avatar" fill className="object-cover" />
                </div>
              )}
              <button onClick={() => signOut()}>logout</button>
            </div>
          ) : (
            <Button
              type="button"
              className="rounded-md bg-pink-600 px-4 py-2 text-white transition-colors hover:bg-pink-700"
              onClick={() => signIn('google')}
            >
              Услуги
            </Button>)}
          </div>
        </div>
      {/* <div className="flex items-center gap-3 lg:hidden">
        <div className="bg-ultra-light-blue rounded-xl px-3 py-5">
          <Image alt="burger" src="/rustrade/burger.svg" width={35} height={35} className="" />
        </div>
        <div>
          <Image
            alt="logo"
            width={150}
            height={44}
            src="/rustrade/logo-full.svg"
            className="object-cover"
          />
        </div>
        <div className="bg-ultra-light-blue rounded-xl p-3">
          <Image alt="burger" src="/rustrade/search.svg" width={35} height={35} className="" />
        </div>
        <div className="bg-ultra-light-blue rounded-xl p-3">
          <Image alt="burger" src="/rustrade/bin.svg" width={35} height={35} className="" />
        </div>
      </div>

        {session ? (
          <div className="flex items-center space-x-4">
            <div className="hidden flex-col items-end sm:flex">
              <span className="text-sm font-medium text-gray-200">{session.user?.name}</span>
              <span className="text-xs text-gray-400">{session.user?.email}</span>
            </div>

            {session.user?.image && (
              <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-pink-500">
                <Image src={session.user.image} alt="User avatar" fill className="object-cover" />
              </div>
            )}
            <button onClick={() => signOut()}>logout</button>
          </div>
        </div>
      </div> */}
    </header>
  );
}
export default Header
