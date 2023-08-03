import { Image, Pressable, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { useNavigate } from 'react-router-native';

const RepositoryItem = ({ item, inList = true, children }) => {
	const styles = StyleSheet.create({
		container: {
			padding: 15,
			backgroundColor: theme.colors.white,
		},
		header: {
			display: 'flex',
			flexDirection: 'row',
			marginBottom: 15,
		},
		headerDescription: {
			paddingHorizontal: 15,
		},
		text: {
			marginBottom: 4,
		},
		languageBadge: {
			color: theme.colors.white,
			backgroundColor: theme.colors.primary,
			padding: 5,
			paddingHorizontal: 7,
			borderRadius: 5,
			alignSelf: 'flex-start',
		},
		avatarImg: {
			width: 50,
			height: 50,
			borderRadius: 5,
		},
		footer: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
		},
		footerItem: {
			marginHorizontal: 20,
			// display: 'flex',
			// flexDirection: 'column',
			textAlign: 'center',
			justifyContent: 'center',
			alignItems: 'center',
		},
	});

	const navigate = useNavigate();

	const parseNumbers = (num) => {
		let parsed = `${num}`;
		let modified;

		if (num > 1000) {
			modified = num / 1000;
			parsed = (Math.round(modified * 100) / 100).toFixed(1) + 'k';
		}

		return parsed;
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image src={item.ownerAvatarUrl} style={styles.avatarImg} />
				<View style={styles.headerDescription}>
					<Pressable
						onPress={() =>
							inList ? navigate(`/${item.id}`) : null
						}
					>
						<Text
							fontWeight={'bold'}
							fontSize={'subheading'}
							style={styles.text}
						>
							{item.fullName}
						</Text>
					</Pressable>
					<Text color={'textSecondary'} style={styles.text}>
						{item.description}
					</Text>
					<Text style={styles.languageBadge}>{item.language}</Text>
				</View>
			</View>
			<View style={styles.footer}>
				<View style={styles.footerItem}>
					<Text fontWeight={'bold'}>
						{parseNumbers(item.stargazersCount)}
					</Text>
					<Text color={'textSecondary'}>Stars</Text>
				</View>
				<View style={styles.footerItem}>
					<Text fontWeight={'bold'}>
						{parseNumbers(item.forksCount)}
					</Text>
					<Text color={'textSecondary'}>Forks</Text>
				</View>
				<View style={styles.footerItem}>
					<Text fontWeight={'bold'}>
						{parseNumbers(item.reviewCount)}
					</Text>
					<Text color={'textSecondary'}>Reviews</Text>
				</View>
				<View style={styles.footerItem}>
					<Text fontWeight={'bold'}>
						{parseNumbers(item.ratingAverage)}
					</Text>
					<Text color={'textSecondary'}>Rating</Text>
				</View>
			</View>
			{children}
		</View>
	);
};

export default RepositoryItem;
