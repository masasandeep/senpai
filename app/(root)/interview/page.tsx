import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/action/auth.action";

const page = async () => {
  const user = await getCurrentUser();
  return (
    <>
      <h3>InterView generation</h3>
      <Agent
        username={user!.username}
        userId={user!.id}
        type="generate"
      />
    </>
  );
};

export default page;
