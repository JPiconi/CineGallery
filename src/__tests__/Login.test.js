import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Login from "../Pages/Login";

test("renderiza a tela Login corretamente", () => {
  const { getByText } = render(<Login />);
  expect(getByText("Login")).toBeTruthy();
});

test("simula clique no botão de login", () => {
  const { getByText } = render(<Login />);
  const botao = getByText("Entrar");
  fireEvent.press(botao);
  expect(botao).toBeTruthy();
});
