export default `
	SELECT {distinct} {columns} {count}
	FROM {table} {join}
	{where}
	{groupBy} {orderBy} {limit} {offset}
`;
