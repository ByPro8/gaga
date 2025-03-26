import React from "react";

interface TextInputProps {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  register: any;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  placeholder,
  type,
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
        type={type}
        placeholder={placeholder}
        className="w-full rounded border border-gray-300 bg-white p-3 text-gray-500"
      />
    </div>
  );
};

export default TextInput;
