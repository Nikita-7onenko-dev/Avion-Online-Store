"use strict";
(self["webpackChunkavion"] = self["webpackChunkavion"] || []).push([[726],{

/***/ 726:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ UserPage)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(848);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(540);
;// ./src/Components/EmailActivationMessage/emailActivationMessage.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const emailActivationMessage_module = ({"container":"IYslPp","activationMessage":"zrD5Mt"});
;// ./src/Components/EmailActivationMessage/EmailActivationMessage.tsx


function EmailActivationMessage() {
    return ((0,jsx_runtime.jsx)("div", { className: emailActivationMessage_module.container, children: (0,jsx_runtime.jsx)("div", { className: emailActivationMessage_module.activationMessage, children: (0,jsx_runtime.jsx)("p", { children: "We have sent an activation link to your email. Please check your inbox and follow the link" }) }) }));
}

;// ./src/Components/ProfileSettingsForm/profileSettingsForm.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const profileSettingsForm_module = ({"profileForm":"uP8UbY","formTitle":"hekziV","profileInfo":"ul9lo7"});
// EXTERNAL MODULE: ./src/utils/formDataValidator.ts + 1 modules
var formDataValidator = __webpack_require__(209);
;// ./src/utils/passwordGroupValidator.ts

const rules = {
    isEmptyFieldsAllowed: false
};
function passwordGroupValidator(formData) {
    const { oldPassword, password, confirmPassword } = formData;
    if (!oldPassword && !password && !confirmPassword) {
        return { oldPassword: "", password: "", confirmPassword: "" };
    }
    return {
        oldPassword: (0,formDataValidator/* formDataValidator */.p)('oldPassword', oldPassword, formData, rules),
        password: (0,formDataValidator/* formDataValidator */.p)('password', password, formData, rules),
        confirmPassword: (0,formDataValidator/* formDataValidator */.p)('confirmPassword', confirmPassword, formData, rules)
    };
}

;// ./src/Components/ProfileInfoFields/profileInfoFields.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const profileInfoFields_module = ({"fieldsSection":"m6jcRH","infoField":"v1g_30","infoInput":"DpFUei","inputWrapper":"FXDThb","checkbox":"W5KE3F","errorField":"il43j7"});
;// ./src/data/profileInfoFieldsDictionary.ts
const profileInfoFieldsDictionary = {
    Personal: [
        {
            label: 'User name',
            name: 'username',
            type: 'text',
            field: 'username'
        },
        {
            label: 'First name',
            name: 'firstName',
            type: 'text',
            field: 'firstName',
        },
        {
            label: 'Last name',
            name: 'lastName',
            type: 'text',
            field: 'lastName',
        }
    ],
    Contacts: [
        {
            label: 'Email',
            name: 'email',
            type: 'email',
            field: 'email'
        },
        {
            label: 'Phone',
            name: 'phone',
            type: 'tel',
            field: 'phone',
        },
        {
            label: 'Country',
            name: 'country',
            type: 'text',
            field: 'country',
        },
        {
            label: 'City',
            name: 'city',
            type: 'text',
            field: 'city',
        },
    ],
    Passwords: [
        {
            label: 'Old password',
            name: 'oldPassword',
        },
        {
            label: 'New password',
            name: 'password',
        },
        {
            label: 'Confirm new password',
            name: 'confirmPassword',
        }
    ]
};

;// ./src/Components/ProfileInfoFields/ProfileInfoFields.tsx




function ProfileInfoFields({ edit, errors, formData, changeHandler, variation }) {
    let infoItems = profileInfoFieldsDictionary[variation].map(field => ((0,jsx_runtime.jsxs)("label", { htmlFor: field.name, className: profileInfoFields_module.inputLabel, children: [(0,jsx_runtime.jsx)("span", { children: field.label }), edit ?
                (0,jsx_runtime.jsxs)("div", { className: profileInfoFields_module.inputWrapper, children: [errors[field.name] && (0,jsx_runtime.jsx)("p", { children: errors[field.name] }), (0,jsx_runtime.jsx)("input", { id: field.name, className: `${profileInfoFields_module.infoInput} ${errors[field.name] ? profileInfoFields_module.errorField : ''}`, value: formData?.[field.field], onChange: changeHandler, name: field.name, type: field.type })] })
                : (0,jsx_runtime.jsx)("p", { className: profileInfoFields_module.infoField, children: formData?.[field.field] })] }, field.label)));
    const [showPassword, setShowPassword] = (0,react.useState)(false);
    if (variation === 'Personal') {
        let passwordItems = profileInfoFieldsDictionary['Passwords'].map(field => ((0,jsx_runtime.jsxs)("label", { className: profileInfoFields_module.inputLabel, children: [(0,jsx_runtime.jsx)("span", { children: field.label }), (0,jsx_runtime.jsxs)("div", { className: profileInfoFields_module.inputWrapper, children: [errors[field.name] && (0,jsx_runtime.jsx)("p", { children: errors[field.name] }), (0,jsx_runtime.jsx)("input", { className: `${profileInfoFields_module.infoInput} ${errors[field.name] ? profileInfoFields_module.errorField : ''}`, onChange: changeHandler, name: field.name, type: showPassword ? "text" : "password" })] })] }, field.label)));
        return ((0,jsx_runtime.jsxs)("section", { className: profileInfoFields_module.fieldsSection, children: [infoItems, edit &&
                    (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [passwordItems, (0,jsx_runtime.jsxs)("label", { htmlFor: 'showPassword', className: profileInfoFields_module.checkbox, children: [(0,jsx_runtime.jsx)("input", { onChange: () => setShowPassword(prev => !prev), id: 'showPassword', type: "checkbox" }), "Show password"] }, 'checkBox')] })] }));
    }
    return ((0,jsx_runtime.jsx)("section", { className: profileInfoFields_module.fieldsSection, children: infoItems }));
}

// EXTERNAL MODULE: ./src/utils/finalFormValidation.ts
var finalFormValidation = __webpack_require__(915);
// EXTERNAL MODULE: ./src/queries/useUserSessionQueries.ts + 5 modules
var useUserSessionQueries = __webpack_require__(620);
;// ./src/Components/ProfileSettingsForm/ProfileSettingsForm.tsx








const fieldNames = [
    "firstName", "lastName", "username",
    "oldPassword", "password", "confirmPassword",
    "phone", "email", "country", "city"
];
const initErrorFields = Object.fromEntries(fieldNames.map(f => [f, ""]));
function ProfileSettingsForm() {
    const { data: userData } = (0,useUserSessionQueries/* useRefreshUser */.S8)();
    const { mutate: updateUser } = (0,useUserSessionQueries/* useUpdateUser */.Qc)();
    const initFormData = Object.fromEntries(fieldNames.map(f => [f, userData?.[f] || ""]));
    const [edit, setEdit] = (0,react.useState)(false);
    const [formData, setFormData] = (0,react.useState)(initFormData);
    const [errors, setErrors] = (0,react.useState)(initErrorFields);
    (0,react.useEffect)(() => {
        if (!edit && userData) {
            setFormData(initFormData);
            setErrors(initErrorFields);
        }
    }, [userData, edit]);
    function changeHandler(e) {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);
        if (name === 'password' || name === 'confirmPassword' || name === 'oldPassword') {
            setErrors(prev => ({
                ...prev,
                ...passwordGroupValidator(newFormData)
            }));
        }
        else {
            setErrors(prev => ({ ...prev, [name]: (0,formDataValidator/* formDataValidator */.p)(name, value, newFormData, { isEmptyFieldsAllowed: true }) }));
        }
    }
    function submitChanges() {
        const { hasErrors, newErrorData } = (0,finalFormValidation/* finalFormValidation */.o)({ ...formData }, errors, { isEmptyFieldsAllowed: true });
        if (hasErrors) {
            setErrors(newErrorData);
            return;
        }
        const updateData = Object.fromEntries(// Очистить от пустых полей
        Object.entries(formData).filter(([k, v]) => {
            if (k === 'password' || k === 'confirmPassword' || k === 'oldPassword') {
                return v;
            }
            else
                return true;
        }));
        updateUser(updateData);
        setEdit(false);
    }
    return ((0,jsx_runtime.jsx)("form", { className: profileSettingsForm_module.profileForm, onSubmit: (e) => {
            e.preventDefault();
            submitChanges();
        }, children: (0,jsx_runtime.jsxs)("div", { children: [(0,jsx_runtime.jsxs)("div", { className: profileSettingsForm_module.formTitle, children: [(0,jsx_runtime.jsx)("h2", { children: "Profile info" }), (0,jsx_runtime.jsx)("button", { onClick: () => setEdit(prev => !prev), className: 'globalButton', type: 'button', children: edit ? "Cancel" : "Edit" })] }), (0,jsx_runtime.jsxs)("div", { className: profileSettingsForm_module.profileInfo, children: [(0,jsx_runtime.jsx)(ProfileInfoFields, { edit: edit, errors: errors, formData: formData, changeHandler: changeHandler, variation: 'Personal' }), (0,jsx_runtime.jsx)(ProfileInfoFields, { edit: edit, errors: errors, formData: formData, changeHandler: changeHandler, variation: 'Contacts' })] }), edit && (0,jsx_runtime.jsx)("button", { type: 'submit', className: 'globalButton', children: "Save changes" })] }) }));
}

