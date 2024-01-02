import useAuthContext from "@/src/utilities/useAuthContext";
import { PageComponent } from "../_app";
import { Button } from "@/src/components/shadcn/Button";
import { ExitIcon } from "@radix-ui/react-icons";

const SelfPage: PageComponent = () => {
  const { signOut } = useAuthContext();
  return (
    <div>
      <Button onClick={signOut} className="flex items-center gap-2">
        Sign Out
        <ExitIcon />
      </Button>
    </div>
  );
};

export default SelfPage;
