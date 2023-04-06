import { ThemeType } from "@/styles/theme";
import { css, useTheme } from "@emotion/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

export function Layout({
  left,
  right,
  rightShow,
  onClose,
  onChangeSearch,
  search,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  rightShow: boolean;
  onClose: () => void;
  onChangeSearch: (value: string) => void;
  search: string;
}) {
  const theme = useTheme() as ThemeType;

  return (
    <div
      css={css`
        display: flex;
        position: relative;

        @media (max-width: ${theme.breakpoints.sm}) {
          flex-direction: column;
        }
      `}
    >
      <div
        css={css`
          z-index: 20;
          position: sticky;
          top: 0;
          height: 100%;
          flex-direction: column;
          background-color: ${theme.colors["gray-300"]};
          height: 100vh;

          @media (max-width: ${theme.breakpoints.sm}) {
            width: 100%;
          }

          @media (min-width: ${theme.breakpoints.sm}) {
            width: 20rem;
            flex-shrink: 0;
            border-right: 1px solid ${theme.colors["gray-300"]};
          }
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: ${theme.colors["gray-300"]};
            padding: 0.5rem 0.75rem;
            height: 3rem;
            border-bottom: 1px solid ${theme.colors["gray-200"]};
          `}
        >
          <input
            type="text"
            name="search"
            placeholder="Search"
            value={search}
            css={css`
              position: sticky;
              top: 0;
              z-index: 10;
              width: 100%;
              height: 1.5rem;
              padding: 0.5rem;
              border-radius: 0.25rem;
              border: none;
              background-color: white;
              font-size: 12pt;
              color: ${theme.colors["gray-700"]};
            `}
            onChange={(e) => {
              onChangeSearch(e.target.value);
            }}
          />
        </div>
        <div
          css={css`
            overflow-y: auto;
            height: calc(100vh - 4rem);
          `}
        >
          {left}
        </div>
      </div>
      <RightComponent isShow={rightShow} onClose={onClose}>
        {right}
      </RightComponent>
    </div>
  );
}

const TopBar = ({ onClose }: { onClose: () => void }) => {
  const theme = useTheme() as ThemeType;

  return (
    <div
      css={css`
        display: flex;
        position: sticky;
        top: 0;
        z-index: 10;
        align-items: center;
        justify-content: space-between;
        padding: 0rem 0.5rem 0rem 0.5rem;
        background-color: ${theme.colors["gray-200"]};
        border-bottom: 1px solid ${theme.colors["gray-100"]};
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          height: 4rem;
        `}
      >
        <button
          onClick={onClose}
          css={css`
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem;
            font-size: 12pt;
            color: inherit;
            background-color: transparent;
            border: none;
            border-radius: 50%;
            cursor: pointer;

            :hover {
              background-color: ${theme.colors["gray-200"]};
            }

            @media (min-width: ${theme.breakpoints.sm}) {
              display: none;
            }
          `}
        >
          <IoIosArrowBack />
        </button>
        <h3
          css={css`
            margin-left: 0.5rem;
            color: ${theme.colors["gray-700"]};
          `}
        >
          Contact
        </h3>
      </div>
      <button
        css={css`
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
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-more-vertical"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="19" r="1" />
        </svg>
      </button>
    </div>
  );
};

const RightComponent = ({
  isShow,
  onClose,
  children,
}: {
  isShow: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  const theme = useTheme() as ThemeType;

  return (
    <div
      css={css`
        position: fixed;
        box-shadow: ${theme.shadows["xl"]};
        top: 0;
        z-index: 30;
        right: ${isShow ? 0 : "-100%"};
        bottom: 0;
        left: ${isShow ? "0" : "100%"};
        overflow-x: hidden;
        transition: right 0.2s, left 0.2s;

        @media (min-width: ${theme.breakpoints.sm}) {
          box-shadow: none;
          position: static;
          overflow-x: visible;
          width: 100%;
          margin-left: 0rem;
        }
      `}
    >
      <TopBar onClose={onClose} />
      <div
        css={css({
          padding: "1rem",
          backgroundColor: theme.colors["gray-200"],
          minHeight: "100vh",
        })}
      >
        {children}
      </div>
    </div>
  );
};
