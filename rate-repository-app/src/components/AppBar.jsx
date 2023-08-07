import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { Link, useNavigate } from 'react-router-native';
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
		// height: 80,
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
	const navigate = useNavigate();

	let username;
	if (data && data.me) {
		username = data.me.username;
	} else {
		username = null;
	}

	return (
		<View style={styles.container}>
			<ScrollView horizontal>
				<Text></Text>
				<Link to='/'>
					<Text style={styles.title}>Repositories</Text>
				</Link>
				{username ? (
					<>
						<Link to='/review'>
							<Text style={styles.title}>Create a review</Text>
						</Link>
						<Link to='/myreviews'>
							<Text style={styles.title}>My reviews</Text>
						</Link>
						<Pressable
							onPress={async () => {
								await authStorage.removeAccessToken();
								apolloClient.resetStore();
								navigate('/');
							}}
						>
							<Text style={styles.title}>Sign-Out</Text>
						</Pressable>
					</>
				) : (
					<>
						<Link to={'/singin'}>
							<Text style={styles.title}>Sign-In</Text>
						</Link>
						<Link to={'/signup'}>
							<Text style={styles.title}>Sign-Up</Text>
						</Link>
					</>
				)}
				{/* <Text style={styles.title}>Hello</Text>
				<Text style={styles.title}>Hello</Text>
				<Text style={styles.title}>Hello</Text> */}
			</ScrollView>
		</View>
	);
};

export default AppBar;
