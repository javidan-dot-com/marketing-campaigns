'use client';

import { Container } from './container';
import Image from 'next/image';
import { SearchTab } from './search-tab';
import { Table } from './table';
import { useState } from 'react';
import { Campaign } from '@/app/types';
import { AddCampaignModal } from './add-campaign-modal';

export function CampaignList({ campaigns }: { campaigns: Campaign[] }) {
  const [updatedCampaign, setUpdatedCampaign] = useState(campaigns || []);
  const [showModal, setShowModal] = useState(false);

  return (
    <Container className="p-2 sm:p-4 bg-gray-900 rounded flex flex-col gap-4">
      <div className="w-full flex flex-row items-center justify-between">
        <h3 className="text-white text-lg font-semibold">All campaigns</h3>

        <button
          className="px-4 py-2 bg-primary rounded text-black text-sm flex flex-row items-center gap-2"
          onClick={() => setShowModal(true)}
          data-cy="add-campaign-button"
        >
          <Image src={'/assets/plus-icon.svg'} alt="Plus icon" width={16} height={16} />
          Add campaign
        </button>
      </div>

      <SearchTab setCampaigns={setUpdatedCampaign} />

      <Table campaigns={updatedCampaign} setCampaigns={setUpdatedCampaign} />

      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-95 flex items-center justify-center ${
          showModal ? 'visible' : 'invisible'
        }`}
      >
        <AddCampaignModal setShowModal={setShowModal} setCampaigns={setUpdatedCampaign} />
      </div>
    </Container>
  );
}
