"use client";

import { FC, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { PiLockKeyFill } from "react-icons/pi";
import Markdown, { defaultUrlTransform, type UrlTransform } from "react-markdown";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";

import { ScaleUp, SlideIn, Dialog, TechIcons, type TechIcon } from "@/components";
import { buttonProps } from "@/libs/a11y";

// READMEs are fetched at runtime and may contain raw HTML; contributor avatars rely on inline styles.
const schema = {
	...defaultSchema,
	attributes: {
		...defaultSchema.attributes,
		img: [...(defaultSchema.attributes?.img ?? []), "style"]
	}
};

const Project: FC<Props> = ({ project }) => {
	const [markdown, setMarkdown] = useState<Nullable<string>>(null);
	const [failed, setFailed] = useState(false);
	const [isOpen, setOpen] = useState(false);

	const load = async () => {
		setFailed(false);
		try {
			const res = await fetch(project.markdown);
			if (!res.ok) throw new Error(res.statusText);
			setMarkdown(await res.text());
		} catch {
			setFailed(true);
		}
	};

	const open = () => {
		setOpen(true);
		if (markdown === null) load();
	};

	const close = () => setOpen(false);

	// Relative links point into the repository, relative images next to the markdown file.
	const urlTransform: UrlTransform = (url, key) => {
		const safe = defaultUrlTransform(url);
		if (!safe || safe.startsWith("#") || /^[a-z][a-z\d+.-]*:/i.test(safe)) return safe;
		const base =
			key === "href" && project.open
				? `${project.repository}/blob/HEAD/`
				: new URL(project.markdown, window.location.href).href;
		return new URL(safe, base).href;
	};

	return (
		<>
			<SlideIn
				className="rounded-box focus-visible:outline-2 focus-visible:outline-primary"
				aria-label={project.name}
				aria-haspopup="dialog"
				{...buttonProps(open)}
			>
				<ScaleUp className="relative flex w-full cursor-pointer mb-8">
					<Image
						className="size-full rounded-box object-cover select-none"
						src={project.image}
						alt={project.name}
						width={300}
						height={200}
						sizes="(min-width: 1536px) 25vw, (min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
					/>
					<h3 className="absolute size-full flex items-center justify-center text-center font-bold text-3xl text-white tracking-widest [text-shadow:black_1px_1px_2px]">
						<SlideIn>{project.name}</SlideIn>
					</h3>
				</ScaleUp>
			</SlideIn>
			<Dialog
				className="max-w-5xl min-h-[80vh]"
				title={project.name}
				open={isOpen}
				onClose={close}
			>
				{project.open ? (
					<a
						className="float-right tooltip tooltip-bottom mr-2"
						href={project.repository}
						data-tip="GitHub"
						aria-label="Repository"
						target="_blank"
						rel="noopener noreferrer"
						onClick={close}
					>
						<FaGithub
							className="hover:text-primary transition-colors duration-300"
							size={24}
						/>
					</a>
				) : (
					<div className="float-right tooltip tooltip-bottom mr-2" data-tip="Private">
						<PiLockKeyFill
							className="hover:text-warning transition-colors duration-300"
							aria-label="Private repository"
							size={24}
						/>
					</div>
				)}
				{markdown !== null ? (
					<div className="markdown">
						<Markdown
							components={{
								a: ({ href, title, children }) =>
									href?.startsWith("#") ? (
										<a href={href} title={title}>
											{children}
										</a>
									) : (
										<a
											href={href}
											title={title}
											target="_blank"
											rel="noopener noreferrer"
										>
											{children}
										</a>
									)
							}}
							remarkPlugins={[remarkGfm]}
							rehypePlugins={[rehypeRaw, [rehypeSanitize, schema], rehypeHighlight]}
							urlTransform={urlTransform}
						>
							{markdown}
						</Markdown>
					</div>
				) : failed ? (
					<div className="flex flex-col items-center gap-4 py-24 text-center">
						<p className="text-lg">Couldn&apos;t load the project description.</p>
						<button type="button" className="btn btn-outline" onClick={load}>
							Retry
						</button>
					</div>
				) : (
					<>
						<div className="w-full h-12" />
						<div className="flex flex-col gap-4 h-screen">
							<div className="skeleton h-6 w-1/2 my-2" />
							<div className="skeleton h-64 w-full mb-2" />
							{Array.from({ length: 11 }, (_, i) => (
								<div key={i} className="skeleton h-4 w-full my-2" />
							))}
						</div>
					</>
				)}
				<TechIcons
					className="absolute hidden xl:flex -left-16 top-8"
					icons={project.icons}
				/>
			</Dialog>
		</>
	);
};

export type ProjectData = {
	name: string;
	repository: string;
	open: boolean;
	image: string;
	markdown: string;
	icons: TechIcon[];
};

type Props = {
	project: ProjectData;
};

export default Project;
