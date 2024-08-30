import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
} from "reactstrap";
import TabelaPaises from '../components/Gerais/TabelaPaises'; // Importe o componente da tabela

function QuadroMedalhas() {
    const [paises, setPaises] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/admin/login");
                return;
            }

            try {
                setLoading(true);

                const response = await fetch('http://localhost:8083/medalmanager/pais', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro na resposta da rede');
                }

                const data = await response.json();
                setPaises(data);
            } catch (err) {
                setError("Erro ao carregar os dados. Por favor, tente novamente.");
                console.error("Erro ao fazer a requisição:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div className="content">
            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && (
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Tabela Simples</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <TabelaPaises paises={paises.content} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    );
}

export default QuadroMedalhas;