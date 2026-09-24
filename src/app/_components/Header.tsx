import { Glow, SlideIn } from "@/components";

const Header = () => (
	<section className="relative h-screen flex flex-col items-center justify-center px-8 text-center">
		<Glow className="left-0" />
		<h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-wide z-10 pb-4">
			<SlideIn>Alexis Nardiello</SlideIn>
		</h1>
		<h2 className="text-3xl sm:text-4xl md:text-5xl tracking-widest z-10">
			<SlideIn>Software Engineer</SlideIn>
		</h2>
	</section>
);

export default Header;
