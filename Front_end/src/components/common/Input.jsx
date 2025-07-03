export default function Input({
  label = "",
  name,
  type = "text",
  value,
  onChange,
  onKeyDown,
  required = false,
  validateMsg,
  vertical = true,
}) {
  return (
    <>
      <div
        className={`flex ${
          vertical ? "flex-col" : "flex-row items-center"
        } not-last:mb-4 gap-1`}
      >
        {label ? (
          <label htmlFor={name} className="flex-2">
            {label}
            {required ? <span className="text-red-500">*</span> : ""}
          </label>
        ) : (
          ""
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="border-1 border-gray rounded-md p-2 focus:outline-primary-300 flex-4"
        />
        <p className="text-red-500 text-xs">
          {validateMsg ? validateMsg[name] : ""}
        </p>
      </div>
    </>
  );
}
