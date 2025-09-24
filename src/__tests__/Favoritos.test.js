import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Favoritos from "../Pages/Favoritos";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe("Tela Favoritos", () => {
  beforeEach(() => {
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
  });

  test("renderiza título corretamente", () => {
    const { getByText } = render(<Favoritos />);
    expect(getByText("✨ Meus Favoritos")).toBeTruthy();
  });

  test("exibe lista de favoritos salvos", async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(
      JSON.stringify([{ imdbID: "1", Title: "Batman", Poster: "link.com" }])
    );
    const { getByText, findByText } = render(<Favoritos />);
    expect(await findByText("Batman")).toBeTruthy();
    expect(getByText("Remover")).toBeTruthy();
  });

  test("remove um favorito da lista", async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(
      JSON.stringify([{ imdbID: "1", Title: "Batman", Poster: "link.com" }])
    );
    const { findByText, queryByText } = render(<Favoritos />);
    const removeBtn = await findByText("Remover");
    fireEvent.press(removeBtn);

    await waitFor(() => {
      expect(queryByText("Batman")).toBeNull();
    });
  });
});
