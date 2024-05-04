import React from 'react'
import imagePng from 'images/delete-account.png'

const DeleteData = () => {
  return (
    <div className='container'>
      <div className="flex justify-evenly items-center">
        <div className='space-y-4'>
          <div className='text-2xl font-bold' >Delete Your Data</div>
          <p>With few simple steps you can easily delete your data</p>
          <ul className='space-y-2'>
            <li>
              <p>Step 1: Go to your Account page from bottom navigation.</p>
            </li>
            <li>
              <p>Step 2: Click on the Delete Account button</p>
              <img src={imagePng} alt="Delete Account" />
            </li>

          </ul>
          <div>
            <p className='italic'> Please note that deleting all the data will loose all bookings and other transaction details you have with us.</p>
          </div>
        </div>
        <div
          className='border-2 rounded-lg h-fit p-5'
        >
          <h1>Your data with Us</h1>
          <ul>
            <li>
              <h4>We store the following data with us for the application.</h4>
            </li>
            <li>
              <p>
                <span className='font-bold'>Phone</span>
                <span> : Your phone number</span>
              </p>
            </li>
            <li>
              <p>
                <span className='font-bold'>Name</span>
                <span> : Your name</span>
              </p>
            </li>
            <li>
              <p>
                <span className='font-bold'>Booking details</span>
                <span> : Your boat bookings, from, where, to</span>
              </p>
            </li>
          </ul>
        </div>
      </div>

    </div>
  )
}

export default DeleteData