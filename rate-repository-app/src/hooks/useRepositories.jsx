import { useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
	// const [repositories, setRespositories] = useState();
	// const [loading, setLoading] = useState(false);

	const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
	});
	let repositories = undefined;
	if (!loading && !error) {
		repositories = data.repositories;
	}

	// useEffect(() => {
	// 	if (!loading && !error) {
	// 		setRespositories(data);
	// 	} else {
	// 		setRespositories(undefined);
	// 	}
	// }, [loading]);

	// const fetchRepositories = async () => {
	// 	setLoading(true);

	// 	const res = await fetch('http://192.168.10.133:5000/api/repositories');
	// 	const json = await res.json();

	// 	setLoading(false);
	// 	setRespositories(json);
	// };

	// useEffect(() => {
	// 	fetchRepositories();
	// }, []);

	return { repositories, loading, error, refetch };
};

export default useRepositories;
