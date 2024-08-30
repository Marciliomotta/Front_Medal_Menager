import React from 'react';
import { Table } from 'reactstrap';

// Componente para renderizar uma linha da tabela
const LinhaTabela = ({ pais }) => (
    <tr key={pais.nome}>
        <td className="text-center">{pais.nome}</td>
        <td className="text-center">{pais.qtdGoldMedal}</td>
        <td className="text-center">{pais.qtdSilverMedal}</td>
        <td className="text-center">{pais.qtdBronzeMedal}</td>
        <td className="text-center">{pais.totalMedalhas}</td>
    </tr>
);

const TabelaPaises = ({ paises }) => (
    <Table className="tablesorter" responsive>
        <thead className="text-primary">
            <tr>
                <th className="text-center">Nome</th>
                <th className="text-center">Medalhas de Ouro</th>
                <th className="text-center">Medalhas de Prata</th>
                <th className="text-center">Medalhas de Bronze</th>
                <th className="text-center">Total de Medalhas</th>
            </tr>
        </thead>
        <tbody>
            {paises.map((pais) => (
                <LinhaTabela key={pais.nome} pais={pais} />
            ))}
        </tbody>
    </Table>
);

export default TabelaPaises;