import CustomDatePicker, { DatePickerProps } from '../index';

const DateRangePicker = ({ start, end }: { start: DatePickerProps; end: DatePickerProps }) => {
  return (
    <div className="range-picker">
      <CustomDatePicker {...start} />
      <span className="ico_comm ico_arrow" />
      <CustomDatePicker {...end} />
    </div>
  );
};

export default DateRangePicker;
