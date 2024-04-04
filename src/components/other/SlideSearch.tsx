import { SearchIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

const SlideSearch = () => {
  const router = useRouter();

  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const handleClickOutside = (event: any) => {
    if (
      containerRef.current &&
      !(containerRef.current as any).contains(event.target) &&
      search === ""
    ) {
      setSearchOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [search]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      router.push(url, undefined, { shallow: true });
    };

    if (search !== "") {
      handleRouteChange(`${router.pathname}?search=${search}`);
    } else {
      handleRouteChange(router.pathname);
    }
  }, [search]);

  const handleInputChange = (e: any) => {
    setSearch(e.target.value);
  };

  const debouncedSearch = debounce(handleInputChange, 300);

  return (
    <div
      ref={containerRef}
      className={`relative ${
        searchOpen ? "w-64" : "w-6"
      } transition-width duration-200 ease-in-out mx-2 bg-transparent`}
    >
      <input
        className="w-full h-4 pl-8 pr-2 py-2 text-sm focus:outline-none "
        type="text"
        ref={inputRef}
        placeholder={searchOpen ? "Search..." : ""}
        onMouseDown={() => setSearchOpen(true)}
        onChange={debouncedSearch}
      />

      <div
        className="absolute left-2 top-1/2 transform -translate-y-1/2"
        onClick={() => {
          setSearchOpen(true);
          inputRef.current && (inputRef.current as any).focus();
        }}
      >
        <SearchIcon className="h-4 w-4 cursor-pointer" />
      </div>
    </div>
  );
};

export default SlideSearch;
