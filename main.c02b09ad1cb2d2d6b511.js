"use strict";
(self["webpackChunkavion"] = self["webpackChunkavion"] || []).push([[216],{

/***/ 216:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ AboutPage)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(848);
// EXTERNAL MODULE: ./src/Components/AboutBlock/AboutBlock.tsx + 1 modules
var AboutBlock = __webpack_require__(782);
;// ./src/Components/AboutHeroTitle/aboutHeroTitle.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const aboutHeroTitle_module = ({"aboutHeroTitle":"kLwKVj"});
;// ./src/Components/AboutHeroTitle/AboutHeroTitle.tsx


function AboutHeroTitle() {
    return ((0,jsx_runtime.jsx)("div", { className: aboutHeroTitle_module.aboutHeroTitle, children: (0,jsx_runtime.jsx)("h2", { children: "A brand built on the love of craftsmanship, quality and outstanding customer service" }) }));
}

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(540);
;// ./src/pages/AboutPage.tsx




function AboutPage() {
    (0,react.useEffect)(() => {
        window.scrollTo({
            top: 0
        });
    }, []);
    return ((0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [(0,jsx_runtime.jsx)(AboutHeroTitle, {}), (0,jsx_runtime.jsx)(AboutBlock/* default */.A, { imgSrc: "/img/AboutBlockImage.webp", title: "From a studio in London to a global brand with over 400 outlets", paragraph: "When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market.", anotherParagraph: "Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community." }), (0,jsx_runtime.jsx)(AboutBlock/* default */.A, { variation: "reverse", imgSrc: "/img/AboutBlock2.webp", title: "Our service isn\u2019t just personal, it\u2019s actually hyper personally exquisite", paragraph: "When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market.", anotherParagraph: "Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community." }), (0,jsx_runtime.jsx)(AboutBlock/* default */.A, { variation: "highlighted", withLink: true, linkLabel: "View collection", linkHref: "/allProducts", imgSrc: "/img/AboutBlock3.webp", title: "It started with a small idea", paragraph: "A global brand with local beginnings, our story began in a small studio in South London in early 2014" })] }));
}


/***/ })

}]);