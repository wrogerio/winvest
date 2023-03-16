import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Col, Form, Row } from "react-bootstrap";

// components
import HeaderPage from '@/components/HeaderPage';
import { toFirstLetterUpperCase } from "@/helper/util";
import { SaveItem } from "@/services/InstituicoesService";
import { GetItem } from './../../../services/InstituicoesService';

const Index = () => {
  const urlRoot = "instituicoes";
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const [item, setItem] = useState({ Nome: '' });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() !== false) {
      SaveItem(item).then((result) => {
        if (result) router.push(`/${urlRoot}`);
        else console.log("Erro ao salvar");
      })
    }
    setValidated(true);
  };

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();

    if (id !== "0") {
      GetItem(id.toLowerCase()).then(data => {
        setItem(data);
      })
    }
  }, [])

  return (
    <>
      <HeaderPage title={toFirstLetterUpperCase(urlRoot)} pageType="cadastrar" accessKey="v" textBt="Voltar" iconBt="fas fa-plus-circle me-2"></HeaderPage>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <fieldset>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Instituicao</Form.Label>
                <Form.Control type="text" required placeholder="Nome da instituicao" name="Nome" value={item.Nome} onChange={e => setItem({ ...item, Nome: e.target.value })} />
                <Form.Control.Feedback type="invalid" className="bg-danger text-white p-2 rounded">
                  Informe o nome da instituição
                </Form.Control.Feedback>
                <Form.Control.Feedback className="bg-success text-white p-2 rounded">Perfeito!</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </fieldset>
          <Col>
            {!validated && <Button type="submit">Submit</Button>}
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Index;