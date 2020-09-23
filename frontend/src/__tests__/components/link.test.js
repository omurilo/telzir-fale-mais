import React from "react";
import { Link } from "components/Link/styles";

import { render, screen } from "../test-utils";

describe("Link", () => {
  it("should render the Link", () => {
    render(
      <Link href="/testing-href" title="Testing Link">
        The link of Test
      </Link>
    );

    expect(screen.getByTitle(/Testing Link/gi)).toHaveAttribute(
      "href",
      "/testing-href"
    );
  });
});
