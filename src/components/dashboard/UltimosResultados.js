import { useState, useEffect } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
// services
import { GetUltimosResultados } from '@/services/DashboardService';
// helper
import { AbreviaMes, formatCurrency } from '@/helper/util';


const UltimosResultados = ({ lista, titulo, color }) => {
  return (
    <Card className='mb-2'>
      <Card.Title className='p-1 text-center mb-0'>
        <h3 className={['fw-bold', color].join(' ')}>{titulo}</h3>
      </Card.Title>
      <Card.Body className='p-2 pt-0'>
        <Table className='tbDash mb-0' bordered size='xs'>
          <thead>
            <tr>
              <th style={{ width: "33.3%" }}>{AbreviaMes(lista[2]?.MesNome)}</th>
              <th style={{ width: "33.3%" }}>{AbreviaMes(lista[1]?.MesNome)}</th>
              <th style={{ width: "33.4%" }}>{AbreviaMes(lista[0]?.MesNome)}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className={['d-block fw-bold', color].join(' ')}>
                  {formatCurrency(lista[2]?.Rendimento)}
                </span>
                <span className={['d-block fw-bold', color].join(' ')}>
                  {formatCurrency(lista[2]?.Rendimento / lista[2]?.DiasMes)}
                </span>
              </td>
              <td>
                <span className={['d-block fw-bold', color].join(' ')}>
                  {formatCurrency(lista[1]?.Rendimento)}
                </span>
                <span className={['d-block fw-bold', color].join(' ')}>
                  {formatCurrency(lista[1]?.Rendimento / lista[1]?.DiasMes)}
                </span>
              </td>
              <td>
                <span className={['d-block fw-bold', color].join(' ')}>
                  {formatCurrency(lista[0]?.Rendimento)}
                </span>
                <span className={['d-block fw-bold', color].join(' ')}>
                  {formatCurrency(lista[0]?.Rendimento / lista[0]?.DiasMes)}
                </span>
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default UltimosResultados;
