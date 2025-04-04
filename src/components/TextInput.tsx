import React from "react";

interface TextInputProps {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  register: any;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  placeholder,
  type,
  register,
  className,
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={id} className="block text-gray-500">
        {label}
      </label>
      <input
        id={id}
        {...register(id)}
        type={type}
        placeholder={placeholder}
        className="w-full rounded border border-gray-300 bg-white p-3 text-gray-500 transition-colors duration-300 focus:border-[2px] focus:border-gaga1 focus:outline-none"
      />
    </div>
  );
};

export default TextInput;
