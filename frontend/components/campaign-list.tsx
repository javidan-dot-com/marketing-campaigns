import { Container } from './container';
import Image from 'next/image';

export function CampaignList() {
  return (
    <Container className="bg-gray-900 rounded">
      <div className="w-full p-2 flex flex-row items-center justify-between">
        <h3>All campaigns</h3>

        <button className="px-4 py-2 bg-primary rounded text-black text-sm flex flex-row items-center gap-2">
          <Image src={'/assets/plus-icon.svg'} alt="Plus icon" width={16} height={16} />
          Add campaign
        </button>
      </div>
    </Container>
  );
}
