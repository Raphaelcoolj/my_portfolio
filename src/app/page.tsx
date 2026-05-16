import { getPortfolioData } from "@/lib/actions";
import PortfolioClient from "@/components/PortfolioClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getPortfolioData();
  
  return (
    <main>
      <PortfolioClient data={data} />
    </main>
  );
}
