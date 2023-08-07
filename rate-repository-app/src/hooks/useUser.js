import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useUser = (includeReviews = false) => {
	const { data, error, loading, refetch } = useQuery(ME, {
		fetchPolicy: 'cache-and-network',
		variables: { includeReviews },
	});

	let user = undefined;

	if (!loading && !error) {
		user = data.me;
	}

	return { user, loading, error, refetch };
};

export default useUser;
