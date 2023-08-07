import { useApolloClient, useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
	const apolloClient = useApolloClient();
	const [mutate, result] = useMutation(CREATE_USER);

	const signUp = async ({ username, password }) => {
		const res = await mutate({
			variables: { user: { username, password } },
		});
		apolloClient.resetStore();
		return res;
	};

	return [signUp, result];
};

export default useSignUp;
