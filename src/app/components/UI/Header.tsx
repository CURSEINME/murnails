"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-pink-400 font-bold text-lg">
              Murnails
            </Link>

            <nav className="md:flex space-x-6">
              <Link
                href="/service-sub"
                className="text-gray-300 hover:text-pink-400 transition-colors"
              >
                Услуги
              </Link>
            </nav>
          </div>

          {session ? (
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium text-gray-200">
                  {session.user?.name}
                </span>
                <span className="text-xs text-gray-400">
                  {session.user?.email}
                </span>
              </div>

              {session.user?.image && (
                <div className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-pink-500">
                  <Image
                    src={session.user.image}
                    alt="User avatar"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <button onClick={() => signOut()}>logout</button>
            </div>
          ) : (
            <button
              type='button'
              className="px-4 py-2 rounded-md bg-pink-600 text-white hover:bg-pink-700 transition-colors"
              onClick={() => signIn('google')}
            >
              Войти
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
