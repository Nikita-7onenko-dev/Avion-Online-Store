"use strict";
(self["webpackChunkavion"] = self["webpackChunkavion"] || []).push([[746],{

/***/ 746:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ ContactsPage)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(848);
// EXTERNAL MODULE: ./src/Components/SocialLinks/SocialLinks.tsx + 1 modules
var SocialLinks = __webpack_require__(306);
;// ./src/Components/ContactsBlock/contactsBlock.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const contactsBlock_module = ({"contactsBlock":"Fd3FC5","contacts":"ZHQgyx","map":"PyGP9q"});
;// ./src/Components/ContactsBlock/ContactsBlock.tsx



function ContactsBlock() {
    return ((0,jsx_runtime.jsxs)("div", { className: contactsBlock_module.contactsBlock, children: [(0,jsx_runtime.jsxs)("address", { className: contactsBlock_module.contacts, children: [(0,jsx_runtime.jsxs)("div", { children: [(0,jsx_runtime.jsx)("h4", { children: "Address" }), (0,jsx_runtime.jsxs)("p", { children: ["21 New York Street", (0,jsx_runtime.jsx)("br", {}), "New York City", (0,jsx_runtime.jsx)("br", {}), "United States of America", (0,jsx_runtime.jsx)("br", {}), "432 34"] })] }), (0,jsx_runtime.jsxs)("div", { children: [(0,jsx_runtime.jsx)("h4", { children: "Phone" }), (0,jsx_runtime.jsx)("a", { href: "tel:+1234567890", children: "+1 (234) 567-890" }), (0,jsx_runtime.jsx)("a", { href: "tel:+1234567891", children: "+1 (234) 567-891" })] }), (0,jsx_runtime.jsxs)("div", { children: [(0,jsx_runtime.jsx)("h4", { children: "Email" }), (0,jsx_runtime.jsx)("a", { href: "mailto:mail@avion.com", children: "mail@avion.com" })] }), (0,jsx_runtime.jsx)(SocialLinks/* default */.A, { color: "#2a254b" })] }), (0,jsx_runtime.jsx)("div", { className: contactsBlock_module.map, children: (0,jsx_runtime.jsx)("iframe", { width: "100%", height: "100%", src: "https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Century%2021%20NYC%2022%20Cortlandt%20St,%20Manhattan,%20NY%2010007,%20United%20States+(Avion)&t=&z=14&ie=UTF8&iwloc=B&output=embed" }) })] }));
}

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(540);
;// ./src/Components/ContactsHeroBlock/contactsHeroBlock.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const contactsHeroBlock_module = ({"contactsHeroBlock":"nDpmNA","imageWrapperLoading":"VYTQYh","imageWrapper":"EXumEA","bannerTextBlock":"uglhxg"});
// EXTERNAL MODULE: ./node_modules/react-spinners/ClipLoader.js
var ClipLoader = __webpack_require__(420);
var ClipLoader_default = /*#__PURE__*/__webpack_require__.n(ClipLoader);
;// ./src/Components/ContactsHeroBlock/ContactsHeroBlock.tsx




function ContactsHeroBlock({ ref }) {
    const [isLoad, setIsLoad] = (0,react.useState)(false);
    const base = "https://nikita-7onenko-dev.github.io/Avion-Online-Store";
    function scrollToFeedbackForm() {
        ref.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        });
    }
    return ((0,jsx_runtime.jsxs)("div", { className: contactsHeroBlock_module.contactsHeroBlock, children: [(0,jsx_runtime.jsxs)("div", { className: contactsHeroBlock_module.bannerTextBlock, children: [(0,jsx_runtime.jsxs)("div", { children: [(0,jsx_runtime.jsx)("h3", { children: "Contact us" }), (0,jsx_runtime.jsx)("p", { children: "Have a question or request? Use the feedback form or any contact details below" })] }), (0,jsx_runtime.jsx)("button", { className: 'globalLink', onClick: scrollToFeedbackForm, children: "Use feedback form" })] }), (0,jsx_runtime.jsxs)("div", { className: `${contactsHeroBlock_module.imageWrapper} ${isLoad ? '' : contactsHeroBlock_module.imageWrapperLoading}`, children: [(0,jsx_runtime.jsx)("img", { src: `${base}/img/ContactsHeroBlock.webp`, onLoad: () => setIsLoad(true), loading: 'lazy', style: isLoad ? { visibility: 'visible' } : { visibility: 'hidden', width: '0px' } }), (0,jsx_runtime.jsx)((ClipLoader_default()), { color: '#fff', size: 80, cssOverride: isLoad ? { display: 'none' } : { display: 'inline-block' } })] })] }));
}

;// ./src/Components/FeedbackForm/feedbackForm.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const feedbackForm_module = ({"feedbackFormContainer":"mGkwC2","imageWrapper":"W08WEU","feedbackForm":"T9fk_i","errorField":"_o8zxV"});
// EXTERNAL MODULE: ./node_modules/react-spinners/esm/ClipLoader.js + 2 modules
var esm_ClipLoader = __webpack_require__(769);
// EXTERNAL MODULE: ./src/utils/formDataValidator.ts + 1 modules
var formDataValidator = __webpack_require__(209);
// EXTERNAL MODULE: ./src/utils/finalFormValidation.ts
var finalFormValidation = __webpack_require__(915);
// EXTERNAL MODULE: ./src/hooks/ReduxHooks.ts
var ReduxHooks = __webpack_require__(713);
// EXTERNAL MODULE: ./src/store/slices/toastSlice.ts
var toastSlice = __webpack_require__(225);
;// ./src/Components/FeedbackForm/FeedbackForm.tsx








