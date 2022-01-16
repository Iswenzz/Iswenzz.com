import { ElementType, FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Typography, TypographyProps } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import { animation } from "./config";
import scss from "./TrailText.module.scss";

/**
 * Trail text characters animation.
 */
const TrailText: FC<TrailTextProps> = ({ children, visible = true, ...rest }) =>
{
	const { t } = useTranslation();
	const items = useMemo(() => 
	{
		const array = Array.isArray(children) ? children : [children];
		return array.map<string>(t).map(text => text.split(" ").join("\u00A0").split(""));
	}, [children, t]);

	return (
		<Typography className={scss.char} {...rest}>
			{visible && items.map(word => 
				word.map((char, index) => (
					<motion.div key={uuidv4()} className={scss.charMotion} initial="initial" animate="enter" 
						variants={animation} custom={index}>
						{char}
					</motion.div>
				))
			)}
		</Typography>
	);
};

type TrailTextProps = TypographyProps & {
	component?: ElementType,
	visible?: boolean,
	children: string[] | string
};

export default TrailText;
