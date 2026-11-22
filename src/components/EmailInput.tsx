import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface EmailInputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  placeholder: string;
  register: UseFormRegister<T>;
  errorMessage?: string;
}

export default function EmailInput<T extends FieldValues>({
  id,
  label,
  placeholder,
  register,
  errorMessage,
}: EmailInputProps<T>) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="mb-1.5 block text-sm text-gray-500">
        {label}
      </label>
      <input
        id={id}
        type="email"
        autoComplete="email"
        placeholder={placeholder}
        {...register(id, {
          required: "Email address is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address",
          },
        })}
        className={`w-full rounded border bg-white p-3 text-base text-gray-700 transition-colors duration-200 focus:border-gaga focus:outline-none ${
          errorMessage ? "border-red-400" : "border-gray-300"
        }`}
      />
      {errorMessage && (
        <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
