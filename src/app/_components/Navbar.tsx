import Link from "next/link";

import NavbarMenu from "./NavbarMenu";

const Navbar = () => (
	<nav className="fixed z-30 navbar px-4 py-0.5 min-h-12 text-gray-300 bg-transparent">
		<NavbarDesktop />
		<NavbarMobile />
	</nav>
);

const NavbarDesktop = () => (
	<div className="hidden md:flex w-full">
		<div className="flex navbar-start">
			<Logo />
		</div>
		<div className="flex navbar-end">
			<Links />
		</div>
	</div>
);

const NavbarMobile = () => (
	<div className="flex md:hidden w-full">
		<div className="flex navbar-start">
			<NavbarMenu />
			<Logo />
		</div>
	</div>
);

const Logo = () => (
	<Link className="btn btn-ghost text-3xl" href="/" aria-label="Home">
		Iswenzz
	</Link>
);

const Links = () => (
	<>
		<Link className="btn btn-ghost text-lg" href="#about" aria-label="About">
			ABOUT
		</Link>
		<Link className="btn btn-ghost text-lg" href="#projects" aria-label="Projects">
			PROJECTS
		</Link>
		<Link className="btn btn-ghost text-lg" href="#levels" aria-label="Levels">
			LEVEL DESIGN
		</Link>
	</>
);

export default Navbar;
