export const noHandle = ({ command }) => `
  No bundle handle was supplied, try running:

  nore ${command} <bundle.handle>
`;

export const noBundleFound = ({ handle }) => `
  No bundle was found using "${handle}" handle,
`;
