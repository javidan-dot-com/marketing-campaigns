import { ChangeEvent, ChangeEventHandler } from 'react';
import { Container } from './container';
import Image from 'next/image';
import { Campaign } from '@/app/types';
import { useState } from 'react';

export function SearchTab({ setCampaigns }: { setCampaigns: (campaigns: Campaign[]) => void }) {
  const [filter, setFilter] = useState<boolean>(false);

  function debounceSearch(onChange: ChangeEventHandler<HTMLInputElement>) {
    let timeout: NodeJS.Timeout;

    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const value: string = event.currentTarget.value;

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        onChange(value as unknown as ChangeEvent<HTMLInputElement>);
      }, 1000);
    };
  }

  const handleSearchByTitleOrCampaignURL = async (keyword: string) => {
    try {
      const searchParams = new URLSearchParams();
      searchParams.set('keyword', keyword);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/campaigns?${searchParams.toString()}`,
      );
      const data = await response.json();

      setCampaigns(data);
    } catch (error) {
      console.error('Failed to search by title or campaign URL:', error);
    }
  };

  const handleFilterCampaignChange = async () => {
    setFilter(!filter);

    try {
      if (!filter) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/campaigns?is_running=${!filter}`,
        );
        const data = await response.json();

        setCampaigns(data);
      } else {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/campaigns`);
        const data = await response.json();

        setCampaigns(data);
      }
    } catch (error) {
      console.error('Failed to filter campaign:', error);
    }
  };

  return (
    <Container className="bg-gray-900 rounded">
      <div className="w-full relative" data-cy="search-tab">
        <input
          type="text"
          placeholder="Type to search by title or campaign URL"
          className="w-full p-2 bg-gray-800 rounded text-white focus:outline-none"
          onChange={debounceSearch((event) =>
            handleSearchByTitleOrCampaignURL(event as unknown as string),
          )}
          data-cy="search-input"
        />
      </div>

      <div className="w-full flex flex-row items-center justify-start gap-2 mt-4">
        <button
          className={`px-4 py-2 rounded text-sm flex flex-row items-center gap-2 ${
            filter ? 'text-gray-950 bg-primary' : 'text-gray-400 bg-gray-900 border border-gray-700'
          }`}
          onClick={handleFilterCampaignChange}
          data-cy="filter-input"
        >
          <Image
            src={'/assets/filter-icon.svg'}
            alt="Filter icon"
            width={14}
            height={14}
            style={{ filter: filter ? 'invert(0)' : 'invert(1)' }}
          />
          Filter by &quot;is Running&quot;
        </button>
      </div>
    </Container>
  );
}
