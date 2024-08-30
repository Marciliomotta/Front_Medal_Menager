import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col
} from "reactstrap";

function SeguirPaises() {
  const [paises, setPaises] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token"); // Token para autenticação

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await fetch('http://localhost:8083/medalmanager/pais', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Autenticação
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

  const handleFollow = async (idPais) => {
    try {
      const response = await fetch(`http://localhost:8080/usuario/usuarioPais/${idPais}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Autenticação
        }
      });

      if (!response.ok) {
        throw new Error('Erro na resposta da rede ao seguir país');
      }

      const result = await response.json();
      console.log("País seguido com sucesso:", result);

      // Atualizar a lista de países após seguir
      const updatedPaises = paises.map(pais =>
        pais.id === idPais ? { ...pais, seguindo: true } : pais
      );
      setPaises(updatedPaises);
    } catch (err) {
      setError("Erro ao seguir o país. Por favor, tente novamente.");
      console.error("Erro ao seguir país:", err);
    }
  };

  return (
    <>
      <div className="content">
        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Seguir Países</h5>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">Nome</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paises.map((pais) => (
                      <tr key={pais.id}>
                        <td className="text-center">{pais.nome}</td>
                        <td className="text-center">
                          {pais.seguindo ? "Seguindo" : "Não seguindo"}
                        </td>
                        <td className="text-center">
                          {!pais.seguindo && (
                            <Button
                              color="primary"
                              onClick={() => handleFollow(pais.id)}
                            >
                              Seguir
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default SeguirPaises;