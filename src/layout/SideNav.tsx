import {
  BackpackIcon,
  GearIcon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import clsx from "clsx";
import { useRouter } from "next/router";
import EmpleoLogo from "@/src/components/EmpleoLogo";
import useGetSelf from "@/src/requests/self/useGetSelf";
import { Button, buttonVariants } from "@/src/components/shadcn/Button";
import { cn } from "@/src/utilities/cn";
import Link from "next/link";
import useGetCurrentOrganization from "../requests/self/organizations/useGetCurrentOrganziation";

const SIDE_NAV_ITEMS = [
  {
    name: "Organization",
    icon: HomeIcon,
    subitems: [
      {
        name: "Settings",
        href: "/settings",
      },
    ],
  },
  {
    name: "Jobs",
    icon: BackpackIcon,
    subitems: [
      {
        name: "Listings",
        href: "/jobs/listings",
      },
      {
        name: "Applicants",
        href: "/jobs/applicants",
      },
    ],
  },
];

interface SideNavProps {}

const SideNav = ({}: SideNavProps) => {
  const router = useRouter();
  const { data: self } = useGetSelf();
  const { data: organization } = useGetCurrentOrganization();

  return (
    <div className="px-5 py-3 bg-indigo-950 h-screen flex flex-col justify-between">
      <div>
        <Link href="/" className="text-center">
          <EmpleoLogo />
        </Link>
        <div className="text-white   my-3">
          {SIDE_NAV_ITEMS.map((item) => (
            <div key={item.name}>
              <div
                className={
                  "font-bold flex items-center gap-x-2 pl-2 pr-5 py-1  rounded"
                }
              >
                <item.icon className="h-4 w-4" />
                <div>{item.name}</div>
              </div>
              <div className="ml-2 space-y-1">
                {item?.subitems?.map((subitem) => (
                  <div key={subitem.href}>
                    <Link href={subitem.href} key={subitem.href}>
                      <div
                        className={clsx(
                          "font-light text-sm pl-2 pr-5  py-1 hover:bg-indigo-800 rounded border-[1px]",
                          router.pathname === subitem.href
                            ? "bg-indigo-800 border-indigo-600"
                            : "border-transparent"
                        )}
                      >
                        {subitem.name}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Link
          className={cn(
            buttonVariants({ variant: "link" }),
            "flex justify-start gap-1 text-white p-0 m-0 py-2"
          )}
          href="/self"
        >
          <GearIcon />
          <div className="!text-left">
            {!!organization && organization.title}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
