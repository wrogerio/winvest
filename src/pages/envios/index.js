import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Row, Table } from 'react-bootstrap';
// components
import HeaderPage from "@/components/HeaderPage";
import { formatCurrency, formatDate, toFirstLetterUpperCase } from './../../helper/util';
// services
import { GetList, RemoveItem } from '../../services/EnviosService'

const Envios = () => {
  const urlRoot = "envios";
  const [lista, setLista] = useState([]);

  const handleRemove = (id) => {
    if (!confirm("Deseja realmente remover este item?")) return;
    RemoveItem(id).then(data => {
      GetList().then(data => {
        setLista(data);
      })
    })
  }

  useEffect(() => {
    GetList().then(data => {
      setLista(data);
    })
  }, [])

  return (
    <>
      <HeaderPage title={toFirstLetterUpperCase(urlRoot)} pageType="index" accessKey="c" textBt="Cadastrar" iconBt="fas fa-plus-circle me-2"></HeaderPage>
      <Row>
        <Col className="m-0">
          <Table bordered hover>
            <thead>
              <tr>
                <th>Instituicao</th>
                <th>Tipo</th>
                <th>Data</th>
                <th>Valor</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {
                Array.isArray(lista) && lista.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Instituicao}</td>
                    <td>{item.TipoEnvio}</td>
                    <td>{formatDate(item.DtEnvio)}</td>
                    <td>{formatCurrency(item.Valor)}</td>
                    <td className="text-center">
                      <Link href={`/${urlRoot}/add-or-edit/${item.Id}`}>
                        <i className="fas fa-edit me-2"></i>
                      </Link>
                      <span className="text-danger" onClick={e => handleRemove(item.Id.toLowerCase())}>
                        <i className="fas fa-trash-alt"></i>
                      </span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default Envios;
