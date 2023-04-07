import React, { useState, useCallback, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import "normalize.css";
import useInfiniteScroll from "react-infinite-scroll-hook";
import ContactList from "@/components/domain/contact/ContactList";
import { Layout } from "@/components/base/Layout";
import { useListContact } from "@/hook/index/useListContact";
import { useFavoriteHook } from "@/hook/index/useFavoriteHook";
import { useDetailContact } from "@/hook/index/useDetail";
import {
  Contact,
  ContactForm,
} from "@/components/domain/contact/page/index/form";


export default function Home() {
  const [detailShow, setDetailShow] = useState(false);
  const [selectedContact, setSelectedContact] = useState<number>(0);

  const {
    loading: listLoading,
    data: listData,
    loadMore,
    error: listError,
    totalContacts,
    setSearch,
    search,
  } = useListContact();
  const {
    loading: detailLoading,
    data: detailData,
    error: errorData,
  } = useDetailContact(selectedContact);
  const { favoriteContacts, unFavoriteContacts, FavoriteToggle } =
    useFavoriteHook(listData);

  const [sentryRef] = useInfiniteScroll({
    loading: listLoading,
    hasNextPage: listData?.contact
      ? listData?.contact.length < totalContacts
      : false,
    onLoadMore: loadMore,
    disabled: listError !== undefined,
  });

  if (listError) {
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
          <div ref={sentryRef}>{listLoading && <div>Loading more...</div>}</div>
        </>
      }
      right={
        <>
          <ContactForm
            contact={detailData?.contact_by_pk}
            onSubmit={function (contact: Contact): void {
              throw new Error("Function not implemented.");
            }}
          />
        </>
      }
      onClose={() => setDetailShow(false)}
      rightShow={detailShow}
      onChangeSearch={function (value: string): void {
        setSearch(value);
      }}
      search={search}
    />
  );
}
