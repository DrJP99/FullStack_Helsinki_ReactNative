import { useField } from 'formik';
import { StyleSheet } from 'react-native';
import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
	errorText: {
		marginTop: 5,
		color: theme.colors.error,
		marginBottom: 5,
	},
	textInput: {
		borderWidth: 1,
		borderRadius: 5,
		marginBottom: 10,
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderColor: theme.colors.gray,
	},
	errorInput: {
		borderColor: theme.colors.error,
		marginBottom: 0,
	},
});

const FormikTextInput = ({ name, secureTextEntry = false, ...props }) => {
	const [field, meta, helpers] = useField(name);
	const showError = meta.touched && meta.error;

	return (
		<>
			<TextInput
				style={[styles.textInput, showError ? styles.errorInput : null]}
				onChangeText={(value) => helpers.setValue(value)}
				onBlur={() => helpers.setTouched(true)}
				value={field.value}
				error={showError}
				secureTextEntry={secureTextEntry}
				{...props}
			/>
			{showError && <Text style={styles.errorText}>{meta.error}</Text>}
		</>
	);
};

export default FormikTextInput;
