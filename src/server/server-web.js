import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export const app = express();

const PORT = parseInt(process.env.PORT || '3000', 10);
const LWR_PORT = parseInt(process.env.LWR_PORT || '3001', 10);

app.use(
	'/*',
	createProxyMiddleware({
		target: `http://127.0.0.1:${LWR_PORT}`,
		changeOrigin: true,
	})
);

app.listen(PORT, () => {
	console.log(`Express started on http://localhost:${PORT}`);
});
