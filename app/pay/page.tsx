import React from 'react'

const PayPage = () => {
  return (
    <div>PayPage</div>
  )
}

export default PayPage

// 'use client'
// import React from 'react'
// import {YooMoneyCheckout} from './checkout';
// const YooKassa = require('yookassa');
// const yooKassa = new YooKassa({
//   shopId: '944245',
//   secretKey: 'test_t7GF_RswXnXGcvAkLSMvpoSg2KN6WrXmkEGxdVtGQ6A'
// });

// const PayPage = () => {
//   const checkout = YooMoneyCheckout(944245);
//   console.log('checkout', checkout);

//   checkout.tokenize({
//       number: '5555555555554477',
//       cvc: '999',
//       month: '12',
//       year: '24'
//   }).then((res: any) => {
//       if (res.status === 'success') {
//           const { paymentToken } = res.data.response;
//           console.log('paymentToken', paymentToken)
//           return paymentToken;
//       }
//   });



//   async function pay() {
//     const payment = await yooKassa.createPayment({
//         amount: {
//           value: "2.00",
//           currency: "RUB"
//         },
//         payment_method_data: {
//             type: "bank_card"
//         },
//         confirmation: {
//           type: "redirect",
//           return_url: "/"
//         },
//         description: "Тестим"
//     });

//     console.log('payment', payment);
//     return payment
//   }

//   return (
//     <div>
//       <button onClick={pay}>Создать платеж</button>
//     </div>
//   )
// }

// export default PayPage