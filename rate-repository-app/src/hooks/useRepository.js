import { useQuery } from '@apollo/client';
import { GET_RESPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
	const variables = {
		first: 3,
		repositoryId: id,
	};

	const { data, error, loading, refetch, fetchMore } = useQuery(
		GET_RESPOSITORY,
		{
			fetchPolicy: 'cache-and-network',
			variables,
		}
	);

	const handleFetchMore = () => {
		const canFetchMore =
			!loading && data?.repository.reviews.pageInfo.hasNextPage;

		if (!canFetchMore) {
			return;
		}

		fetchMore({
			variables: {
				after: data.repository.reviews.pageInfo.endCursor,
				...variables,
			},
		});
	};

	let repository = undefined;

	if (!loading && !error) {
		repository = data.repository;
	}

	return { repository, loading, error, refetch, fetchMore: handleFetchMore };
};

export default useRepository;
