import { Platform } from 'react-native';

const theme = {
	colors: {
		textPrimary: '#24292e',
		textSecondary: '#586069',
		primary: '#0366d6',
		error: '#DC4C64',
		white: '#FFFFF8',
		gray: '#e1e5dd',
		dark: '#33332d',
		darker: '#202018',
	},
	fontSizes: {
		body: 14,
		subheading: 16,
		header: 23,
	},
	fonts: {
		main: Platform.select({
			android: 'Roboto',
			ios: 'Arial',
			default: 'Stystem',
		}),
	},
	fontWeights: {
		normal: '400',
		bold: '700',
	},
};

export default theme;
