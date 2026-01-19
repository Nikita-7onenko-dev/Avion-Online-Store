"use strict";
(self["webpackChunkavion"] = self["webpackChunkavion"] || []).push([[954],{

/***/ 954:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ CheckoutPage)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(848);
;// ./src/pages/CheckoutPage/checkoutPage.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const checkoutPage_module = ({"checkoutContainer":"zTJcyl","message":"cafx1b"});
// EXTERNAL MODULE: ./src/store/slices/cartSlice.ts + 1 modules
var cartSlice = __webpack_require__(666);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(540);
// EXTERNAL MODULE: ./src/utils/formDataValidator.ts + 1 modules
var formDataValidator = __webpack_require__(209);
// EXTERNAL MODULE: ./src/hooks/ReduxHooks.ts
var ReduxHooks = __webpack_require__(713);
;// ./src/Components/CheckoutForm/checkoutForm.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const checkoutForm_module = ({"checkoutForm":"SbdPKG","inputWrapper":"OInuFB","textInput":"AptYpP","errorField":"Bo8nmq"});
;// ./src/data/checkoutFieldsDictionary.ts
const contactsAndDeliveryFieldsDictionary = [
    {
        label: 'Email',
        name: 'email',
        type: 'email',
    },
    {
        label: 'Phone',
        name: 'phone',
        type: 'text',
    },
    {
        label: 'First name',
        name: 'firstName',
        type: 'text',
    },
    {
        label: 'Last name',
        name: 'lastName',
        type: 'text',
    },
    {
        label: 'Country',
        name: 'country',
        type: 'text',
    },
    {
        label: 'City',
        name: 'city',
        type: 'text',
    },
    {
        label: 'Address',
        name: 'address',
        type: 'text',
    },
];
const shippingMethodsDictionary = [
    {
        name: 'shippingMethod',
        value: 'Standard delivery'
    },
    {
        name: 'shippingMethod',
        value: 'Pickup'
    },
];
const paymentOptionsDictionary = [
    {
        name: 'payment',
        value: 'Credit Card'
    },
    {
        name: 'payment',
        value: 'PayPal'
    },
    {
        name: 'payment',
        value: 'Cash on delivery'
    }
];

;// ./src/Components/CheckoutForm/CheckoutForm.tsx





function CheckoutForm({ formData, errors, setFormData, inputChangeHandler, placeOrder, formRef }) {
    const contactsAndDeliveryFields = contactsAndDeliveryFieldsDictionary.map(field => ((0,jsx_runtime.jsxs)("div", { className: checkoutForm_module.inputWrapper, children: [errors[field.name] && (0,jsx_runtime.jsx)("p", { children: errors[field.name] }), (0,jsx_runtime.jsx)("input", { className: `${checkoutForm_module.textInput} ${errors[field.name] ? checkoutForm_module.errorField : ''}`, onChange: inputChangeHandler, name: field.name, type: field.type, value: formData[field.name], placeholder: field.label })] }, field.name)));
    const shippingMethodOptionsItems = shippingMethodsDictionary.map((field, index) => ((0,jsx_runtime.jsxs)("label", { children: [(0,jsx_runtime.jsx)("input", { type: "radio", value: field.value, name: field.name, onChange: (e) => setFormData({ ...formData, [e.target.name]: e.target.value }), defaultChecked: index === 0 }), (0,jsx_runtime.jsx)("span", { children: field.value })] }, field.value)));
    const paymentOptionsItems = paymentOptionsDictionary.map((field, index) => ((0,jsx_runtime.jsxs)("label", { children: [(0,jsx_runtime.jsx)("input", { type: "radio", value: field.value, name: field.name, onChange: (e) => setFormData({ ...formData, [e.target.name]: e.target.value }), defaultChecked: index === 0 }), (0,jsx_runtime.jsx)("span", { children: field.value })] }, field.value)));
    return ((0,jsx_runtime.jsxs)("form", { className: checkoutForm_module.checkoutForm, children: [(0,jsx_runtime.jsxs)("section", { ref: formRef, children: [(0,jsx_runtime.jsx)("h3", { children: "Contacts and delivery information" }), contactsAndDeliveryFields] }), (0,jsx_runtime.jsxs)("section", { children: [(0,jsx_runtime.jsx)("h3", { children: "Shipping method" }), shippingMethodOptionsItems] }), (0,jsx_runtime.jsxs)("section", { children: [(0,jsx_runtime.jsx)("h3", { children: "Payment" }), paymentOptionsItems] }), (0,jsx_runtime.jsx)("button", { type: 'button', className: 'globalButton', onClick: placeOrder, children: "Place order" })] }));
}

// EXTERNAL MODULE: ./node_modules/react-router/dist/development/chunk-EF7DTUVF.mjs
var chunk_EF7DTUVF = __webpack_require__(362);
// EXTERNAL MODULE: ./src/utils/finalFormValidation.ts
var finalFormValidation = __webpack_require__(915);
// EXTERNAL MODULE: ./src/queries/useUserSessionQueries.ts + 5 modules
var useUserSessionQueries = __webpack_require__(620);
;// ./src/pages/CheckoutPage/CheckoutPage.tsx










const fieldNames = [
    'email', 'phone', 'firstName', 'lastName', 'country', 'city', 'address', 'shippingMethod', 'payment'
];
const initErrorFields = Object.fromEntries(fieldNames.map(f => [f, ""]));
const validationRules = {
    isEmptyFieldsAllowed: false,
};
function CheckoutPage() {
    (0,react.useEffect)(() => {
        window.scrollTo(0, 0);
    }, []);
    const { data: userData } = (0,useUserSessionQueries/* useRefreshUser */.S8)();
    const cart = (0,ReduxHooks/* useAppSelector */.G)(state => state.cart);
    const dispatch = (0,ReduxHooks/* useAppDispatch */.j)();
    const [isShowMessage, setIsShowMessage] = (0,react.useState)(false);
    const contactsAndDeliverySectionRef = (0,react.useRef)(null);
    const initFormData = Object.fromEntries(fieldNames.map(f => [f, userData?.[f] || ""]));
    initFormData.shippingMethod = 'Standard delivery';
    initFormData.payment = 'Credit card';
    const [formData, setFormData] = (0,react.useState)(initFormData);
    const [errors, setErrors] = (0,react.useState)(initErrorFields);
    function inputChangeHandler(e) {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);
        setErrors(prev => ({
            ...prev,
            [name]: (0,formDataValidator/* formDataValidator */.p)(name, value, newFormData, validationRules)
        }));
    }
    function placeOrder() {
        const { newErrorData, hasErrors } = (0,finalFormValidation/* finalFormValidation */.o)(formData, errors, { isEmptyFieldsAllowed: false });
        if (hasErrors) {
            setErrors(newErrorData);
            contactsAndDeliverySectionRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            return;
        }
        const order = {
            ...formData,
            date: new Date().toISOString(),
            orderDetails: cart.map(product => ({
                productName: product.name,
                productId: product._id,
                quantity: product.quantity
            }))
        };
        console.log(order);
        dispatch((0,cartSlice/* clearCart */.sX)());
        setIsShowMessage(true);
    }
    return ((0,jsx_runtime.jsx)("div", { className: checkoutPage_module.checkoutContainer, children: isShowMessage ? ((0,jsx_runtime.jsxs)("div", { className: checkoutPage_module.message, children: [(0,jsx_runtime.jsx)("h2", { children: "Thank you for your order! \uD83C\uDF89" }), (0,jsx_runtime.jsxs)("p", { children: ["Your order has been successfully placed. ", (0,jsx_runtime.jsx)("br", {}), "Order number: #12345"] }), (0,jsx_runtime.jsx)(chunk_EF7DTUVF/* Link */.N_, { to: '/', className: 'globalLink', children: "Return to Home " })] })) : (0,jsx_runtime.jsx)(CheckoutForm, { formData: formData, errors: errors, setFormData: setFormData, inputChangeHandler: inputChangeHandler, formRef: contactsAndDeliverySectionRef, placeOrder: placeOrder }) }));
}


/***/ })

}]);