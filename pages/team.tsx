import AdminTable from "@/src/components/tables/AdminTable";
import { PageComponent } from "./_app";

const TeamPage: PageComponent = () => {
  return (
    <div>
      <div className="border-b">
        <h3>Team</h3>
      </div>
      <div className="mt-3">
        <AdminTable />
      </div>
    </div>
  );
};

export default TeamPage;
