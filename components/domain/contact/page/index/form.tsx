import { useEffect, useState } from "react";
import { css, useTheme } from "@emotion/react";
import { ThemeType } from "@/styles/theme";
import { formatDateTime } from "@/helper/date";
import { MdAdd, MdSave } from "react-icons/md";
import { useDebounce } from "@/helper/debounce";

export interface Contact {
  last_name: string;
  id: number;
  first_name: string;
  created_at?: Date;
  phones: Phone[];
}
export interface ContactParams {
  last_name: string;
  id?: number;
  first_name: string;
  created_at?: Date;
  phones?: Phone[];
}
export interface Phone {
  number: string;
}

interface Props {
  contact?: Contact;
  onPhoneAdd: (contactId: number, phone: Phone) => void;
  onPhoneNumberEdit: (
    pkColumns: { number: string; contact_id: number },
    phone: Phone
  ) => void;
  onSubmit: (contact: ContactParams) => void;
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
  cursor: pointer;

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
  onPhoneAdd,
  onPhoneNumberEdit,
  onSubmit,
  isLoading = false,
}: Props) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (contact?.id) {
      setFirstName(contact.first_name);
      setLastName(contact.last_name);
    }
  }, [contact?.id]);

  const theme = useTheme() as ThemeType;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      id: contact?.id,
      first_name: firstName,
      last_name: lastName,
    });
  };

  const handleAddPhone = () => {
    if (phone.trim()) {
      setPhone("");
    }
  };

  const handlePhoneNumberEdit = (
    pkColumns: { number: string; contact_id: number },
    phone: Phone
  ) => {
    onPhoneNumberEdit(pkColumns, phone);
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
            margin-top: 10px;
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
          {contact?.phones?.map((phone, index) => (
            <EditPhoneNumber
              onPhoneNumberEdit={function (
                pkColumns: { number: string; contact_id: number },
                phone: Phone
              ): void {
                handlePhoneNumberEdit(pkColumns, phone);
              }}
              initialPhone={phone}
              index={0}
              id={contact.id}
            />
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

const EditPhoneNumber = ({
  id,
  onPhoneNumberEdit,
  initialPhone,
  index,
}: {
  onPhoneNumberEdit: (
    pkColumns: { number: string; contact_id: number },
    phone: Phone
  ) => void;
  initialPhone: Phone;
  id: number;
  index: number;
}) => {
  const theme = useTheme() as ThemeType;
  const [phone, setPhone] = useState<string>(initialPhone.number);

  const handlePhoneNumberEdit = () => {
    onPhoneNumberEdit(
      {
        number: initialPhone.number,
        contact_id: id,
      },
      {
        number: phone,
      }
    );
  };

  useEffect(() => {
    setPhone(initialPhone.number);
  }, [initialPhone.number]);

  const canSave = useDebounce(initialPhone.number !== phone, 100);

  return (
    <div
      css={css`
        display: flex;
        gap: 10px;
        margin-bottom: 1rem;
      `}
    >
      <input
        type="text"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />
      {canSave && (
        <button
          type="button"
          onClick={() => handlePhoneNumberEdit()}
          css={css`
            ${buttonActionStyles({ theme })}
            color: white;
            background-color: ${theme.colors.primary};
          `}
        >
          <MdSave />
        </button>
      )}
    </div>
  );
};
