import { useState, useEffect } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
// services
import { GetUltimosResultados } from '@/services/DashboardService';
// helper
import { AbreviaMes, formatCurrency } from '@/helper/util';




const UltimosResultados = ({ lista, titulo }) => {
  return (
    <Card className='mb-2'>
      <Card.Title className='p-1 text-center mb-0'>
        <h3 className='text-primary fw-bold'>{titulo}</h3>
      </Card.Title>
      <Card.Body className='p-2 pt-0'>
        <Table className='tbDash mb-0' striped bordered size='xs'>
          <thead>
            <tr>
              <th style={{ width: "33.3%" }}>{AbreviaMes(lista[2]?.MesNome)}</th>
              <th style={{ width: "33.3%" }}>{AbreviaMes(lista[1]?.MesNome)}</th>
              <th style={{ width: "33.4%" }}>{AbreviaMes(lista[0]?.MesNome)}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formatCurrency(lista[2]?.Rendimento)}</td>
              <td>{formatCurrency(lista[1]?.Rendimento)}</td>
              <td>{formatCurrency(lista[0]?.Rendimento)}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default UltimosResultados;
