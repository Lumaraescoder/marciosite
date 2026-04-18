// export default function Stage3Confirmation({ bookingData }) {
//   return (
//     <div>
//       <div className="d-flex flex-column items-center text-center">
//         <div className="size-80 rounded-full flex-center bg-accent-1 text-white">
//           <i className="icon-check text-26"></i>
//         </div>

//         <h2 className="text-30 md:text-24 fw-700 mt-20">
//           System, your order was submitted successfully!
//         </h2>
//         <div className="mt-10">
//           Booking details has been sent to: booking@tourz.com
//         </div>
//       </div>

//       <div className="border-dashed-1 py-30 px-50 rounded-12 mt-30">
//         <div className="row y-gap-15">
//           <div className="col-md-3 col-6">
//             <div>Order Number</div>
//             <div className="text-accent-2">13119</div>
//           </div>

//           <div className="col-md-3 col-6">
//             <div>Date</div>
//             <div className="text-accent-2">{bookingData.date}</div>
//           </div>

//           <div className="col-md-3 col-6">
//             <div>Total</div>
//             <div className="text-accent-2">${bookingData.totalPrice}</div>
//           </div>

//           <div className="col-md-3 col-6">
//             <div>Payment Method</div>
//             <div className="text-accent-2">Credit card / Debit card</div>
//           </div>
//         </div>
//       </div>

//       <h2 className="text-30 md:text-24 fw-700 mt-60 md:mt-30">
//         Order Details
//       </h2>

//       <div className="d-flex item-center justify-between y-gap-5 pt-30">
//         <div className="text-18 fw-500">{bookingData.tourTitle}</div>
//         <div className="text-18 fw-500">${bookingData.totalPrice}</div>
//       </div>

//       <div className="mt-25">
//         <div className="d-flex items-center justify-between">
//           <div className="fw-500">Date:</div>
//           <div className="">{bookingData.date}</div>
//         </div>

//         <div className="d-flex items-center justify-between">
//           <div className="fw-500">Time:</div>
//           <div className="">{bookingData.time}</div>
//         </div>

//         <div className="d-flex items-center justify-between">
//           <div className="fw-500">Persons:</div>
//           <div className="">
//             {bookingData.persons} x ${bookingData.pricePerPerson} = $
//             {bookingData.totalPrice}
//           </div>
//         </div>
//       </div>

//       <div className="line mt-30 mb-30"></div>

//       <div className="d-flex item-center justify-between y-gap-5">
//         <div className="text-18 fw-500">Service per booking</div>
//         <div className="text-18 fw-500">$43</div>
//       </div>

//       <div className="line mt-30 mb-30"></div>

//       <div className="d-flex item-center justify-between y-gap-5">
//         <div className="text-18 fw-500">
//           Service per person ({bookingData.persons} Persons)
//         </div>
//         <div className="text-18 fw-500">${bookingData.totalPrice}</div>
//       </div>

//       <div className="line mt-30 mb-30"></div>

//       <div className="row justify-end">
//         <div className="col-md-4">
//           <div className="d-flex items-center justify-between">
//             <div className="text-18 fw-500">Total</div>
//             <div className="text-18 fw-500">${bookingData.totalPrice}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
