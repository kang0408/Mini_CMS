import Button from "../components/common/Button";
import { useMessageProvider } from "../components/common/Message/Provider";

export default function Dashboard() {
  const { useMessage } = useMessageProvider();
  const addMessage = () => {
    useMessage({
      type: "warning",
    });
  };
  return (
    <>
      <p>Dashboard</p>
      <Button color="primary" onClick={addMessage}>
        Message
      </Button>
    </>
  );
}
