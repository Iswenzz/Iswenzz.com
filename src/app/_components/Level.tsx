"use client";

import { FC, useState } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";

import { SlideIn, Dialog } from "@/components";

const Level: FC<Props> = ({ level }) => {
	const [isOpen, setOpen] = useState(false);

	const open = () => setOpen(true);
	const close = () => setOpen(false);

	return (
		<>
			<SlideIn className="relative flex w-full cursor-pointer mb-8" onClick={open}>
				<Image
					className="w-full h-[400px] object-cover select-none rounded-box"
					src={level.image}
					alt={level.name}
					width={1280}
					height={400}
				/>
				<h3 className="absolute flex items-center justify-center size-full text-5xl text-center text-white font-bold tracking-widest [text-shadow:black_1px_1px_2px]">
					<SlideIn>{level.name}</SlideIn>
				</h3>
				<div className="absolute flex flex-col items-center right-0 p-4">
					{level.icons.map(icon => (
						<div
							key={icon.name}
							className="tooltip tooltip-left mb-2"
							data-tip={icon.name}
						>
							<Image
								className="h-8 w-8 xl:h-14 xl:w-14 select-none"
								src={icon.src}
								alt={icon.name}
								width={56}
								height={56}
							/>
						</div>
					))}
				</div>
			</SlideIn>
			<Dialog className="max-w-5xl min-h-[80vh]" open={isOpen} onClose={close}>
				<h2 className="text-3xl mb-4">{level.name}</h2>
				{level.url ? (
					<ReactPlayer src={level.url} width="100%" height={400} controls />
				) : (
					<Image
						className="w-full"
						src={level.image}
						alt={level.name}
						width={1280}
						height={640}
					/>
				)}
				<p className="mt-4 text-lg">{level.description}</p>
				<div className="absolute hidden xl:flex flex-col items-center -left-16 top-8">
					{level.icons.map(icon => (
						<div
							key={icon.name}
							className="tooltip tooltip-left mb-2"
							data-tip={icon.name}
						>
							<Image
								className="h-8 w-8 xl:h-14 xl:w-14 select-none"
								src={icon.src}
								alt={icon.name}
								width={56}
								height={56}
							/>
						</div>
					))}
				</div>
			</Dialog>
		</>
	);
};

type Icon = {
	name: string;
	src: string;
};

type Level = {
	name: string;
	description: string;
	image: string;
	url?: string;
	icons: Icon[];
};

type Props = {
	level: Level;
};

export default Level;
