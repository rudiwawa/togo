import { useEffect, useState } from "react";
import { css, useTheme } from "@emotion/react";
import { ThemeType } from "@/styles/theme";
import { formatDateTime, formatWhatsAppChatDate } from "@/helper/date";

export interface Contact {
  last_name?: string;
  id?: number;
  first_name?: string;
  phones?: Phone[];
  created_at?: string;
}

export interface Phone {
  number: string;
}

interface Props {
  contact?: Contact;
  onSubmit: (contact: Contact) => void;
  isLoading?: boolean;
}

const buttonStyles = (props: { theme: ThemeType }) => css`
  padding: 8px 16px;
  background-color: ${props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

const formStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
  label {
    font-weight: bold;
  }
  input[type="text"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

export const ContactForm = ({
  contact,
  onSubmit,
  isLoading = false,
}: Props) => {
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [phones, setPhones] = useState<string>();

  useEffect(() => {
    if (contact?.id) {
      setFirstName(contact.first_name);
      setLastName(contact.last_name);
      setPhones(contact.phones?.map((phone) => phone.number).join(", "));
    }
  }, [contact?.id]);

  const theme = useTheme() as ThemeType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      id: contact?.id,
      first_name: firstName,
      last_name: lastName,
      phones: phones?.split(", ").map((number) => ({ number })),
    });
  };

  return (
    <form css={formStyles} onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <label htmlFor="phones">Phones:</label>
      <input
        type="text"
        id="phones"
        value={phones}
        onChange={(e) => setPhones(e.target.value)}
      />

      <button
        type="submit"
        disabled={isLoading}
        css={css`
          ${buttonStyles({ theme })}
        `}
      >
        {isLoading ? "Loading..." : "Submit"}
      </button>
      <p
        css={() => css`
          color: ${theme.colors["gray-500"]};
          text-align: center;
          font-size: 10pt;
        `}
      >
        created at {""}
        <b
          css={() => css`
            color: ${theme.colors["gray-600"]};
          `}
        >
          {formatDateTime(contact?.created_at)}
        </b>
      </p>
    </form>
  );
};
