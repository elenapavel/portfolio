import React, { Component } from "react";
import $, { css } from "./style.css";

export default () => (
	<b class={$.section}>
		<b class={$.section_title}>Markup</b>

		<b class={$.sample}>
			<code>&lt;a&gt;</code>A link can have many formats:{" "}
			<a href="#">internal</a>, <a href="https://google.com">external</a>,{" "}
			<a href="mailto:user@domain.com">send mail</a>,{" "}
			<a href="tel:+491570156">call number</a>.
		</b>

		<b class={$.sample}>
			<code>&lt;strong&gt;</code>Before proceeding, <strong>make sure</strong>{" "}
			you put on your safety goggles.
		</b>

		<b class={$.sample}>
			<code>&lt;em&gt;</code>We <em>had</em> to do something about it.
		</b>

		<b class={$.sample}>
			<code>&lt;mark&gt;</code>Several species of <mark>salamander</mark>{" "}
			inhabit the temperate.
		</b>

		<b class={$.sample}>
			<code>&lt;del&gt;</code>
			<del>This text has been deleted</del>, here is the rest of the paragraph.
		</b>

		<b class={$.sample}>
			<code>&lt;ins&gt;</code>You're late!{" "}
			<ins cite="../howtobeawizard.html" dateTime="2018-05">
				“A wizard is never late …”
			</ins>
		</b>

		<b class={$.sample}>
			<code>&lt;s&gt;</code>
			<s>Today's Special: Salmon</s> SOLD OUT.
		</b>

		<b class={$.sample}>
			<code>&lt;u&gt;</code>You could use this element to highlight{" "}
			<u>speling</u> mistakes.
		</b>

		<b class={$.sample}>
			<code>&lt;small&gt;</code>This is the first sentence.{" "}
			<small>This whole sentence is in small letters.</small>
		</b>

		<b class={$.sample}>
			<code>&lt;sub&gt;</code>Almost every developer's favorite molecule is C
			<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>.
		</b>

		<b class={$.sample}>
			<code>&lt;sup&gt;</code>The following equation: a<sup>2</sup>+ b
			<sup>2</sup>= c<sup>2</sup>.
		</b>

		<b class={$.sample}>
			<code>&lt;abbr&gt;</code>You can use{" "}
			<abbr title="Cascading Style Sheets">CSS</abbr> to style your HTML.
		</b>

		<b class={$.sample}>
			<code>&lt;dfn&gt;</code>A <dfn id="def-validator">validator</dfn> is a
			program that checks for syntax errors.
		</b>

		<b class={$.sample}>
			<code>&lt;cite&gt;</code>First sentence in
			<cite> Nineteen Eighty-Four </cite>
			by George Orwell.
		</b>

		<b class={$.sample}>
			<code>&lt;q&gt;</code>According to Mozilla's website,
			<q cite="https://www.mozilla.org/en-US/about/history/details/">
				Firefox 1.0 was released in 2004.
			</q>
		</b>

		<b class={$.sample}>
			<code>&lt;code&gt;</code>The <code>push()</code> method adds one or more
			elements to the end of an array.
		</b>

		<b class={$.sample}>
			<code>&lt;kbd&gt;</code>Please press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> +{" "}
			<kbd>R</kbd> to re-render an MDN page.
		</b>

		<b class={$.sample}>
			<code>&lt;samp&gt;</code>
			<samp>
				Keyboard not found, Press <kbd>F1</kbd> to continue
			</samp>
			.
		</b>

		<b class={$.sample}>
			<code>&lt;var&gt;</code>
			The volume of a box is <var>l</var> × <var>w</var> × <var>h</var>.
		</b>

		<b class={$.section_note}>
			<small>
				<strong>NOTE:</strong>
			</small>{" "}
			<code>&lt;b&gt;</code> and <code>&lt;i&gt;</code> are used as{" "}
			<code>&lt;div&gt;</code>
			and <code>&lt;span&gt;</code>.
		</b>
	</b>
);
