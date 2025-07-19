interface SpinnerProps {
  isGlobal?: boolean;
  size?: number;
}

const Spinner = ({ isGlobal = false, size }: SpinnerProps) => {
  const style: React.CSSProperties = size
    ? {
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${Math.max(1, Math.floor(size / 8))}px`,
      }
    : {};

  const spinnerElement = <div className="spinner_circle" style={style} />;

  if (isGlobal) {
    return <div className="spinner_overlay">{spinnerElement}</div>;
  }

  return spinnerElement;
};

export default Spinner;
