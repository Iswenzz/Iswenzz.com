import { FC } from "react";
import Image from "next/image";
import clsx from "clsx";

export type TechIcon = {
	name: string;
	src: string;
};

const TechIcons: FC<Props> = ({ icons, className }) => (
	<ul className={clsx("flex-col items-center", className)}>
		{icons.map(icon => (
			<li key={icon.name} className="tooltip tooltip-left mb-2" data-tip={icon.name}>
				<Image
					className="h-8 w-8 xl:h-14 xl:w-14 select-none"
					src={icon.src}
					alt={icon.name}
					width={56}
					height={56}
				/>
			</li>
		))}
	</ul>
);

type Props = {
	icons: TechIcon[];
	className?: string;
};

export default TechIcons;
