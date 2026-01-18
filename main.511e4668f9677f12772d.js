"use strict";
(self["webpackChunkavion"] = self["webpackChunkavion"] || []).push([[954],{

/***/ 209:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  p: () => (/* binding */ formDataValidator)
});

;// ./src/utils/validationMethods.ts
const validationMethods = {
    name(value, _, isEmptyFieldsAllowed) {
        const nameRegex = /^[A-Za-zÀ-žА-Яа-яЁё]+(?:[-\s][A-Za-zÀ-žА-Яа-яЁё]+)*$/;
        if (!value)
            return isEmptyFieldsAllowed ? '' : 'Field must be filled';
        else if (!nameRegex.test(value))
            return 'Invalid name format';
        else if (value.length < 2 || value.length > 33)
            return 'Name must be 2-33 chars';
        return '';
    },
    username(value) {
        const nameRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/;
        if (!value)
            return 'Field must be filled';
        else if (value.length < 2 || value.length > 33)
            return 'Name must be 2-33 chars';
        else if (!nameRegex.test(value))
            return 'Name can contain only letters, spaces and dashes';
        else
            return '';
    },
    email(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value)
            return 'Field must be filled';
        else if (!emailRegex.test(value))
            return 'Invalid email format';
        else
            return '';
    },
    oldPassword(value) {
        if (!value)
            return 'Field must be filled';
        else if (value.length < 6)
            return 'Password must be at least 6 characters long';
        return '';
    },
    password(value, formData) {
        if (!formData)
            return '';
        if (!value)
            return 'Field must be filled';
        else if (value.length < 6)
            return 'Password must be at least 6 characters long';
        else if ('confirmPassword' in formData && (value !== formData.confirmPassword))
            return 'Passwords do not match';
        return '';
    },
    confirmPassword(value, formData) {
        if (!formData)
            return '';
        if (!value)
            return 'Field must be filled';
        else if (value.length < 6)
            return 'Password must be at least 6 characters long';
        else if ('password' in formData && (value !== formData.password))
            return 'Passwords do not match';
        return '';
    },
    phone(value, _, isEmptyFieldsAllowed) {
        const phoneRegex = /^\+?[0-9 ]*$/;
        if (!value)
            return isEmptyFieldsAllowed ? '' : 'Field must be filled';
        else if (!phoneRegex.test(value))
            return 'Invalid phone number format';
        const digitsCount = value.replace(/\D/g, '').length;
        if (digitsCount < 8 || digitsCount > 15)
            return 'Phone number must be 8-15 digits long';
        return '';
    },
    location(value, _, isEmptyFieldsAllowed) {
        const locationRegex = /^[A-Za-zÀ-ž\s-]+$/;
        if (!value)
            return isEmptyFieldsAllowed ? '' : 'Field must be filled';
        else if (!locationRegex.test(value))
            return 'Invalid location format';
        else if (value.length < 2 || value.length > 75)
            return 'Location must be 2-75 chars long';
        return '';
    }
};

;// ./src/utils/formDataValidator.ts

function formDataValidator(fieldKey, value, formData, rules) {
    const dictionary = {
        username: validationMethods.username,
        firstName: validationMethods.name,
        lastName: validationMethods.name,
        email: validationMethods.email,
        oldPassword: validationMethods.oldPassword,
        password: validationMethods.password,
        confirmPassword: validationMethods.confirmPassword,
        phone: validationMethods.phone,
        country: validationMethods.location,
        city: validationMethods.location,
        address: validationMethods.location
    };
    const validator = dictionary[fieldKey];
    if (!validator)
        return '';
    let error = validator(value, formData, rules.isEmptyFieldsAllowed);
    return error;
}


/***/ }),

/***/ 915:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ finalFormValidation)
/* harmony export */ });
/* harmony import */ var _formDataValidator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(209);

function finalFormValidation(formData, errors, rules) {
    const newErrorData = { ...errors };
    for (const key in formData) {
        const value = formData[key];
        if (rules.isEmptyFieldsAllowed && (key === 'password' || key === 'confirmPassword' || key === 'oldPassword')) {
            continue;
        }
        newErrorData[key] = (0,_formDataValidator__WEBPACK_IMPORTED_MODULE_0__/* .formDataValidator */ .p)(key, value, formData, rules);
    }
    const hasErrors = Object.values(newErrorData).some(err => err);
    return {
        hasErrors,
        newErrorData
    };
}


/***/ }),

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