import React, { useState, useEffect, createElement } from "react";
import { Scope, loadable, http } from "@nore/pwa";
import { keys } from "@nore/std/object";

const Home = loadable(() => import("./Home"));
const Gradient = loadable(() => import("./Gradient"));
const Plants = loadable(() => import("./Plants"));
const Architecture = loadable(() => import("./Architecture"));
const Calendar = loadable(() => import("./Calendar"));
const Books = loadable(() => import("./Books"));
const Structure = loadable(() => import("./Structure"));
const UniverseFacts = loadable(() => import("./UniverseFacts"));
const NotFound = loadable(() => import("./NotFound"));

const pages = {
	"/": Home,
	"/gradient": Gradient,
	"/plants": Plants,
	"/architecture": Architecture,
	"/calendar": Calendar,
	"/books": Books,
	"/structure": Structure,
	"/universe-facts": UniverseFacts,
};

const Page = ({ layout, path }) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const getPath = path == "/" ? "/home" : path;

		http.get(`data.json`, {})
			.then(reply => {
				const data = reply.body.find(
					element => "/" + element.id == getPath
				);
				setData(data);
			})
			.catch(reply => {
				console.log("HTTP Error", reply);
			});
	}, [path]);

	const content = !data ? <NotFound /> : createElement(layout, { data });

	return !data ? null : content;
};

export default (
	<>
		<Scope exact match="404" render={NotFound} />
		{keys(pages).map(path => (
			<Scope
				exact
				match={path}
				render={() => <Page layout={pages[path]} path={path} />}
				key={path}
			/>
		))}

		<Scope.NotMatched render={NotFound} />
	</>
);
