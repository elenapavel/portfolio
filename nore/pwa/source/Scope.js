import React, { useContext } from "react";
import joinPath from "./utils/joinPath";
import renderOrChildren from "./utils/renderOrChildren.js";

const Context = React.createContext(null);

function inherit(parent, route, name) {
	const current = Object.create(parent);

	// absolute path
	if (route[0] === "/") {
		current.route = route;
	}
	// relative path
	else {
		current.route = joinPath(parent ? parent.route : "/", route);
	}

	// scope @key for scope relative paths
	if (name) current[`@${name}`] = current.route;

	// keep track of matched nested segments
	// to allow "not found" functionality
	current.matched = [];

	return current;
}

function itMatches(parent, scope, isExact) {
	const isMatch = isExact
		? parent.path === scope.route
		: parent.path.indexOf(scope.route) === 0;

	if (isMatch) {
		parent.matched.push(scope.route);
	}

	return isMatch;
}

function Scope({ children, render, match, exact, name }) {
	const parent = useContext(Context);

	if (!parent) {
		throw new Error(
			`<Scope match="${match}"> was rendered outsite of a <Scope.Root>`
		);
	}

	// create new scope and inherit from parent
	const route = match ? match.toLowerCase() : parent.route;
	const current = inherit(parent, route, name);

	// it doesn't match the route
	if (!itMatches(parent, current, exact)) return null;

	return (
		<Context.Provider value={current}>
			{renderOrChildren(children, render, current)}
		</Context.Provider>
	);
}

function Root({ children, render, context, path, route }) {
	const root = inherit(context || null, route || "/");

	// route to match active contexts
	root.path = path || "/";

	return (
		<Context.Provider value={root}>
			{renderOrChildren(children, render, root)}
		</Context.Provider>
	);
}

function NotMatched({ children, render }) {
	const parent = useContext(Context);

	if (parent.matched.length) {
		return null;
	}

	return renderOrChildren(children, render, parent);
}

Scope.Context = Context;
Scope.Root = Root;
Scope.NotMatched = NotMatched;

export default Scope;
