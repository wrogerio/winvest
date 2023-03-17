import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Button, Col, Form, Row } from "react-bootstrap";

// components
import HeaderPage from '@/components/HeaderPage';
import { formatDateISO, toFirstLetterUpperCase } from "@/helper/util";
import { SaveItem, GetItem } from "@/services/RendimentosService";
import { GetList } from "@/services/InstituicoesService";

const Index = () => {
  const urlRoot = "rendimentos";
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const [instituicoes, setInstituicoes] = useState([]);
  const btSubmit = useRef();
  const [item, setItem] = useState({ InstituicaoId: "", DtRendimento: formatDateISO(new Date()), SaldoAnt: 0, Saldo: 0 });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() !== false) {
      btSubmit.current.style.display = "none";
      SaveItem(item).then((result) => {
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
    const id = window.location.pathname.split("/").pop();

    getInstituicoes().then(() => {
      if (id !== "0") {
        GetItem(id.toLowerCase()).then(item => {
          setItem({ Id: item.Id, InstituicaoId: item.InstituicaoId, DtRendimento: item.DtRendimentoString, SaldoAnt: item.SaldoAnt, Saldo: item.Saldo });
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
              <Form.Group className="mb-3" controlId="DtRendimento">
                <Form.Label>Data Rendimento</Form.Label>
                <Form.Control type="date" required name="DtRendimento" value={item.DtRendimento} onChange={e => setItem({ ...item, DtRendimento: e.target.value })} />
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  Informe a data do rendimento
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfeito!</Form.Control.Feedback>
              </Form.Group>
            </Col>
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
              <Form.Group className="mb-3" controlId="SaldoAnt">
                <Form.Label>Saldo Anterior</Form.Label>
                <Form.Control type="number" step={0.01} required name="SaldoAnt" value={item.SaldoAnt} onChange={e => setItem({ ...item, SaldoAnt: e.target.value })} />
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  Informe o saldo anterior
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfeito!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={2} >
              <Form.Group className="mb-3" controlId="Saldo">
                <Form.Label>Saldo</Form.Label>
                <Form.Control type="number" step={0.01} required name="Saldo" value={item.Saldo} onChange={e => setItem({ ...item, Saldo: e.target.value })} />
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  Informe o saldo anterior
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
