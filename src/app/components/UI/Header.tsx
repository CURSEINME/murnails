'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';

export default function Header(){
  const { data: session } = useSession();

  return (
    <header className="sticky top-4 z-50 mx-auto w-full container px-4 sm:px-6 lg:px-8">
      <div className="rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/10 shadow-xl shadow-black/20">
        <div className="flex h-14 sm:h-16 items-center justify-between px-5 sm:px-8">
          {/* Logo + Nav */}
          <div className="flex items-center gap-10">
            <Link 
              href="/" 
              className="text-2xl font-bold tracking-tight bg-gradient-to-r from-pink-400 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent"
            >
              Murnails
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="#about-us"
              >
                О нас
              </Link>
              <Link
                href="#gallery" className="text-md font-medium text-zinc-300 hover:text-pink-400 transition-colors">
                Работы
              </Link>
              <Link 
                href="#faq" className="text-md font-medium text-zinc-300 hover:text-pink-400 transition-colors">
                Вопросы
              </Link>
            </nav>
          </div>

          {/* Auth */}
          {session ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium text-zinc-200">{session.user?.name || 'Клиент'}</span>
                <span className="text-xs text-zinc-500">{session.user?.email?.split('@')[0]}</span>
              </div>

              {session.user?.image ? (
                <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-pink-500/40 ring-offset-2 ring-offset-black">
                  <Image src={session.user.image} alt="" fill className="object-cover" />
                </div>
              ) : (
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center text-white font-medium text-sm">
                  {session.user?.name?.[0]?.toUpperCase() || '?'}
                </div>
              )}

              <button
                onClick={() => signOut()}
                className="text-sm text-zinc-400 hover:text-pink-400 transition-colors"
              >
                Выйти
              </button>
            </div>
          ) : (
            <Button
              onClick={() => signIn('google')}
              className="rounded-full bg-gradient-to-r from-pink-600 to-fuchsia-600 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 transition-all hover:scale-[1.02]"
            >
              Войти
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};