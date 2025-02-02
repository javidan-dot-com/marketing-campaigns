'use client';

import { Container } from './container';
import Image from 'next/image';

export function SearchTab() {
  return (
    <Container className="bg-gray-900 rounded">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Type to search by title or campaign URL"
          className="w-full p-2 bg-gray-800 rounded text-white focus:outline-none"
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
