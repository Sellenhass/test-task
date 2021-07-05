import { gql } from "@apollo/client";

export const categoryQuery = gql`
  query ($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency
          amount
        }
      }
    }
  }
`;

export const currencyQuery = gql`
  {
    currencies
  }
`;
