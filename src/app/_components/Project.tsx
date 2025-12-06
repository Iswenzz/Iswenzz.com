"use client";

import { FC, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { PiLockKeyFill } from "react-icons/pi";
import Markdown from "react-markdown";
import Link from "next/link";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

import { ScaleUp, SlideIn, Dialog } from "@/components";

const Project: FC<Props> = ({ project }) => {
	const [markdown, setMarkdown] = useState("");
	const [isOpen, setOpen] = useState(false);

	const open = async () => {
		setOpen(true);
		const res = await fetch(project.markdown);
		const markdown = await res.text();
		setMarkdown(markdown);
	};

	const close = () => setOpen(false);

	return (
		<>
			<SlideIn onClick={open}>
				<ScaleUp className="relative flex w-full cursor-pointer mb-8">
					<Image
						className="size-full rounded-box object-cover select-none"
						src={project.image}
						alt={project.name}
						width={300}
						height={200}
					/>
					<h3 className="absolute size-full flex items-center justify-center text-center font-bold text-3xl text-white tracking-widest [text-shadow:black_1px_1px_2px]">
						<SlideIn>{project.name}</SlideIn>
					</h3>
				</ScaleUp>
			</SlideIn>
			<Dialog className="max-w-5xl min-h-[80vh]" open={isOpen} onClose={close}>
				{project.open ? (
					<Link
						className="float-right tooltip tooltip-bottom"
						href={project.repository}
						data-tip="GitHub"
						aria-label="Repository"
						target="_blank"
					>
						<FaGithub
							className="cursor-pointer hover:text-primary transition-colors duration-300 mr-2"
							onClick={close}
							size={24}
						/>
					</Link>
				) : (
					<div className="float-right tooltip tooltip-bottom" data-tip="Private">
						<PiLockKeyFill
							className="cursor-pointer hover:text-warning transition-colors duration-300 mr-2"
							size={24}
						/>
					</div>
				)}
				{markdown ? (
					<div className="markdown">
						<Markdown
							components={{
								a: ({ href, ...props }) => (
									<Link href={href || "/"} target="_blank" {...props} />
								)
							}}
							remarkPlugins={[remarkGfm]}
							rehypePlugins={[rehypeRaw, rehypeHighlight]}
						>
							{markdown}
						</Markdown>
					</div>
				) : (
					<>
						<div className="w-full h-12" />
						<div className="flex flex-col gap-4 h-screen">
							<div className="skeleton h-6 w-1/2 my-2"></div>
							<div className="skeleton h-64 w-full mb-2"></div>
							<div className="skeleton h-4 w-full my-2"></div>
							<div className="skeleton h-4 w-full my-2"></div>
							<div className="skeleton h-4 w-full my-2"></div>
							<div className="skeleton h-4 w-full my-2"></div>
							<div className="skeleton h-4 w-full my-2"></div>
							<div className="skeleton h-4 w-full my-2"></div>
							<div className="skeleton h-4 w-full my-2"></div>
							<div className="skeleton h-4 w-full my-2"></div>
							<div className="skeleton h-4 w-full my-2"></div>
							<div className="skeleton h-4 w-full my-2"></div>
							<div className="skeleton h-4 w-full my-2"></div>
						</div>
					</>
				)}
				<div className="absolute hidden xl:flex flex-col items-center -left-16 top-8">
					{project.icons.map(icon => (
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

type Project = {
	name: string;
	repository: string;
	open: boolean;
	image: string;
	markdown: string;
	icons: Icon[];
};

type Props = {
	project: Project;
};

export default Project;
