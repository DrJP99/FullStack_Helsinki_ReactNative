import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		paddingBottom: 15,
		backgroundColor: theme.colors.dark,
		paddingHorizontal: 10,
	},
	title: {
		color: theme.colors.white,
	},
});

const AppBar = () => {
	return (
		<View style={styles.container}>
			<Pressable>
				<Text
					fontSize={'header'}
					fontWeight={'bold'}
					style={styles.title}
				>
					Repositories
				</Text>
			</Pressable>
		</View>
	);
};

export default AppBar;
