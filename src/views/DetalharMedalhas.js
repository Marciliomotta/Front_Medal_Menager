import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Input,
    Label,
    Spinner
} from "reactstrap";
import DetalhesMedalhas from '../components/Gerais/DetalhesMedalhas'; // Atualizado

function DetalharMedalhas() {
    const [paises, setPaises] = useState([]);
    const [selecionado, setSelecionado] = useState("");
    const [detalhesMedalhas, setDetalhesMedalhas] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPaises = async () => {
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
                    throw new Error('Erro na resposta da rede ao carregar países.');
                }

                const data = await response.json();
                setPaises(data.content || []); // Garantir que data.content é um array
            } catch (err) {
                setError("Erro ao carregar os países. Por favor, tente novamente.");
                console.error("Erro ao fazer a requisição de países:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPaises();
    }, [navigate]);

    useEffect(() => {
        if (!selecionado) return;

        const fetchDetalhesMedalhas = async () => {
            const token = localStorage.getItem("token");

            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8083/medalmanager/esporte/${selecionado}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro na resposta da rede ao carregar detalhes das medalhas.');
                }

                const data = await response.json();
                console.log(data);
                setDetalhesMedalhas(data || []); // Garantir que data.content é um array
            } catch (err) {
                setError("Erro ao carregar os detalhes das medalhas. Por favor, tente novamente.");
                console.error("Erro ao fazer a requisição de medalhas:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDetalhesMedalhas();
    }, [selecionado]);

    const handleChange = (event) => {
        setSelecionado(event.target.value);
    };

    const renderPaisesOptions = () => (
        paises.map(pais => (
            <option key={pais.id} value={pais.id}>
                {pais.nome}
            </option>
        ))
    );

    const renderDetalhesMedalhas = () => (
        detalhesMedalhas.length > 0 ? (
            <DetalhesMedalhas detalhes={detalhesMedalhas} />
        ) : (
            <p>Nenhum detalhe de medalhas disponível para o país selecionado.</p>
        )
    );

    return (
        <div className="content">
            {loading ? (
                <div className="text-center">
                    <Spinner color="primary" />
                    <p>Carregando...</p>
                </div>
            ) : (
                <>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Detalhar Medalhas</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Label for="paisSelect">Selecione um país:</Label>
                                    <Input
                                        type="select"
                                        id="paisSelect"
                                        value={selecionado}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione</option>
                                        {renderPaisesOptions()}
                                    </Input>
                                    {renderDetalhesMedalhas()}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
}

export default DetalharMedalhas;