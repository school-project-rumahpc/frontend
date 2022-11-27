import { useRouter } from "next/router";
import { useEffect } from "react";

const Search = () => {
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    console.log(router.query.s)
  }, [router.isReady]);
  return <div></div>;
};

export default Search;
