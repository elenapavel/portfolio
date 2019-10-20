import React, { Component } from "react";
import { Scope, loadable } from "@nore/pwa";

const Home = loadable(() => import("./Home"));
const AboutUs = loadable(() => import("./AboutUs"));
const Services = loadable(() => import("./Services"));
const Workshops = loadable(() => import("./Workshops"));
const Courses = loadable(() => import("./Courses"));
const Contact = loadable(() => import("./Contact"));
const PersonalDevelopment = loadable(() => import("./PersonalDevelopment"));
const GroupKids = loadable(() => import("./GroupKids"));
const Default = loadable(() => import("./Default"));

export default {
	"/": Home,
	"/servicii": Services,
	"/ateliere": Workshops,
	"/cursuri": Courses,
	"/despre-noi": AboutUs,
	"/contact": Contact,
	"/dezvoltare-personala": PersonalDevelopment,
	"/grupa-prieteni": GroupKids,
	"/grupa-miscare": GroupKids,
	"/psihoterapie": Default,
	"/parenting": Default,
	"/logopedie": Default,
	"/psiholog-de-familie": Default,
};
