import { FC, memo } from "react";
import { Grid, Fab } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faYoutube, faGithub } from "@fortawesome/free-brands-svg-icons";
import { Parallax } from "react-parallax";
import { Spacing, Gradient } from "Components";
import { Tooltip, Typography, useTheme } from "@mui/material";
// import { useSelector } from "react-redux";

/**
 * Footer with links to social medias & copyrights.
 */
const Footer: FC = () =>
{
	const { isDarkTheme } = useTheme();

	return (
		<>
			<Gradient component="footer" gradientPosition="ellipse at bottom" colors={[
				{ color: isDarkTheme ? "#23272A" : "#f2f2f2", colorPercent: "0%" },
				{ color: isDarkTheme ? "#23272F" : "#f4f4f4", colorPercent: "100%" }
			]}>
				<Grid component="ul" container direction="row" justifyContent="center" alignItems="center">
					<li>
						<Fab href="https://github.com/iswenzz" color="primary" style={{ margin: 20 }}>
							<FontAwesomeIcon color="silver" icon={faGithub} size="2x" />
						</Fab>
					</li>
					<li>
						<Fab href="https://www.youtube.com/c/iswenzz" color="primary" style={{ margin: 20 }}>
							<FontAwesomeIcon color="#FF0000" icon={faYoutube} size="2x" />
						</Fab>
					</li>
					<li>
						<Tooltip disableFocusListener disableTouchListener title="Iswenzz#3906">
							<Fab color="primary" style={{ margin: 20 }}>
								<FontAwesomeIcon color="#7289da" icon={faDiscord} size="2x" />
							</Fab>
						</Tooltip>
					</li>
				</Grid>
			</Gradient>
			<Parallax style={{backgroundColor: "black"}} bgImageAlt="index" strength={-400}
				bgImage={require(`assets/images/index/${isDarkTheme ? "stars" : "clouds"}.svg`)}>
				<Spacing height="10px" />
				<Typography align="center" color="textPrimary" variant="subtitle2" component="h3">
					Copyright © Iswenzz 2017-2022
				</Typography>
				<Spacing height="190px" />
			</Parallax>
		</>
	);
};

export default memo(Footer);
