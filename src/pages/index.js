import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Col, Container, Row } from 'react-bootstrap'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Row>
        <Col>
          <h1>Invest</h1>
        </Col>
      </Row>
    </>
  )
}
