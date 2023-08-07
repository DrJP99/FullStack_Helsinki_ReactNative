import { useApolloClient, useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
	const [mutate, result] = useMutation(DELETE_REVIEW);
	const apolloClient = useApolloClient();

	const deleteReview = async (deleteReviewId) => {
		const res = await mutate({
			variables: { deleteReviewId },
		});
		apolloClient.resetStore();
		return res;
	};

	return [deleteReview, result];
};

export default useDeleteReview;
