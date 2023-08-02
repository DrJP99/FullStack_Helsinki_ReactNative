import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';

const useSignIn = () => {
	const [mutate, result] = useMutation(AUTHENTICATE);
	// let token = undefined;
	// let expiresAt = undefined;

	const signIn = async ({ username, password }) => {
		return await mutate({
			variables: { credentials: { username, password } },
		});
	};

	return [signIn, result];
};

export default useSignIn;
