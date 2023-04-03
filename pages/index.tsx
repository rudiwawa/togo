import React, { useState, useCallback } from "react";
import { gql, useQuery } from "@apollo/client";
import useInfiniteScroll from "react-infinite-scroll-hook";
import ContactList from "@/components/domain/contact/ContactList";

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

interface GetContactListResponse {
  contact: Contact[];
  contact_aggregate: {
    aggregate: {
      count: number;
    };
  };
}

export default function Home() {
  const [limit, setLimit] = useState(2);

  const [favorites, setFavorites] = useState<number[]>([]);

  const { loading, error, data, fetchMore } = useQuery<GetContactListResponse>(
    GET_CONTACTS,
    {
      variables: {
        limit,
        offset: 0,
        order_by: { created_at: "desc" },
      },
    }
  );

  const favoriteContacts = data?.contact.filter((contact) =>
    favorites.includes(contact.id)
  );

  const unFavoriteContacts = data?.contact.filter(
    (contact) => !favorites.includes(contact.id)
  );

  const totalContacts = data?.contact_aggregate.aggregate.count || 0;
  // const totalPages = Math.ceil(totalContacts / limit);

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
          contact: [...prev.contact, ...fetchMoreResult.contact],
        };
      },
    });
  }, [loading, data, fetchMore]);

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: data?.contact ? data?.contact.length < totalContacts : false,
    onLoadMore: loadMore,
    disabled: error !== undefined,
  });

  if (loading && !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <ContactList
        contact={
          favoriteContacts?.map((contact) => ({
            id: contact.id,
            name: `${contact.first_name} ${contact.last_name}`,
            phones: contact.phones,
            created_at: contact.created_at,
          })) ?? []
        }
        isFavorite
        onContactClickFavorite={function (id: number): void {
          setFavorites((prev) => {
            if (prev.includes(id)) {
              return prev.filter((item) => item !== id);
            }

            return [...prev, id];
          });
        }}
        onContactClick={function (contact: number): void {
          throw new Error("Function not implemented.");
        }}
        onDelete={function (id: number): void {
          throw new Error("Function not implemented.");
        }}
        selectedID={0}
      />
      <ContactList
        isFavorite={false}
        contact={
          unFavoriteContacts?.map((contact) => ({
            id: contact.id,
            name: `${contact.first_name} ${contact.last_name}`,
            phones: contact.phones,
            created_at: contact.created_at,
          })) ?? []
        }
        onContactClickFavorite={function (id: number): void {
          setFavorites((prev) => {
            if (prev.includes(id)) {
              return prev.filter((item) => item !== id);
            }

            return [...prev, id];
          });
        }}
        onContactClick={function (contact: number): void {
          throw new Error("Function not implemented.");
        }}
        onDelete={function (id: number): void {
          throw new Error("Function not implemented.");
        }}
        selectedID={0}
      />
      <div ref={sentryRef}>{loading && <div>Loading more...</div>}</div>
    </div>
  );
}
