import React, { useContext } from "react";
import Search from "../ui/Seach";
import Navbar from "./NavBar";
import Link from "next/link";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Button from "../ui/Button";
import { FirebaseContext } from "../../firebase";

const HeaderContainer = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.a`
  color: var(--orange);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Roboto Slab", serif;
  margin-right: 2rem;
  cursor: pointer;
`;

const Header = () => {
  const {user, firebase} = useContext(FirebaseContext);
  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gray3);
        padding: 1rem 0;
      `}
    >
      <HeaderContainer>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href="/">
            <Logo>P</Logo>
          </Link>

          <Search />
          <Navbar />
        </div>

        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {user ? (
            <>
              <p
                css={css`
                  margin-right: 2rem;
                `}
              >
                Hello: {user.displayName}
              </p>
              <Button bgColor="true" onClick={() => firebase.signOut()}>
              Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button bgColor="true">Log In</Button>
              </Link>
              <Link href="/create-account">
                <Button>Sign In</Button>
              </Link>
            </>
          )}
        </div>
      </HeaderContainer>
    </header>
  );
};

export default Header;
