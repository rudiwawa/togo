import { gql, ApolloClient } from "@apollo/client";

const EDIT_CONTACT = gql`
  mutation AddContactWithPhones(
    $first_name: String!
    $last_name: String!
    $phones: [phone_insert_input!]!
  ) {
    insert_contact(
      objects: {
        first_name: $first_name
        last_name: $last_name
        phones: { data: $phones }
      }
    ) {
      returning {
        first_name
        last_name
        id
        phones {
          number
        }
      }
    }
  }
`;

export const addContactWithPhones = async (
  client: ApolloClient<any>,
  contact: {
    first_name: string;
    last_name: string;
    phones: { number: string }[];
  }
) => {
  try {
    const result = await client.mutate({
      mutation: EDIT_CONTACT,
      variables: {
        first_name: contact.first_name,
        last_name: contact.last_name,
        phones: contact.phones,
      },
    });
    return result.data;
  } catch (error) {
    return error;
  }
}