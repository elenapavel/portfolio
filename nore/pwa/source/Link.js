import React, { useContext, createElement } from "react";
import window from "@nore/std/global";
import joinPath from "./utils/joinPath.js";
import navigate from "./navigate.js";
import Scope from "./Scope.js";

function getOrigin({ protocol, hostname, port }) {
  return protocol + "//" + hostname + (port ? ":" + port : "");
}

function isExternal(link) {
  // Location.origin and HTMLAnchorElement.origin
  // are not supported by IE and Safari.
  return getOrigin(window.location) !== getOrigin(link);
}

function prevent(event) {
  if (event.stopImmediatePropagation) {
    event.stopImmediatePropagation();
  }

  if (event.stopPropagation) {
    event.stopPropagation();
  }

  event.preventDefault();

  return false;
}

function clickHandler(event, props, to) {
  const { onClick, target, newtab, native, delay } = props;

  // first let the user handle the onClick event
  if (typeof onClick === "function") onClick(event, props, to);

  // let the browser handle the click
  if (native || target || newtab) return;

  // URL is not internal
  if (isExternal(event.currentTarget)) return;

  // ignore hashtags
  if (to.charAt(0) === "#") return;

  // not clicked with main mouse button
  if (event.button !== 0) return;

  // meta keys are pressed
  if (event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) return;

  navigate(to, { delay });

  return prevent(event);
}

function resolve(to, scope) {
  // absolute paths
  if (to[0] === "/") return to;

  // is external
  if (to.indexOf("http") === 0) return to;

  // scope relative paths
  if (to[0] === "@") {
    const key = to.slice(0, to.indexOf("/") >>> 0);
    const path = to.slice(key.length);

    return joinPath(scope[key], path);
  }

  // join relative paths to scope path
  return joinPath(scope.route, to);
}

/*
  - to: "/path/to?some=query"
  - label: ""
*/
export default function Link(props) {
  const scope = useContext(Scope.Context);
  const { id, className, style, target } = props;
  const { to, newtab, label, children } = props;
  const href = resolve(to, scope);

  const attrs = {
    id,
    className,
    style,
    href,
    target: target || (newtab && "_blank"),
    children: children || label,
    onClick: event => clickHandler(event, props, href),
  };

  return createElement("a", attrs);
}
