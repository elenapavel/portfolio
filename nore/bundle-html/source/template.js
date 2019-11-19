import { readFileSync } from "fs";
import { join } from "path";

function render(file, data) {
	const fields = Object.keys(data).join(",");
	const content = readFileSync(file, "utf8");
	const template = new Function(`{${fields}}`, `return \`${content}\``);

	return template(data);
}

const emptyMeta = { url: "", title: "", description: "", image: "" };
const toFontLink = url => `<link href="${url}" rel="stylesheet" lazyload/>`;
const toStyleSheetLink = url => `<link href="${url}" rel="stylesheet"/>`;
const toScriptTag = url => `<script defer async src="${url}"></script>`;

export default function({ htmlWebpackPlugin, webpackConfig }) {
	const { files } = htmlWebpackPlugin;
	const { bundle } = htmlWebpackPlugin.options;
	const getFileURL = file => join(bundle.config.url.path, file);

	const scripts = files.js.map(file => toScriptTag(file));
	const stylesheets = files.css.map(file => toStyleSheetLink(file));
	const fonts = (bundle.config.template.fonts || []).map(toFontLink);

	const data = {
		isDevelopment: bundle.isDevelopment,
		meta: bundle.config.template.meta || emptyMeta,
		scripts: scripts.join("\n"),
		stylesheets: stylesheets.join("\n"),
		fonts: fonts.join("\n"),
		runtime: files.runtime || "",
	};

	return render(join(bundle.sourcePath, bundle.config.template.path), data);
}
