import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  register: UseFormRegister<T>;
  errorMessage?: string;
  className?: string;
}

export default function TextInput<T extends FieldValues>({
  id,
  label,
  placeholder,
  type = "text",
  autoComplete,
  register,
  errorMessage,
  className = "",
}: TextInputProps<T>) {
  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={id} className="mb-1.5 block text-sm text-gray-500">
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        {...register(id, { required: `${label} is required` })}
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
