import { gql, useQuery } from "@apollo/client";
import { useCallback, useState } from "react";

const GET_CONTACTS = gql`
  query GetContactList(
    $distinct_on: [contact_select_column!]
    $limit: Int
    $offset: Int
    $order_by: [contact_order_by!]
    $where: contact_bool_exp
  ) {
    contact(
      distinct_on: $distinct_on
      limit: $limit
      offset: $offset
      order_by: $order_by
      where: $where
    ) {
      created_at
      first_name
      id
      last_name
      phones {
        number
      }
    }
    contact_aggregate {
      aggregate {
        count
      }
    }
  }
`;

interface Contact {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  phones: {
    number: string;
  }[];
}

export interface GetContactListResponse {
  contact: Contact[];
  contact_aggregate: {
    aggregate: {
      count: number;
    };
  };
}

export const useListContact = () => {
  const [search, setSearch] = useState("");

  const { loading, error, data, fetchMore } = useQuery<GetContactListResponse>(
    GET_CONTACTS,
    {
      variables: {
        limit: 2,
        offset: 0,
        order_by: { created_at: "desc" },
        where: {
          _or: [
            {
              first_name: {
                _ilike: `%${search}%`,
              },

              // last_name: {
              //   _ilike: `%${search}%`,
              // },

              // phones: {
              //   number: {
              //     _ilike: `%${search}%`,
              //   },
              // },
            },
          ],
        },
      },
    }
  );

  const totalContacts = data?.contact_aggregate.aggregate.count || 0;

  const loadMore = useCallback(() => {
    if (loading) {
      return;
    }

    fetchMore({
      variables: {
        offset: data?.contact.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log(
          "🚀 ~ file: index.tsx:90 ~ loadMore ~ fetchMoreResult:",
          fetchMoreResult
        );
        if (!fetchMoreResult) return prev;
        return {
          ...fetchMoreResult,
          contact: [...(prev?.contact || []), ...fetchMoreResult.contact],
        };
      },
    });
  }, [loading, data, fetchMore]);

  return {
    loading,
    error,
    data,
    loadMore,
    totalContacts,
    search,
    setSearch,
  };
};
