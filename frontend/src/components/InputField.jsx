import { useField } from "formik";

function InputField({ label, ...props }) {
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error;

  return (
    <div className="mb-6">
      <div className="relative">
        <input
          {...field}
          {...props}
          id={props.name}
          placeholder=" "
          aria-describedby={`${props.name}_help`}
          className={`peer block xl:w-[400px] w-full px-2.5 py-3  text-sm font-semibold text-gray-500 
            bg-transparent rounded-lg border appearance-none 
            focus:outline-none focus:ring-0 
            ${error
              ? 'border-red-500 focus:border-red-500'
              : 'border-accent focus:border-primary'}
          `}
        />
        <label
          htmlFor={props.name}
          className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] 
            bg-bgBase px-2 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[-10px] peer-placeholder-shown:top-1/2 
            peer-focus:top-3 peer-focus:scale-75 peer-focus:-translate-y-5 start-2
            ${error ? 'text-red-500' : 'text-primary'}
          `}
        >
          {label}
        </label>
      </div>

      {error && (
        <p id={`${props.name}_help`} className="mt-1 text-xs text-red-500">
          {meta.error}
        </p>
      )}
    </div>
  );
}

export default InputField;
