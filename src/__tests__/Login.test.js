import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Login from "../Pages/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe("Tela Login", () => {
  const mockNav = { reset: jest.fn() };

  test("renderiza inputs e botão", () => {
    const { getByPlaceholderText, getByText } = render(<Login navigation={mockNav} />);
    expect(getByPlaceholderText("Usuário")).toBeTruthy();
    expect(getByPlaceholderText("Senha")).toBeTruthy();
    expect(getByText("Entrar")).toBeTruthy();
  });

  test("não permite login vazio", () => {
    const { getByText } = render(<Login navigation={mockNav} />);
    fireEvent.press(getByText("Entrar"));
    expect(mockNav.reset).not.toHaveBeenCalled();
  });

  test("salva sessão e navega após login", async () => {
    const { getByPlaceholderText, getByText } = render(<Login navigation={mockNav} />);
    fireEvent.changeText(getByPlaceholderText("Usuário"), "Yuri");
    fireEvent.changeText(getByPlaceholderText("Senha"), "123");

    fireEvent.press(getByText("Entrar"));

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith("@cinegallery:username", "Yuri");
      expect(mockNav.reset).toHaveBeenCalled();
    });
  });
});
