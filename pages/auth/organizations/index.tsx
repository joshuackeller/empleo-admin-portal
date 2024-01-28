import { Button, buttonVariants } from "@/src/components/shadcn/Button";
import { Skeleton } from "@/src/components/shadcn/Skeleton";
import useGetOrganizations from "@/src/requests/organizations/useGetOrganizations";
import { cn } from "@/src/utilities/cn";
import useAuthContext from "@/src/utilities/useAuthContext";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/router";

const AuthOrganizations = () => {
  const { signOut, selectOrganization } = useAuthContext();
  const { data: organizations, isLoading } = useGetOrganizations();
  const router = useRouter();

  return (
    <>
      <div className="absolute top-5 right-5">
        <Button onClick={signOut} className="flex items-center gap-2">
          Sign Out <ExitIcon />
        </Button>
      </div>
      <div className="max-w-xs w-full space-y-3 m-5">
        <div>
          <h3>Your Organizations</h3>
          <div className="muted-text">
            Select an organization to get started
          </div>
        </div>
        <div className="space-y-2 pb-2">
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : !!organizations && organizations?.length > 0 ? (
            organizations.map((organization: any) => (
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
            ))
          ) : (
            <div className="text-center small-text space-y-1">
              <div>No Organizations Found. </div>
              <div>Create an organization to get started. </div>
            </div>
          )}
        </div>
        <Link
          href="/auth/organizations/create"
          className={cn(buttonVariants({ variant: "link" }), " m-0 p-0")}
        >
          Create New Organization
        </Link>
      </div>
    </>
  );
};

AuthOrganizations.layout = "auth";

export default AuthOrganizations;
