/** @jsx jsx */
import { jsx } from "theme-ui"
import Card from "./Card"

const Posts = ({ posts }) => (
  <main
    sx={{
      maxWidth: ["600px", null, "800px"],
      padding: "0 16px",
      margin: "16px auto",
    }}
  >
    {posts.map(({ node }, i) => (
      <Card key={i} {...node} />
    ))}
  </main>
)

export default Posts
