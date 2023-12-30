import { BackpackIcon, HomeIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import EmpleoLogo from "../components/EmpleoLogo";

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
  return (
    <div className="px-5 py-3 bg-indigo-950 h-screen">
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
  );
};

export default SideNav;
