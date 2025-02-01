import { IconType } from "react-icons";

type SelectProps = {
  id: string;
  title: string;
  value: string;
  Icon?: IconType;
  options: string[];
  dic?: { [key: string]: string };
  onChange: (value: string) => void;
};

export const Select = ({
  id,
  title,
  value,
  Icon,
  options,
  dic,
  onChange,
}: SelectProps) => {
  return (
    <div className="flex gap-1 items-center justify-center hover:bg-gray-100">
      <label htmlFor={id}>
        {title}
        {Icon ? <Icon className="size-5 text-gray-500" /> : <></>}
      </label>
      <select
        id={id}
        value={value}
        className="bg-inherit text-gray-900
        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
         block w-full p-2.5"
        onChange={(e) => {
          const newValue = e.target.value;
          onChange(newValue);
        }}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option}>
              {dic ? dic[option] : option}
            </option>
          );
        })}
      </select>
    </div>
  );
};
