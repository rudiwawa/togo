/** @jsxImportSource @emotion/react */

import { formatDistance, formatWhatsAppChatDate } from "@/helper/date";
import { motion } from "framer-motion";
import { useState } from "react";
import { MdFavorite, MdFavoriteBorder, MdDeleteForever } from "react-icons/md";
import { css, useTheme } from "@emotion/react";
import { ThemeType } from "@/styles/theme";
import styled from "@emotion/styled";

const ListItem = styled(motion.div)(
  ({ isSelected, theme }: { isSelected: boolean; theme: ThemeType }) => `
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding-right: 1rem;
  color: ${theme.colors["gray-800"]};
  background-color: ${isSelected ? "#f9fafb" : "transparent"};
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${theme.colors["gray-100"]};
  }
  &:active {
    background-color: ${theme.colors["gray-300"]};
  }
`
);

const DeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  font-size: 1rem;
  color: inherit;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const ContactList = ({
  contact,
  selectedID,
  isFavorite,
  onContactClickFavorite,
  onContactClick,
  onDelete,
}: {
  contact: {
    id: number;
    name: string;
    phones: {
      number: string;
    }[];
    created_at: string;
  }[];
  onContactClickFavorite: (id: number) => void;
  isFavorite: boolean;
  onContactClick: (contact: number) => void;
  onDelete: (id: number) => void;
  selectedID: number;
}) => {
  const theme = useTheme() as ThemeType;
  const [hoverId, setHoverId] = useState(0);
  const [holdTimer, setHoldTimer] = useState<any>(null);
  const holdDuration = 500;

  const handleMouseDown = (id: number) => {
    setHoldTimer(
      setTimeout(() => {
        setHoverId(id);
      }, holdDuration)
    );
  };

  const handleMouseUp = () => {
    clearTimeout(holdTimer);
  };

  return (
    <>
      {contact.map((m) => (
        <ListItem
          isSelected={selectedID === m.id}
          layout="position"
          key={m.id}
          onMouseDown={() => handleMouseDown(m.id)}
          onMouseUp={handleMouseUp}
          onMouseEnter={() => setHoverId(m.id)}
          onMouseLeave={() => setHoverId(0)}
          onTouchStart={() => handleMouseDown(m.id)}
          onTouchEnd={handleMouseUp}
          onTouchCancel={() => setHoverId(0)}
          theme={theme}
        >
          <div css={{ display: "flex", alignItems: "center", width: "100%" }}>
            <button
              css={css`
                display: block;
                margin: 0.5rem 0.75rem;
                position: relative;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                width: 2.5rem;
                height: 2.5rem;
                font-size: 1.5rem;
                border: none;
                border-radius: 50%;
                cursor: pointer;
              `}
              onClick={() => onContactClickFavorite(m.id)}
            >
              {isFavorite ? (
                <MdFavorite
                  css={css`
                    position: absolute;
                    right: -2px;
                    bottom: -2px;
                    color: ${theme.colors.yellow1};
                    width: 1rem;
                    height: 1rem;
                  `}
                />
              ) : null}
            </button>
            <div
              css={{
                width: "100%",
                contactSelect: "none",
              }}
              onClick={() => onContactClick(m.id)}
            >
              <p
                css={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  fontSize: "12pt",
                  fontWeight: "medium",
                }}
              >
                <span
                  css={css`
                    font-family: ${theme.fonts.heading};
                  `}
                >
                  {m.name}
                </span>
                <span
                  css={{
                    fontSize: "9pt",
                    fontFamily: theme.fonts.body,
                    fontWeight: "bold",
                    color: theme.colors.primary,
                    opacity: 0.9,
                  }}
                >
                  {formatWhatsAppChatDate(new Date(m.created_at))}
                </span>
              </p>
              <p
                css={css`
                  font-size: 9pt;
                  color: rgba(55, 65, 81, 0.8);
                  text-overflow: ellipsis;
                `}
              >
                {m.phones[0].number}
              </p>
            </div>
          </div>
          {hoverId === m.id && (
            <div
              css={{
                position: "absolute",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                bottom: "0.5rem",
                right: "0.5rem",
              }}
            >
              <DeleteButton onClick={() => onDelete(m.id)}>
                <MdDeleteForever />
              </DeleteButton>
            </div>
          )}
        </ListItem>
      ))}
    </>
  );
};

export default ContactList;
