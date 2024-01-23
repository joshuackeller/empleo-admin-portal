import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PersonIcon } from "@radix-ui/react-icons";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/shadcn/Command";
import {
  HomeIcon,
  NewspaperIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";

const SearchDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <SearchIcon className="h-4 w-4" />
        {/* <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>J
          </kbd> */}
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for an action..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem
              onSelect={() => {
                router.push("/settings");
                setOpen(false);
              }}
            >
              <SettingsIcon className="h-4 w-4 mr-2" />
              Account Details
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push("/organization");
                setOpen(false);
              }}
            >
              <HomeIcon className="h-4 w-4 mr-2" />
              Organization
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push("/team");
                setOpen(false);
              }}
            >
              <PersonIcon className="mr-2 h-4 w-4" />
              Team
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push("/listings");
                setOpen(false);
              }}
            >
              <NewspaperIcon className="mr-2 h-4 w-4" />
              Listings
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchDialog;
