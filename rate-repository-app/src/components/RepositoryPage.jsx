import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import useRepository from '../hooks/useRepository';
import theme from '../theme';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';
import { parseDate } from '../utils/parseDate';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: theme.colors.gray,
	},
	repo: {
		marginBottom: 10,
	},
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

const SingleRepository = ({ repository }) => {
	return (
		<RepositoryItem item={repository} inList={false} style={styles.repo}>
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
	);
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryPage = () => {
	const params = useParams();

	const id = params.id;
	const { repository, loading, error, fetchMore } = useRepository(id);

	const onEndReach = () => {
		fetchMore();
	};

	if (loading) {
		return <Text>Loading data...</Text>;
	}
	if (error) {
		return <Text style={{ color: theme.colors.error }}></Text>;
	}

	const reviewNodes = repository
		? repository.reviews.edges.map((edge) => edge.node)
		: [];

	return (
		<FlatList
			data={reviewNodes}
			renderItem={({ item }) => <ReviewItem review={item} />}
			keyExtractor={({ id }) => id}
			ListHeaderComponent={() => (
				<SingleRepository repository={repository} />
			)}
			ListHeaderComponentStyle={{ marginBottom: 15 }}
			ItemSeparatorComponent={() => <ItemSeparator />}
			onEndReached={() => onEndReach()}
			onEndReachedThreshold={0.5}
		/>
	);
};

export default RepositoryPage;
