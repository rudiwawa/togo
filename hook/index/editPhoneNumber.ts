import { gql, ApolloClient } from "@apollo/client";

const EDIT_PHONE_NUMBER = gql`
  mutation EditPhoneNumber(
    $pk_columns: phone_pk_columns_input!
    $new_phone_number: String!
  ) {
    update_phone_by_pk(
      pk_columns: $pk_columns
      _set: { number: $new_phone_number }
    ) {
      contact {
        id
        last_name
        first_name
        created_at
        phones {
          number
        }
      }
    }
  }
`;



export const editPhoneNumber = async (
  client: ApolloClient<any>,
  pk_columns: {
		number: string;
		contact_id: number;
	},
  new_phone_number: string
) => {
  try {
    const result = await client.mutate({
      mutation: EDIT_PHONE_NUMBER,
      variables: {
        pk_columns,
        new_phone_number,
      },
    });
    return result.data;
  } catch (error) {
    return error;
  }
};
