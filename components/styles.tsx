import { css, Global, keyframes, Keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        padding: 0;
        margin: 0;
        background: white;
        min-height: 100%;
        font-family: Helvetica, Arial, sans-serif;
      }
    `}
  />
);
