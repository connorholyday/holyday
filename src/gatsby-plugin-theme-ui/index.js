const heading = {
  color: "text",
  fontFamily: "heading",
  lineHeight: "1.2",
  fontWeight: "heading",
}

const activeLink = {
  textDecoration: "none",
  outline: 0,
  borderBottomStyle: "solid",
}

export default {
  breakpoints: ["40em", "52em", "64em"],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: "Oxygen, system-ui, sans-serif",
    heading: "Merriweather, serif",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  colors: {
    text: "#233235",
    background: "#fff",
    primary: "#07c",
    secondary: "#30c",
    muted: "#f6f6f6",
    blue: "#13ceef",
    green: "#32caa9",
    purple: "#b375f5",
    red: "#ff6373",
    yellow: "#ffef77",
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    h1: {
      ...heading,
      fontSize: 5,
    },
    h2: {
      ...heading,
      fontSize: [4, 6],
      lineHeight: 1.5,
    },
    h3: {
      ...heading,
      fontSize: 3,
    },
    h4: {
      ...heading,
      fontSize: 2,
    },
    h5: {
      ...heading,
      fontSize: 1,
    },
    h6: {
      ...heading,
      fontSize: 0,
    },
    p: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
    a: {
      color: "text",
      borderBottomWidth: 1,
      borderBottomStyle: "dotted",
      textDecoration: "none",
      ":active": {
        ...activeLink,
      },
      ":focus": {
        ...activeLink,
      },
      ":hover": {
        ...activeLink,
      },
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    img: {
      maxWidth: "100%",
      verticalAlign: "middle",
      height: "auto",
      width: "auto",
    },
  },
}
