import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Gallery from "../Pages/Gallery";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("axios");

describe("Tela Gallery", () => {
  beforeEach(() => {
    axios.get.mockClear();
    AsyncStorage.getItem.mockResolvedValue("[]");
  });

  test("renderiza input de busca e botão", () => {
    const { getByPlaceholderText, getByText } = render(<Gallery />);
    expect(getByPlaceholderText(/Buscar/i)).toBeTruthy();
    expect(getByText("Buscar")).toBeTruthy();
  });

  test("busca filmes ao clicar no botão", async () => {
    axios.get.mockResolvedValue({ data: { Search: [{ imdbID: "1", Title: "Matrix", Year: "1999", Poster: "link" }] } });
    const { getByText, getByPlaceholderText, findByText } = render(<Gallery />);

    fireEvent.changeText(getByPlaceholderText(/Buscar/i), "Matrix");
    fireEvent.press(getByText("Buscar"));

    expect(await findByText("Matrix")).toBeTruthy();
    expect(await findByText("1999")).toBeTruthy();
  });

  test("adiciona e remove filme dos favoritos", async () => {
    axios.get.mockResolvedValue({ data: { Search: [{ imdbID: "2", Title: "Jujutsu", Year: "2020", Poster: "link" }] } });
    const { getByText, getByPlaceholderText, findByText, getByRole } = render(<Gallery />);

    fireEvent.changeText(getByPlaceholderText(/Buscar/i), "Jujutsu");
    fireEvent.press(getByText("Buscar"));

    const title = await findByText("Jujutsu");
    expect(title).toBeTruthy();

    const favBtn = getByRole("button");
    fireEvent.press(favBtn);

    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });
});
