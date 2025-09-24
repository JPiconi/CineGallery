import React from "react";
import { render } from "@testing-library/react-native";
import Favoritos from "../Pages/Favoritos";

test("renderiza a tela Favoritos corretamente", () => {
  const { getByText } = render(<Favoritos />);
  expect(getByText("Favoritos")).toBeTruthy();
});
