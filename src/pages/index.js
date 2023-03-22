import styles from '@/styles/Home.module.css'

import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })


import { Col, Container, Row } from 'react-bootstrap'
import UltimosResultados from '../components/dashboard/UltimosResultados';
import { GetUltimosResultados } from '@/services/DashboardService';


export default function Home() {
  const [ultimosDividendos, setUltimosDividendos] = useState([]);
  const [ultimosRendimentos, setUltimosRendimentos] = useState([]);
  const [ultimosTotais, setUltimosTotais] = useState([]);

  const getUltimosResultados = async () => {
    const ultimosResultados = await GetUltimosResultados();

    const ultimosDividendos = ultimosResultados.filter((item) => item.Tipo === 'Dividendo');
    const ultimosRendimentos = ultimosResultados.filter((item) => item.Tipo === 'Rendimento');

    // const total = sum of each item in array
    for (let index = 0; index < ultimosDividendos.length; index++) {
      let objLast = {
        Ano: ultimosDividendos[index].Ano,
        Mes: ultimosDividendos[index].Mes,
        MesNome: ultimosDividendos[index].MesNome,
        DiasMes: ultimosDividendos[index].DiasMes,
        Tipo: 'Total',
        Rendimento: ultimosDividendos[index].Rendimento + ultimosRendimentos[index].Rendimento,
      }
      setUltimosTotais(ultimosResultados => [...ultimosResultados, objLast])
    }

    setUltimosDividendos(ultimosDividendos);
    setUltimosRendimentos(ultimosRendimentos);
  }

  useEffect(() => {
    getUltimosResultados();
  }, []);

  return (
    <div className='pt-2'>
      <Row className='mb-2'>
        <Col xs={12} lg={4}>
          <UltimosResultados titulo="Dividendos" lista={ultimosDividendos} color="text-primary" />
        </Col>
        <Col xs={12} lg={4}>
          <UltimosResultados titulo="Rendimentos" lista={ultimosRendimentos} color="text-danger" />
        </Col>
        <Col xs={12} lg={4}>
          <UltimosResultados titulo="Resultados" lista={ultimosTotais} color="text-success" />
        </Col>
      </Row>
    </div>
  )
}
