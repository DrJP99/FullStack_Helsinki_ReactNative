import { Alert, Pressable, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { parseDate } from '../utils/parseDate';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
	reviewContainer: {
		backgroundColor: theme.colors.white,
		padding: 20,
		paddingLeft: 0,
	},
	rowContainer: {
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
	buttonView: {
		marginLeft: 20,
		marginTop: 10,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	button: {
		padding: 10,
		alignContent: 'center',
		backgroundColor: theme.colors.primary,
		marginHorizontal: 5,
		borderRadius: 5,
		flex: 1,
	},
	buttonDelete: {
		backgroundColor: theme.colors.error,
	},
	buttonText: {
		textAlign: 'center',
	},
});

const ReviewItem = ({ review, user = false }) => {
	const navigate = useNavigate();
	const [deleteReview] = useDeleteReview();

	const handleDelete = () => {
		try {
			deleteReview(review.id);
			console.log('review deleted');
		} catch (e) {
			console.log('error');
			console.log(e);
		}
	};

	const pressDelete = () => {
		Alert.alert(
			'Delete review',
			'Arey ou sure you want to delete this review?',
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Delete',
					onPress: () => handleDelete(),
				},
			],
			{
				cancelable: true,
			}
		);
	};

	return (
		<View style={styles.reviewContainer}>
			<View style={styles.rowContainer}>
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
						{user
							? review.repository.fullName
							: review.user.username}
					</Text>
					<Text style={styles.ratingText} color={'textSecondary'}>
						{parseDate(review.createdAt)}
					</Text>
					<Text style={styles.ratingText}>{review.text}</Text>
				</View>
			</View>
			{user ? (
				<View style={styles.buttonView}>
					<Pressable
						style={styles.button}
						onPress={() =>
							navigate(`/reviews/${review.repository.id}`)
						}
					>
						<Text style={styles.buttonText} fontWeight={'bold'}>
							View repository
						</Text>
					</Pressable>
					<Pressable
						style={[styles.button, styles.buttonDelete]}
						onPress={() => pressDelete()}
					>
						<Text style={styles.buttonText} fontWeight={'bold'}>
							Delete review
						</Text>
					</Pressable>
				</View>
			) : null}
		</View>
	);
};

export default ReviewItem;
