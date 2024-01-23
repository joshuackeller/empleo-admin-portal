import { Button } from "@/src/components/shadcn/Button";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/organization");
  }, []);
  return (
    <div>
      <div>hello there</div>
      <Button>Test</Button>
    </div>
  );
};

export default Home;
