import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Button, Col, Form, Row } from "react-bootstrap";

// components
import HeaderPage from '@/components/HeaderPage';
import { nDateIso, toFirstLetterUpperCase, nDateIsoPlusOneDay } from "@/helper/util";
import { SaveItem, GetItem, GetLast } from "@/services/DividendosService";
import { GetList } from "@/services/FundosService";
import { ConfereQtdSigla } from "@/services/CarteirasService";

const Index = () => {
  const urlRoot = "dividendos";
  const router = useRouter();
  const fundoRef = useRef();
  const valorRef = useRef();
  const [validated, setValidated] = useState(false);
  const [fundos, setFundos] = useState([]);
  const btSubmit = useRef();
  const [item, setItem] = useState({ FundoId: "", DtDividendo: nDateIso(new Date()), Qtd: 0, Valor: 0 });

  const handleSubmit = (event) => {
    const id = window.location.pathname.split("/").pop();
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() !== false) {
      btSubmit.current.style.display = "none";

      SaveItem({
        ...item, DtDividendo: nDateIsoPlusOneDay(item.DtDividendo)
      }).then((result) => {
        if (result) router.push(`/${urlRoot}`);
        else {
          console.log("Erro ao salvar");
          btSubmit.current.style.display = "block";
        }
      })
    }
    setValidated(true);
  };

  const getFundos = async () => {
    GetList().then(data => {
      setFundos(data);
    })
  }

  const handleConfereQtd = (e) => {
    if (e.code == 'ControlLeft') {
      const ano = item.DtDividendo.split("-")[0];
      const mes = item.DtDividendo.split("-")[1];
      const sigla = fundoRef.current.options[fundoRef.current.selectedIndex].text.split(" - ")[0];
      ConfereQtdSigla(ano, mes, sigla).then(data => {
        if (data) {
          setItem({ ...item, Qtd: data.Qtd });
          valorRef.current.focus();
        }
      })
    }
  }

  const handleSubtracao = (e) => {
    if (e.code == 'ControlLeft') {
      const valor = item.Valor / item.Qtd;
      setItem({ ...item, Valor: valor });
    }
  }

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    getFundos().then(() => {
      if (id !== "0") {
        GetItem(id.toLowerCase()).then(item => {
          setItem({ Id: item.Id, FundoId: item.FundoId, DtDividendo: nDateIso(item.DtDividendo), Qtd: item.Qtd, Valor: item.Valor });
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
              <Form.Group className="mb-3" controlId="DtDividendo">
                <Form.Label>Data Dividendo</Form.Label>
                <Form.Control autoFocus type="date" required name="DtDividendo" value={item.DtDividendo} onChange={e => setItem({ ...item, DtDividendo: e.target.value })} />
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  Informe a data do dividendo
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfeito!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={6} >
              <Form.Group className="mb-3" controlId="FundoId">
                <Form.Label>Fundo</Form.Label>
                <Form.Select required name="FundoId" ref={fundoRef} value={item.FundoId} onChange={e => setItem({ ...item, FundoId: e.target.value })}>
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
              <Form.Group className="mb-3" controlId="SaldoAnt">
                <Form.Label>Qtd de Cotas</Form.Label>
                <Form.Control type="number" step={0} required name="Qtd" value={item.Qtd} onKeyDown={e => handleConfereQtd(e)} onChange={e => setItem({ ...item, Qtd: e.target.value })} />
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  Informe a qtd de cotas
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfeito!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={2} >
              <Form.Group className="mb-3" controlId="Saldo">
                <Form.Label>Valor</Form.Label>
                <Form.Control type="number" step={0.01} ref={valorRef} required name="Valor" value={item.Valor} onKeyDown={e => handleSubtracao(e)} onChange={e => setItem({ ...item, Valor: e.target.value })} />
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
