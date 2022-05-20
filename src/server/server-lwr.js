import createServer from './lwr.cjs';

const LWR_PORT = parseInt(process.env.LWR_PORT || '3001', 10);

const lwrServer = createServer({
	serverMode: 'development' === process.env.NODE_ENV ? 'dev' : 'prod-compat',
	port: LWR_PORT,
});

lwrServer.listen(({ port }) => {
	console.log(
		`⚡Lightning Web Runtime⚡ listening on http://localhost:${port}`
	);
});
