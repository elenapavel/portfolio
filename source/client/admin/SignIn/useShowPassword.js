import React, { useState } from "react";
import $, { css } from "./style.css";

import Eye from "assets/icons/feather/eye.svg?inline";
import EyeOff from "assets/icons/feather/eye-off.svg?inline";

export default function useShowPassword() {
	const [isVisible, setVisibility] = useState(false);

	const element = (
		<b
			class={css("show_password", { is_visible: isVisible })}
			onClick={() => setVisibility(!isVisible)}
		>
			{isVisible ? <Eye /> : <EyeOff />}
		</b>
	);

	return [isVisible, element];
}
