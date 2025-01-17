import { cleanup, screen, render } from "@testing-library/react";
import NotFound from "./notFound";

jest.mock("react-router-dom", () => ({
  Link: "Link",
  Route: ({
    children,
    path,
  }: {
    children: (props: { match: boolean }) => React.ReactNode;
    path: string;
  }) => children({ match: path === "/" }),
}));

describe("NotFound Page", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it("should render the 404 message", () => {
    render(
      <>
        <NotFound />
      </>
    );
    const element = screen.getByText("404 - Page Not Found");
    expect(element).toBeInTheDocument();
  });

  it("should render the sorry message", () => {
    render(
      <>
        <NotFound />
      </>
    );
    const element = screen.getByText(
      "Sorry, the page you are looking for does not exist."
    );
    expect(element).toBeInTheDocument();
  });

  it("should render the link to home", () => {
    render(
      <>
        <NotFound />
      </>
    );
    const element = screen.getByText("Go back to Home");
    expect(element).toBeInTheDocument();
  });

  it("should have a link that navigates to home", () => {
    render(
      <>
        <NotFound />
      </>
    );
    const link = screen.getByText("Go back to Home");
    expect(link.getAttribute("href")).toBe("/");
  });
});
