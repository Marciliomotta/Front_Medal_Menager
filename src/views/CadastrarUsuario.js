import React, { useState, useEffect } from "react";
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
  Label,
} from "reactstrap";

function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState(""); // Para mostrar erros de API
  const navigate = useNavigate();

  // Remover a verificação do token de autenticação
  useEffect(() => {
    // Se houver algum token, pode redirecionar para a página inicial ou outra lógica
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação de preenchimento dos campos
    if (!nome || !login || !senha || !confirmacaoSenha) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    // Verificar se a senha e a confirmação são iguais
    if (senha !== confirmacaoSenha) {
      setError("A senha e a confirmação de senha não correspondem.");
      return;
    }

    try {
      // Chamada à API para cadastrar o novo usuário
      const response = await fetch('http://localhost:8083/medalmanager/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          login,
          senha, 
        }),
      });

      if (response.ok) {
        setError("");
        setApiError("");
        navigate("/admin/login");
      } else {
        setError("Erro ao cadastrar o usuário. Por favor, tente novamente.");
      }
    } catch (err) {
      setApiError("Erro ao conectar com o servidor. Por favor, tente novamente mais tarde.");
    }
  };

  return (
    <>
      <div className="content">
        <Row className="justify-content-center">
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Cadastro de Usuário</h5>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>Nome</Label>
                    <Input
                      placeholder="Digite seu nome"
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Username</Label>
                    <Input
                      placeholder="Digite seu username"
                      type="text"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Password</Label>
                    <Input
                      placeholder="Digite sua senha"
                      type="password"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Confirmar Senha</Label>
                    <Input
                      placeholder="Confirme sua senha"
                      type="password"
                      value={confirmacaoSenha}
                      onChange={(e) => setConfirmacaoSenha(e.target.value)}
                    />
                  </FormGroup>
                  {error && <Alert color="danger">{error}</Alert>}
                  {apiError && <Alert color="danger">{apiError}</Alert>}
                  <Button className="btn-fill" color="primary" type="submit">
                    Cadastrar
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

export default CadastroUsuario;