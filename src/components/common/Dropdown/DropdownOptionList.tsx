import React from "react";
import { OptionsList, Option } from "./Dropdown.styles";
import { DropdownOption } from "types/dropdown";

interface DropdownOptionListProps {
  options: DropdownOption[];
  value: DropdownOption | null | undefined;
  onChange: (option: DropdownOption) => void;
  labelKey: string;
  valueKey: string;
  isVisible: boolean;
}

const DropdownOptionList: React.FC<DropdownOptionListProps> = ({
  options,
  value,
  onChange,
  labelKey,
  valueKey,
  isVisible,
}) => {
  const isSelected = (option: DropdownOption) =>
    value && value[valueKey] === option[valueKey];

  return (
    <OptionsList $isVisible={isVisible}>
      {options.map((option) => (
        <Option
          key={option[valueKey] ?? option[labelKey] ?? option}
          onClick={() => onChange(option)}
        >
          <input type="radio" checked={isSelected(option)} readOnly />
          <span>{option[labelKey] ?? String(option)}</span>
        </Option>
      ))}
    </OptionsList>
  );
};

export default DropdownOptionList;
