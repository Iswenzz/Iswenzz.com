"use client";

import { FC, useState } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";

import { SlideIn, Dialog, TechIcons, type TechIcon } from "@/components";
import { buttonProps } from "@/libs/a11y";

const Level: FC<Props> = ({ level, sizes }) => {
	const [isOpen, setOpen] = useState(false);

	const open = () => setOpen(true);
	const close = () => setOpen(false);

	return (
		<>
			<SlideIn
				className="relative flex w-full cursor-pointer mb-8 rounded-box focus-visible:outline-2 focus-visible:outline-primary"
				aria-label={level.name}
				aria-haspopup="dialog"
				{...buttonProps(open)}
			>
				<Image
					className="w-full h-[400px] object-cover select-none rounded-box"
					src={level.image}
					alt={level.name}
					width={1280}
					height={400}
					sizes={sizes}
				/>
				<h3 className="absolute flex items-center justify-center size-full text-5xl text-center text-white font-bold tracking-widest [text-shadow:black_1px_1px_2px]">
					<SlideIn>{level.name}</SlideIn>
				</h3>
				<TechIcons className="absolute flex right-0 p-4" icons={level.icons} />
			</SlideIn>
			<Dialog
				className="max-w-5xl min-h-[80vh]"
				title={level.name}
				open={isOpen}
				onClose={close}
			>
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
						sizes="(min-width: 1024px) 1024px, 100vw"
					/>
				)}
				<p className="mt-4 text-lg">{level.description}</p>
				<TechIcons className="absolute hidden xl:flex -left-16 top-8" icons={level.icons} />
			</Dialog>
		</>
	);
};

export type LevelData = {
	name: string;
	description: string;
	image: string;
	url?: string;
	icons: TechIcon[];
};

type Props = {
	level: LevelData;
	sizes: string;
};

export default Level;
