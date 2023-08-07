import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const useRepositories = () => {
	const [orderDirection, setOrderDirection] = useState('DESC');
	const [orderBy, setOrderBy] = useState('CREATED_AT');
	const [searchKeyword, setSearchKeyword] = useState('');
	const [value] = useDebounce(searchKeyword, 500);

	const variables = {
		first: 8,
		orderDirection,
		orderBy,
		searchKeyword: value,
	};

	const { data, error, loading, refetch, fetchMore, ...result } = useQuery(
		GET_REPOSITORIES,
		{
			variables,
			fetchPolicy: 'cache-and-network',
			enabled: false,
		}
	);

	const handleFetchMore = () => {
		const canFetchMore =
			!loading && data?.repositories.pageInfo.hasNextPage;

		if (!canFetchMore) {
			return;
		}

		fetchMore({
			variables: {
				after: data.repositories.pageInfo.endCursor,
				...variables,
			},
		});
	};

	let repositories = undefined;
	if (!loading && !error) {
		repositories = data.repositories;
	}

	return {
		repositories,
		fetchMore: handleFetchMore,
		loading,
		error,
		refetch,
		setOrderDirection,
		setOrderBy,
		setSearchKeyword,
	};
};

export default useRepositories;
