import ContactList from "@/components/domain/contact/ContactList";
import { css } from "@emotion/react";
import { useState } from "react";

const Home = () => {
  const [list, setList] = useState([
    {
      id: 1,
      name: "John",
      favorite: false,
    },
    {
      id: 2,
      name: "Jane",
      favorite: true,
    },
    {
      id: 3,
      name: "Jack",
      favorite: false,
    },
    {
      id: 4,
      name: "Jill",
      favorite: true,
    },
  ]);
  const favorites = list.filter((item) => item.favorite);
  const nonFavorites = list.filter((item) => !item.favorite);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <ContactList
        contact={favorites}
        onContactClickFavorite={function (id: number): void {
          setList(
            list.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  favorite: !item.favorite,
                };
              }
              return item;
            })
          );
        }}
        onContactClick={function (user: number): void {
          throw new Error("Function not implemented.");
        }}
        onDelete={function (id: number): void {
          throw new Error("Function not implemented.");
        }}
        selectedID={0}
      />
      <ContactList
        contact={nonFavorites}
        onContactClickFavorite={function (id: number): void {
          setList(
            list.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  favorite: !item.favorite,
                };
              }
              return item;
            })
          );
        }}
        onContactClick={function (user: number): void {
          throw new Error("Function not implemented.");
        }}
        onDelete={function (id: number): void {
          throw new Error("Function not implemented.");
        }}
        selectedID={0}
      />
    </div>
  );
};

export default Home;
