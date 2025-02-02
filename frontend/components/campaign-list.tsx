'use client';

import { Container } from './container';
import Image from 'next/image';
import { SearchTab } from './search-tab';

export function CampaignList() {
  return (
    <Container className="p-2 sm:p-4 bg-gray-900 rounded flex flex-col gap-4">
      <div className="w-full flex flex-row items-center justify-between">
        <h3>All campaigns</h3>

        <button className="px-4 py-2 bg-primary rounded text-black text-sm flex flex-row items-center gap-2">
          <Image src={'/assets/plus-icon.svg'} alt="Plus icon" width={16} height={16} />
          Add campaign
        </button>
      </div>

      <SearchTab />
    </Container>
  );
}
