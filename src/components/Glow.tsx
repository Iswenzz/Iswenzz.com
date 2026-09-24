import { FC } from "react";
import clsx from "clsx";

const Glow: FC<Props> = ({ className }) => (
	<div
		aria-hidden
		className={clsx(
			"absolute size-1/2 top-20 blur-[100px] bg-[conic-gradient(from_2.5rad,#ff0042,#0000ff)] pointer-events-none",
			className
		)}
	/>
);

type Props = {
	className?: string;
};

export default Glow;
