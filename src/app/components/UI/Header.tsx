'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';

export const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="custom-container mb-10! pt-3!">
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <Button
              type='button'
              className="px-4 py-2 rounded-md bg-pink-600 text-white hover:bg-pink-700 transition-colors"
              onClick={() => signIn('google')}
            >
              Войти
            </Button>
          )}
        </div>
      </div> */}
      <div className="flex items-center gap-3 lg:hidden">
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

      <div className="hidden items-center gap-8 lg:flex">
        <div>
          <Image
            alt="logo"
            width={270}
            height={100}
            src="/rustrade/logo-full.svg"
            className="object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-3">
          <div className="flex items-center">
            <nav className="mr-auto flex gap-8 text-lg">
              <Link href="1">О компании</Link>
              <Link href="2">Доставка</Link>
              <Link href="3">Поставщикам</Link>
              <Link href="4">Спецпредложения</Link>
              <Link href="5">Контакты</Link>
            </nav>
            <div className="flex gap-5 text-right">
              <div>
                <div>08:00-18:00: ПН-ПТ</div>
                <div>Выходные: СБ-ВС</div>
              </div>
              <div>
                <div>+7 (831) 713-76-00</div>
                <div>rustrade-nn@mail.ru</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-blue flex items-center gap-5 rounded-md px-5 py-3 text-lg text-white">
              КАТАЛОГ
              <svg
                width="27"
                height="16"
                viewBox="0 0 27 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L26 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M1 8L26 8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M1 15L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div className="bg-ultra-light-blue flex w-full justify-between rounded-md px-5 py-3 text-lg text-gray-500">
              <div>Поиск по сайту</div>
              <Image src="/rustrade/search.svg" height={25} width={25} alt="search" className="" />
            </div>
            <div className="bg-ultra-light-blue w-full max-w-[200px] rounded-md px-5 py-3">
              <Image src="/rustrade/bin.svg" height={25} width={25} alt="bin" className="" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
