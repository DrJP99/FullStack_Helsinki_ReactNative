import { StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { parseDate } from '../utils/parseDate';

const styles = StyleSheet.create({
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

const ReviewItem = ({ review, user = false }) => {
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
					{user ? review.repository.fullName : review.user.username}
				</Text>
				<Text style={styles.ratingText} color={'textSecondary'}>
					{parseDate(review.createdAt)}
				</Text>
				<Text style={styles.ratingText}>{review.text}</Text>
			</View>
		</View>
	);
};

export default ReviewItem;
