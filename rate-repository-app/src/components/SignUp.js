import * as yup from 'yup';
import theme from '../theme';
import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import Text from './Text';
import useSignUp from '../hooks/useSignUp';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';

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
	username: '',
	password: '',
	passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.required('Username is required')
		.min(5, 'Username must be between 5 and 30 characters')
		.max(30, 'Username must be between 5 and 30 characters'),
	password: yup
		.string()
		.required('Password is required')
		.min(5, 'Password must be between 5 and 50 characters long')
		.max(50, 'Password must be between 5 and 50 characters long'),
	passwordConfirmation: yup
		.string()
		.required('Password Confirmation is required and must match Password')
		.oneOf(
			[yup.ref('password'), null],
			'Password Confirmation is required and must match Password'
		),
});

const SignUpForm = ({ onSubmit }) => {
	return (
		<View style={styles.container}>
			<FormikTextInput name={'username'} placeholder={'Username'} />
			<FormikTextInput
				name={'password'}
				placeholder='Password'
				secureTextEntry
			/>
			<FormikTextInput
				name={'passwordConfirmation'}
				placeholder='Confirm Password'
				secureTextEntry
			/>
			<Pressable style={styles.button} onPress={onSubmit}>
				<Text style={styles.buttonText}>Sign Up</Text>
			</Pressable>
		</View>
	);
};

const SignUp = () => {
	const [signUp] = useSignUp();
	const [signIn] = useSignIn();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { username, password } = values;
		console.log(values);

		try {
			await signUp({ username, password });
			console.log('user created succesfully');
			await signIn({ username, password });
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
			{({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

export default SignUp;
