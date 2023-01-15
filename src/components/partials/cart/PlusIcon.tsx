import classNames from 'classnames';

type Props = {
  width?: number;
  height?: number;
  className?: string;
};

const PlusIcon = ({ width = 24, height = 24, className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox={`0 0 ${width} ${height}`}
      strokeWidth={1.5}
      stroke="currentColor"
      className={classNames(className && className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
};

export default PlusIcon;
