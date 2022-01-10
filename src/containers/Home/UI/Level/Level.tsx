import React, { FC, memo, useState } from "react";
import { Grid, Tooltip, Container, Typography, GridList, GridListTile, makeStyles } from "@material-ui/core";
import { IconProps } from "Home/UI/Project/Project";
import FlipCard from "Components/FlipCard/FlipCard";
import ReactPlayer, { Config } from "react-player";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { AppState } from "../../../App";
import uuid from "uuid";
import "../../../App/Common.scss";
import "./Level.scss";
import {useTranslation} from "react-i18next";
import LazyImage from "../../../../components/LazyImage/LazyImage";

const playerConfig: Config = { 
	youtube: {
		playerVars: {
			disablekb: false,
			controls: true
		}
	}
};

export type LevelProps = {
	currentLevel: LevelProject,
	levels: LevelProject[]
};

export type LevelProject = {
	name: string,
	image: string,
	description?: string,
	videoUrl?: string,
	width?: string,
	height?: string,
	renderIcons?: IconProps[]
};

const useStyles = makeStyles(theme => ({
	darkCard: {
		height: "100%", 
		width: "100%",
		background: "radial-gradient(ellipse at 80%, rgb(0, 48, 138) 0%, rgb(14, 14, 14) 110%)",
		borderColor: "rgba(0, 131, 255, .3)",
		borderStyle: "dotted",
	},
	whiteCard: {
		height: "100%", 
		width: "100%",
		background: "radial-gradient(ellipse at 80%, #eaeaea 0%, rgb(240, 240, 240) 110%)",
		borderColor: "rgba(0, 131, 255, .3)",
		borderStyle: "dotted",
	}
}));

/**
 * Flip card container, map preview and stacks on the front, and video/description on the back.
 * @param props - LevelProps
 */
export const Level: FC<LevelProps> = (props: LevelProps): JSX.Element =>
{
	const { t } = useTranslation();
	const isPortrait = useMediaQuery({ orientation: "portrait" });
	const isTabletOrMobileDevice = useMediaQuery({ query: "(max-device-width: 1224px)" });
	const [isFlipped, setFlipped] = useState<boolean>(true);
	const classes = useStyles();
	const isDarkMode = useSelector((state: AppState) => state.app.isDarkMode);

	/**
	 * Flip the card.
	 * @param flipState - Flip card state.
	 */
	const flipCallback = (flipState: boolean): void =>
	{
		setFlipped(flipState);
	};

	/**
	 * Component for the desktop version.
	 */
	const desktopCard: JSX.Element = (
		<Container component="section" className={`level ${isDarkMode ? classes.darkCard : classes.whiteCard}`}>
			<GridList className="level-grid-list" cellHeight='auto' spacing={1}>
				<GridListTile component="header" className="level-desktop-tile-name" key={uuid.v4()} cols={2} rows={2}>
					<Typography itemProp="name" className="level-desktop-typo" variant="h2" align="center" 
						color="textPrimary" component="h2">
						{props.currentLevel.name}
					</Typography>
				</GridListTile>
				<GridListTile key={uuid.v4()} cols={1} rows={1} className="level-desktop-tile-player">
					{!isFlipped ? <ReactPlayer config={playerConfig} width='100%' height='100%' 
						url={props.currentLevel.videoUrl} /> : null}
				</GridListTile>
				<GridListTile key={uuid.v4()} cols={1} rows={1} className="level-desktop-tile-desc">
					<Grid container direction="row" justify="center" alignItems="center">
						<Typography itemProp="description" className="level-desktop-tile-desc-typo" variant="subtitle1" 
							align="left" color="textPrimary" paragraph component="p">
							{props.currentLevel.description}
						</Typography>
					</Grid>
				</GridListTile>
			</GridList>
		</Container>
	);

	/**
	 * Component for the mobile version.
	 */
	const mobileCard: JSX.Element = (
		<Container component="section" className={`level ${isDarkMode ? classes.darkCard : classes.whiteCard}`}>
			<Grid container className="level-grid" direction="row" justify="center" alignItems="center">
				<header>
					<h3 itemProp="name" className="calli-h2 level-mobile-name">{props.currentLevel.name}</h3>
				</header>
				{!isFlipped ? <ReactPlayer config={playerConfig} width='100%' height='50%' 
					url={props.currentLevel.videoUrl} /> : null}
				<Typography itemProp="description" className="level-mobile-typo" paragraph variant="subtitle1" align="left" 
					color="textPrimary" component="p">
					{props.currentLevel.description}
				</Typography>
			</Grid>
		</Container>
	);

	return (
		<FlipCard flipCallback={flipCallback} back={(
			<Container itemScope itemType="http://schema.org/3DModel" component="section" className="level" 
				style={{ backgroundImage: `url(${props.currentLevel.image})` }}>
				<meta itemProp="image" content={props.currentLevel.image} />
				<meta itemProp="embedUrl" content={props.currentLevel.videoUrl} />
				<Grid container direction="row" alignItems="center" justify="space-between">
					<Tooltip placement="right" arrow disableFocusListener title={t("TOOLTIP_CLICK_ME") as string}>
						<LazyImage onDragStart={(e) => e.preventDefault()} alt='click-me' width={55} height={64}
							src={require("assets/images/misc/icons8-natural-user-interface-2-64.png")} />
					</Tooltip>
					<Grid container component="ul" direction="column" justify="space-evenly" alignItems="flex-end">
						{props.currentLevel.renderIcons?.map(icon => (
							<li key={uuid.v4()}>
								<Tooltip arrow disableFocusListener disableTouchListener title={icon.name}>
									<LazyImage onDragStart={(e) => e.preventDefault()} className="level-tooltip-img"
										width={isPortrait || isTabletOrMobileDevice ? "32" : "64"}
										height={isPortrait || isTabletOrMobileDevice ? "32" : "64"}
										alt="" src={icon.src} />
								</Tooltip>
							</li>
						))}
					</Grid>
				</Grid>
			</Container>
		)} front={isPortrait || isTabletOrMobileDevice ? mobileCard : desktopCard} />
	);
};

export default memo(Level);