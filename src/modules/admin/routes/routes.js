import { RegisterRoute } from 'router/register';

RegisterRoute({
	id: 'admin-dashboard',
	uri: '/admin/dashboard',
	page: { type: 'admin/dashboard' },
	module: () => import('admin/page'),
});
