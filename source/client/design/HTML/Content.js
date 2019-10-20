import React, { Component } from "react";
import $, { css } from "./style.css";

export default () => (
	<b class={css("section", "is_content")}>
		<b class={$.section_title}>Content</b>

		<b class={$.sample}>
			<b class={$.sample_label}>&lt;h1&gt;/&lt;h6&gt;</b>
			<hgroup>
				<h1>Quis imperdiet massa tincidunt nunc</h1>
				<h2>Aliquam etiam erat velit scelerisque in dictum</h2>
				<h3>Amet purus gravida quis blandit turpis cursus in</h3>
				<h4>Malesuada fames ac turpis egestas integer eget aliquet</h4>
				<h5>Nam aliquam sem et tortor consequat id porta nibh venenatis</h5>
				<h6>
					Cras fermentum odio eu feugiat pretium nibh ipsum. Et netus et
					malesuada
				</h6>
			</hgroup>
		</b>

		<b class={$.sample}>
			<b class={$.sample_label}>&lt;article&gt;</b>

			<article>
				<p>
					This paragraph is nested inside an article. It contains many
					different, sometimes useful,{" "}
					<a href="https://www.w3schools.com/tags/">HTML5 tags</a>. Of course
					there are classics like <em>emphasis</em>, <strong>strong</strong>,
					and <small>small</small> but there are many others as well. Hover the
					following text for abbreviation tag:{" "}
					<abbr title="abbreviation">abbr</abbr>. Similarly, you can use acronym
					tag like this: <acronym title="For The Win">ftw</acronym>. You can
					define <del>deleted text</del> which often gets replaced with{" "}
					<ins>inserted</ins> text.
				</p>
				<p>
					You can also use <kbd>keyboard text</kbd>, which sometimes is styled
					similarly to the <code>&lt;code&gt;</code> or <samp>samp</samp> tags.
					Even more specifically, there is a tag just for <var>variables</var>.
					Not to be mistaken with blockquotes below, the quote tag lets you
					denote something as <q>quoted text</q>. Lastly don't forget the sub (H
					<sub>2</sub>O) and sup (E = MC<sup>2</sup>) tags.{" "}
				</p>
			</article>
		</b>

		<b class={$.sample}>
			<b class={$.sample_label}>&lt;dl&gt;</b>

			<dl>
				<dt>definition title</dt>
				<dd>definition division</dd>
				<dt>definition title</dt>
				<dd>definition division</dd>
				<dt>definition title</dt>
				<dd>definition division</dd>
			</dl>
		</b>

		<b class={$.sample}>
			<b class={$.sample_label}>&lt;ul&gt;</b>

			<ul>
				<li>
					li 1 - one
					<ul>
						<li>
							li 2 - one
							<ul>
								<li>li 3 - one</li>
								<li>li 3 - two</li>
							</ul>
						</li>
						<li>li 2 - two</li>
						<li>li 2 - three</li>
					</ul>
				</li>
				<li>li 1 - two</li>
				<li>li 1 - three</li>
			</ul>
		</b>

		<b class={$.sample}>
			<b class={$.sample_label}>&lt;ol&gt;</b>

			<ol>
				<li>
					li 1 - one
					<ol>
						<li>
							li 2 - one
							<ol>
								<li>li 3 - one</li>
								<li>li 3 - two</li>
							</ol>
						</li>
						<li>li 2 - two</li>
						<li>li 2 - three</li>
					</ol>
				</li>
				<li>li 1 - two</li>
				<li>li 1 - three</li>
			</ol>
		</b>

		<b class={$.sample}>
			<b class={$.sample_label}>&lt;hr&gt; - hairline</b>

			<b>
				<hr />
			</b>
		</b>
	</b>
);
