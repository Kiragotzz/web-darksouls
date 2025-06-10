// src/components/ui/Select.tsx
import React from 'react';

interface SelectOption {
  id: string | number;
  name: string;
  disabled?: boolean;
}

interface SelectProps {
  label: string;
  options: SelectOption[];
  value?: string | number;
  onChange?: (value: string) => void;
  name?: string;
  id?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({ 
  label,
  options,
  value = '',
  onChange,
  name = 'select',
  id = name,
  className = '',
  disabled = false,
  placeholder = 'Selecione...',
  required = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      <span>{label}</span>
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.id} value={option.id} disabled={option.disabled}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;