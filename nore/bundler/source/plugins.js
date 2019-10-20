import variables from "@nore/bundle-variables";
import js from "@nore/bundle-js";
import css from "@nore/bundle-css";
import html from "@nore/bundle-html";
import md from "@nore/bundle-md";
import toml from "@nore/bundle-toml";
import yaml from "@nore/bundle-yaml";
import graphql from "@nore/bundle-graphql";
import images from "@nore/bundle-images";
import fonts from "@nore/bundle-fonts";

// order is important, don't change
export default [
	variables,
	js,
	css,
	html,
	md,
	toml,
	yaml,
	graphql,
	images,
	fonts,
];
