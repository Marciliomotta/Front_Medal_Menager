import React from 'react';
import { Table } from 'reactstrap';

function DetalhesMedalhas({ detalhes }) {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Esporte</th>
                    <th>Ouro</th>
                    <th>Prata</th>
                    <th>Bronze</th>
                </tr>
            </thead>
            <tbody>
                {detalhes.map(esporte => (
                    <tr key={esporte.id}>
                        <td>{esporte.nome}</td>
                        <td>{esporte.qtdGoldMedal}</td>
                        <td>{esporte.qtdSilverMedal}</td>
                        <td>{esporte.qtdBronzeMedal}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default DetalhesMedalhas;