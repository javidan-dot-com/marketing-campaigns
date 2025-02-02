'use client';

type Campaign = {
  id: string;
  title: string;
  url: string;
  status: boolean;
  payouts: {
    country: string;
    amount: number;
  }[];
};

export function Table({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <div className="w-full overflow-x-scroll xs:max-w-xs sm:max-w-none scrollbar-thin scrollbar-track-gray-800">
      <table className="table-auto w-full whitespace-nowrap">
        <thead>
          <tr className="text-left">
            <th className="p-2">Title</th>
            <th className="p-2">Landing Page URL</th>
            <th className="p-2">Is Running</th>
            <th className="p-2">Payouts</th>
          </tr>
        </thead>

        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id}>
              <td className="p-2">{campaign.title}</td>
              <td className="p-2">
                <a
                  href={campaign.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline"
                >
                  {campaign.url}
                </a>
              </td>
              <td className="p-2">
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-black peer-checked:after:bg-black after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </td>
              <td className="p-2">
                {campaign?.payouts?.map((payout, index) => (
                  <div key={index} className="flex gap-2">
                    <span>{payout.country}</span>
                    <span>{payout.amount}</span>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
