import { gql, ApolloClient } from "@apollo/client";

const EDIT_CONTACT = gql`
  mutation EditContactById($id: Int!, $_set: contact_set_input!) {
    update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

export const editContactById = async (client: ApolloClient<any>, id: number, updatedContact: any) => {
  try {
    const result = await client.mutate({
      mutation: EDIT_CONTACT,
      variables: {
        id,
        _set: updatedContact,
      },
    });
    return result.data;
  } catch (error) {
    return error;
  }
};
