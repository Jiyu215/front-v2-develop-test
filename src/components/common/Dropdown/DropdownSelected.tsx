import React from "react";
import { Selected } from "./Dropdown.styles";

interface DropdownSelectedProps {
  isHovered: boolean;
  label: string;
  title: string;
}

const DropdownSelected: React.FC<DropdownSelectedProps> = ({
  isHovered,
  label,
  title,
}) => (
  <Selected $isHovered={isHovered}>
    {title}
    <br />
    <span>{label}</span>
  </Selected>
);

export default DropdownSelected;
