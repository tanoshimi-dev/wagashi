import "@/styles/globals.css";

//import '@mui/x-data-grid/modern/index.css'; 

import type { AppProps } from "next/app";

import { Provider as ReduxProvider } from 'react-redux';
import { store as RedusStore } from '@/lib/redux/store';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={RedusStore}>
      <Component {...pageProps} />
    </ReduxProvider>
  );
}
