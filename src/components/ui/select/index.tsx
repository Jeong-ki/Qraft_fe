import { useOutsideClick } from '@/hooks/useOutsideClick';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

interface SelectProps {
  value: string | number;
  options: readonly Record<string, any>[];
  onChagne: (value: string | number) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  labelKey?: string;
  valueKey?: string;
  wrapperClassName?: string;
}

const Select = ({
  value,
  options,
  onChagne,
  label,
  placeholder = '선택',
  disabled,
  labelKey = 'label',
  valueKey = 'value',
  wrapperClassName = 'form_medium',
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(
    options?.find((item) => item[valueKey] === value)?.[labelKey],
  );

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleOptionSelect = (selectedValue: string | number, selectedLabel: string) => {
    onChagne(selectedValue);
    setSelectedLabel(selectedLabel);
    setIsOpen(false);
  };

  const selectRef = useOutsideClick<HTMLDivElement>(handleClose, ['link_selected', 'link_opt']);

  useEffect(() => {
    setSelectedLabel(options?.find((item) => item[valueKey] === value)?.[labelKey]);
  }, [value, options, labelKey, valueKey]);

  return (
    <div className="form_group">
      {label && <span className="form_label">{label}</span>}
      <div ref={selectRef} className={classNames('item_form', wrapperClassName)}>
        <div className={classNames('opt_comm', 'opt_select', { opt_open: isOpen })}>
          <button type="button" className="link_selected" onClick={handleToggle}>
            {selectedLabel || placeholder}
            <span className="ico_comm ico_polygon" />
          </button>
          {isOpen && (
            <div className="box_opt">
              <ul className="list_opt">
                {options.map((option) => (
                  <li
                    key={option[valueKey]}
                    className={classNames({ on: option[valueKey] === value })}>
                    <button
                      type="button"
                      onClick={() => handleOptionSelect(option[valueKey], option[labelKey])}>
                      {option[labelKey]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Select;
