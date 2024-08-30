import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import { useNavigate } from "react-router-dom";

function CadastroMedalhas() {
  const [paises, setPaises] = useState([]);
  const [esportes] = useState([
    { id: 1, nome: 'Atletismo' },
    { id: 2, nome: 'Natação' },
    { id: 3, nome: 'Ginástica' },
    { id: 4, nome: 'Vôlei' },
    { id: 5, nome: 'Basquetebol' },
    { id: 6, nome: 'Handebol' },
    { id: 7, nome: 'Tênis' },
    { id: 8, nome: 'Badminton' },
    { id: 9, nome: 'Pentatlo Moderno' }
  ]);
  const [formData, setFormData] = useState({
    idPais: "",
    idEsporte: "",
    tipoMedalha: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await fetch('http://localhost:8083/medalmanager/pais', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Erro na resposta da rede ao carregar países');
        }

        const data = await response.json();
        setPaises(data.content);
      } catch (err) {
        setError("Erro ao carregar países.");
        console.error("Erro ao carregar países:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaises();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8083/medalmanager/medalha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erro na resposta da rede ao enviar dados');
      }

      const result = await response.json();
      console.log("Dados enviados com sucesso:", result);
      setFormData({
        idPais: "",
        idEsporte: "",
        tipoMedalha: ""
      });

      navigate('/admin/tables');
    } catch (err) {
      setError("Erro ao enviar os dados. Por favor, tente novamente.");
      console.error("Erro ao enviar dados:", err);
    }
  };

  return (
    <>
      <div className="content">
        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Cadastro de Medalhas</h5>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-md-1" md="6">
                      <FormGroup>
                        <label>País</label>
                        <Input
                          name="idPais"
                          value={formData.idPais}
                          onChange={handleChange}
                          type="select"
                          required
                        >
                          <option value="">Selecione um país</option>
                          {paises.map((pais) => (
                            <option key={pais.id} value={pais.id}>
                              {pais.nome}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-md-1" md="6">
                      <FormGroup>
                        <label>Esporte</label>
                        <Input
                          name="idEsporte"
                          value={formData.idEsporte}
                          onChange={handleChange}
                          type="select"
                          required
                        >
                          <option value="">Selecione um esporte</option>
                          {esportes.map((esporte) => (
                            <option key={esporte.id} value={esporte.id}>
                              {esporte.nome}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Tipo de Medalha</label>
                        <Input
                          name="tipoMedalha"
                          value={formData.tipoMedalha}
                          onChange={handleChange}
                          type="select"
                          required
                        >
                          <option value="">Selecione um tipo de medalha</option>
                          <option value="OURO">Ouro</option>
                          <option value="PRATA">Prata</option>
                          <option value="BRONZE">Bronze</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <CardFooter>
                    <Button className="btn-fill" color="primary" type="submit">
                      Salvar
                    </Button>
                  </CardFooter>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CadastroMedalhas;