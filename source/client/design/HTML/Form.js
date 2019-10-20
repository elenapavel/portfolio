import React, { Component } from "react";
import $, { css } from "./style.css";

export default () => (
	<b class={$.section}>
		<b class={$.section_title}>Form elements</b>

		<b class={$.sample}>
			<b class={$.sample_form_tag}>&lt;button&gt;</b>

			<button type="button">button</button>
			<button type="submit">submit</button>
			<button type="reset">reset</button>
			<button type="button" disabled>
				disabled
			</button>
		</b>

		<b class={$.sample}>
			<b class={$.sample_form_tag}>&lt;input type=button&gt;</b>

			<input type="button" value="button" />
			<input type="submit" value="submit" />
			<input type="reset" value="reset" />
			<input type="button" value="disabled" disabled />
		</b>

		<b class={$.sample}>
			<b class={$.sample_form_tag}>&lt;input type=text&gt;</b>

			<input type="text" placeholder="Text Input" />
		</b>

		<b class={$.sample}>
			<b class={$.sample_form_tag}>&lt;input type=password&gt;</b>

			<input type="password" placeholder="Type your Password" />
		</b>

		{/*
		<b class={$.sample}>
			<b class={$.sample_form_tag}>&lt;input type=datetime&gt;</b>

			<input type="datetime" value="1970-01-01T00:00:00Z" />
		</b>

		<b class={$.sample}>
			<b class={$.sample_form_tag}>&lt;input type=color&gt;</b>

			<input type="color" value="#000000" />
		</b>

		<b class={$.sample}>
			<b class={$.sample_form_tag}>&lt;input type=number&gt;</b>

			<input type="number" min="0" max="10" value="5" />
		</b>

		<b class={$.sample}>
			<b class={$.sample_form_tag}>&lt;input type=range&gt;</b>

			<input type="range" value="10" />
		</b>

		<b class={$.sample}>
			<b class={$.sample_form_tag}>&lt;input type=date&gt;</b>

			<input type="date" value="1970-01-01" />
		</b>

		<b class={$.sample}>
			<b class={$.sample_form_tag}>&lt;input type=month&gt;</b>

			<input type="month" value="1970-01" />
		</b>

		<b class={$.sample}>
			<b class={$.sample_form_tag}>&lt;input type=week&gt;</b>

			<input type="week" value="1970-W01" />
		</b>
		<b class={$.sample}>
			<b class={$.sample_form_tag}>&lt;input type=url&gt;</b>

			<input type="url" placeholder="http://yoursite.com" />
		</b>

		<b class={$.sample}>
			<b class={$.sample_form_tag}>&lt;input type=email&gt;</b>

			<input type="email" placeholder="name@email.com" />
		</b>

		<b class={$.sample}>
			<b class={$.sample_form_tag}>&lt;input type=tel&gt;</b>

			<input type="tel" placeholder="(999) 999-9999" />
		</b>

		<b class={$.sample}>
			<b class={$.sample_form_tag}>&lt;input type=search&gt;</b>

			<input type="search" placeholder="Enter Search Term" />
		</b>

		<b class={$.sample}>
			<b class={$.sample_form_tag}>&lt;input type=number&gt;</b>

			<input type="number" placeholder="Enter a Number" />
		</b>
	*/}

		<b class={$.sample}>
			<b class={$.sample_form_tag}>&lt;select&gt;</b>
			<select>
				<optgroup label="Theropods">
					<option>Tyrannosaurus</option>
					<option>Velociraptor</option>
					<option>Deinonychus</option>
				</optgroup>
				<optgroup label="Sauropods">
					<option>Diplodocus</option>
					<option>Saltasaurus</option>
					<option>Apatosaurus</option>
				</optgroup>
			</select>{" "}
		</b>

		<b class={$.sample}>
			<b class={$.sample_form_tag}>&lt;textarea&gt;</b>

			<textarea placeholder="Enter your message here" />
		</b>

		<b class={$.sample}>
			<b class={$.sample_form_tag}>&lt;input type=checkbox&gt;</b>

			<ul class="list list--bare">
				<li>
					<input name="checkbox" type="checkbox" checked="checked" />
					Choice A
				</li>
				<li>
					<input name="checkbox" type="checkbox" />
					Choice B
				</li>
				<li>
					<input name="checkbox" type="checkbox" />
					Choice C
				</li>
			</ul>
		</b>

		<b class={$.sample}>
			<b class={$.sample_form_tag}>&lt;input type=radio&gt;</b>

			<ul class="list list--bare">
				<li>
					<input name="radio" type="radio" class="radio" checked="checked" />
					Option 1
				</li>
				<li>
					<input name="radio" type="radio" class="radio" />
					Option 2
				</li>
				<li>
					<input name="radio" type="radio" class="radio" />
					Option 3
				</li>
			</ul>
		</b>
	</b>
);
