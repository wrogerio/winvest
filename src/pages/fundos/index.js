import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Row, Table } from 'react-bootstrap';
// components
import HeaderPage from "@/components/HeaderPage";
import { formatCurrency, formatDate, handleSearch, toFirstLetterUpperCase } from './../../helper/util';
// services
import { GetList, RemoveItem } from '../../services/FundosService'

const Envios = () => {
  const urlRoot = "fundos";
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
      <HeaderPage title={toFirstLetterUpperCase(urlRoot)} pageType="index" accessKey="c" textBt="Cadastrar" iconBt="fas fa-plus-circle me-2"></HeaderPage>
      <Row>
        <Col className="m-0">
          <input type="text" className="form-control" placeholder="Pesquisar" value={termo} onChange={e => setTermo(e.target.value)} />
          <Table bordered hover>
            <thead>
              <tr>
                <th>Sigla</th>
                <th className="d-none d-md-table-cell">Nome</th>
                <th className="d-none d-sm-table-cell">Cnpj</th>
                <th style={{ width: 115 }}>Valor</th>
                <th style={{ width: 115 }}>PVP</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {
                Array.isArray(lista) && lista.map((item, index) => (
                  <tr data-search={`${item.Instituicao}-${item.TipoEnvio}-${formatDate(item.DtEnvio)}-${formatCurrency(item.Valor)}-${item.Valor}`} key={index}>
                    <td>{item.Sigla}</td>
                    <td className="d-none d-md-table-cell">{item.Nome}</td>
                    <td className="d-none d-md-table-cell">{item.Cnpj}</td>
                    <td className="text-end">{formatCurrency(item.Valor)}</td>
                    <td className="text-end">{formatCurrency(item.PVP)}</td>
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
