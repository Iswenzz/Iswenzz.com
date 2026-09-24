"use client";

import { FC, ReactNode } from "react";
import { MdClose } from "react-icons/md";
import { DialogPanel, Dialog as HDialog } from "@headlessui/react";
import clsx from "clsx";

const Dialog: FC<Props> = ({ open, title, className, children, onClose }) => (
	<HDialog
		open={open}
		className="relative z-40 focus:outline-none"
		aria-label={title}
		onClose={onClose}
	>
		<div className="fixed inset-0 z-40 w-screen overflow-y-auto">
			<div className="flex min-h-full items-center justify-center p-4">
				<DialogPanel
					className={clsx(
						className,
						"w-full rounded-xl bg-black/40 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
					)}
					transition
				>
					<button
						type="button"
						className="float-right cursor-pointer hover:text-error transition-colors duration-300"
						aria-label="Close"
						onClick={onClose}
					>
						<MdClose size={24} />
					</button>
					{children}
				</DialogPanel>
			</div>
		</div>
	</HDialog>
);

type Props = {
	open: boolean;
	title: string;
	className?: string;
	children: ReactNode;
	onClose: () => void;
};

export default Dialog;
