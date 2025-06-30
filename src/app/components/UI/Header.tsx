import Link from "next/link";

export const Header = () => {
  return (
    <div>
      <nav className='flex gap-4'>
        <Link href="/">Домой</Link>
        <Link href="/service-sub">Записаться</Link>
      </nav>
    </div>
  );
};

export default Header;