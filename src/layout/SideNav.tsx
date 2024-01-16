import {
  BackpackIcon,
  GearIcon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import EmpleoLogo from "@/src/components/EmpleoLogo";
import { cn } from "@/src/utilities/cn";
import Link from "next/link";

const SIDE_NAV_ITEMS = [
  {
    name: "Organization",
    href: "/organization",
    icon: HomeIcon,
  },
  {
    name: "Team",
    href: "/team",
    icon: PersonIcon,
  },
  {
    name: "Listings",
    href: "/listings",
    icon: BackpackIcon,
  },
];

interface SideNavProps {
  className: string;
}

const SideNav = ({ className }: SideNavProps) => {
  const { pathname } = useRouter();

  return (
    <div
      className={cn(
        className,
        "px-3 py-3 bg-indigo-950  flex flex-col justify-between"
      )}
    >
      <div>
        <Link href="/" className="text-center">
          <EmpleoLogo />
        </Link>
        <div className="text-white my-3">
          {SIDE_NAV_ITEMS.map((item) => (
            <div key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "flex gap-x-2 items-center text-sm pl-2 pr-5 py-1.5 rounded hover:bg-white hover:bg-opacity-10 my-0.5",
                  pathname.startsWith(item.href) && "bg-white bg-opacity-10"
                )}
              >
                <item.icon />
                <div>{item.name}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Link
          className={cn(
            "flex gap-x-2 items-center text-white text-sm pl-2 pr-5 py-1.5 rounded hover:bg-white hover:bg-opacity-10 my-0.5",
            pathname === "/settings" && "bg-white bg-opacity-10"
          )}
          href="/settings"
        >
          <GearIcon />
          <div className="text">Settings</div>
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
