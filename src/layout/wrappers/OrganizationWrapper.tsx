import { buttonVariants } from "@/src/components/shadcn/Button";
import { Separator } from "@/src/components/shadcn/Separator";
import { cn } from "@/src/utilities/cn";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface OrganizationWrapperProps {
  children: ReactNode;
}

const OrganizationWrapper = ({ children }: OrganizationWrapperProps) => {
  const { pathname } = useRouter();
  return (
    <div>
      <h4>Organization</h4>
      <div className="flex items-center gap-x-5 my-2">
        <Link
          href="/organization"
          className={cn(
            `text-sm font-medium transition-colors text-gray-500 hover:text-primary`,
            pathname === "/organization" && "text-primary",
          )}
        >
          Details
        </Link>
        <Link
          href="/organization/subdomain"
          className={cn(
            `text-sm font-medium transition-colors text-gray-500 hover:text-primary`,
            pathname === "/organization/subdomain" && "text-primary",
          )}
        >
          Subdomain
        </Link>
        <Link
          href="/organization/eeoc"
          className={cn(
            `text-sm font-medium transition-colors text-gray-500 hover:text-primary`,
            pathname === "/organization/eeoc" && "text-primary",
          )}
        >
          EEOC
        </Link>
      </div>
      <Separator className="mb-2 mt-1" />
      {children}
    </div>
  );
};

export default OrganizationWrapper;
