import $variables from "@nore/variables.json";

const screens = Object.keys($variables)
	.filter(key => key.indexOf("screen.") === 0)
	.map(key => key.replace("screen.", ""));

export default screens;
