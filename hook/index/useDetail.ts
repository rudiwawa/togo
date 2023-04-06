import { gql, useQuery } from "@apollo/client";
import { useCallback, useState } from "react";

const GET_CONTACT_DETAIL = gql`
  query GetContactDetail($id: Int!) {
    contact_by_pk(id: $id) {
      last_name
      id
      first_name
      created_at
      phones {
        number
      }
    }
  }
`;
export interface GetContactDetailResponse {
  data: ContactDetail;
}

export interface ContactDetail {
  contact_by_pk: ContactByPk;
}

export interface ContactByPk {
  last_name: string;
  id: number;
  first_name: string;
  created_at: Date;
  phones: Phone[];
}

export interface Phone {
  number: string;
}

export const useDetailContact = (id: number) => {
  const { loading, error, data, fetchMore } =
    useQuery<ContactDetail>(GET_CONTACT_DETAIL, {
      variables: {
        id: id,
      },
    });

  return {
    loading,
    error,
    data,
  };
};
