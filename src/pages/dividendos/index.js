import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, Col, Row, Table } from 'react-bootstrap';
// components
import HeaderPage from "@/components/HeaderPage";
import { formatDate_DDMMYYYY, toFirstLetterUpperCase, handleSearch, formatCurrency, getDaysInMonth } from '@/helper/util';
// services
import { GetList, RemoveItem } from '@/services/DividendosService'

const Instituicoes = () => {
  const urlRoot = "dividendos";
  const [termo, setTermo] = useState("");
  const [lista, setLista] = useState([]);
  const [listaTotal, setListaTotal] = useState(0);
  const [total, setTotal] = useState(0);

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
      handleTotal();

      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();

      setTermo('/' + mm + '/' + yyyy);
    })
  }, [])

  const handleTotal = () => {
    setTimeout(() => {
      const tds = document.querySelectorAll("tr:not(.d-none) > .tdTotal");
      setListaTotal(tds.length);
      const total = Array.from(tds).reduce((acc, cur) => {
        return acc + parseFloat(cur.innerText.replace("R$", "").replace(".", "").replace(",", ".").replace(" ", ""));
      }, 0);
      setTotal(total.toFixed(2));
    }, 600);
  }

  useEffect(() => {
    handleSearch(termo.toLowerCase());
    handleTotal();
  }, [termo])

  return (
    <>
      <HeaderPage title={toFirstLetterUpperCase(urlRoot)} pageType="index" accessKey="c" textBt="Cadastrar" iconBt="fas fa-plus-circle me-2"></HeaderPage>
      <Row>
        <Col xs={6} md={3}>
          <Card>
            <Card.Title className="p-1 text-center mb-0 text-danger">
              Registros
            </Card.Title>
            <Card.Body className="p-1">
              <h3 className="text-center fw-bold">{listaTotal}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3} className="mb-2">
          <Card>
            <Card.Title className="p-1 text-center mb-0 text-danger">
              Total
            </Card.Title>
            <Card.Body className="p-1">
              <h3 className="text-center fw-bold">{formatCurrency(total)}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3} className="mb-2">
          <Card>
            <Card.Title className="p-1 text-center mb-0 text-danger">
              Média
            </Card.Title>
            <Card.Body className="p-1">
              <h3 className="text-center fw-bold">{formatCurrency(total / listaTotal)}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3} className="mb-2">
          <Card>
            <Card.Title className="p-1 text-center mb-0 text-danger">
              Por dia
            </Card.Title>
            <Card.Body className="p-1">
              <h3 className="text-center fw-bold">{formatCurrency(total / getDaysInMonth())}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="m-0">
          <input type="text" className="form-control" placeholder="Pesquisar" value={termo} onChange={e => setTermo(e.target.value)} />
          <Table bordered hover>
            <thead>
              <tr>
                <th>Sigla</th>
                <th>Data</th>
                <th className="d-none d-md-table-cell">Qtd</th>
                <th className="d-none d-md-table-cell">Valor</th>
                <th>Total</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {
                Array.isArray(lista) && lista.map((item, index) => (
                  <tr data-search={`${item.Sigla}-${item.Nome}-${item.MesNome}-${formatDate_DDMMYYYY(item.DtDividendo)}-${formatCurrency(item.Valor)}-${item.Qtd}-${item.Total}`} key={index}>
                    <td>{item.Sigla}</td>
                    <td>{formatDate_DDMMYYYY(item.DtDividendo)}</td>
                    <td className="d-none d-md-table-cell">{item.Qtd}</td>
                    <td className="text-end d-none d-md-table-cell">{formatCurrency(item.Valor)}</td>
                    <td className={["text-end", item.Total > 0 ? "tdTotal" : ""].join(" ")}>{formatCurrency(item.Total)}</td>
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
