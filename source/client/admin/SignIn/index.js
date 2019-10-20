import React, { useState } from "react";
import TextField from "~/components/TextField";
import Button from "~/components/Button";
import useSignInForm from "./useSignInForm.js";
import useShowPassword from "./useShowPassword.js";
import $, { css } from "./style.css";

export default function SignIn(props) {
	const { form, login, password } = useSignInForm();
	const [isShowPassword, showPassword] = useShowPassword();

	return (
		<b class={$.container}>
			<b class={$.form} onKeyDown={form.onEnter}>
				<b class={$.logo} />
				<br />
				<br />

				<TextField
					label="Email"
					size="large"
					name={login.name}
					value={login.value}
					error={login.error}
					inputRef={login.ref}
					onChange={login.change}
				/>

				<TextField
					label="Password"
					size="large"
					name={password.name}
					value={password.value}
					error={password.error}
					inputRef={password.ref}
					onChange={password.change}
					mode={isShowPassword ? "text" : "password"}
					endEnhancer={showPassword}
				/>

				{!form.error ? null : <b class={$.form_error}>{form.error}</b>}

				<b class={$.submit}>
					<Button
						wide
						is="primary"
						type="flat"
						size="large"
						label="Sign in"
						disabled={form.isDisabled}
						onClick={() => form.submit()}
					/>
				</b>
			</b>
		</b>
	);
}
