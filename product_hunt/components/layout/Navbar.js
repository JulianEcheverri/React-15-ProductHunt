import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";

const Nav = styled.nav`
  padding-left: 2rem;
  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gray2);
    font-family: "PT Sans", sans-serif;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const Navbar = () => {
  const user = true;
  return (
    <Nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/top-products">
        <a>Top products</a>
      </Link>
      {user && (
        <Link href="/new-product">
          <a>New product</a>
        </Link>
      )}
    </Nav>
  );
};

export default Navbar;
