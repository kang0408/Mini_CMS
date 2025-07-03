import { Icon } from "@iconify/react/dist/iconify.js";

export default function Button({
  children,
  color = "default",
  handleClick,
  type = "button",
  icon,
  ...rest
}) {
  return (
    <>
      <button
        className={`${
          color == "primary"
            ? "bg-primary-500 text-white"
            : "bg-gray-400 text-white"
        } px-4 py-2 shadow-lg rounded-md hover:opacity-80 transition-all`}
        onClick={handleClick}
        type={type}
        {...rest}
      >
        <div className="flex items-center gap-2">
          {icon ? (
            <>
              <Icon icon={icon} className="text-xl" />
            </>
          ) : (
            ""
          )}
          {children ? children : ""}
        </div>
      </button>
    </>
  );
}
