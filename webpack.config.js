const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PrettierPlugin = require("prettier-webpack-plugin")

module.exports = {
  mode: 'none',
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
	devtool: 'source-map',
  experiments: {
    topLevelAwait: true
  },
  plugins: [
	  new MiniCssExtractPlugin({
		  filename: "style.css",
	  }),
		new PrettierPlugin({
			printWidth: 80,               // Specify the length of line that the printer will wrap on.
			tabWidth: 2,                  // Specify the number of spaces per indentation-level.
			useTabs: false,               // Indent lines with tabs instead of spaces.
			semi: true,                   // Print semicolons at the ends of statements.
			encoding: 'utf-8',            // Which encoding scheme to use on files
			extensions: [ ".js" ]  // Which file extensions to process
		})
	],
  resolve: {
    extensions: ['.js']
	},
	module: {
			rules: [{
				test: /\.(js)$/i,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: ['@babel/plugin-syntax-top-level-await']
					}
				}
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.scss$/i,
				sideEffects: true,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader', 
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							sassOptions: {
								outputStyle: "compressed",
							},
						},
					},
				],
			}
	]},
};