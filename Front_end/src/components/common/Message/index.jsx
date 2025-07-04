import Message from "./Message";

export default function Index({ msgList }) {
  return (
    <div className="flex flex-col gap-4 absolute top-4 right-4">
      {msgList.map((item, index) => {
        return (
          <Message
            key={index}
            type={item.type}
            message={item.message}
            isClosed={item.isClosed}
          />
        );
      })}
    </div>
  );
}
