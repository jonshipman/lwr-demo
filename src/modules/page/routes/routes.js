import { RegisterRoute } from 'router/register';

RegisterRoute(
	{
		id: 'about',
		uri: '/about',
		page: { type: 'about' },
		module: () => import('page/about'),
	},
	{
		id: 'home',
		uri: '/',
		page: { type: 'home' },
		module: () => import('page/home'),
	}
);
