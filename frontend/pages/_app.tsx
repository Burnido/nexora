import type { AppProps } from 'next/app'
import '../styles/globals.css'
import SmoothScrollProvider from '../components/providers/SmoothScrollProvider'

function App({ Component, pageProps }: AppProps) {
  return (
    <SmoothScrollProvider>
      <Component {...pageProps} />
    </SmoothScrollProvider>
  )
}

export default App
