import { Footer } from "./Footer";
import { render } from "@testing-library/react";

describe("<Footer />", () => {
  it("should match the snapshot", () => {
    const { container } = render(<Footer />);

    expect(container).toMatchSnapshot();
  });
});
