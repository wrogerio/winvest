import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Button, Col, Form, Row } from "react-bootstrap";

// components
import HeaderPage from '@/components/HeaderPage';
import { nDateIso, toFirstLetterUpperCase, nDateIsoPlusOneDay } from "@/helper/util";
import { SaveItem, GetItem } from "@/services/EnviosService";
import { GetList } from "@/services/InstituicoesService";


const Index = () => {
  const urlRoot = "envios";
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const btSubmit = useRef();
  const [item, setItem] = useState({ InstituicaoId: '', DtEnvio: nDateIso(new Date()), Valor: '', TipoEnvio: 'PIX' });
  const [instituicoes, setInstituicoes] = useState([]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() !== false) {
      btSubmit.current.style.display = "none";
      SaveItem({
        Id: item.Id,
        InstituicaoId: item.InstituicaoId,
        DtEnvio: nDateIsoPlusOneDay(item.DtEnvio),
        Valor: item.Valor,
        TipoEnvio: item.TipoEnvio
      }).then((result) => {
        if (result) router.push(`/${urlRoot}`);
        else console.log("Erro ao salvar");
      })
    }
    setValidated(true);
  };

  const getInstituicoes = async () => {
    GetList().then(data => {
      setInstituicoes(data);
    })
  }

  useEffect(() => {
    const id = window.location.pathname.split("/").pop()
    getInstituicoes().then(() => {
      if (id !== "0") {
        GetItem(id.toLowerCase()).then(item => {
          setItem({ Id: item.Id, InstituicaoId: item.InstituicaoId, DtEnvio: item.DtEnvioString, TipoEnvio: item.TipoEnvio, Valor: item.Valor });
        })
      }
    });
  }, [])

  return (
    <>
      <HeaderPage title={toFirstLetterUpperCase(urlRoot)} pageType="cadastrar" accessKey="v" textBt="Voltar" iconBt="fas fa-plus-circle me-2"></HeaderPage>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <fieldset>
          <Row>
            <Col xs={12} lg={6} >
              <Form.Group className="mb-3" controlId="InstituicaoId">
                <Form.Label>Instituicao</Form.Label>
                <Form.Select autoFocus required name="InstituicaoId" value={item.InstituicaoId} onChange={e => setItem({ ...item, InstituicaoId: e.target.value })}>
                  <option value="">Selecione</option>
                  {instituicoes.map((item, index) => (
                    <option key={index} value={item.Id}>{item.Nome}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  Selecione a instituição
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfeito!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={2} >
              <Form.Group className="mb-3" controlId="TipoEnvio">
                <Form.Label>Tipo</Form.Label>
                <Form.Select required name="TipoEnvio" value={item.TipoEnvio} onChange={e => setItem({ ...item, TipoEnvio: e.target.value })}>
                  <option value="">Selecione</option>
                  <option value="PIX">PIX</option>
                  <option value="TED">TED</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  Selecione a instituição
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfeito!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={2} >
              <Form.Group className="mb-3" controlId="DtEnvio">
                <Form.Label>Data de Envio</Form.Label>
                <Form.Control type="date" required name="DtEnvio" value={item.DtEnvio} onChange={e => setItem({ ...item, DtEnvio: e.target.value })} />
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  Informe a data de envio
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfeito!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={2} >
              <Form.Group className="mb-3" controlId="Valor">
                <Form.Label>Valor R$</Form.Label>
                <Form.Control type="number" step={0.01} required name="Valor" value={item.Valor} onChange={e => setItem({ ...item, Valor: e.target.value })} />
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  Forneça um valor
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
      </Form>
    </>
  );
};

export default Index;
