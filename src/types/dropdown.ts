export interface DropdownOption {
  [key: string]: any;
}

export interface DropdownProps {
  options: DropdownOption[];
  onChange: (option: DropdownOption) => void;
  value?: DropdownOption | null;
  placeholder?: string;
  labelKey?: string;
  valueKey?: string;
  title?: string;
}
