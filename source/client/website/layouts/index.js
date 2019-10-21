import React, { Component } from "react";
import { Scope, loadable } from "@nore/pwa";
import $, { css } from "./style.css";

const Home = loadable(() => import("./Home"));
const Gradient = loadable(() => import("./Gradient"));
const Plants = loadable(() => import("./Plants"));
const Architecture = loadable(() => import("./Architecture"));
const Services = loadable(() => import("./Services"));

export default {
	"/": Home,
	"/gradient": Gradient,
	"/plants": Plants,
	"/architecture": Architecture,
	"/servicii": Services,
};
