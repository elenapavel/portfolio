import React, { useState } from "react";
import { Scope, loadable } from "@nore/pwa";

const Home = loadable(() => import("./Home"));
const Gradient = loadable(() => import("./Gradient"));
const Plants = loadable(() => import("./Plants"));
const Architecture = loadable(() => import("./Architecture"));
const Calendar = loadable(() => import("./Calendar"));
const Books = loadable(() => import("./Books"));
const Structure = loadable(() => import("./Structure"));
const UniverseFacts = loadable(() => import("./UniverseFacts"));
const NotFound = loadable(() => import("./NotFound"));

export default (
	<>
		<Scope exact match="/" render={Home} />
		<Scope match="/gradient" render={Gradient} />
		<Scope match="/plants" render={Plants} />
		<Scope match="/architecture" render={Architecture} />
		<Scope match="/calendar" render={Calendar} />
		<Scope match="/books" render={Books} />
		<Scope match="/structure" render={Structure} />
		<Scope match="/universe-facts" render={UniverseFacts} />

		<Scope.NotMatched render={NotFound} />
	</>
);
