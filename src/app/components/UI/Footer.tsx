import Link from "next/link";

export default function Footer() {
	return (
		<footer className='mt-20 text-sm md:text-md text-white bg-black/50 border-t border-white/10 flex flex-col items-center py-6 gap-2 md:gap-4'>
			<div className='flex justify-center gap-4 md:gap-8'>
				<Link href='/#about-us'>О нас</Link>
				<Link href='/#gallery'>Работы</Link>
				<Link href='/#faq'>Вопросы</Link>
				<Link href='/#contacts'>Контакты</Link>
			</div>
			<div className='text-white/70 text-xs md:text-sm'>© 2026 Murnails. Все права защищены.</div>
		</footer>
	)
}