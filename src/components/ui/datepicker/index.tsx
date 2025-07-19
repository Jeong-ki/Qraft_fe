import DatePicker, { registerLocale } from 'react-datepicker';
import dayjs from 'dayjs';
import { ko } from 'date-fns/locale/ko';
import classNames from 'classnames';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ko', ko);

export interface DatePickerProps {
  label?: string;
  wrapperClassName?: string;
  date: dayjs.Dayjs | null;
  setDate: (date: dayjs.Dayjs | null) => void;
  minDate?: dayjs.Dayjs | null;
  maxDate?: dayjs.Dayjs | null;
  placeholderText?: string;
  id?: string;
}

const CustomDatePicker = ({
  label,
  wrapperClassName = 'form_medium',
  date,
  setDate,
  minDate,
  maxDate,
  placeholderText,
  id,
}: DatePickerProps) => {
  const handleDateChange = (date: Date | null) => {
    setDate(date ? dayjs(date) : null);
  };

  const selectedDate = date ? date.toDate() : null;
  const minDateDate = minDate ? minDate.toDate() : undefined;
  const maxDateDate = maxDate ? maxDate.toDate() : undefined;

  return (
    <div className="form_group">
      {label && (
        <label className="form_label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className={classNames('item_form', 'date-picker', wrapperClassName)}>
        <DatePicker
          className="input_comm"
          locale="ko"
          dateFormat="yyyy.MM.dd"
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={minDateDate}
          maxDate={maxDateDate}
          placeholderText={placeholderText}
          autoComplete="off"
        />
        <span className="ico_comm ico_calendar" />
      </div>
    </div>
  );
};

export default CustomDatePicker;
