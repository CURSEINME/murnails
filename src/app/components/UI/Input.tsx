interface InputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  className?: string;
  labelClassName?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  label,
  className = "",
  labelClassName = "",
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          className={`text-sm font-medium mb-1 text-pink-300 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`p-2 border border-gray-600 rounded-lg bg-gray-700 text-white 
          focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none
          transition-shadow duration-200 ${className}`}
      />
    </div>
  );
};

export default Input;
