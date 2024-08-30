import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Alert,
} from "reactstrap";

function Login() {
  const [login, setUsername] = useState("");
  const [senha, setPassword] = useState("");
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState(""); // Para mostrar erros de API
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validação de preenchimento dos campos
    if (!login || !senha) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // Chamada à API para verificar o login
      const response = await fetch('http://localhost:8083/medalmanager/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, senha }),
      });

      const data = await response.json();


      if (response.ok && data) {
        // Se o login for bem-sucedido, salvar o token no localStorage
        localStorage.setItem("token", data.token);
        setError("");
        setApiError("");
        // Redirecionar para outra página após login bem-sucedido
        navigate("/admin/tables");
      } else {
        // Exibir mensagem de erro se o login falhar
        setError("Username ou Password incorreto");
      }
    } catch (err) {
      // Exibir mensagem de erro se a requisição falhar
      setApiError("Erro ao conectar com o servidor. Por favor, tente novamente mais tarde.");
    }
  };

  return (
    <>
      <div className="content">
        <Row className="justify-content-center">
          <Col md="4">
            <Card>
              <CardHeader>
                <h5 className="title">Login</h5>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleLogin}>
                  <FormGroup>
                    <label>Username</label>
                    <Input
                      placeholder="Enter your username"
                      type="text"
                      value={login}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Password</label>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      value={senha}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  {error && <Alert color="danger">{error}</Alert>}
                  {apiError && <Alert color="danger">{apiError}</Alert>}
                  <Button className="btn-fill" color="primary" type="submit">
                    Login
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Login;