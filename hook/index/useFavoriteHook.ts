import { useEffect, useState } from "react";
import { GetContactListResponse } from "./useListContact";

export const useFavoriteHook = (data: GetContactListResponse | undefined) => {
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
