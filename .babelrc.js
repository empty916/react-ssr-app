module.exports = {
	presets: [
		[
			"next/babel",
			{
				"styled-jsx": {
					plugins: [
            "styled-jsx-plugin-sass",
            "styled-jsx-plugin-postcss"
          ],
				},
			},
		],
	],
	plugins: [
		["@babel/plugin-proposal-decorators", { legacy: true }],
		// [
		// 	"styled-jsx/babel",
		// 	{
		// 		optimizeForSpeed: true,
		// 	},
		// ],
	],
};
