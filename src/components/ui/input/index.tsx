import classNames from 'classnames';

interface InputProps {
  label?: string;
  wrapperClassName?: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  placeholder?: string;
  id?: string;
}

const Input = ({
  label,
  wrapperClassName = 'form_medium',
  value,
  onChange,
  maxLength,
  placeholder,
  id,
}: InputProps) => {
  return (
    <div className="form_group">
      {label && (
        <label className="form_label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className={classNames('item_form', wrapperClassName)}>
        <input
          id={id}
          className="input_comm"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Input;
