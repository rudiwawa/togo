import { useEffect, useState } from "react";
import { css, useTheme } from "@emotion/react";
import { ThemeType } from "@/styles/theme";
import { formatDateTime, formatWhatsAppChatDate } from "@/helper/date";
import { MdAdd, MdDelete } from "react-icons/md";

export interface Contact {
  last_name?: string;
  id?: number;
  first_name?: string;
  phones?: Phone[];
  created_at?: Date;
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

const buttonActionStyles = ({ theme }: { theme: ThemeType }) => css`
  padding: 8px;
  height: 100%;
  color: ${theme.colors["gray-800"]};
  background-color: ${theme.colors["gray-300"]};
  border-radius: 0.375rem;
  border: none;
  &:active {
    background-color: ${theme.colors["gray-500"]};
  }
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
  const [phone, setPhone] = useState("");
  const [phones, setPhones] = useState<Phone[]>(contact?.phones || []);

  useEffect(() => {
    if (contact?.id) {
      setFirstName(contact.first_name);
      setLastName(contact.last_name);
      setPhones(contact.phones || []);
    }
  }, [contact?.id]);

  const theme = useTheme() as ThemeType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      id: contact?.id,
      first_name: firstName,
      last_name: lastName,
      phones,
    });
  };

  const handleAddPhone = () => {
    if (phone.trim()) {
      setPhones([...phones, { number: phone }]);
      setPhone("");
    }
  };

  const handleRemovePhone = (index: number) => {
    const newPhones = [...phones];
    newPhones.splice(index, 1);
    setPhones(newPhones);
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

      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <label htmlFor="phone">Phone:</label>
        <div
          css={css`
            display: flex;
            gap: 10px;
          `}
        >
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAddPhone}
            css={css`
              ${buttonActionStyles({ theme })}
            `}
          >
            <MdAdd />
          </button>
        </div>
        <div
          css={css`
            margin-top: 10px;
          `}
        >
          {phones.map((phone, index) => (
            <div
              key={index}
              css={css`
                display: flex;
                gap: 10px;
                align-items: center;
                margin-bottom: 1rem;
              `}
            >
              <div>{phone.number}</div>
              <button
                type="button"
                onClick={() => handleRemovePhone(index)}
                css={css`
                  ${buttonActionStyles({ theme })}
                `}
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
      </div>

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
