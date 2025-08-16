# Payment Integration Guide for TheFineThings Website

## Overview
This guide provides comprehensive instructions for integrating payment systems suitable for Ghana, including Paystack (recommended), Hubtel, and international card processing.

## 1. Recommended: Paystack Integration

### Why Paystack?
- Leading payment processor in Ghana
- Supports Mobile Money, Card payments, Bank transfers
- Excellent documentation and developer experience
- Competitive pricing (2.9% + ₵0.30 per transaction)

### Setup Process:

#### Step 1: Account Setup
1. Visit https://paystack.com/signup
2. Create business account with valid business documents
3. Complete KYC verification process
4. Get your API keys from the dashboard

#### Step 2: Install Dependencies
```bash
npm install @paystack/inline-js
npm install --save-dev @types/paystack-js
```

#### Step 3: Environment Variables
Create/update `.env.local`:
```
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxx
```

#### Step 4: Create Payment Component
Create `src/components/PaystackButton.tsx`:
```tsx
'use client'
import { PaystackButton } from 'react-paystack'
import { useCart } from '@/lib/cart-context'

interface PaystackPaymentProps {
  email: string
  phone: string
  name: string
}

export default function PaystackPayment({ email, phone, name }: PaystackPaymentProps) {
  const { getCartTotal, clearCart, items } = useCart()
  
  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: Math.round(getCartTotal() * 100), // Paystack expects amount in pesewas
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    currency: 'GHS',
    channels: ['card', 'mobile_money', 'bank'],
    metadata: {
      phone,
      custom_fields: [
        {
          display_name: "Items",
          variable_name: "items",
          value: JSON.stringify(items)
        }
      ]
    }
  }

  const handlePaystackSuccessAction = (reference: any) => {
    console.log('Payment successful:', reference)
    clearCart()
    // Redirect to success page or send confirmation email
    window.location.href = '/order-success?ref=' + reference.reference
  }

  const handlePaystackCloseAction = () => {
    console.log('Payment closed')
  }

  const componentProps = {
    ...config,
    text: `Pay ₵${getCartTotal().toFixed(2)}`,
    onSuccess: handlePaystackSuccessAction,
    onClose: handlePaystackCloseAction,
  }

  return (
    <div className="mt-6">
      <PaystackButton 
        {...componentProps} 
        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
      />
    </div>
  )
}
```

#### Step 5: Update Checkout Page
Add to `src/app/checkout/page.tsx`:
```tsx
import PaystackPayment from '@/components/PaystackButton'

// Add this where you want the payment button
<PaystackPayment 
  email={customerEmail} 
  phone={customerPhone} 
  name={customerName} 
/>
```

#### Step 6: Webhook Setup (Optional but Recommended)
Create `src/app/api/paystack/webhook/route.ts`:
```tsx
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('x-paystack-signature')
  
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest('hex')
  
  if (hash === signature) {
    const event = JSON.parse(body)
    
    if (event.event === 'charge.success') {
      // Handle successful payment
      console.log('Payment successful:', event.data)
      // Update order status, send confirmation email, etc.
    }
    
    return NextResponse.json({ received: true })
  }
  
  return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
}
```

## 2. Alternative: Hubtel Integration

### Why Hubtel?
- Ghana-based payment processor
- Strong mobile money integration
- Local support and understanding

### Setup Process:
1. Visit https://hubtel.com/business-payments
2. Create business account
3. Get API credentials
4. Use Hubtel's Checkout API or SDK

### Basic Implementation:
```tsx
const hubtelConfig = {
  amount: getCartTotal(),
  currency: 'GHS',
  customerEmail: email,
  customerPhone: phone,
  reference: generateReference(),
  callback_url: 'https://yoursite.com/payment-callback'
}

// Use Hubtel's checkout API
fetch('https://api.hubtel.com/v2/checkout/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${HUBTEL_API_KEY}`
  },
  body: JSON.stringify(hubtelConfig)
})
```

## 3. International Cards: Stripe Integration

### For international customers or additional card processing:

#### Setup:
```bash
npm install @stripe/stripe-js stripe
```

#### Basic Implementation:
```tsx
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function StripePayment() {
  const handleStripePayment = async () => {
    const stripe = await stripePromise
    
    // Create checkout session on your backend
    const response = await fetch('/api/stripe/create-session', {
      method: 'POST',
      body: JSON.stringify({ items: cartItems })
    })
    
    const session = await response.json()
    
    // Redirect to Stripe Checkout
    await stripe?.redirectToCheckout({
      sessionId: session.id
    })
  }
  
  return (
    <button onClick={handleStripePayment}>
      Pay with Card (International)
    </button>
  )
}
```

## 4. Mobile Money Integration

### Ghana Mobile Money Numbers:
- MTN Mobile Money: *170#
- Vodafone Cash: *110#  
- AirtelTigo Money: *432#

### Implementation Tips:
- Always provide clear USSD instructions
- Support all major networks
- Handle network timeouts gracefully
- Provide fallback payment options

## 5. Security Best Practices

### Frontend Security:
- Never store sensitive payment data
- Use HTTPS for all payment flows
- Validate all inputs
- Use environment variables for API keys

### Backend Security:
- Verify webhook signatures
- Use server-side validation
- Log all payment events
- Implement rate limiting
- Store minimal customer data

## 6. Testing

### Test Cards (Paystack):
- Successful: 4084084084084081
- Declined: 4084084084084081 (with insufficient funds)
- Invalid: 4084084084084080

### Test Mobile Money:
- Use Paystack test numbers provided in their documentation
- Test all major networks (MTN, Vodafone, AirtelTigo)

## 7. Production Checklist

### Before Going Live:
- [ ] Complete business verification
- [ ] Test all payment methods
- [ ] Set up webhook endpoints
- [ ] Implement error handling
- [ ] Add payment confirmation emails
- [ ] Test on mobile devices
- [ ] Verify tax calculations
- [ ] Set up monitoring and alerts
- [ ] Create customer support flows
- [ ] Document refund processes

## 8. Customer Experience

### Payment Flow:
1. Customer adds items to cart
2. Proceeds to checkout
3. Enters shipping/billing details
4. Selects payment method (Mobile Money/Card)
5. Completes payment
6. Receives confirmation
7. Gets order tracking information

### Mobile Money Flow:
1. Customer selects Mobile Money
2. Enters phone number
3. Gets USSD prompt on phone
4. Enters PIN to complete payment
5. Receives SMS confirmation

## 9. Business Considerations

### Pricing Structure:
- Paystack: 2.9% + ₵0.30 per transaction
- International cards: ~3.5-4%
- Mobile money: Usually lower rates
- Consider passing fees to customer or absorbing in pricing

### Settlement:
- Paystack: Next day settlement
- Consider cash flow implications
- Set up proper accounting integration

## 10. Support and Resources

### Paystack Resources:
- Documentation: https://paystack.com/docs
- Support: support@paystack.com
- Phone: +233 (0) 30 291 1234

### Testing Environment:
- Use test API keys during development
- Test with small amounts initially
- Verify all error scenarios

## Implementation Priority:
1. Start with Paystack (covers 80% of Ghana market)
2. Add mobile money as primary option
3. Include international cards for diaspora customers
4. Consider Hubtel as alternative/backup

## Next Steps:
1. Create Paystack account and get verified
2. Implement basic card payment flow
3. Add mobile money integration
4. Test thoroughly with real devices
5. Set up webhook handlers
6. Go live with monitoring

This guide provides a solid foundation for implementing payments in Ghana. Focus on Paystack first as it provides the best developer experience and market coverage.
