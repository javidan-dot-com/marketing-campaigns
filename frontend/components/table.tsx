'use client';

import { Campaign } from '@/app/types';
import { toast } from 'react-toastify';

export function Table({
  campaigns,
  setCampaigns,
}: {
  campaigns: Campaign[];
  setCampaigns: (campaigns: Campaign[]) => void;
}) {
  const fetchUpdateCampaign = async (campaign: Campaign) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/campaigns/${campaign.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: !campaign.status }),
        },
      ).then((res) => res.json());

      toast.success(
        `Campaign "${campaign.title}" is now ${campaign.status ? 'stopped' : 'running'}`,
      );

      return response;
    } catch (error) {
      console.error(`Error updating campaign: ${error}`);
    }
  };

  async function fetchData() {
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/campaigns`);
      const updatedCampaigns = await data.json();
      setCampaigns(updatedCampaigns);
    } catch (error) {
      toast.error(`Ups! Failed to fetch data: ${error}`);
      console.error(`Error fetching data: ${error}`);
    }
  }

  const handleStatusChange = async (campaign: Campaign) => {
    await fetchUpdateCampaign(campaign);
    await fetchData();
  };

  return (
    <div className="w-full overflow-x-scroll xs:max-w-xs sm:max-w-none scrollbar-thin scrollbar-track-gray-800">
      <table className="table-auto w-full whitespace-nowrap" data-cy="table">
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
                  <input
                    type="checkbox"
                    onChange={() => handleStatusChange(campaign)}
                    className="peer hidden"
                    checked={campaign.status}
                    data-cy="toggle-status"
                  />
                  <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-black peer-checked:after:bg-black after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </td>
              <td className="p-2 text-sm">
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
