import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Home from "../Pages/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe("Tela Home", () => {
  const mockNav = { navigate: jest.fn(), getParent: jest.fn(() => ({ replace: jest.fn() })) };

  beforeEach(() => {
    AsyncStorage.getItem.mockResolvedValue("Yuri");
  });

  test("renderiza mensagem de boas-vindas", async () => {
    const { findByText } = render(<Home navigation={mockNav} />);
    expect(await findByText(/Bem-vindo, Yuri/i)).toBeTruthy();
  });

  test("navega para Galeria ao clicar no botão", () => {
    const { getByText } = render(<Home navigation={mockNav} />);
    fireEvent.press(getByText("Ver Galeria de Filmes"));
    expect(mockNav.navigate).toHaveBeenCalledWith("Gallery");
  });

  test("faz logout e chama replace(Login)", async () => {
    const { getByText } = render(<Home navigation={mockNav} />);
    fireEvent.press(getByText("Sair"));
    await waitFor(() => {
      expect(mockNav.getParent().replace).toHaveBeenCalledWith("Login");
    });
  });
});
