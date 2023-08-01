import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		paddingBottom: 15,
		backgroundColor: theme.colors.bgPrimary,
		paddingHorizontal: 10,
	},
	// ...
});

const AppBar = () => {
	return (
		<View style={styles.container}>
			<Pressable>
				<Text fontSize={'header'} fontWeight={'bold'}>
					Repositories
				</Text>
			</Pressable>
		</View>
	);
};

export default AppBar;
