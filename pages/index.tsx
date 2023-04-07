import React, { useState, useCallback, useEffect } from "react";
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
  ContactParams,
  Phone,
} from "@/components/domain/contact/page/index/form";
import { editContactById } from "@/hook/index/editContact";
import { client } from "@/apollo/useClient2";
import { editPhoneNumber } from "@/hook/index/editPhoneNumber";
import { MdAdd } from "react-icons/md";
import { theme } from "@/styles/theme";
import { addContactWithPhones } from "@/hook/index/addContact";

export default function Home() {
  const [detailShow, setDetailShow] = useState(false);
  const [selectedContact, setSelectedContact] = useState<number | undefined>();

  const {
    loading: listLoading,
    data: listData,
    loadMore,
    error: listError,
    totalContacts,
    refetch: refetchList,
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
    <>
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
            <div ref={sentryRef}>
              {listLoading && <div>Loading more...</div>}
            </div>
          </>
        }
        right={
          <>
            <ContactForm
              contact={detailData?.contact_by_pk}
              onSubmit={async function (contact: ContactParams): Promise<void> {
                if (contact.id) {
                  const result = await editContactById(client, contact.id, {
                    first_name: contact.first_name,
                    last_name: contact.last_name,
                    id: contact.id,
                  });
                  if (result) {
                    // setDetailShow(false);
                  }
                } else {
                  const result = await addContactWithPhones(client, {
                    first_name: contact.first_name,
                    last_name: contact.last_name,
                    phones: contact.phones || [],
                  });
                  if (result) {
                    // setDetailShow(false);
                    refetchList()
                  }
                }
              }}
              onPhoneAdd={function (contactId: number, phone: Phone): void {}}
              onPhoneNumberEdit={async function (
                pkColumns: { number: string; contact_id: number },
                phone: Phone
              ): Promise<void> {
                await editPhoneNumber(client, pkColumns, phone.number);
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
      <div
        css={{
          position: "fixed",
          bottom: 0,
          right: 0,
          margin: 20,
          zIndex: 20,
        }}
      >
        <button
          css={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.primary,
            cursor: "pointer",
            color: "white",
            fontSize: "30pt",
            fontWeight: "bold",
          }}
          onClick={() => {
            setSelectedContact(0);
          }}
        >
          <MdAdd />
        </button>
      </div>
    </>
  );
}
