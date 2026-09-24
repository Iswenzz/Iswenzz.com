import { BsDiscord, BsGithub, BsYoutube } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const Footer = () => (
	<footer className="flex flex-wrap items-center justify-center md:justify-between p-4">
		<ul className="flex items-center justify-center gap-4">
			<li className="tooltip tooltip-top" data-tip="Email">
				<a
					className="btn btn-ghost btn-circle shadow-lg bg-black/15"
					href="mailto:alexisnardiello@gmail.com"
					aria-label="Email"
				>
					<MdEmail className="text-gray-400" size={24} />
				</a>
			</li>
			<li className="tooltip tooltip-top" data-tip="GitHub">
				<a
					className="btn btn-ghost btn-circle shadow-lg bg-black/15"
					href="https://github.com/iswenzz"
					aria-label="GitHub"
					target="_blank"
					rel="noopener noreferrer"
				>
					<BsGithub className="text-gray-400" size={24} />
				</a>
			</li>
			<li className="tooltip tooltip-top" data-tip="YouTube">
				<a
					className="btn btn-ghost btn-circle shadow-lg bg-black/15"
					href="https://www.youtube.com/c/iswenzz"
					aria-label="YouTube"
					target="_blank"
					rel="noopener noreferrer"
				>
					<BsYoutube className="text-red-400" size={24} />
				</a>
			</li>
			<li className="tooltip tooltip-top" data-tip="Iswenzz">
				<div
					className="btn btn-ghost btn-circle shadow-lg bg-black/15 cursor-default"
					role="img"
					aria-label="Discord: Iswenzz"
				>
					<BsDiscord className="text-indigo-400" size={24} />
				</div>
			</li>
		</ul>
		<span className="p-2 text-lg tracking-widest">
			Copyright © Iswenzz {new Date().getFullYear()}
		</span>
	</footer>
);

export default Footer;
