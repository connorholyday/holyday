/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import { Global } from "@emotion/core"
import logo from "./logo.svg"

const rootPath = `${__PATH_PREFIX__}/`
const LogoWrapper = styled.h1`
  margin: 0;
`

const Layout = ({ location, title, children }) => (
  <Styled.root>
    <Global
      styles={{
        "*": {
          boxSizing: "inherit",
        },
        html: {
          boxSizing: "border-box",
        },
        body: {
          margin: 0,
        },
      }}
    />
    <header
      sx={{
        display: "flex",
        maxWidth: "1280px",
        padding: [3, 4],
        my: 0,
        mx: "auto",
        textAlign: "center",
        alignItems: ["initial", "center"],
        justifyContent: ["initial", "space-between"],
        ...(location.pathname === rootPath && {
          position: ["initial", "initial", "absolute"],
          top: 0,
          left: 0,
          right: 0,
        }),
      }}
    >
      <LogoWrapper as={location.pathname === rootPath ? "h1" : "h3"}>
        <Styled.a sx={{ borderBottomWidth: 0 }} as={Link} to="/" title="Home">
          <img
            sx={{
              height: [32, 48],
              position: "relative",
              zIndex: 10,
            }}
            src={logo}
            alt="Connor Holyday's name made out of triangles"
          />
        </Styled.a>
      </LogoWrapper>

      <nav
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          flex: [1, 1, 0],
          position: ["initial", "initial", "relative"],
          zIndex: 10,
        }}
      >
        <Styled.a
          sx={{
            fontSize: [2, 18],
            mr: [3, 0],
            ml: [0, 3],
            borderColor: "transparent",
            ":hover": { borderColor: "text", borderBottomStyle: "dotted" },
            ":active": { borderBottomWidth: 1, borderBottomStyle: "dotted" },
            ":focus": { borderBottomWidth: 1, borderBottomStyle: "dotted" },
          }}
          href="https://github.com/ConnorHolyday"
        >
          GitHub
        </Styled.a>
        <Styled.a
          sx={{
            fontSize: [2, 18],
            mr: [3, 0],
            ml: [0, 3],
            borderColor: "transparent",
            ":hover": { borderColor: "text", borderBottomStyle: "dotted" },
            ":active": { borderBottomWidth: 1, borderBottomStyle: "dotted" },
            ":focus": { borderBottomWidth: 1, borderBottomStyle: "dotted" },
          }}
          href="https://twitter.com/ConnorHolyday"
        >
          Twitter
        </Styled.a>
        <Styled.a
          sx={{
            fontSize: [2, 18],
            ml: [0, 3],
            borderColor: "transparent",
            ":hover": { borderColor: "text", borderBottomStyle: "dotted" },
            ":active": { borderColor: "text", borderBottomStyle: "dotted" },
            ":focus": { borderColor: "text", borderBottomStyle: "dotted" },
          }}
          href="mailto:connorholyday@gmail.com"
        >
          Email
        </Styled.a>
      </nav>
    </header>
    {children}
  </Styled.root>
)

export default Layout
