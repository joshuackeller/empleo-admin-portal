import AdminTable from "@/src/components/tables/AdminTable";
import { PageComponent } from "./_app";
import { Separator } from "@/src/components/shadcn/Separator";
import { Button } from "@/src/components/shadcn/Button";
import { PlusCircledIcon } from "@radix-ui/react-icons";

const TeamPage: PageComponent = () => {
  return (
    <div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3>Team</h3>
          <Button className="gap-1">
            Add Member <PlusCircledIcon />
          </Button>
        </div>
        <Separator />
      </div>
      <div className="mt-3">
        <AdminTable />
      </div>
    </div>
  );
};

export default TeamPage;
