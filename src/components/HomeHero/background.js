import React, { useEffect, useRef } from "react"
import triangleData from "./triangle-data"

const TriangleBackground = () => {
  const mainRef = useRef()

  useEffect(() => {
    const svgDocument = mainRef.current
    const random = Math.floor(Math.random() * 3)

    svgDocument.classList.add("effect-" + random)
    let items = svgDocument.getElementsByTagName("polygon")
    let i = 0
    let a = buildArray(items.length)
    let x = 0

    function an() {
      if (i < items.length) {
        items[a[i]].classList.add("item--animate", "color-" + x)
        items[a[i]].addEventListener(
          "mouseenter",
          function() {
            this.classList.add("is-hidden")
          },
          false
        )

        i++
        if (x === 4) {
          x = 0
        } else {
          x++
        }

        requestAnimationFrame(an)
      } else {
        cancelAnimationFrame(an)
      }
    }

    requestAnimationFrame(an)

    function buildArray(l) {
      var r = 0
      var a = []

      for (var i = 0; i < l; i++) {
        r = randomFromTo(0, l - 1)

        while (a.indexOf(r) > -1) {
          r = randomFromTo(0, l - 1)
        }

        a.push(r)
      }
      return a
    }

    function randomFromTo(f, t) {
      return Math.floor(Math.random() * (t - f + 1) + f)
    }
  }, [])

  return (
    <svg
      ref={mainRef}
      className="main-background"
      preserveAspectRatio="xMidYMin meet"
      width="100%"
      height="100%"
      viewBox="0 0 1200 550"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        {triangleData.map((triangle, i) => (
          <polygon key={i} className="item" {...triangle} />
        ))}
      </g>

      <style>{`
        .main-background {
          display: none;
        }
        @media (min-width: 1024px) {
          .main-background {
            display: block;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            z-index: -1;
          }
        }
        .item {
            opacity: 0;
            transition: opacity .2s ease;
        }
        .item--animate {
            opacity: 1;
        }
        .effect-1 .color-0 {
            fill: #FF6373;
        }
        .effect-1 .color-1 {
            fill: #B375F5;
        }
        .effect-1 .color-2 {
            fill: #32CAA9;
        }
        .effect-1 .color-3 {
            fill: #13CEEF;
        }
        .effect-1 .color-4 {
            fill: #FFEF77;
        }
        .is-hidden {
            transform: scale(0);
        }
      `}</style>
    </svg>
  )
}

export default TriangleBackground
