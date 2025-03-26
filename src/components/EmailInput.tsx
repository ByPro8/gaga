import React from "react";

interface EmailInputProps {
  id: string;
  label: string;
  placeholder: string;
  register: any;
}

const EmailInput: React.FC<EmailInputProps> = ({
  id,
  label,
  placeholder,
  register,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-500">
        {label}
      </label>
      <input
        id={id}
        {...register(id)}
        type="email"
        placeholder={placeholder}
        className="w-full rounded border border-gray-300 bg-white p-3 text-gray-500"
      />
    </div>
  );
};

export default EmailInput;
