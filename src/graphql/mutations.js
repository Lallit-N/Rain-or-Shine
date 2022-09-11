/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSavedPreferences = /* GraphQL */ `
  mutation CreateSavedPreferences(
    $input: CreateSavedPreferencesInput!
    $condition: ModelSavedPreferencesConditionInput
  ) {
    createSavedPreferences(input: $input, condition: $condition) {
      id
      isCelsius
      savedLocations
      createdAt
      updatedAt
    }
  }
`;
export const updateSavedPreferences = /* GraphQL */ `
  mutation UpdateSavedPreferences(
    $input: UpdateSavedPreferencesInput!
    $condition: ModelSavedPreferencesConditionInput
  ) {
    updateSavedPreferences(input: $input, condition: $condition) {
      id
      isCelsius
      savedLocations
      createdAt
      updatedAt
    }
  }
`;
export const deleteSavedPreferences = /* GraphQL */ `
  mutation DeleteSavedPreferences(
    $input: DeleteSavedPreferencesInput!
    $condition: ModelSavedPreferencesConditionInput
  ) {
    deleteSavedPreferences(input: $input, condition: $condition) {
      id
      isCelsius
      savedLocations
      createdAt
      updatedAt
    }
  }
`;
