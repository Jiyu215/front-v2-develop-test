import React, { useState, useRef } from "react";
import { DropdownContainer } from "./Dropdown.styles";
import DropdownSelected from "./DropdownSelected";
import DropdownOptionList from "./DropdownOptionList";
import { DropdownProps,DropdownOption  } from "types/dropdown";

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onChange,
  value,
  placeholder = "선택하세요",
  labelKey = "label",
  valueKey = "value",
  title = "선택 항목",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const getLabel = (option: DropdownOption | null | undefined) => {
    if (!option) return placeholder;
    return option[labelKey] ?? String(option);
  };

  return (
    <DropdownContainer
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <DropdownSelected
        isHovered={isHovered}
        label={getLabel(value)}
        title={title}
      />
      <DropdownOptionList
        options={options}
        value={value}
        onChange={onChange}
        labelKey={labelKey}
        valueKey={valueKey}
        isVisible={isHovered}
      />
    </DropdownContainer>
  );
};

export default Dropdown;
