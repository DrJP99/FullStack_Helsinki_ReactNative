import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
	textInput: {
		borderWidth: 1,
		borderRadius: 5,
		marginBottom: 10,
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderColor: theme.colors.gray,
	},
});

const TextInput = ({ style, error, secureTextEntry = false, ...props }) => {
	const textInputStyle = [style];

	return (
		<NativeTextInput
			style={[styles.textInput, textInputStyle]}
			secureTextEntry={secureTextEntry}
			autoCapitalize='none'
			{...props}
		/>
	);
};

export default TextInput;
