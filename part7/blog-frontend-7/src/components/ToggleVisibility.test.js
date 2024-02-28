import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToggleVisibility from "./ToggleVisibility";

describe("<ToggleVisibility />", () => {
  test("does not render children", async () => {
    const testChild = "Test child component";

    render(
      <ToggleVisibility setHiddenLabel="cancel" setVisibleLabel="view">
        <div>{testChild}</div>
      </ToggleVisibility>,
    );

    expect(screen.queryByText("Test child component")).not.toBeInTheDocument();
  });

  test("renders children after click", async () => {
    const testChild = "Test child component";

    render(
      <ToggleVisibility setHiddenLabel="cancel" setVisibleLabel="view">
        <div>{testChild}</div>
      </ToggleVisibility>,
    );

    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: "view" });
    await user.click(button);

    expect(screen.getByText(testChild)).toBeInTheDocument();
  });
});
