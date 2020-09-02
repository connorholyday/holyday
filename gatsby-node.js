const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogs = await graphql(`
    query {
        blog: allMdx(
          filter: { fileAbsolutePath: { regex: "/src/content/blog/" } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
              }
              body
            }
          }
        }
      }
    `
  ).then(res => {
    if (res.errors) {
      throw res.errors
    }
    return res.data;
  });

  // Create blog posts pages.
  blogs.blog.edges.forEach((post, index) => {
    
    const previous = index === blogs.blog.edges.length - 1 ? null : blogs.blog.edges[index + 1].node
    const next = index === 0 ? null : blogs.blog.edges[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // const works = await graphql(`
  //   query {
  //       work: allMdx(
  //         filter: { fileAbsolutePath: { regex: "/src/content/work/" } }
  //         sort: { fields: [frontmatter___date], order: DESC }
  //         limit: 1000
  //       ) {
  //         edges {
  //           node {
  //             id
  //             fields {
  //               slug
  //             }
  //             frontmatter {
  //               title
  //             }
  //             body
  //           }
  //         }
  //       }
  //     }
  //   `
  // ).then(res => {
  //   if (res.errors) {
  //     throw res.errors
  //   }
  //   return res.data;
  // });

  // Create work posts pages.
  // works.work.edges.forEach((post, index) => {
  //   const previous = index === works.work.edges.length - 1 ? null : works.work.edges[index + 1].node
  //   const next = index === 0 ? null : works.work.edges[index - 1].node

  //   createPage({
  //     path: post.node.fields.slug,
  //     component: path.resolve(`./src/templates/work-post.js`),
  //     context: {
  //       slug: post.node.fields.slug,
  //       previous,
  //       next,
  //     },
  //   })
  // })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
