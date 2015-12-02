import path from 'path';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const LESS_LOADERS = ['css', 'postcss', 'less'];

const AUTOPREFIXER_BROWSERS = [
	'Android >= 4',
	'Chrome >= 20',
	'Firefox >= 24',
	'Explorer >= 9',
	'iOS >= 6',
	'Opera >= 12',
	'Safari >= 6'
];

const config = {
	entry: {
		app: ['./src/index']
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('style-loader', LESS_LOADERS.join('!'))
			}
		]
	},
	output: {
		filename: 'index.js',
		path: path.join(__dirname, './dist'),
		publicPath: '/dist'
	},
	plugins: [
		new ExtractTextPlugin('index.css')
	],
	postcss: [
		autoprefixer(AUTOPREFIXER_BROWSERS)
	],
	resolve: {
		extensions: ['', '.js', '.less'],
		modulesDirectories: ['src', 'node_modules']
	}
};

export default config;