import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { FiSearch,FiX } from "react-icons/fi";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search rooms...",
  className = "",
  icon: Icon = FiSearch,
  iconClassName = "text-primary w-5 h-5",
  onClear,
}) => {
  const wrapperClasses = "relative w-full";
  const baseInputClasses =
    "w-full pl-12 font-semibold text-gray-600 pr-12 py-2  rounded-full bg-bgBase border border-primary focus:outline-none  focus:ring-accent shadow-lg";

  return (
    <div className={twMerge(clsx(wrapperClasses, className))}>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <Icon className={iconClassName} />
      </div>
      <input
        
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={twMerge(clsx(baseInputClasses))}
      />

      {/* Clear Button */}
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 text-primary hover:text-accent focus:outline-none"
          aria-label="Clear search"
        >
          <FiX className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
