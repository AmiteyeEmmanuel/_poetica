import CartScreen from '@/screens/user/cart/cart.screen';
import { StripeProvider } from '@stripe/stripe-react-native';

export default function Index() {
  const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!publishableKey) {
    console.error('Stripe publishable key is not set');
    return null;
  }

  return (
    <StripeProvider publishableKey={publishableKey}>
      <CartScreen />
    </StripeProvider>
  );
}
