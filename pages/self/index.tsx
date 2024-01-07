import useAuthContext from "@/src/utilities/useAuthContext";
import { PageComponent } from "../_app";
import { Button } from "@/src/components/shadcn/Button";
import { ExitIcon, ResetIcon } from "@radix-ui/react-icons";

const SelfPage: PageComponent = () => {
  const { signOut, exitOrganization } = useAuthContext();
  return (
    <div className="grid gap-5">
      <Button onClick={signOut} className="flex items-center gap-2">
        Sign Out
        <ExitIcon />
      </Button>
      <Button onClick={exitOrganization} className="gap-2">
        Switch Organization
        <ResetIcon />
      </Button>
    </div>
  );
};

export default SelfPage;
