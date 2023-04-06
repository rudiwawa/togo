import React, { useState, useCallback, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import useInfiniteScroll from "react-infinite-scroll-hook";
import ContactList from "@/components/domain/contact/ContactList";
import { Layout } from "@/components/base/Layout";

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
  const [detailShow, setDetailShow] = useState(false);
  const [selectedContact, setSelectedContact] = useState(0);

  const { loading, data, loadMore, error, totalContacts, setSearch, search } =
    useListContact();
  const { favoriteContacts, unFavoriteContacts, FavoriteToggle } =
    useFavoriteHook(data);

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: data?.contact ? data?.contact.length < totalContacts : false,
    onLoadMore: loadMore,
    disabled: error !== undefined,
  });

  if (error) {
    return <div>Error</div>;
  }

  return (
    <Layout
      left={
        <>
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
            onContactClickFavorite={(id) => FavoriteToggle(id)}
            onContactClick={function (contact: number): void {
              setSelectedContact(contact);
              setDetailShow(true);
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
            onContactClickFavorite={(id) => FavoriteToggle(id)}
            onContactClick={function (contact: number): void {
              setSelectedContact(contact);
              setDetailShow(true);
            }}
            onDelete={function (id: number): void {
              throw new Error("Function not implemented.");
            }}
            selectedID={0}
          />
          <div ref={sentryRef}>{loading && <div>Loading more...</div>}</div>
        </>
      }
      right={"Kanan"}
      onClose={() => setDetailShow(false)}
      rightShow={detailShow}
      onChangeSearch={function (value: string): void {
        setSearch(value);
      }}
      search={search}
    />
  );
}

const useListContact = () => {
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

const useFavoriteHook = (data: GetContactListResponse | undefined) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  useEffect(() => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      setFavorites(JSON.parse(favorites));
    }
  }, []);

  const favoriteContacts = data?.contact.filter((contact) =>
    favorites.includes(contact.id)
  );

  const unFavoriteContacts = data?.contact.filter(
    (contact) => !favorites.includes(contact.id)
  );

  const FavoriteToggle = (id: number) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  };

  return {
    favoriteContacts,
    unFavoriteContacts,
    FavoriteToggle,
  };
};
