import React, { useMemo, useState } from "react";

import Header from "components/Header";
import Footer from "components/Footer";
import Title from "components/Title";
import Select from "components/Select";
import Input from "components/Input";
import Button from "components/Button";

import * as Styled from "./_styles";

export default function Home() {
  const options = useMemo(
    () => ({
      1: { value: 30, label: "Fale Mais 30" },
      2: { value: 60, label: "Fale Mais 60" },
      3: { value: 120, label: "Fale Mais 120" },
    }),
    []
  );

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    plan: "",
    origin: "",
    destiny: "",
    time: "",
  });

  const handleSetFormValue = (name) => (e) => {
    const value = name === "plan" ? e : e.target.value;
    if (name === "origin" || name === "destiny") {
      if (value.length < 3) {
        setErrors((prev) => ({
          ...prev,
          [name]: "Valor inválido (exemplo: 011)",
        }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    }

    return setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlurFormValue = (name) => (e) => {
    const errorsObject = { ...errors };
    if (!e.target.value.length) {
      setErrors((prev) => ({
        ...prev,
        [name]: "* Essa informação é obrigatória",
      }));
    } else {
      delete errorsObject[name];
      setErrors({
        ...errorsObject,
      });
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!Object.values(errors).length && values?.plan?.value) {
      /* console.log({
        origin: Number(values.origin),
        destiny: Number(values.destiny),
        time: Number(values.time),
        plan: values.plan.value,
      }); */
    }
  };

  return (
    <>
      <Header />
      <Styled.Container>
        <Styled.Content>
          <Styled.Header>
            <Title>Calcula Aí!</Title>
            <p>Calcule o valor da ligação e não tenha surpresas.</p>
          </Styled.Header>
          <Styled.Main>
            <Styled.Form onSubmit={handleSubmitForm}>
              <Select
                name="fale-mais-plan"
                label="Plano Fale Mais"
                placeholder="Selecione qual o seu plano fale mais"
                value={values.plan}
                onChange={handleSetFormValue("plan")}
                options={Object.values(options)}
                blurInputOnSelect
                className="radiusTop"
              />
              <Input
                type="text"
                name="origin-call"
                label="DDD de Origem (ex: 018)"
                placeholder="Digite o DDD de origem"
                maxLength="3"
                value={values.origin}
                onChange={handleSetFormValue("origin")}
                onBlur={handleBlurFormValue("origin")}
                required
              >
                {errors?.origin && (
                  <span className="error">{errors.origin}</span>
                )}
              </Input>
              <Input
                type="text"
                name="destiny-call"
                label="DDD de Destino (ex: 011)"
                placeholder="Digite o DDD de destino"
                maxLength="3"
                value={values.destiny}
                onChange={handleSetFormValue("destiny")}
                onBlur={handleBlurFormValue("destiny")}
                required
              >
                {errors?.destiny && (
                  <span className="error">{errors.destiny}</span>
                )}
              </Input>
              <Input
                type="text"
                name="time"
                label="Tempo da ligação (em minutos)"
                placeholder="Digite a duração da ligação"
                maxLength="3"
                className="radiusBottom"
                value={values.time}
                onChange={handleSetFormValue("time")}
                onBlur={handleBlurFormValue("time")}
                required
              >
                {errors?.time && <span className="error">{errors.time}</span>}
              </Input>
              <Button type="submit">
                <span>Calcular!</span>
              </Button>
            </Styled.Form>
          </Styled.Main>
        </Styled.Content>
      </Styled.Container>
      <Footer />
    </>
  );
}
