import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Onboarding from "../Pages/Onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe("Tela Onboarding", () => {
  const mockNav = { replace: jest.fn() };

  test("renderiza textos principais", () => {
    const { getByText } = render(<Onboarding navigation={mockNav} />);
    expect(getByText(/Bem-vindo/)).toBeTruthy();
    expect(getByText(/Explore milhares/)).toBeTruthy();
  });

  test("ao clicar em começar, salva e navega para Login", async () => {
    const { getByText } = render(<Onboarding navigation={mockNav} />);
    fireEvent.press(getByText("Começar"));
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("hasSeenOnboarding", "true");
    expect(mockNav.replace).toHaveBeenCalledWith("Login");
  });
});
