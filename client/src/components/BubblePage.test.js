import React from "react";
import { render, waitFor, getAllByTestId } from "@testing-library/react";
import BubblePage from "./BubblePage";
import { mockFetchColors } from '../utils/mockFetchColors';
jest.mock('../utils/mockFetchColors')

const colors = {
  data: [
  {
    color: "aliceblue",
    code: { hex: "#f0f8ff"},
    id: 1
  },
  {
    color: "limegreen",
    code: {
      hex: "#99ddbc"
    },
    id: 2
  },
]};

test("render without errors", () => {
  render(<BubblePage colors={[]}/>);
});

test("rerenders without errors when props are changed", () => {
  const { rerender } = render(<BubblePage colors={[]}/>);
  rerender(<BubblePage colors={colors}/>);
});

test("fetches data and renders bubbles", async () => {
  jest.resetAllMocks()

  mockFetchColors.mockResolvedValueOnce(colors);

  render(<BubblePage/>)
  await waitFor(() => {
    expect(getAllByTestId(/color/i)).toHaveLength(2);
  })

});
