import { Pressable, StyleSheet, View } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import useReview from '../hooks/useReview';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
	container: {
		padding: 15,
		backgroundColor: theme.colors.white,
	},
	button: {
		backgroundColor: theme.colors.primary,
		padding: 15,
		borderRadius: 5,
	},
	buttonText: {
		textAlign: 'center',
		color: theme.colors.white,
	},
});

const initialValues = {
	ownerName: '',
	repositoryName: '',
	rating: 0,
	text: '',
};

const validationSchema = yup.object().shape({
	ownerName: yup.string().required('Repository owner is required'),
	repositoryName: yup.string().required('Repository name is required'),
	rating: yup
		.number()
		.required('Rating is required')
		.integer('Number must be integer')
		.min(0, 'Rating must be between 0 and 100')
		.max(100, 'Rating must be between 0 and 100'),
	text: yup.string(),
});

const RForm = ({ onSubmit }) => {
	return (
		<View style={styles.container}>
			<FormikTextInput
				name={'ownerName'}
				placeholder={'Repository owner name'}
			/>
			<FormikTextInput
				name={'repositoryName'}
				placeholder={'Repository name'}
			/>
			<FormikTextInput
				name={'rating'}
				placeholder={'Rating between 0 and 100'}
			/>
			<FormikTextInput name={'text'} placeholder={'Review'} multiline />
			<Pressable onPress={onSubmit} style={styles.button}>
				<Text style={styles.buttonText}>Create a review</Text>
			</Pressable>
		</View>
	);
};

const ReviewForm = () => {
	const [createReview] = useReview();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { ownerName, repositoryName, rating, text } = values;
		console.log(values);

		try {
			const res = await createReview({
				ownerName,
				repositoryName,
				rating: Number(rating),
				text,
			});
			console.log('success', res);
			const id = res.data.createReview.repositoryId;
			navigate(`/${id}`);
		} catch (e) {
			console.log('error');
			console.log(e);
		}
	};
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => <RForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

export default ReviewForm;
