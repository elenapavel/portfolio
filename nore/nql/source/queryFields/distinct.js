export default (data, query, build) => {
	return data === true ? "DISTINCT" : null;
};
