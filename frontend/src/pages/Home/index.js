import React, { useEffect, useState } from "react";

import Title from "components/Title";
import Select from "components/Select";
import Input from "components/Input";
import Button from "components/Button";
import ResultsTable from "components/ResultsTable";

import useForm from "helpers/useForm";
import api from "services/api";

import * as Styled from "./_styles";

export default function Home() {
  const [minuteCost, setMinuteCost] = useState(0);
  const [faleMaisCost, setFaleMaisCost] = useState(0);
  const [withoutFaleMaisCost, setWithoutFaleMaisCost] = useState(0);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("plans");

      const optionsData = data?.plans.map((plan) => ({
        label: plan.name,
        value: plan.id,
      }));

      setIsLoading(false);
      setOptions(optionsData);
    })();
  }, []);

  const { values, errors, handleSetValues, handleSetErrors } = useForm({
    initialValues: {
      plan: "",
      origin: "",
      destiny: "",
      time: "",
    },
  });

  const handleSetFormValue = (e, a) => {
    const { name } = e.target ?? a;
    const value = name === "plan" ? e : e.target.value;

    if (name === "origin" || name === "destiny") {
      if (value.length < 3) {
        handleSetErrors(name, "Valor inválido (exemplo: 011)");
      } else {
        handleSetErrors(name, undefined, true);
      }
    } else if (name === "time" && value.length > 0) {
      handleSetErrors(name, undefined, true);
    }

    return handleSetValues(name, value);
  };

  const handleBlurFormValue = (e) => {
    const { name } = e.target;
    if (e.target.required) {
      if (!e.target.value.length) {
        handleSetErrors(name, "* Essa informação é obrigatória");
      } else {
        handleSetErrors(name, undefined, true);
      }
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!Object.values(errors).length && values?.plan?.value) {
      try {
        const { data } = await api.post("calculate", {
          origin: Number(values.origin),
          destiny: Number(values.destiny),
          time: Number(values.time),
          planId: values.plan.value,
        });

        setMinuteCost(
          new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "USD",
          }).format(data.minuteCost)
        );
        setFaleMaisCost(
          new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "USD",
          }).format(data.faleMaisCost)
        );
        setWithoutFaleMaisCost(
          new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "USD",
          }).format(data.withoutFaleMaisCost)
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Styled.Container>
        <Styled.Content>
          <Styled.Header>
            <Title>Calcula Aí!</Title>
            <p>Calcule o valor da ligação e não tenha surpresas.</p>
          </Styled.Header>
          <Styled.Main>
            <Styled.Form onSubmit={handleSubmitForm} noValidate data-testid="form">
              <Select
                name="plan"
                label="Plano Fale Mais"
                placeholder="Selecione qual o seu plano fale mais"
                value={values.plan}
                onChange={handleSetFormValue}
                options={options}
                blurInputOnSelect
                className="radiusTop"
              />
              <Input
                type="text"
                name="origin"
                label="DDD de Origem (ex: 018)"
                placeholder="Digite o DDD de origem"
                maxLength="3"
                value={values.origin}
                onChange={handleSetFormValue}
                onBlur={handleBlurFormValue}
                required
              >
                {errors?.origin && (
                  <span className="error" aria-label="erro na origem">
                    {errors.origin}
                  </span>
                )}
              </Input>
              <Input
                type="text"
                name="destiny"
                label="DDD de Destino (ex: 011)"
                placeholder="Digite o DDD de destino"
                maxLength="3"
                value={values.destiny}
                onChange={handleSetFormValue}
                onBlur={handleBlurFormValue}
                required
              >
                {errors?.destiny && (
                  <span className="error" aria-label="erro no destino">
                    {errors.destiny}
                  </span>
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
                onChange={handleSetFormValue}
                onBlur={handleBlurFormValue}
                required
              >
                {errors?.time && (
                  <span className="error" aria-label="erro no tempo">
                    {errors.time}
                  </span>
                )}
              </Input>
              <Button
                type="submit"
                aria-label="calcular valor"
                disabled={isLoading}
              >
                <span>{isLoading ? "Loading..." : "Calcular!"}</span>
              </Button>
            </Styled.Form>
          </Styled.Main>
          {!!withoutFaleMaisCost && !!faleMaisCost && !!minuteCost && (
            <ResultsTable
              values={{ withoutFaleMaisCost, faleMaisCost, minuteCost }}
            />
          )}
        </Styled.Content>
      </Styled.Container>
    </>
  );
}
