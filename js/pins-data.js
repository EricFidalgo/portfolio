// pins-data.js: every pin on the globe and the text its terminal window types out.
// A new pin is a new entry here; globe.js needs no change.
//
//   place   the label read out for the pin ("Open Tampa, FL")
//   lngLat  [longitude, latitude]; west and south are negative
//   title   the terminal window's title bar
//   blocks  one or more short stories, each with a heading, a few lines
//           and an optional link { href, text }
//
// Public repo: use only facts already on the site or in the ticket.
window.GLOBE_PINS = [
  {
    place: "Tampa, FL",
    lngLat: [-82.4572, 27.9506],
    title: "tampa :: ovi_wellness",
    blocks: [
      {
        heading: "OVI Wellness",
        lines: [
          "Two months of close work with OVI Wellness.",
          "Custom logo artwork.",
          "A fully custom website, built from the ground up.",
        ],
        link: { href: "https://oviwellness.com", text: "Live site: oviwellness.com" },
      },
    ],
  },
  {
    place: "Madrid, Spain",
    lngLat: [-3.7038, 40.4168],
    title: "madrid :: three stories",
    blocks: [
      {
        heading: "YBVR",
        lines: ["Data Engineer.", "Large data pipelines and BigQuery for global clients."],
      },
      {
        heading: "AWS Summit Madrid 2025",
        lines: ["Keynotes on Generative AI.", "Interactive demos."],
      },
      {
        heading: "Education",
        lines: [
          "Florida State University.",
          "B.S. in Computer Science.",
          "Minor in Mathematics.",
        ],
      },
    ],
  },
];
