import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Row, Table } from 'react-bootstrap';
// components
import HeaderPage from "@/components/HeaderPage";
import { toFirstLetterUpperCase, handleSearch, formatDate_DDMMYYYY, formatCurrency } from '@/helper/util';
// services
import { GetList, RemoveItem } from '@/services/CarteirasService'

const Instituicoes = () => {
  const urlRoot = "carteiras";
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
                <th>Ano</th>
                <th>Mes</th>
                <th>Sigla</th>
                <th className="d-none d-md-table-cell">Tipo</th>
                <th>Qtd</th>
                <th className="d-none d-md-table-cell">Valor</th>
                <th className="d-none d-md-table-cell">Total</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {
                Array.isArray(lista) && lista.map((item, index) => (
                  <tr className={item.Tipo == 'Venda' ? 'text-danger fw-bold' : ''} data-search={`${formatDate_DDMMYYYY(item.DtLancamentoDt)}-${item.Sigla}-${item.Ano}-${item.Mes}-${item.Dia}-${item.MesNome}-${item.Qtd}-${item.Valor}-${item.Total}`} key={index}>
                    <td>{item.Ano}</td>
                    <td>{item.Mes}</td>
                    <td>{item.Sigla}</td>
                    <td className="d-none d-md-table-cell">{item.Tipo}</td>
                    <td>{item.Qtd}</td>
                    <td className="d-none d-md-table-cell">{formatCurrency(item.Valor)}</td>
                    <td className="d-none d-md-table-cell">{formatCurrency(item.Total)}</td>
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

export default Instituicoes;