const initFormDataFields = {
    name: "",
    email: "",
    subject: "",
    message: ""
};
const validationRules = { isEmptyFieldsAllowed: false };
const base = "https://nikita-7onenko-dev.github.io/Avion-Online-Store";
function FeedbackForm({ ref }) {
    const [isLoad, setIsLoad] = (0,react.useState)(false);
    const [formData, setFormData] = (0,react.useState)(initFormDataFields);
    const [errors, setErrors] = (0,react.useState)(initFormDataFields);
    const dispatch = (0,ReduxHooks/* useAppDispatch */.j)();
    function changeHandler(e) {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);
        setErrors(prev => ({ ...prev, [name]: (0,formDataValidator/* formDataValidator */.p)(name, value, formData, validationRules) }));
    }
    function onSubmit() {
        const { newErrorData, hasErrors } = (0,finalFormValidation/* finalFormValidation */.o)(formData, errors, validationRules);
        if (hasErrors) {
            setErrors(newErrorData);
            return;
        }
        dispatch((0,toastSlice/* showToastThunk */.Dz)({
            type: "success",
            message: "Thank you! Your message has been sent. We'll review it and get back to you if needed"
        }));
        setFormData(initFormDataFields);
    }
    return ((0,jsx_runtime.jsxs)("div", { className: feedbackForm_module.feedbackFormContainer, children: [(0,jsx_runtime.jsxs)("div", { className: feedbackForm_module.imageWrapper, children: [(0,jsx_runtime.jsx)("img", { src: `${base}/img/feedbackForm2.webp`, alt: "", loading: 'lazy', onLoad: () => setIsLoad(true), style: isLoad ? { visibility: 'visible' } : { visibility: 'hidden' } }), (0,jsx_runtime.jsx)(esm_ClipLoader/* default */.A, { color: '#2a254b', size: 80, cssOverride: isLoad ? { display: 'none' } : { display: 'inline-block', position: 'absolute' } })] }), (0,jsx_runtime.jsxs)("form", { action: "submit-form", className: feedbackForm_module.feedbackForm, ref: ref, onSubmit: (e) => {
                    e.preventDefault();
                    onSubmit();
                }, children: [(0,jsx_runtime.jsx)("h3", { children: "Feedback form" }), (0,jsx_runtime.jsxs)("fieldset", { children: [(0,jsx_runtime.jsx)("div", { children: (0,jsx_runtime.jsxs)("label", { htmlFor: "name", children: ["Name:", errors.name && (0,jsx_runtime.jsx)("p", { children: errors.name }), (0,jsx_runtime.jsx)("input", { className: errors.name ? feedbackForm_module.errorField : '', type: "text", id: "name", name: "name", placeholder: "Enter your name", value: formData.name, onChange: changeHandler })] }) }), (0,jsx_runtime.jsx)("div", { children: (0,jsx_runtime.jsxs)("label", { htmlFor: "email", children: ["Email:", errors.email && (0,jsx_runtime.jsx)("p", { children: errors.email }), (0,jsx_runtime.jsx)("input", { className: errors.email ? feedbackForm_module.errorField : '', type: "email", id: "email", name: "email", placeholder: "Enter your email", value: formData.email, onChange: changeHandler })] }) })] }), (0,jsx_runtime.jsxs)("fieldset", { children: [(0,jsx_runtime.jsxs)("div", { children: [(0,jsx_runtime.jsx)("label", { htmlFor: "subject", children: "Subject:" }), (0,jsx_runtime.jsx)("input", { type: "subject", id: "subject", name: "subject", placeholder: "Subject of your message", value: formData.subject, onChange: changeHandler })] }), (0,jsx_runtime.jsx)("div", { children: (0,jsx_runtime.jsxs)("label", { htmlFor: "message", children: ["Message:", errors.message && (0,jsx_runtime.jsx)("p", { children: errors.message }), (0,jsx_runtime.jsx)("textarea", { className: errors.message ? feedbackForm_module.errorField : '', id: "message", name: "message", placeholder: "Type your message here...", value: formData.message, onChange: changeHandler })] }) })] }), (0,jsx_runtime.jsx)("button", { type: "button", className: 'globalButton', onClick: onSubmit, children: "Send" })] })] }));
}

;// ./src/pages/ContactsPage.tsx





function ContactsPage() {
    (0,react.useEffect)(() => {
        window.scrollTo(0, 0);
    }, []);
    const scrollRef = (0,react.useRef)(null);
    return ((0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [(0,jsx_runtime.jsx)(ContactsHeroBlock, { ref: scrollRef }), (0,jsx_runtime.jsx)(ContactsBlock, {}), (0,jsx_runtime.jsx)(FeedbackForm, { ref: scrollRef })] }));
}


/***/ })

}]);