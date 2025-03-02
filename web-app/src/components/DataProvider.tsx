import { QueryClient, Hydrate, dehydrate } from "@tanstack/react-query";
import { getCryptoData } from "@/lib/api";

export default async function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["cryptoData"],
    queryFn: getCryptoData,
  });

  return <Hydrate state={dehydrate(queryClient)}>{children}</Hydrate>;
}
