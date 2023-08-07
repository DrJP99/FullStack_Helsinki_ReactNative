import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
	query Query(
		$first: Int
		$after: String
		$orderDirection: OrderDirection
		$orderBy: AllRepositoriesOrderBy
		$searchKeyword: String
	) {
		repositories(
			first: $first
			after: $after
			orderDirection: $orderDirection
			orderBy: $orderBy
			searchKeyword: $searchKeyword
		) {
			edges {
				node {
					id
					ownerAvatarUrl
					fullName
					description
					language
					stargazersCount
					forksCount
					reviewCount
					ratingAverage
				}
				cursor
			}
			pageInfo {
				endCursor
				startCursor
				hasNextPage
			}
		}
	}
`;

export const GET_RESPOSITORY = gql`
	query ($first: Int, $after: String, $repositoryId: ID!) {
		repository(id: $repositoryId) {
			ownerAvatarUrl
			fullName
			description
			language
			stargazersCount
			forksCount
			reviewCount
			ratingAverage
			url
			reviews(first: $first, after: $after) {
				totalCount
				edges {
					node {
						id
						text
						rating
						createdAt
						repositoryId
						user {
							id
							username
						}
					}
					cursor
				}
				pageInfo {
					endCursor
					startCursor
					hasNextPage
				}
			}
		}
	}
`;

export const ME = gql`
	query getCurrentUser($includeReviews: Boolean = false) {
		me {
			username
			reviews @include(if: $includeReviews) {
				edges {
					node {
						id
						rating
						text
						createdAt
						repository {
							id
							fullName
						}
					}
				}
			}
		}
	}
`;
