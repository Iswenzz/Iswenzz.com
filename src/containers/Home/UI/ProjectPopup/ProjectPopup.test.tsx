import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { ProjectPopup } from "./ProjectPopup";
import * as redux from "react-redux";
import * as homeActions from "containers/Home/store/actions";
import { Fab } from "@material-ui/core";
import { store } from "application";

describe("[Container] <ProjectPopup>", () => 
{
	let wrapper: ReactWrapper;
    
	beforeEach(() => 
	{
		wrapper = mount((
			<redux.Provider store={store}>
				<ProjectPopup />
			</redux.Provider>
		));
	});

	it("Testing component", () => 
	{
		expect(wrapper.find(ProjectPopup)).toBeDefined();
	});

	it("Open modal", () => {
		// open modal TODO
	});

	it("Image drag", () => {
		// dragging images
		wrapper.find("img").forEach(img => img.simulate("dragstart", {
			preventDefault() {}
		}));
	});

	it("Close modal", () => {
		// close modal
		wrapper.find(Fab).forEach(fab => 
		{
			if (fab.props().id === "fab_modal_close")
				fab.simulate("click");
		});
	});

	it("Portrait", () => {
		const Context = React.createContext({orientation: "portrait"});
		mount((
			<redux.Provider store={store}>
				<Context.Consumer>
					{value => <ProjectPopup />}
				</Context.Consumer>
			</redux.Provider>
		));
	});
});
