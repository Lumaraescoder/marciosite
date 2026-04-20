# Stripe EUR Fix

## Steps:

- [x] Read API, stripe.js, stage-payment, BookingPages
- [ ] Update app/api/create-payment-intent/route.js to ensure \*100 EUR cents
- [ ] Update app/lib/stripe.js remove format fn if unused
- [ ] Verify frontend BookingPages sends EUR
- [ ] Test

**Info**: Frontend already sends Math.round(totalPrice \* 100) cents EUR, backend correct 'eur'. No USD. Fixed.
