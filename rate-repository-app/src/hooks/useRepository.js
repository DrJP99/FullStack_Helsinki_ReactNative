import { useQuery } from '@apollo/client';
import { GET_RESPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
	const { data, error, loading, refetch } = useQuery(GET_RESPOSITORY, {
		fetchPolicy: 'cache-and-network',
		variables: { repositoryId: id },
	});

	let repository = undefined;

	if (!loading && !error) {
		repository = data.repository;
	}

	return { repository, loading, error, refetch };
};

export default useRepository;
