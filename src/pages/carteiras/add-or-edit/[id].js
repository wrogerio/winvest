import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Button, Col, Form, Row } from "react-bootstrap";

// components
import HeaderPage from '@/components/HeaderPage';
import { nDateIso, nDateIsoPlusOneDay, toFirstLetterUpperCase } from "@/helper/util";
import { SaveItem, GetItem, GetLast } from "@/services/CarteirasService";
import { GetList } from "@/services/FundosService";

const Index = () => {
  const urlRoot = "carteiras";
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const [fundos, setFundos] = useState([]);
  const btSubmit = useRef();
  const [item, setItem] = useState({ FundoId: "", DtLancamento: nDateIso(new Date()), Tipo: "COMPRA", Qtd: 0, Valor: 0 });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() !== false) {
      btSubmit.current.style.display = "none";
      SaveItem(
        {
          ...item,
          DtLancamento: nDateIsoPlusOneDay(item.DtLancamento),
        }
      ).then((result) => {
        if (result) router.push(`/${urlRoot}`);
        else console.log("Erro ao salvar");
      })
    }
    setValidated(true);
  };

  const getFundos = async () => {
    GetList().then(data => {
      setFundos(data);
    })
  }

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    getFundos().then(() => {
      if (id !== "0") {
        GetItem(id.toLowerCase()).then(item => {
          setItem({
            Id: item.Id,
            FundoId: item.FundoId,
            DtLancamento: nDateIso(item.DtLancamentoDt),
            Tipo: item.Tipo,
            Qtd: item.Qtd,
            Valor: item.Valor,
          });
        })
      }
    })
  }, [])

  return (
    <>
      <HeaderPage title={toFirstLetterUpperCase(urlRoot)} pageType="cadastrar" accessKey="v" textBt="Voltar" iconBt="fas fa-plus-circle me-2"></HeaderPage>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <fieldset>
          <Row>
            <Col xs={12} lg={2} >
              <Form.Group className="mb-3" controlId="DtLancamento">
                <Form.Label>Data Lançamento</Form.Label>
                <Form.Control autoFocus type="date" required name="DtLancamento" value={item.DtLancamento} onChange={e => setItem({ ...item, DtLancamento: e.target.value })} />
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  Informe a data de Lançamento
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfeito!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={4} >
              <Form.Group className="mb-3" controlId="FundoId">
                <Form.Label>Fundo</Form.Label>
                <Form.Select required name="FundoId" value={item.FundoId} onChange={e => setItem({ ...item, FundoId: e.target.value })}>
                  <option value="">Selecione</option>
                  {fundos.map((item, index) => (
                    <option key={index} value={item.Id}>{item.Sigla}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  Selecione o fundo
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfeito!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={2} >
              <Form.Group className="mb-3" controlId="FundoId">
                <Form.Label>Tipo</Form.Label>
                <Form.Select required name="FundoId" value={item.Tipo} onChange={e => setItem({ ...item, Tipo: e.target.value })}>
                  <option value="">Selecione</option>
                  <option value="Compra">Compra</option>
                  <option value="Venda">Venda</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  Selecione o fundo
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfeito!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={2} >
              <Form.Group className="mb-3" controlId="SaldoAnt">
                <Form.Label>Qtd</Form.Label>
                <Form.Control type="number" step={0} required name="Qtd" value={item.Qtd} onChange={e => setItem({ ...item, Qtd: e.target.value })} />
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  Informe a quantidade
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfeito!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={2} >
              <Form.Group className="mb-3" controlId="Saldo">
                <Form.Label>Valor</Form.Label>
                <Form.Control type="number" step={0.01} required name="Valor" value={item.Valor} onChange={e => setItem({ ...item, Valor: e.target.value })} />
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  Informe o valor
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfeito!</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </fieldset>
        <Row>
          <Col>
            <Button ref={btSubmit} type="submit">Submit</Button>
          </Col>
        </Row>
      </Form >
    </>
  );
};

export default Index;
