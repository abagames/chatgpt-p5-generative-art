const baseUrl = "https://abagames.github.io/chatgpt-p5-generative-art/";
const piecesFileName = "./src/pieces.csv";
const outputDirectory = "./docs/";

/** @type { {name: string}[] } */
// @ts-ignore
const pieces = loadCsv(piecesFileName, ["name"]);
saveIndexPage();

function loadCsv(fileName, properties) {
  const fs = require("fs");
  const listCsv = fs.readFileSync(fileName, "utf8");
  const list = listCsv.split("\r\n");
  list.shift();
  list.pop();
  // @ts-ignore
  const itemList = list.map((l) => {
    const items = parseCsvToArray(l);
    const item = {};
    properties.forEach((p, i) => {
      item[p] = items[i];
    });
    return item;
  });
  return itemList;
}

function saveIndexPage() {
  const fileName = `${outputDirectory}index.html`;
  const fs = require("fs");
  /**
   * @type {{
   *  title: string, divId: string, description: string,
   *  linkUrl: string, anchorName:string, linkType: string, isCard: boolean
   * }[]}
   */
  const list = [];
  pieces.forEach((p) => {
    list.push({
      title: p.name,
      divId: p.name,
      description: "",
      linkUrl: `./${replaceSpaceWidthUnderscore(p.name)}.js`,
      anchorName: replaceSpaceWidthUnderscore(p.name),
      linkType: "Code",
      isCard: true,
    });
  });
  const pageHtml = getPage(
    list,
    "Abstract and geometric animation pieces, utilizing the p5.js framework, generated with ChatGPT.",
    true
  );
  fs.writeFileSync(fileName, pageHtml);
}

/**
 * @param {{
 *  title: string, divId: string, description: string,
 *  linkUrl: string, anchorName:string, linkType: string, isCard: boolean
 * }[]} list
 * @param {string} description
 * @param {boolean} hasTwitterCard
 * @return {string}
 */
function getPage(list, description, hasTwitterCard) {
  const cardHtml = getCards(list);
  const h1 = "chatgpt-p5-generative-art";
  const title = "chatgpt-p5.generative-art";
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${
      hasTwitterCard
        ? `<meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${baseUrl}twitter_card_image.png" />`
        : ""
    }
    <title>${title}</title>

    <link
      href="./bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
      crossorigin="anonymous"
    />
    <link href="./dark_mode.css" rel="stylesheet" />
    <link href="./canvas.css" rel="stylesheet" />

    <meta name="theme-color" content="#7952b3" />

    <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    </style>
  </head>
  <body>
    <header>
      <div class="navbar navbar-dark bg-dark shadow-sm">
        <div class="container">
          <a
            href="./index.html"
            class="navbar-brand d-flex align-items-center"
          >
            <strong>chatgpt-p5-generative-art</strong>
          </a>
        </div>
      </div>
    </header>

    <main>
      <section class="py-3 text-center container">
        <div class="row py-lg-3">
          <div class="col-lg-9 col-md-8 mx-auto">
            <h1 class="fw-light">${h1}</h1>
            <p class="lead text-muted">
              ${description}
            </p>
            <p class="text-muted">
            Prompt: 'I want you to act as a generative art programmer. Conceive an unprecedented abstract and geometric animation piece, which loops infinitely, utilizing the p5.js framework, centered around the theme of "[Theme Name]". Consider using noise, mathematical functions or fractals to achieve this task, refraining from the use of user input. Set the canvas size to 400x200. Do not write explanations. Just show me the code for it.'
            </p>
        </div>
        </div>
      </section>

      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            ${cardHtml}
          </div>
        </div>
      </div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.6.0/lib/p5.js"></script>
    <script type="module">
    ${pieces
      .map((p) => {
        const n = replaceSpaceWidthUnderscore(p.name);
        return `
      import * as ${n} from "./${n}_inst.js"
      const p_${n} = new p5(${n}.sketch, document.getElementById("${p.name}"));
      `;
      })
      .join("")}
    </script>
    </body>
</html>
`;
}

/**
 * @param {{
 *  title: string, divId: string, description: string,
 *  linkUrl: string, anchorName: string, linkType: string, isCard: boolean
 * }[]} list
 * @return {string}
 */
function getCards(list) {
  return list
    .map((g) =>
      g.isCard
        ? getCard(
            g.title,
            g.divId,
            g.linkUrl,
            g.anchorName,
            g.linkType,
            g.description
          )
        : getSeparator(g.title, g.description)
    )
    .join("");
}

/**
 * @param {string} title
 * @param {string} divId
 * @param {string} linkUrl
 * @param {string} anchorName
 * @param {string} linkType
 * @param {string} description
 * @return {string}
 */
function getCard(title, divId, linkUrl, anchorName, linkType, description) {
  const buttonHtml =
    linkUrl === "undefined"
      ? `
          <a
            href="${linkUrl}"
            class="btn btn-secondary disabled my-2"
            >No Detail</a
          >
      `
      : `
          <a
            href="${linkUrl}"
            class="btn btn-primary my-2"
            >${linkType}</a
          >
`;
  const imgHtml =
    divId === "undefined"
      ? `
<svg
  class="bd-placeholder-img card-img-top"
  width="100%"
  height="225"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-label="Placeholder: Thumbnail"
  preserveAspectRatio="xMidYMid slice"
  focusable="false"
>
  <title>Placeholder</title>
  <rect width="100%" height="100%" fill="#55595c"></rect>
  <text x="50%" y="50%" fill="#eceeef" dy=".3em">
    No image
  </text>
</svg>
`
      : `
<div
  id="${divId}"
  alt="${title}"
  class="bd-placeholder-img card-img-top"
  height="225"
  style="object-fit: contain"
></div>
`;
  return `
<div class="col">
  <div class="card shadow-sm">
    ${imgHtml}
    <div class="card-body">
      ${anchorName != null ? `<a name="${anchorName}">` : ""}
      <h5 class-"card-title">${title}</h5>
      ${anchorName != null ? "</a>" : ""}
      <p class="card-text">${description}</p>
      ${buttonHtml}
    </div>
  </div>
</div>
`;
}

/**
 * @param {string} title
 * @param {string} description
 * @return {string}
 */
function getSeparator(title, description) {
  const anchor = replaceSpaceWidthUnderscore(title);
  return `
<div class="col-md-12">
  <div class="card shadow-sm">
    <div class="card-body">
      <h4 class="card-title">
        <a name="${anchor}" href="#${anchor}" class="text-decoration-none">
          ${title}
        </a>
      </h4>
      <p class="card-text">${description}</p>
    </div>
  </div>
</div>
`;
}

/**
 * @param {string} str
 * @returns {string}
 */
function replaceSpaceWidthUnderscore(str) {
  return str.replace(/\s/g, "_");
}

/**
 * @param {string} str
 * @returns {string[]}
 */
function parseCsvToArray(str) {
  let a = [];
  let i = 0;
  for (;;) {
    const isQuoted = str.charAt(i) === '"';
    let ni = str.indexOf(isQuoted ? `"` : ",", isQuoted ? i + 1 : i);
    if (ni < 0) {
      if (!isQuoted) {
        a.push(str.substring(i));
      }
      break;
    }
    a.push(str.substring(isQuoted ? i + 1 : i, ni));
    i = ni + (isQuoted ? 2 : 1);
  }
  return a;
}
