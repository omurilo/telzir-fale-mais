import Title from "components/Title";

import * as Styled from "./_styles";

export default function About() {
  return (
    <Styled.Main>
      <Title>Fale+, um plano pra tudo!</Title>
      <p>
        O Fale+ é um produto da Telzir, empresa telefônica especializada em
        chamadas de longa distância nacional, existem três variedades de
        contratação, listadas abaixo.
      </p>
      <p>
        O funcionamento do plano é simples, você contrata uma quota de minutos
        pra ligar pra onde quiser sem pagar nada, se acontecer de você
        extrapolar os minutos do seu plano contratado, os minutos excedentes da
        ligação serão cobrados com um acréscimo de 10% no valor base.
      </p>
      <p>
        O Calcula aí! é uma iniciativa da empresa de trazer transparência para o
        cliente, onde é possível saber na hora quanto custou uma ligação,
        utilizando apenas dados simples como, os DDD&lsquo;s de origem e
        destino, o tempo da ligação e o plano contratado. E o melhor de tudo, é
        grátis e você ainda consegue ver quanto economizou com a ligação
        utilizando o plano Fale+.
      </p>
      <Styled.Table>
        <thead>
          <tr>
            <th>Plano</th>
            <th>Quota</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Fale+</strong> 30
            </td>
            <td>30 minutos</td>
          </tr>
          <tr>
            <td>
              <strong>Fale+</strong> 60
            </td>
            <td>60 minutos</td>
          </tr>
          <tr>
            <td>
              <strong>Fale+</strong> 120
            </td>
            <td>120 minutos</td>
          </tr>
        </tbody>
      </Styled.Table>
    </Styled.Main>
  );
}
