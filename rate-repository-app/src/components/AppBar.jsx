import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		paddingBottom: 15,
		backgroundColor: theme.colors.dark,
		paddingHorizontal: 10,
		display: 'flex',
		flexDirection: 'row',
	},
	title: {
		color: theme.colors.white,
		marginHorizontal: 10,
	},
});

const AppBar = () => {
	return (
		<View style={styles.container}>
			<Link to='/'>
				<Text
					fontSize={'header'}
					fontWeight={'bold'}
					style={styles.title}
				>
					Repositories
				</Text>
			</Link>
			<Link to={'/singin'}>
				<Text
					fontSize={'header'}
					fontWeight={'bold'}
					style={styles.title}
				>
					Sign-In
				</Text>
			</Link>
		</View>
	);
};

export default AppBar;
