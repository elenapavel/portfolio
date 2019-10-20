import React, { Component } from "react";
import $, { css } from "./style.css";

export default () => (
	<b class={$.section}>
		<b class={$.section_title}>Table</b>

		<table>
			<tbody>
				<tr>
					<th>Sign</th>
					<th>HTML code</th>
					<th>HTML entity</th>
					<th>CSS code</th>
				</tr>
				<tr>
					<td>¶</td>
					<td>&amp;#182;</td>
					<td>&amp;para;</td>
					<td>\00B6</td>
				</tr>
				<tr>
					<td>&</td>
					<td>&amp;#38;</td>
					<td>&amp;amp;</td>
					<td>\0026</td>
				</tr>
				<tr>
					<td>*</td>
					<td>&amp;#42;</td>
					<td>&amp;ast;</td>
					<td>\002A</td>
				</tr>
				<tr>
					<td>™</td>
					<td>&amp;#8482;</td>
					<td>&amp;trade;</td>
					<td>\2122</td>
				</tr>
				<tr>
					<td>←</td>
					<td>&amp;#8592;</td>
					<td>&amp;larr;</td>
					<td>\2190</td>
				</tr>
				<tr>
					<td>↑</td>
					<td>&amp;#8593;</td>
					<td>&amp;uarr;</td>
					<td>\2191</td>
				</tr>
				<tr>
					<td>$</td>
					<td>&amp;#36;</td>
					<td>&amp;dollar;</td>
					<td>\0024</td>
				</tr>
				<tr>
					<td>¢</td>
					<td>&amp;#162;</td>
					<td>&amp;cent;</td>
					<td>\00A2</td>
				</tr>
				<tr>
					<td>€</td>
					<td>&amp;#8364;</td>
					<td>&amp;euro;</td>
					<td>\20AC</td>
				</tr>
				<tr>
					<td>“</td>
					<td>&amp;#8220;</td>
					<td>&amp;ldquo;</td>
					<td>\201C</td>
				</tr>
				<tr>
					<td>”</td>
					<td>&amp;#8221;</td>
					<td>&amp;rdquo;</td>
					<td>\201D</td>
				</tr>
			</tbody>
		</table>
	</b>
);
