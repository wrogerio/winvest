import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css'

import Navbar from '@/components/Navbar'
import Head from 'next/head'
import { Container } from 'react-bootstrap';

export default function App({ Component, pageProps }) {
  return (
    <Container>
      <Head>
        <title>W Invest</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </Container>
  )
}
