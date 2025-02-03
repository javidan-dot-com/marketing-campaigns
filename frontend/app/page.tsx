import { CampaignList } from '@/components/campaign-list';

export default async function Home() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/campaigns`);
  const campaigns = await data.json();

  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-center justify-items-center min-h-screen p-4 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full h-full relative">
        <CampaignList campaigns={campaigns} />
      </main>
    </div>
  );
}
