import React from "react";

import * as Styled from "./styles";

function ResultsTable({
  values: { minuteCost, faleMaisCost, withoutFaleMaisCost },
}) {
  return (
    <Styled.Container>
      <Styled.Info>
        <p>
          Custo da ligação <strong>por minuto</strong>:{" "}
          <span>{minuteCost}</span>
        </p>
      </Styled.Info>
      <Styled.Info>
        <p>
          Custo da ligação <strong>com FALE+</strong>:{" "}
          <span>{faleMaisCost}</span>
        </p>
      </Styled.Info>
      <Styled.Info>
        <p>
          Custo da ligação <strong>sem FALE+</strong>:{" "}
          <span>{withoutFaleMaisCost}</span>
        </p>
      </Styled.Info>
      <Styled.Details>
        <Styled.Summary>Taxa de minutos excedentes</Styled.Summary>
        <p>
          Os minutos excedentes tem um acréscimo de <strong>10%</strong> sobre a
          tarifa normal do minuto.
        </p>
      </Styled.Details>
    </Styled.Container>
  );
}

export default ResultsTable;
