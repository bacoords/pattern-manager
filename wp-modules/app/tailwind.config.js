module.exports = {
	content: [ './js/src/**/*.{html,js,ts,jsx,tsx}', '../components/**/*.{html,js,ts,jsx,tsx}' ],
	theme: {
		extend: {
			colors: {
				'wp-black': '#1e1e1e',
				'wp-blue': '#0074ad',
				'wp-blue-hover': '#006ba1',
				'wp-gray': '#5d7179',
				'fses-gray': '#f1f1f1',
			},
		},
	},
	plugins: [ require( '@tailwindcss/forms' ) ],
};
