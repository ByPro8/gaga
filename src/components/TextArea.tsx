import React from "react";

interface TextAreaProps {
  id: string;
  label: string;
  placeholder: string;
  rows: number;
  register: any;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  placeholder,
  rows,
  register,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-500">
        {label}
      </label>
      <textarea
        required
        id={id}
        {...register(id)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded border border-gray-300 bg-white p-3 text-gray-500 focus:border-[2px] focus:border-gaga1 focus:outline-none"
      />
    </div>
  );
};

export default TextArea;
