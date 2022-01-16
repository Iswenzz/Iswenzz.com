import { memo, FC } from "react";
import { Parallax } from "react-parallax";
import { Text, TrailText, Spacing, Gradient, GradientColor } from "components";
import { Grid, Container, Divider, useTheme } from "@mui/material";
import VisibilitySensor from "react-visibility-sensor";
import { motion, Variants } from "framer-motion";
// import usePortrait from "utils/hooks/usePortrait";
import useTabletOrMobile from "utils/hooks/useTabletOrMobile";
import { Element } from "react-scroll";
import classNames from "classnames";

import scss from "./Intro.module.scss";

export type Skill = {
	title: string,
	points: string[]
};

export type IntroInfo = {
	header: string,
	title: string,
	desc: string,
	skills: Skill[]
};

export const introJSON: IntroInfo = require("./Intro.json");

const animationUp: Variants = {
	enter: { 
		y: "0%", 
		opacity: 1,
		scale: 1,
		transition: { 
			duration: 1,
			ease: "easeOut"
		}
	},
	exit: {
		y: "100%",
		opacity: 0,
		scale: 1,
		transition: { 
			duration: 1,
			ease: "easeIn"
		}
	}
};

const animationRight: Variants = {
	enter: { 
		x: "0%", 
		opacity: 1,
		scale: 1,
		transition: { 
			duration: 1,
			ease: "easeOut"
		}
	},
	exit: {
		x: "100%",
		opacity: 0,
		scale: 1,
		transition: { 
			duration: 1,
			ease: "easeIn"
		}
	}
};

const animationLeft: Variants = {
	enter: { 
		x: "0%", 
		opacity: 1,
		scale: 1,
		transition: { 
			duration: 1,
			ease: "easeOut"
		}
	},
	exit: {
		x: "-100%",
		opacity: 0,
		scale: 1,
		transition: { 
			duration: 1,
			ease: "easeIn"
		}
	}
};

/**
 * Container to introduce my portfolio and technological skills.
 */
export const IntroSkill: FC = (): JSX.Element =>
{
	const { isDarkTheme } = useTheme();
	const isTabletOrMobile = useTabletOrMobile();

	const gradientColor: GradientColor[] = [
		{ color: isDarkTheme ? "#0e0f14" : "#e5e5e5", colorPercent: "0%" },
		{ color: isDarkTheme ? "#181a21" : "#f4f4f4", colorPercent: "100%" }
	];

	/**
	 * Grid containing skills informations.
	 */
	const skillGrid: JSX.Element = (
		<Grid className={scss.skillGrid} container component="section"
			alignItems="center" justifyContent="space-around">
			
			{/* Web Development */}
			<article className={scss.article}>
				<Text component="h2" className="poiret-h2">{introJSON.skills[0].title}</Text>
				<Text component="h4" className="ubuntu-h4">{introJSON.skills[0].points}</Text>
				<Spacing height="20px" />
				<Text component="h2" className="poiret-h2">{introJSON.skills[1].title}</Text>
				<Text component="h4" className="ubuntu-h4">{introJSON.skills[1].points}</Text>
			</article>

			{/* Software Development */} 
			<article className={scss.article}>
				<Text component="h2" className="poiret-h2">{introJSON.skills[2].title}</Text>
				<Text component="h4" className="ubuntu-h4">{introJSON.skills[2].points}</Text>
				<Spacing height="20px" />
				<Text component="h2" className="poiret-h2">{introJSON.skills[3].title}</Text>
				<Text component="h4" className="ubuntu-h4">{introJSON.skills[3].points}</Text>
			</article>

			{/* Level Design */}
			<article className={scss.article}>
				<Text component="h2" className="poiret-h2">{introJSON.skills[4].title}</Text>
				<Text component="h4" className="ubuntu-h4">{introJSON.skills[4].points}</Text>
				<Spacing height="20px" />
				<Text component="h2" className="poiret-h2">{introJSON.skills[5].title}</Text>
				<Text component="h4" className="ubuntu-h4">{introJSON.skills[5].points}</Text>
			</article>

		</Grid>
	);

	return (
		<Grid container component="section" direction="column" justifyContent="center" alignItems="stretch">
			<Element name="intro-section" />

			{/* First Section (About) */}
			<Gradient component="section" gradientPosition="ellipse at bottom" colors={gradientColor}>
				<VisibilitySensor partialVisibility offset={{ bottom: isTabletOrMobile ? 20 : 200 }}>
					{({ isVisible }) => (
						<Grid className={scss.introGrid} container 
							justifyContent="center" alignItems="center">
							<motion.div variants={animationUp} initial={"exit"} animate={isVisible ? "enter" : "exit"}>
								<Container component="header" maxWidth="md">
									<Text align="left" color="textPrimary" component="h2" variant="h2"
										className="poiret-h1 noselect">
										{introJSON.header}
									</Text>
									<Divider className={scss.introDivider} />
									<Text align="left" color="textPrimary" component="h3" variant="h3" 
										className={classNames(scss.secondText, "ubuntu-h3")}>
										{introJSON.title}
									</Text>
									<Text align="left" color="textPrimary" paragraph component="h4" variant="h4"
										className="ubuntu-h4">
										{introJSON.desc}
									</Text>
								</Container>
							</motion.div>
						</Grid>
					)}
				</VisibilitySensor>
			</Gradient>

			<Parallax style={{backgroundColor: isDarkTheme ? "black" : "rgb(122, 206, 255)"}} 
				bgImageAlt="index" strength={400}
				bgImage={require(`assets/images/index/${isDarkTheme ? "stars" : "clouds"}.svg`)}>
				<Spacing height="100px" />
			</Parallax>

			{/* Second Section (Skills) */}
			<Gradient component="section" gradientPosition="ellipse at top" colors={gradientColor}>
				<VisibilitySensor partialVisibility offset={{ bottom: isTabletOrMobile ? 10 : 200 }}>
					{({ isVisible }) => (
						<Container>
							<motion.div variants={animationLeft} initial={"exit"} animate={isVisible ? "enter" : "exit"}>
								<Container component="header" className={scss.container}>
									<TrailText align="center" color="textPrimary" component="h2" variant="h2"
										className="poiret-h1 noselect" visible={isVisible}>
										TECHNO_SKILLS
									</TrailText>
									<Divider className={scss.skillDivider} />
								</Container>
							</motion.div>
							{isTabletOrMobile ? skillGrid : (
								<motion.div variants={animationRight} initial={"exit"} animate={isVisible ? "enter" : "exit"}>
									{skillGrid}
								</motion.div>
							)}
						</Container>
					)}
				</VisibilitySensor>
			</Gradient>
		</Grid>
	);
};

export default memo(IntroSkill);
