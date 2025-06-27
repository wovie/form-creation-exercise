import { useState, useEffect } from 'react';

function BandForm({ band }) {
  const getInitialFormState = (band) => ({
    // band
    bandId: band.id,

    // customer
    firstName: '',
    lastName: '',
    address: '',

    // payment
    cardNumber: '',
    cardExpiration: '',
    cardCVV: '',

    // tickets
    vip: '0',
    general: '0',
    'meet-and-greet': '0',
  });

  const [formData, setFormData] = useState(() => getInitialFormState(band));
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setFormData(getInitialFormState(band));
    setTotal(0);
  }, [band]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateTotal = (e) => {
    const { name, value } = e.target;
    let total = 0;
    band.ticketTypes.forEach((ticket) => {
      const quantity = ticket.type === name ? value : formData[ticket.type];
      total += ticket.cost * Number(quantity);
    });
    setTotal(total / 100);
  };

  const concertDate = new Date(band.date).toLocaleDateString('en-US', {
    weekday: 'long', // Wednesday
    month: 'long', // June
    day: 'numeric', // 26
  });

  const ticketsInput = (ticketType) => (
    <>
      <label htmlFor={ticketType} className='sr-only'>
        {ticketType}
      </label>
      <input
        id={ticketType}
        type='number'
        min='0'
        max='99' // setting a sensible limit
        placeholder='0'
        name={ticketType}
        value={formData[ticketType]}
        onChange={(e) => {
          handleChange(e);
          updateTotal(e);
        }}
        className='w-18 h-8 pl-6 py-0 border border-gray-400 focus:outline-none focus:ring-0 focus:ring-blue-500 focus:border-blue-500'
      />
    </>
  );

  return (
    <div className='grid grid-cols-1 sm:grid-cols-5'>
      {/* Concert band, date, location */}
      <div className='sm:col-span-5 m-2 flex flex-col gap-0.5'>
        <h1 className='text-2xl font-bold'>{band.name}</h1>
        <div className='flex items-center text-sm'>
          <span className='material-symbols-outlined'>date_range</span>
          <span>{concertDate}</span>
        </div>
        <div className='flex items-center text-sm'>
          <span className='material-symbols-outlined'>location_on</span>
          {band.location}
        </div>
      </div>
      {/* Left column: image, description */}
      <div className='sm:col-span-2 m-2'>
        <img src={band.imgUrl} alt='Band' />
        <div dangerouslySetInnerHTML={{ __html: band.description_blurb }} />
      </div>
      {/* Right column: tickets */}
      <form className='sm:col-span-3 m-2 py-2 px-4 bg-sky-50 grid'>
        <h2 className='text-lg font-bold mb-3'>Select Tickets</h2>
        {/* Ticket types */}
        {band.ticketTypes.map((ticket) => (
          <div key={ticket.type} className='grid grid-cols-4'>
            <div className='col-span-3'>
              <h3 className='text-lg mb-1 uppercase'>{ticket.name}</h3>
              <p className='text-xs mb-1'>{ticket.description}</p>
              <p>{`$${ticket.cost / 100}`}</p>
            </div>
            <div className='col-span-1 text-right'>
              {ticketsInput(ticket.type)}
            </div>
            <hr className='col-span-4 h-px my-4 bg-gray-200 border-0' />
          </div>
        ))}
        {/* Total cost */}
        <div className='flex justify-between mb-3'>
          <h4>TOTAL</h4>
          <p>{`$${total}`}</p>
        </div>
        {/* First and last name */}
        <div className='grid grid-cols-4 gap-2'>
          <div className='col-span-2'>
            <label htmlFor='first-name' className='sr-only'>
              First Name
            </label>
            <input
              id='first-name'
              name='firstName'
              type='text'
              className='block w-full bg-white px-2 py-1 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-blue-500'
              value={formData.firstName}
              onChange={handleChange}
              placeholder='First Name'
            ></input>
          </div>
          <div className='col-span-2'>
            <label htmlFor='last-name' className='sr-only'>
              Last Name
            </label>
            <input
              id='last-name'
              name='lastName'
              type='text'
              className='block w-full bg-white px-2 py-1 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-blue-500'
              value={formData.lastName}
              onChange={handleChange}
              placeholder='Last Name'
            ></input>
          </div>
        </div>
        {/* Address */}
        <div className='mt-2'>
          <label htmlFor='address' className='sr-only'>
            Address
          </label>
          <input
            id='address'
            name='address'
            type='text'
            className='block w-full bg-white px-2 py-1 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-blue-500'
            value={formData.address}
            onChange={handleChange}
            placeholder='Address'
          ></input>
        </div>
        {/* Payment */}
        <h5 className='font-bold text-sm mt-4'>Payment Details</h5>
        {/* Card number */}
        <div className='mt-2'>
          <label htmlFor='card-number' className='sr-only'>
            Card number
          </label>
          <input
            id='card-number'
            name='cardNumber'
            type='text'
            className='block w-full bg-white px-2 py-1 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-blue-500'
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder='0000 0000 0000 0000'
          ></input>
        </div>
        {/* Card expiration, CVV */}
        <div className='grid grid-cols-4 gap-2 mt-2'>
          <div className='col-span-2'>
            <label htmlFor='card-expiration' className='sr-only'>
              Card expiration
            </label>
            <input
              id='card-expiration'
              name='cardExpiration'
              type='text'
              className='block w-full bg-white px-2 py-1 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-blue-500'
              value={formData.cardExpiration}
              onChange={handleChange}
              placeholder='MM / YY'
            ></input>
          </div>
          <div className='col-span-2'>
            <label htmlFor='card-cvv' className='sr-only'>
              Card CVV
            </label>
            <input
              id='card-cvv'
              name='cardCVV'
              type='text'
              className='block w-full bg-white px-2 py-1 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-2 focus:outline-blue-500'
              value={formData.cardCVV}
              onChange={handleChange}
              placeholder='CVV'
            ></input>
          </div>
        </div>
        {/* Submit button */}
        <button
          type='submit'
          className='mt-2 text-center bg-blue-600 py-1 text-white hover:bg-blue-500 focus-visible:outline-offset-2 focus-visible:outline-blue-600 h-8'
          onClick={(e) => {
            e.preventDefault();
            console.log(formData);
          }}
        >
          Get Tickets
        </button>
      </form>
    </div>
  );
}

export default BandForm;
