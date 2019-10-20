import postcss from "postcss";

export default postcss.plugin("responsive-unit", (options = {}) => {
	const REGEX_UNIT = /\d*\.?\d+ru/gi;
	const rem = options.rem || 16;

	function toREM(value) {
		return value.replace(REGEX_UNIT, match => {
			return parseFloat((parseFloat(match) / rem).toFixed(4)) + "rem";
		});
	}

	return function(css, result) {
		css.walkDecls(decl => {
			if (!REGEX_UNIT.test(decl.value)) return;

			decl.value = toREM(decl.value);
		});

		css.walkAtRules("media", rule => {
			if (!REGEX_UNIT.test(rule.params)) return;

			rule.params = toREM(rule.params);
		});
	};
});
