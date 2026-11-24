import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface TextAreaProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  placeholder: string;
  rows: number;
  register: UseFormRegister<T>;
  errorMessage?: string;
}

export default function TextArea<T extends FieldValues>({
  id,
  label,
  placeholder,
  rows,
  register,
  errorMessage,
}: TextAreaProps<T>) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-1.5 block text-sm text-gray-500">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        {...register(id, { required: "Please write a message" })}
        className={`w-full rounded border bg-white px-3.5 py-3 text-base text-gray-700 placeholder:text-gray-300 transition-colors duration-200 focus:border-gaga focus:outline-none ${
          errorMessage ? "border-red-400" : "border-gray-200"
        }`}
      />
      {errorMessage && (
        <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
