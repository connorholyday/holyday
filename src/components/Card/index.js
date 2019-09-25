/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { keyframes } from "@emotion/core"
import { Link } from "gatsby"

const colors = ["red", "green", "blue", "purple"]

function getColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}

const gradient = keyframes`
  to {
    background-position: 100%;
  }
`

const Card = ({
  fields: { slug },
  frontmatter: { date, type, title, url },
}) => {
  const color = getColor()

  return (
    <article
      sx={{
        position: "relative",
        maxWidth: "600px",
        mb: ["64px", 120],
        ml: "auto",
        "::before": {
          position: "absolute",
          content: `""`,
          display: "block",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          background: theme =>
            `linear-gradient(to right, ${theme.colors.blue}, ${theme.colors.green}, ${theme.colors.purple}, ${theme.colors.red})`,
          backgroundSize: "500% 100%",
          animation: `${gradient} 0.4s linear alternate infinite`,
        },
      }}
    >
      <div
        sx={{
          "@media (min-width: 880px)": {
            position: "absolute",
            top: "8px",
            right: "100%",
            mt: 2,
            textAlign: "right",
            whiteSpace: "nowrap",
            mr: 3,
            mb: 0,
          },
          mr: [null, null, 5],
        }}
      >
        <time
          sx={{
            fontSize: "12px",
            color: "#999",
            display: "block",
            mb: "8px",
          }}
        >
          {date}
        </time>
        <span
          sx={{
            fontSize: "12px",
            color: "#fff",
            fontWeight: "bold",
            display: "inline-block",
            borderRadius: 4,
            px: 1,
            py: 2,
            mb: 1,
            ...(color === "red" && {
              background: theme =>
                `linear-gradient(to right, ${theme.colors.purple}, ${theme.colors.red})`,
            }),
            ...(color === "purple" && {
              background: theme =>
                `linear-gradient(to right, ${theme.colors.red}, ${theme.colors.purple})`,
            }),
            ...(color === "blue" && {
              background: theme =>
                `linear-gradient(to right, ${theme.colors.green}, ${theme.colors.blue})`,
            }),
            ...(color === "green" && {
              background: theme =>
                `linear-gradient(to right, ${theme.colors.blue}, ${theme.colors.green})`,
            }),
          }}
        >
          {type}
        </span>
      </div>
      <Styled.a
        as={Link}
        to={slug}
        sx={{
          display: "block",
          borderWidth: 0,
          ":active": {
            borderWidth: 0,
            h2: {
              textDecoration: ["underline", null, "none"],
              transform: "translate3d(-1.5rem, -1rem, 0)",
              boxShadow: "0.2rem 0.3rem 0.7rem rgba(0, 0, 0, 0.15)",
            },
          },
          ":focus": {
            borderWidth: 0,
            h2: {
              textDecoration: ["underline", null, "none"],
              transform: "translate3d(-1.5rem, -1rem, 0)",
              boxShadow: "0.2rem 0.3rem 0.7rem rgba(0, 0, 0, 0.15)",
            },
          },
          ":hover": {
            borderWidth: 0,
            h2: {
              textDecoration: ["underline", null, "none"],
              transform: "translate3d(-1.5rem, -1rem, 0)",
              boxShadow: "0.2rem 0.3rem 0.7rem rgba(0, 0, 0, 0.15)",
            },
          },
        }}
      >
        <Styled.h2
          sx={{
            fontSize: [24, 40],
            p: 2,
            m: -2,
            mb: [3, 5],
            backgroundColor: "white",
            transition: "all 0.15s ease",
            color,
          }}
        >
          {title}
        </Styled.h2>
      </Styled.a>
    </article>
  )
}

export default Card
