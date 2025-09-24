import React from "react";
import { render } from "@testing-library/react-native";
import Gallery from "../Pages/Gallery";

test("renderiza a tela Gallery corretamente", () => {
  const { getByText } = render(<Gallery />);
  expect(getByText("Gallery")).toBeTruthy();
});
