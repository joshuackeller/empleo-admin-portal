import { Button, buttonVariants } from "@/src/components/shadcn/Button";
import { Card } from "@/src/components/shadcn/Card";
import useGetSelfOrganizations from "@/src/requests/self/organizations/useGetSelfOrganizations";
import { cn } from "@/src/utilities/cn";
import useAuthContext from "@/src/utilities/useAuthContext";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/router";

const AuthOrganizations = () => {
  const { signOut, selectOrganization } = useAuthContext();
  const { data: organizations } = useGetSelfOrganizations();
  const router = useRouter();
  return (
    <>
      <div className="absolute top-5 right-5">
        <Button onClick={signOut} className="flex items-center gap-2">
          Sign Out <ExitIcon />
        </Button>
      </div>
      <div>
        <h3>Your Organizations</h3>
        <div className="muted-text">Select an organization to get started</div>
        {!!organizations && organizations?.length > 0 && (
          <div className="space-y-2 py-2">
            {organizations.map((organization: any) => (
              <Button
                key={organization.id}
                variant="outline"
                className="w-full"
                onClick={() => {
                  selectOrganization(organization.id);
                  router.push("/");
                }}
              >
                {organization.title}
              </Button>
            ))}
          </div>
        )}
        <Link
          href="/auth/organizations/create"
          className={cn(buttonVariants({}), "w-full mt-2")}
        >
          Create New Organization
        </Link>
      </div>
    </>
  );
};

AuthOrganizations.layout = "auth";

export default AuthOrganizations;
