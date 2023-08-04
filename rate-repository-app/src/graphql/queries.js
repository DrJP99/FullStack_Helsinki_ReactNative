import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
	query {
		repositories {
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
			}
		}
	}
`;

export const GET_RESPOSITORY = gql`
	query ($repositoryId: ID!) {
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
			reviews {
				edges {
					node {
						id
						rating
						text
						createdAt
						user {
							id
							username
						}
					}
				}
			}
		}
	}
`;

export const ME = gql`
	query {
		me {
			username
		}
	}
`;
