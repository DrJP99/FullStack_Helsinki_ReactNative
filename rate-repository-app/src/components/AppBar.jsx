import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

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
		marginHorizontal: 15,
		fontSize: theme.fontSizes.header,
		fontWeight: theme.fontWeights.bold,
	},
});

const AppBar = () => {
	const { data } = useQuery(ME);
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();

	let username;
	if (data && data.me) {
		username = data.me.username;
	} else {
		username = null;
	}

	return (
		<View style={styles.container}>
			<ScrollView horizontal>
				<Link to='/'>
					<Text style={styles.title}>Repositories</Text>
				</Link>
				{username ? (
					<Pressable
						onPress={async () => {
							await authStorage.removeAccessToken();
							apolloClient.resetStore();
						}}
					>
						<Text style={styles.title}>Sign-Out</Text>
					</Pressable>
				) : (
					<Link to={'/singin'}>
						<Text style={styles.title}>Sign-In</Text>
					</Link>
				)}
				{/* <Text style={styles.title}>Hello</Text>
				<Text style={styles.title}>Hello</Text>
				<Text style={styles.title}>Hello</Text> */}
			</ScrollView>
		</View>
	);
};

export default AppBar;
