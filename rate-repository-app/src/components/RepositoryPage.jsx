import { Pressable, StyleSheet, View } from 'react-native';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import useRepository from '../hooks/useRepository';
import theme from '../theme';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';

const RepositoryPage = () => {
	const params = useParams();

	const id = params.id;
	const { repository, loading, error } = useRepository(id);

	const styles = StyleSheet.create({
		container: {},
		button: {
			backgroundColor: theme.colors.primary,
			padding: 15,
			paddingHorizontal: 7,
			borderRadius: 5,
			// alignSelf: 'flex-end',
			marginTop: 30,
			marginHorizontal: 15,
			alignItems: 'center',
		},
		buttonText: {
			color: theme.colors.white,
		},
	});

	if (loading) {
		return <Text>Loading data...</Text>;
	}
	if (error) {
		return <Text style={{ color: theme.colors.error }}></Text>;
	}

	return (
		<View style={styles.container}>
			<RepositoryItem item={repository} inList={false}>
				<Pressable
					style={styles.button}
					onPress={() => Linking.openURL(repository.url)}
				>
					<Text
						style={styles.buttonText}
						fontSize={'subheading'}
						fontWeight={'bold'}
					>
						See on GitHub!
					</Text>
				</Pressable>
			</RepositoryItem>
		</View>
	);
};

export default RepositoryPage;
