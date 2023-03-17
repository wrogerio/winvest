import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Row, Table } from 'react-bootstrap';
// components
import HeaderPage from "@/components/HeaderPage";
import { formatCurrency, formatDate, handleSearch, toFirstLetterUpperCase } from './../../helper/util';
// services
import { GetList, RemoveItem } from '../../services/EnviosService'

const Envios = () => {
  const urlRoot = "envios";
  const [termo, setTermo] = useState("");
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

  useEffect(() => {
    handleSearch(termo.toLowerCase());
  }, [termo])

  return (
    <>
      <HeaderPage title={toFirstLetterUpperCase(urlRoot)} lenght={lista.length} pageType="index" accessKey="c" textBt="Cadastrar" iconBt="fas fa-plus-circle me-2"></HeaderPage>
      <Row>
        <Col className="m-0">
          <input type="text" className="form-control" placeholder="Pesquisar" value={termo} onChange={e => setTermo(e.target.value)} />
          <Table bordered hover>
            <thead>
              <tr>
                <th>Instituicao</th>
                <th className="d-none d-md-table-cell">Tipo</th>
                <th className="d-none d-sm-table-cell">Data</th>
                <th style={{ width: 115 }}>Valor</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {
                Array.isArray(lista) && lista.map((item, index) => (
                  <tr data-search={`${item.Instituicao}-${item.TipoEnvio}-${formatDate(item.DtEnvio)}-${formatCurrency(item.Valor)}-${item.Valor}`} key={index}>
                    <td>{item.Instituicao}</td>
                    <td className="d-none d-md-table-cell">{item.TipoEnvio}</td>
                    <td className="d-none d-sm-table-cell">{formatDate(item.DtEnvio)}</td>
                    <td className="text-end">{formatCurrency(item.Valor)}</td>
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
