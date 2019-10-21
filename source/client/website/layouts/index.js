import React, { Component } from "react";
import { Scope, loadable } from "@nore/pwa";

const Home = loadable(() => import("./Home"));
const Gradient = loadable(() => import("./Gradient"));
// const Plants = loadable(() => import("./Plants"));
const Services = loadable(() => import("./Services"));

export default {
	"/": Home,
	"/gradient": Gradient,
	// "/plants": Plants,
	"/servicii": Services,
};
