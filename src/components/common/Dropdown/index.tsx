import React, { useState, useRef } from "react";
import { DropdownContainer, Selected, OptionsList, Option } from "./Dropdown.styles";

interface DropdownOption {
  [key: string]: any;
}

interface DropdownProps {
  options: DropdownOption[];
  onChange: (option: DropdownOption) => void;
  placeholder?: string;
  labelKey?: string;
  valueKey?: string;
  initialValue?: DropdownOption;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onChange,
  placeholder = "선택하세요",
  labelKey = "label",
  valueKey = "value",
  initialValue
}) => {
  const [selected, setSelected] = useState<DropdownOption | null>(initialValue ?? null);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: DropdownOption) => {
    setSelected(option);
    onChange(option);
  };

  const getLabel = (option: DropdownOption | null) => {
    if (!option) return placeholder;
    return option[labelKey] ?? String(option);
  };

  const isSelected = (option: DropdownOption) =>
    selected && selected[valueKey] === option[valueKey];

  return (
    <DropdownContainer
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Selected $isHovered={isHovered}>
        녹음 장치 <br/>
      <span>{getLabel(selected)}</span>
      </Selected>
      <OptionsList $isVisible={isHovered}>
        {options.map(option => (
          <Option
            key={option[valueKey] ?? option[labelKey] ?? option}
            onClick={() => handleOptionClick(option)}
          >
            <input
              type="radio"
              checked={isSelected(option)}
              readOnly
            />
            <span>{option[labelKey] ?? String(option)}</span>
          </Option>
        ))}
      </OptionsList>
    </DropdownContainer>
  );
};

export default Dropdown;
