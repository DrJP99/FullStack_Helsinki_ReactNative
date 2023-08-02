import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({});

const TextInput = ({ style, error, secureTextEntry = false, ...props }) => {
	const textInputStyle = [style];

	return (
		<NativeTextInput
			style={textInputStyle}
			secureTextEntry={secureTextEntry}
			autoCapitalize='none'
			{...props}
		/>
	);
};

export default TextInput;