;// ./src/Components/ProfileHat/profileHat.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const profileHat_module = ({"profileHatBanner":"ePVvXj","profileHat":"qUhSQC","avatar":"yBEPe7","controls":"DFbanZ"});
;// ./src/Components/ProfileHat/ProfileHat.tsx



function ProfileHat() {
    const { data: userData } = (0,useUserSessionQueries/* useRefreshUser */.S8)();
    const { mutate: logout } = (0,useUserSessionQueries/* useLogoutUser */.TN)();
    return ((0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [(0,jsx_runtime.jsx)("div", { className: profileHat_module.profileHatBanner, children: (0,jsx_runtime.jsxs)("h2", { children: ["Welcome ", userData?.username] }) }), (0,jsx_runtime.jsxs)("section", { className: profileHat_module.profileHat, children: [(0,jsx_runtime.jsxs)("figure", { className: profileHat_module.avatar, children: [(0,jsx_runtime.jsxs)("svg", { width: "80px", height: "80px", viewBox: "0 0 24 24", fill: "none", stroke: "#2a254b", children: [(0,jsx_runtime.jsx)("g", { strokeWidth: "0" }), (0,jsx_runtime.jsx)("g", { id: "SVGRepo_tracerCarrier", strokeLinecap: "round", strokeLinejoin: "round", stroke: "#000000", strokeWidth: "0.288" }), (0,jsx_runtime.jsxs)("g", { id: "SVGRepo_iconCarrier", children: [(0,jsx_runtime.jsx)("path", { d: "M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z", stroke: "#2a254b", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }), (0,jsx_runtime.jsx)("path", { d: "M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z", stroke: "#2a254b", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }), (0,jsx_runtime.jsx)("path", { d: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z", stroke: "#2a254b", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" })] })] }), (0,jsx_runtime.jsxs)("figcaption", { children: [(0,jsx_runtime.jsx)("h2", { children: userData?.username }), (0,jsx_runtime.jsx)("p", { children: userData?.role })] })] }), (0,jsx_runtime.jsxs)("nav", { className: profileHat_module.controls, children: [(0,jsx_runtime.jsx)("button", { children: "Info" }), (0,jsx_runtime.jsx)("button", { children: "Orders" }), (0,jsx_runtime.jsx)("button", { onClick: () => logout(), children: "Logout" })] })] })] }));
}

;// ./src/Components/ProfileBlock/ProfileBlock.tsx



function ProfileBlock() {
    return ((0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [(0,jsx_runtime.jsx)(ProfileHat, {}), (0,jsx_runtime.jsx)(ProfileSettingsForm, {})] }));
}

;// ./src/Components/AuthForm/registerForm.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const registerForm_module = ({"registerFormBlock":"BlU_7S","inputWrapper":"bjr9Ws","switchFormWrapper":"_x2bPT","errorField":"gwV3HC"});
;// ./src/Components/AuthForm/AuthForm.tsx






const placeHolders = {
    username: 'Your name',
    email: 'Your email',
    password: 'Password',
    confirmPassword: 'Confirm password'
};
const validationRules = {
    isEmptyFieldsAllowed: false
};
function AuthForm({ variation, setSwitchForm }) {
    const { mutate: postUser } = (0,useUserSessionQueries/* usePostUser */.Vg)();
    const isSignUp = variation === 'Sign up';
    const initFormDataFields = isSignUp ? {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    } : {
        email: '',
        password: '',
    };
    const [formData, setFormData] = (0,react.useState)(initFormDataFields);
    const [errors, setErrors] = (0,react.useState)(initFormDataFields);
    const [showPassword, setShowPassword] = (0,react.useState)(false);
    function sendFormData() {
        const { newErrorData, hasErrors } = (0,finalFormValidation/* finalFormValidation */.o)(formData, errors, validationRules);
        if (hasErrors) {
            setErrors(newErrorData);
            return;
        }
        ;
        postUser(formData);
    }
    function changeHandler(e) {
        const { name: field, value } = e.target;
        const newFormData = { ...formData, [field]: value };
        const isValidatingPasswords = 'confirmPassword' in newFormData && (field === 'password' || field === 'confirmPassword');
        setFormData(newFormData);
        if (isValidatingPasswords) {
            setErrors(prev => ({
                ...prev,
                'password': (0,formDataValidator/* formDataValidator */.p)('password', newFormData.password, newFormData, validationRules),
                'confirmPassword': (0,formDataValidator/* formDataValidator */.p)('confirmPassword', newFormData.confirmPassword ?? '', newFormData, validationRules)
            }));
        }
        else {
            setErrors(prev => ({ ...prev, [field]: (0,formDataValidator/* formDataValidator */.p)(field, value, newFormData, validationRules) }));
        }
    }
    const formInputs = Object.keys(formData).map(field => {
        return ((0,jsx_runtime.jsxs)("div", { className: registerForm_module.inputWrapper, children: [errors[field] && (0,jsx_runtime.jsx)("p", { children: errors[field] }), (0,jsx_runtime.jsx)("input", { className: errors[field] ? registerForm_module.errorField : '', type: (field === 'password' || field === 'confirmPassword') ? (showPassword ? 'text' : 'password') : field, name: field, value: formData[field], onChange: changeHandler, placeholder: placeHolders[field], autoComplete: "AutoFill" })] }, field));
    });
    const switchButtonLabel = isSignUp ? 'Log in' : 'Sign up';
    const question = isSignUp ? "Already have an account?" : "Don't have an account?";
    return ((0,jsx_runtime.jsx)("div", { className: registerForm_module.registerFormBlock, children: (0,jsx_runtime.jsxs)("form", { onSubmit: (e) => {
                e.preventDefault();
                sendFormData();
            }, children: [(0,jsx_runtime.jsx)("h2", { children: variation }), formInputs, (0,jsx_runtime.jsxs)("label", { children: [(0,jsx_runtime.jsx)("input", { type: "checkbox", onChange: () => setShowPassword(prev => !prev) }), "Show password"] }), (0,jsx_runtime.jsx)("button", { type: "submit", className: "globalButton", children: variation }), (0,jsx_runtime.jsxs)("div", { className: registerForm_module.switchFormWrapper, children: [(0,jsx_runtime.jsx)("p", { children: question }), (0,jsx_runtime.jsx)("button", { type: "button", className: "globalButton", onClick: () => setSwitchForm(prev => !prev), children: switchButtonLabel })] })] }) }));
}

// EXTERNAL MODULE: ./src/Components/PageLoader/PageLoader.tsx + 1 modules
var PageLoader = __webpack_require__(228);
;// ./src/pages/UserPage.tsx







function UserPage() {
    const [switchForm, setSwitchForm] = (0,react.useState)(true);
    const { data: userData, isLoading } = (0,useUserSessionQueries/* useRefreshUser */.S8)();
    if (isLoading)
        return ((0,jsx_runtime.jsx)(PageLoader/* PageLoader */.D, {}));
    return (userData ?
        !userData.isActivated ?
            (0,jsx_runtime.jsx)(EmailActivationMessage, {})
            : (0,jsx_runtime.jsx)(ProfileBlock, {}, 'Profile block')
        : (switchForm
            ? (0,jsx_runtime.jsx)(AuthForm, { setSwitchForm: setSwitchForm, variation: "Sign up" }, 'Sign up')
            : (0,jsx_runtime.jsx)(AuthForm, { setSwitchForm: setSwitchForm, variation: "Log in" }, 'Log in')));
}


/***/ })

}]);