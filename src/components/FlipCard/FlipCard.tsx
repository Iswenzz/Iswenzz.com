import React, { Component } from "react";
import ReactCardFlip from "react-card-flip";
import "./FlipCard.scss";

export type FlipCardProps = {
	className?: string,
	style?: React.CSSProperties,
	back?: React.ReactNode,
	front?: React.ReactNode,
	flipCallback?: (flipState: boolean) => void,
};

export type FlipCardState = {
	isFlipped: boolean
};

/**
 * Card component that flip on mouse click event.
 */
export class FlipCard extends Component<FlipCardProps, FlipCardState>
{
	state: FlipCardState = {
		isFlipped: false
	};
	
	/**
	 * Initialize a new FlipCard component.
	 * @param props - FlipCardProps
	 */
	constructor(props: FlipCardProps) 
	{
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	/**
	 * FlipCard click callback.
	 * @param e - Click event args.
	 */
	handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void
	{
		e.preventDefault();
		this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
		if (this.props.flipCallback !== undefined)
			this.props.flipCallback(this.state.isFlipped);
	}

	shouldComponentUpdate(nextProps: FlipCardProps, nextState: FlipCardState): boolean
	{
		return nextState.isFlipped !== this.state.isFlipped;
	}

	render(): JSX.Element
	{
		return (
			<ReactCardFlip containerStyle={{ width: "100%", height: "100%" }}
				isFlipped={this.state.isFlipped} flipDirection="vertical">
				<section className="flipcard" onClick={this.handleClick}>
					{this.props.back}
				</section>
				<section className="flipcard" onClick={this.handleClick}>
					{this.props.front}
				</section>
			</ReactCardFlip>
		);
	}
}

export default FlipCard;