import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import useRepository from '../hooks/useRepository';
import theme from '../theme';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';
import { parseDate } from '../utils/parseDate';

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
	reviewContainer: {
		backgroundColor: theme.colors.white,
		padding: 20,
		paddingLeft: 0,
		display: 'flex',
		flexDirection: 'row',
	},
	ratingView: {
		width: 60,
		// justifyContent: 'center',
		alignItems: 'center',
	},
	ratingDesc: {
		// flexDirection: 'column',
		flexGrow: 1,
		alignSelf: 'flex-start',
		width: 'auto',
		flex: 2,
	},
	ratingText: {
		// flex: 1,
		marginBottom: 5,
	},
});

const ReviewItem = ({ review }) => {
	return (
		<View style={styles.reviewContainer}>
			<View style={styles.ratingView}>
				<Text
					style={[{ color: theme.colors.primary }]}
					fontWeight={'bold'}
					fontSize={'subheading'}
				>
					{review.rating}
				</Text>
			</View>
			<View style={styles.ratingDesc}>
				<Text
					fontSize={'subheading'}
					fontWeight={'bold'}
					style={styles.ratingText}
				>
					{review.user.username}
				</Text>
				<Text style={styles.ratingText} color={'textSecondary'}>
					{parseDate(review.createdAt)}
				</Text>
				<Text style={styles.ratingText}>{review.text}</Text>
			</View>
		</View>
	);
};

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
	const { repository, loading, error } = useRepository(id);

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
		/>
	);
};

export default RepositoryPage;
