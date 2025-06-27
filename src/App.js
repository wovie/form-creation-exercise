import { useState } from 'react';
import skaBand from './band-json/ska-band.json';
import kpopBand from './band-json/kpop-band.json';
import punkBand from './band-json/punk-band.json';

import BandForm from './BandForm';

function App() {
  const bands = [skaBand, kpopBand, punkBand];
  const [selectedBand, setSelectedBand] = useState(bands[0]);
  return (
    <div className='min-h-screen'>
      <nav className='bg-gray-800 p-1 text-white'>
        <ul className='flex justify-center gap-4'>
          {bands.map((band) => (
            <button
              key={band.id}
              className={`p-2 rounded cursor-pointer ${
                band.id === selectedBand.id
                  ? 'bg-gray-700'
                  : 'hover:bg-gray-600'
              }`}
              onClick={() => setSelectedBand(band)}
            >
              {band.name}
            </button>
          ))}
        </ul>
      </nav>
      <main className='sm:p-8'>
        <BandForm band={selectedBand} />
      </main>
    </div>
  );
}

export default App;
