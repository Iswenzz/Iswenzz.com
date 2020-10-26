import React from "react";
import { mount } from "enzyme";
import { App } from "App";
import * as redux from "react-redux";
import { Context } from "react-responsive";
import { store } from "application";

describe("[Root] <App>", () => 
{
	it("Starting application", () => 
	{
		mount((
			<redux.Provider store={store}>
				<App {...store.getState().app} />
			</redux.Provider>
		));
	});
    
	it("Portrait mode", () =>
	{
		const Context = React.createContext({});
		mount((
			<redux.Provider store={store}>
				<Context.Provider value={{orientation: "portrait"}}>
					<App {...store.getState().app} />
				</Context.Provider>
			</redux.Provider>
		));
	});

	it("Mobile mode", () =>
	{
		const Context = React.createContext({});
		mount((
			<redux.Provider store={store}>
				<Context.Provider value={{maxDeviceWidth: "1224px"}}>
					<App {...store.getState().app} />
				</Context.Provider>
			</redux.Provider>
		));
	});

	it("Dark mode", () =>
	{
		mount((
			<redux.Provider store={store}>
				<App {...store.getState().app} isDarkMode={true} />
			</redux.Provider>
		));
	});

	it("Modal active", () =>
	{
		mount((
			<redux.Provider store={store}>
				<App {...store.getState().app} isModalActive={true} />
			</redux.Provider>
		));
	});
});
