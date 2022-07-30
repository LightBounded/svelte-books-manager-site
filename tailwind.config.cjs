module.exports = {
	content: ['./src/**/*.svelte'],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '1em',
			},
		},
	},
	plugins: [require('daisyui')],
}
