import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useEffect, useState } from 'react';

const useRepositories = () => {
	const [orderDirection, setOrderDirection] = useState('DESC');
	const [orderBy, setOrderBy] = useState('CREATED_AT');

	const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
		variables: {
			orderDirection,
			orderBy,
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
	};
};

export default useRepositories;
