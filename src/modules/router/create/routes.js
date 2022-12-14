import RouterHandler from 'router/handler';

const routes = [
	{
		handler: () => RouterHandler(),
		id: 'quinary',
		page: {
			attributes: {
				primary: ':primary',
				quaternary: ':quaternary',
				quinary: ':quinary',
				secondary: ':secondary',
				tertiary: ':tertiary',
			},
			type: 'quinary',
		},
		uri: '/:primary/:secondary/:tertiary/:quaternary/:quinary',
	},
	{
		handler: () => RouterHandler(),
		id: 'quaternary',
		page: {
			attributes: {
				primary: ':primary',
				quaternary: ':quaternary',
				secondary: ':secondary',
				tertiary: ':tertiary',
			},
			type: 'quaternary',
		},
		uri: '/:primary/:secondary/:tertiary/:quaternary',
	},
	{
		handler: () => RouterHandler(),
		id: 'tertiary',
		page: {
			attributes: {
				primary: ':primary',
				secondary: ':secondary',
				tertiary: ':tertiary',
			},
			type: 'tertiary',
		},
		uri: '/:primary/:secondary/:tertiary',
	},
	{
		handler: () => RouterHandler(),
		id: 'secondary',
		page: {
			attributes: {
				primary: ':primary',
				secondary: ':secondary',
			},
			type: 'secondary',
		},
		uri: '/:primary/:secondary',
	},
	{
		handler: () => RouterHandler(),
		id: 'primary',
		page: {
			attributes: {
				primary: ':primary',
			},
			type: 'primary',
		},
		uri: '/:primary',
	},
	{
		handler: () => RouterHandler(),
		id: 'home',
		page: { type: 'home' },
		uri: '/',
	},
];

export default routes;
