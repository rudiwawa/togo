import { ApolloClient, gql } from "@apollo/client";

const DELETE_PHONE_NUMBER = gql`
  mutation MyMutation($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }
`;
export const deletePhoneNumber = async (
  client: ApolloClient<any>,
  id: number
) => {
  try {
    const result = await client.mutate({
      mutation: DELETE_PHONE_NUMBER,
      variables: {
        id,
      },
    });
    return result.data;
  } catch (error) {
    return error;
  }
};
