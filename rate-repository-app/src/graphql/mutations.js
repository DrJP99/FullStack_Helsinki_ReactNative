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
