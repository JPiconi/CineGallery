import React from "react";
import { render } from "@testing-library/react-native";
import Home from "../Pages/Home";

test("renderiza a tela Home corretamente", () => {
  const { getByText } = render(<Home />);
  expect(getByText("Home")).toBeTruthy();
});
