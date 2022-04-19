import RouterHandler from 'app/routerHandler';

const routes = [
	{
		id: 'home',
		uri: '/',
		handler: () => RouterHandler('page/home'),
		page: { type: 'home' },
	},
	{
		id: 'about',
		uri: '/about',
		handler: () => RouterHandler('page/about'),
		page: { type: 'about' },
	},
];

export default routes;
