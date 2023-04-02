import ContactList from "@/components/domain/contact/ContactList";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const { loading, error, data } = useQuery<GetContactListResponse>(
    GET_CONTACTS,
    {
      variables: {
        limit,
        offset,
        order_by: { created_at: "desc" },
      },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const totalContacts = data?.contact_aggregate.aggregate.count || 0;
  const totalPages = Math.ceil(totalContacts / limit);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOffset((page - 1) * limit);
  };

  return (
    <div>
      <ContactList
        contact={
          data?.contact.map((contact) => ({
            id: contact.id,
            name: `${contact.first_name} ${contact.last_name}`,
            favorite: false,
            phones: contact.phones,
            created_at: contact.created_at,
          })) ?? []
        }
        onContactClickFavorite={function (id: number): void {
          throw new Error("Function not implemented.");
        }}
        onContactClick={function (contact: number): void {
          throw new Error("Function not implemented.");
        }}
        onDelete={function (id: number): void {
          throw new Error("Function not implemented.");
        }}
        selectedID={0}
      />
      {totalPages > 1 && (
        <div>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              disabled={currentPage === i + 1}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}