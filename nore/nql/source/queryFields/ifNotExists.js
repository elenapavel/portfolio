export default (data, query, build) => {
	return data === true ? "IF NOT EXISTS" : null;
};
