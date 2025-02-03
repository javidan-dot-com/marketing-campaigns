import { useState } from 'react';
import { Container } from './container';
import { Campaign } from '@/app/types';
import { countries } from '@/app/mock-data';
import Image from 'next/image';

export function AddCampaignModal({
  setShowModal,
  setCampaigns,
}: {
  setShowModal: (showModal: boolean) => void;
  setCampaigns: (campaigns: Campaign[]) => void;
}) {
  const [payouts, setPayouts] = useState<Campaign['payouts']>([{ country: '', amount: 0 }]);
  const [campaign, setCampaign] = useState<Omit<Campaign, 'id'>>({
    title: '',
    status: false,
    url: '',
    payouts: [
      {
        country: '',
        amount: 0,
      },
    ],
  });

  function validateURL(url: string) {
    return url.match(/^(http|https):\/\//);
  }

  function validateNumber(value: string) {
    return value.match(/^[0-9]*$/);
  }

  function resetCampaign() {
    setCampaign({
      title: '',
      status: false,
      url: '',
      payouts: [
        {
          country: '',
          amount: 0,
        },
      ],
    });
  }

  const handlePayoutChange = (
    index: number,
    field: 'country' | 'amount',
    value: string | number,
  ) => {
    const newPayouts: Campaign['payouts'] = [...payouts];

    if (field === 'amount') {
      newPayouts[index][field] = Number(value);
    } else {
      newPayouts[index][field] = value as string;
    }

    setPayouts(newPayouts);
    setCampaign({ ...campaign, payouts: newPayouts });
  };

  const handleAddPayout = () => {
    setPayouts([...payouts, { country: '', amount: 0 }]);
  };

  async function fetchCreateCampaign(campaign: Omit<Campaign, 'id'>) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/campaigns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaign),
      }).then((res) => res.json());

      return response;
    } catch (error) {
      console.error(`Error creating campaign: ${error}`);
    }
  }

  async function fetchData() {
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/campaigns`);
      const updatedCampaigns = await data.json();
      setCampaigns(updatedCampaigns);
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  }

  async function handleAddCampaign() {
    await fetchCreateCampaign(campaign);
    await fetchData();
    setShowModal(false);
    resetCampaign();
  }

  return (
    <Container className={`bg-gray-900 rounded p-4 w-96 flex flex-col`}>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!validateURL(campaign.url)) {
            return;
          }
          handleAddCampaign();
        }}
        data-cy="add-campaign-form"
      >
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-white text-lg font-semibold">Fill in the details</h3>

          <button
            className="px-4 py-2 rounded text-black text-sm flex flex-row items-center gap-2"
            onClick={() => {
              setShowModal(false);
              resetCampaign();
            }}
            data-cy="close-modal"
          >
            <Image
              src={'/assets/close-icon.svg'}
              alt="Close icon"
              width={16}
              height={16}
              style={{ filter: 'invert(1)' }}
            />
          </button>
        </div>

        <input
          type="text"
          placeholder="Campaign title: Win a free iPad"
          className="w-full p-4 bg-gray-800 rounded text-white focus:outline-none"
          value={campaign.title}
          onChange={(e) => setCampaign({ ...campaign, title: e.target.value })}
          minLength={1}
          required
          data-cy="campaign-title"
        />

        <input
          type="url"
          placeholder="Page URL: https://example.com"
          className="w-full p-4 bg-gray-800 rounded text-white focus:outline-none"
          value={campaign.url}
          minLength={6}
          onChange={(e) => {
            setCampaign({ ...campaign, url: e.target.value });
          }}
          required
          data-cy="campaign-url"
        />

        <div className="flex flex-col gap-4">
          {payouts.map((payout, index) => (
            <div key={index} className="flex gap-4">
              <select
                value={payout.country}
                onChange={(e) => handlePayoutChange(index, 'country', e.target.value)}
                className="w-1/2 p-4 bg-gray-800 rounded text-gray-400 focus:outline-none"
                required
                data-cy="payout-country"
              >
                <option value="">Select country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <input
                minLength={1}
                maxLength={6}
                inputMode="numeric"
                pattern="[0-9]*"
                type="text"
                placeholder="Payout"
                value={payout.amount}
                onChange={(e) =>
                  handlePayoutChange(
                    index,
                    'amount',
                    validateNumber(e.target.value) ? e.target.value : 0,
                  )
                }
                className="w-1/2 p-4 bg-gray-800 rounded text-gray-400 focus:outline-none"
                required
                data-cy="payout-amount"
              />
            </div>
          ))}
          <button
            className="px-4 py-2 bg-gray-800 rounded text-white text-sm flex flex-row items-center gap-2 justify-center"
            onClick={handleAddPayout}
            data-cy="add-payout"
          >
            <Image
              src={'/assets/plus-icon-filled.svg'}
              alt="Plus icon"
              width={16}
              height={16}
              style={{ filter: 'invert(1)' }}
            />
            Add another payout
          </button>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-primary rounded text-black text-sm flex flex-row items-center gap-2 justify-center"
          data-cy="add-campaign"
        >
          Add campaign
        </button>
      </form>
    </Container>
  );
}
