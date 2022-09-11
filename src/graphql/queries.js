/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSavedPreferences = /* GraphQL */ `
  query GetSavedPreferences($id: ID!) {
    getSavedPreferences(id: $id) {
      id
      isCelsius
      savedLocations
      createdAt
      updatedAt
    }
  }
`;
export const listSavedPreferences = /* GraphQL */ `
  query ListSavedPreferences(
    $filter: ModelSavedPreferencesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSavedPreferences(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        isCelsius
        savedLocations
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
