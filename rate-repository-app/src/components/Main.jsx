import Constants from 'expo-constants';
import { View, StyleSheet, StatusBar } from 'react-native';
import Text from './Text';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';

const styles = StyleSheet.create({
	container: {
		// marginTop: Constants.statusBarHeight,
		flexGrow: 1,
		flexShrink: 1,
		backgroundColor: theme.colors.gray,
	},
});

const Main = () => {
	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={theme.colors.darker} />
			<AppBar />
			{/* <Text>Rate Repository Application</Text>
			<Text style={{ paddingBottom: 10 }}>Text with custom style</Text>
			<Text fontWeight={'bold'} fontSize={'subheading'}>
				Bold subheading
			</Text> */}
			{/* <Text color={'textSecondary'}>Text with secondary</Text> */}
			<RepositoryList />
		</View>
	);
};

export default Main;
