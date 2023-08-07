import { FlatList, StyleSheet, View } from 'react-native';
import Text from './Text';
import useUser from '../hooks/useUser';
import ReviewItem from './ReviewItem';
import theme from '../theme';

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: theme.colors.gray,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
	const { user } = useUser(true);

	const reviewNodes = user ? user.reviews.edges.map((edge) => edge.node) : [];

	return (
		<FlatList
			data={reviewNodes}
			renderItem={({ item }) => <ReviewItem review={item} user />}
			keyExtractor={(item) => item.id}
			ItemSeparatorComponent={<ItemSeparator />}
		/>
	);
};

export default MyReviews;
