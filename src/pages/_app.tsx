import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { WishlistProvider } from "@/components/WishlistContext";
import { NotificationProvider } from "@/components/NotificationProvider";
import { BookingProvider } from "@/components/BookingContext";

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <BookingProvider>
      <NotificationProvider>
        <WishlistProvider>
          <Component {...pageProps} />
        </WishlistProvider>
      </NotificationProvider>
    </BookingProvider>
  );
}
