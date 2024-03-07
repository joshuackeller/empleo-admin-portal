interface DisabledInputProps {
  value?: string;
}

const DisabledInput = ({ value }: DisabledInputProps) => {
  return <input type="text" value={value} disabled className="" />;
};

export default DisabledInput;
