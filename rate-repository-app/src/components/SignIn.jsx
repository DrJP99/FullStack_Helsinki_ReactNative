import { Pressable, StyleSheet, View } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router';

const initialValues = {
	username: '',
	password: '',
};

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

const validationSchema = yup.object().shape({
	username: yup.string().required('Username is required'),
	password: yup.string().required('Password is requred'),
});

const SignInForm = ({ onSubmit }) => {
	return (
		<View style={styles.container}>
			{/* <Text>The Sign in view</Text> */}
			<FormikTextInput name={'username'} placeholder={'username'} />
			<FormikTextInput
				name={'password'}
				placeholder={'password'}
				secureTextEntry
			/>
			<Pressable onPress={onSubmit} style={styles.button}>
				<Text style={styles.buttonText}>Sign-In</Text>
			</Pressable>
		</View>
	);
};

const SignIn = () => {
	const [signIn] = useSignIn();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { username, password } = values;
		console.log(values);

		try {
			await signIn({ username, password });
			console.log('success!');
			navigate('/');
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
			{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

export default SignIn;
