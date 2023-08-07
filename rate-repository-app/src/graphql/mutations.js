import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
	mutation ($credentials: AuthenticateInput) {
		authenticate(credentials: $credentials) {
			accessToken
			expiresAt
		}
	}
`;

export const CREATE_REVIEW = gql`
	mutation CreateReview($review: CreateReviewInput) {
		createReview(review: $review) {
			repositoryId
		}
	}
`;

// {
//   "review": {
//     "ownerName": '',
//     "rating": '',
//     "repositoryName": num,
//     "text": ''
//   }
// }

export const CREATE_USER = gql`
	mutation CreateUser($user: CreateUserInput) {
		createUser(user: $user) {
			username
		}
	}
`;

export const DELETE_REVIEW = gql`
	mutation DeleteReview($deleteReviewId: ID!) {
		deleteReview(id: $deleteReviewId)
	}
`;
