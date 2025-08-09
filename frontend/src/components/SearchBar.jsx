import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search rooms...",
  className = "",
  icon: Icon = FiSearch, 
  iconClassName = "text-primary w-5 h-5",
}) => {
  const wrapperClasses = "relative w-full";
  const baseInputClasses =
    "w-full pl-14 font-semibold text-gray-600 pr-4 py-2 rounded-full bg-bgBase border border-primary focus:outline-none  focus:ring-accent";

  return (
    <div className={twMerge(clsx(wrapperClasses, className))}>
      <div className="absolute left-5 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <Icon className={iconClassName} />
      </div>
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={twMerge(clsx(baseInputClasses))}
      />
    </div>
  );
};

export default SearchBar;
