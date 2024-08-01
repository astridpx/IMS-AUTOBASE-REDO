interface DropDownProps {
  options: string[];
  placeholder: string;
  setSelect: React.Dispatch<React.SetStateAction<string>>;
  isyear: boolean;
}

export default function Dropdown({
  options,
  placeholder,
  setSelect,
  isyear,
}: DropDownProps) {
  return (
    <>
      <div className="relative w-full">
        <select
          id="options"
          name="options"
          onChange={(e) => setSelect(e.target.value)}
          className="block w-full p-4 py-6 text-3xl rounded-lg shadow-md outline-none appearance-none pl-14 "
        >
          <option value="" className="">
            {placeholder}
          </option>

          {options?.map((option, i) => (
            <option key={option} className="" value={option}>
              {isyear && i !== options.length - 1
                ? `${option}s`
                : isyear && i === options.length - 1
                ? `${option}s and older`
                : option}
            </option>
          ))}
        </select>

        {/* icon */}
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <svg
            className="w-auto h-10 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
