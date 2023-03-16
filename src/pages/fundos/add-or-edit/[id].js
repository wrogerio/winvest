import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Button, Col, Form, Row } from "react-bootstrap";
import MaskedFormControl from 'react-bootstrap-maskedinput'


// components
import HeaderPage from '@/components/HeaderPage';
import { formatDateISO, toFirstLetterUpperCase } from "@/helper/util";
import { SaveItem, GetItem } from "@/services/FundosService";


const Index = () => {
  const urlRoot = "fundos";
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const btSubmit = useRef();
  const [item, setItem] = useState({ Sigla: '', Nome: '', Cnpj: '', Valor: '0', PVP: '0' });

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

  useEffect(() => {
    const id = window.location.pathname.split("/").pop()
    if (id !== "0") {
      GetItem(id.toLowerCase()).then(item => {
        setItem({ Id: item.Id, Sigla: item.Sigla, Nome: item.Nome, Cnpj: item.Cnpj, Valor: item.Valor, PVP: item.PVP });
      })
    }
  }, [])

  return (
    <>
      <HeaderPage title={toFirstLetterUpperCase(urlRoot)} pageType="cadastrar" accessKey="v" textBt="Voltar" iconBt="fas fa-plus-circle me-2"></HeaderPage>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <fieldset>
          <Row>
            <Col xs={12} lg={2} >
              <Form.Group className="mb-3" controlId="Sigla">
                <Form.Label>Sigla</Form.Label>
                <Form.Control type="text" autoFocus maxLength={10} required name="Sigla" value={item.Sigla} onChange={e => setItem({ ...item, Sigla: e.target.value.toUpperCase() })} />
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  Informe a sigla
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfeito!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={4} >
              <Form.Group className="mb-3" controlId="Nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" maxLength={50} required name="Nome" value={item.Nome} onChange={e => setItem({ ...item, Nome: e.target.value.toUpperCase() })} />
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  Informe o Nome
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfeito!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={2} >
              <Form.Group className="mb-3" controlId="Cnpj">
                <Form.Label>Cnpj</Form.Label>
                <MaskedFormControl type='text' name='phoneNumber' mask='11.111.111/1111-11' value={item.Cnpj} onChange={e => setItem({ ...item, Cnpj: e.target.value })} />
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  Informe o Cnpj
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfeito!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={2} >
              <Form.Group className="mb-3" controlId="Valor">
                <Form.Label>Valor</Form.Label>
                <Form.Control type="number" step={0.01} required name="Valor" value={item.Valor} onChange={e => setItem({ ...item, Valor: e.target.value })} />
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  Informe o Valor
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfeito!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12} lg={2} >
              <Form.Group className="mb-3" controlId="PVP">
                <Form.Label>PVP</Form.Label>
                <Form.Control type="number" step={0.01} required name="PVP" value={item.PVP} onChange={e => setItem({ ...item, PVP: e.target.value })} />
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  Informe o PVP
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfeito!</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button ref={btSubmit} type="submit">Submit</Button>
            </Col>
          </Row>
        </fieldset>
      </Form>
    </>
  );
};

export default Index;
