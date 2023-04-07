import { gql, ApolloClient } from "@apollo/client";

const ADD_PHONE_NUMBER = gql`
  mutation AddNumberToContact($contact_id: Int!, $phone_number: String!) {
    insert_phone(objects: { contact_id: $contact_id, number: $phone_number }) {
      returning {
        contact {
          id
          last_name
          first_name
          phones {
            number
          }
        }
      }
    }
  }
`;

export const addPhoneNumber = async (
  client: ApolloClient<any>,
  contact_id: number,
  phone_number: string
) => {
  try {
    const result = await client.mutate({
      mutation: ADD_PHONE_NUMBER,
      variables: {
        contact_id,
        phone_number,
      },
    });
    return result.data;
  } catch (error) {
    return error;
  }
};
