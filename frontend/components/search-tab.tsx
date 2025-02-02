import { ChangeEvent, ChangeEventHandler } from 'react';
import { Container } from './container';
import Image from 'next/image';
import { Campaign } from '@/app/types';

export function SearchTab({ setCampaigns }: { setCampaigns: (campaigns: Campaign[]) => void }) {
  function debounceSearch(onChange: ChangeEventHandler<HTMLInputElement>) {
    let timeout: NodeJS.Timeout;

    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const value: string = event.currentTarget.value;

      console.log('Debouncing search:', value);
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

      const response = await fetch(`http://localhost:8000/campaigns?${searchParams.toString()}`);
      const data = await response.json();

      setCampaigns(data);

      console.log('Search by title or campaign URL:', data);
    } catch (error) {
      console.error('Failed to search by title or campaign URL:', error);
    }
  };

  return (
    <Container className="bg-gray-900 rounded">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Type to search by title or campaign URL"
          className="w-full p-2 bg-gray-800 rounded text-white focus:outline-none"
          onChange={debounceSearch((event) =>
            handleSearchByTitleOrCampaignURL(event as unknown as string),
          )}
        />
      </div>

      <div className="w-full flex flex-row items-center justify-start gap-2 mt-4">
        <button
          className="px-4 py-2 text-gray-400 bg-gray-800 rounded text-sm flex flex-row items-center gap-2"
          onClick={() => console.log('Filter campaign clicked')}
        >
          <Image
            src={'/assets/plus-circle-icon.svg'}
            alt="Filter icon"
            width={16}
            height={16}
            style={{ filter: 'invert(1)' }}
          />
          Campaign is &quot;Running&quot;
        </button>
      </div>
    </Container>
  );
}
