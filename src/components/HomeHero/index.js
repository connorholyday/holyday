/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Background from "./background"

const HomeHero = () => (
  <section
    sx={{
      position: "relative",
      padding: ["80px 0", null, "17rem 0 12rem"],
      mb: [null, null, "4"],
      textAlign: "center",
      zIndex: [null, null, 1],
    }}
  >
    <div sx={{ display: "inline-block" }}>
      <Styled.h1
        sx={{
          fontFamily: "body",
          fontSize: [40, 52],
          fontWeight: "bold",
          lineHeight: 1,
          m: 0,
        }}
      >
        Connor Holyday
      </Styled.h1>
      <Styled.h2
        sx={{
          fontFamily: "body",
          fontSize: ["18px", "24px"],
          fontWeight: 300,
          margin: "0.75em 0",
        }}
      >
        I make stuff on the internet
      </Styled.h2>
    </div>

    <Background />
  </section>
)

export default HomeHero
