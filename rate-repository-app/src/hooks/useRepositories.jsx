import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const useRepositories = () => {
	const [orderDirection, setOrderDirection] = useState('DESC');
	const [orderBy, setOrderBy] = useState('CREATED_AT');
	const [searchKeyword, setSearchKeyword] = useState('');
	const [value] = useDebounce(searchKeyword, 500);

	const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
		variables: {
			orderDirection,
			orderBy,
			searchKeyword: value,
		},
		fetchPolicy: 'cache-and-network',
		enabled: false,
	});

	let repositories = undefined;
	if (!loading && !error) {
		repositories = data.repositories;
	}

	return {
		repositories,
		loading,
		error,
		refetch,
		setOrderDirection,
		setOrderBy,
		setSearchKeyword,
	};
};

export default useRepositories;
