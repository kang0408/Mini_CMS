import { Icon } from "@iconify/react/dist/iconify.js";

export default function Message({ type, message, isClosed, hoverAlive }) {
  const handleTypeMessage = (type) => {
    if (type == "info")
      return {
        border: "border-info",
        color: "text-info",
        icon: "material-symbols:info-outline-rounded",
      };
    else if (type == "success")
      return {
        border: "border-success",
        color: "text-success",
        icon: "material-symbols:check-circle-outline-rounded",
      };
    else if (type == "warning")
      return {
        border: "border-warning",
        color: "text-warning",
        icon: "material-symbols:warning-outline-rounded",
      };
    else if (type == "error")
      return {
        border: "border-error",
        color: "text-error",
        icon: "material-symbols:error-outline-rounded",
      };
    else return "";
  };

  return (
    <div
      className={`${
        handleTypeMessage(type).border
      } flex items-center gap-4 w-96 bg-white drop-shadow-xl p-4 rounded-lg border-2 animate-[slide-from-right_0.5s_ease]`}
    >
      <Icon
        icon={handleTypeMessage(type).icon}
        className={`${handleTypeMessage(type).color} text-3xl`}
      />
      <p>
        {message
          ? message
          : "Lorem ipsum, dolor sit amet consectetur adipisicing."}
      </p>
      {isClosed ? (
        <Icon
          icon="fontisto:close"
          className="text-2xl text-black cursor-pointer"
        />
      ) : (
        ""
      )}
    </div>
  );
}
