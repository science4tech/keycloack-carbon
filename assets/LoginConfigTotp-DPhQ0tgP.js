import{j as s}from"./index-DQq2HTd_.js";import{u as C,c as r}from"./useGetClassName-DxRUA2CP.js";function T(u){var n;const{kcContext:o,i18n:p,doUseDefaultCss:d,Template:m,classes:j}=u,{getClassName:e}=C({doUseDefaultCss:d,classes:j}),{url:x,isAppInitiatedAction:h,totp:i,mode:l,messagesPerField:a}=o,{msg:t,msgStr:g}=p,c={HmacSHA1:"SHA1",HmacSHA256:"SHA256",HmacSHA512:"SHA512"};return s.jsx(m,Object.assign({},{kcContext:o,i18n:p,doUseDefaultCss:d,classes:j},{headerNode:t("loginTotpTitle")},{children:s.jsxs(s.Fragment,{children:[s.jsxs("ol",Object.assign({id:"kc-totp-settings"},{children:[s.jsxs("li",{children:[s.jsx("p",{children:t("loginTotpStep1")}),s.jsx("ul",Object.assign({id:"kc-totp-supported-apps"},{children:i.supportedApplications.map(b=>s.jsx("li",{children:t(b)}))}))]}),l&&l=="manual"?s.jsxs(s.Fragment,{children:[s.jsxs("li",{children:[s.jsx("p",{children:t("loginTotpManualStep2")}),s.jsx("p",{children:s.jsx("span",Object.assign({id:"kc-totp-secret-key"},{children:i.totpSecretEncoded}))}),s.jsx("p",{children:s.jsx("a",Object.assign({href:i.qrUrl,id:"mode-barcode"},{children:t("loginTotpScanBarcode")}))})]}),s.jsxs("li",{children:[s.jsx("p",{children:t("loginTotpManualStep3")}),s.jsx("p",{children:s.jsxs("ul",{children:[s.jsxs("li",Object.assign({id:"kc-totp-type"},{children:[t("loginTotpType"),": ",t(`loginTotp.${i.policy.type}`)]})),s.jsxs("li",Object.assign({id:"kc-totp-algorithm"},{children:[t("loginTotpAlgorithm"),": ",(n=c==null?void 0:c[i.policy.algorithm])!==null&&n!==void 0?n:i.policy.algorithm]})),s.jsxs("li",Object.assign({id:"kc-totp-digits"},{children:[t("loginTotpDigits"),": ",i.policy.digits]})),i.policy.type==="totp"?s.jsxs("li",Object.assign({id:"kc-totp-period"},{children:[t("loginTotpInterval"),": ",i.policy.period]})):s.jsxs("li",Object.assign({id:"kc-totp-counter"},{children:[t("loginTotpCounter"),": ",i.policy.initialCounter]}))]})})]})]}):s.jsxs("li",{children:[s.jsx("p",{children:t("loginTotpStep2")}),s.jsx("img",{id:"kc-totp-secret-qr-code",src:`data:image/png;base64, ${i.totpSecretQrCode}`,alt:"Figure: Barcode"}),s.jsx("br",{}),s.jsx("p",{children:s.jsx("a",Object.assign({href:i.manualUrl,id:"mode-manual"},{children:t("loginTotpUnableToScan")}))})]}),s.jsxs("li",{children:[s.jsx("p",{children:t("loginTotpStep3")}),s.jsx("p",{children:t("loginTotpStep3DeviceName")})]})]})),s.jsxs("form",Object.assign({action:x.loginAction,className:e("kcFormClass"),id:"kc-totp-settings-form",method:"post"},{children:[s.jsxs("div",Object.assign({className:e("kcFormGroupClass")},{children:[s.jsxs("div",Object.assign({className:e("kcInputWrapperClass")},{children:[s.jsx("label",Object.assign({htmlFor:"totp",className:e("kcLabelClass")},{children:t("authenticatorCode")}))," ",s.jsx("span",Object.assign({className:"required"},{children:"*"}))]})),s.jsxs("div",Object.assign({className:e("kcInputWrapperClass")},{children:[s.jsx("input",{type:"text",id:"totp",name:"totp",autoComplete:"off",className:e("kcInputClass"),"aria-invalid":a.existsError("totp")}),a.existsError("totp")&&s.jsx("span",Object.assign({id:"input-error-otp-code",className:e("kcInputErrorMessageClass"),"aria-live":"polite"},{children:a.get("totp")}))]})),s.jsx("input",{type:"hidden",id:"totpSecret",name:"totpSecret",value:i.totpSecret}),l&&s.jsx("input",{type:"hidden",id:"mode",value:l})]})),s.jsxs("div",Object.assign({className:e("kcFormGroupClass")},{children:[s.jsxs("div",Object.assign({className:e("kcInputWrapperClass")},{children:[s.jsx("label",Object.assign({htmlFor:"userLabel",className:e("kcLabelClass")},{children:t("loginTotpDeviceName")}))," ",i.otpCredentials.length>=1&&s.jsx("span",Object.assign({className:"required"},{children:"*"}))]})),s.jsxs("div",Object.assign({className:e("kcInputWrapperClass")},{children:[s.jsx("input",{type:"text",id:"userLabel",name:"userLabel",autoComplete:"off",className:e("kcInputClass"),"aria-invalid":a.existsError("userLabel")}),a.existsError("userLabel")&&s.jsx("span",Object.assign({id:"input-error-otp-label",className:e("kcInputErrorMessageClass"),"aria-live":"polite"},{children:a.get("userLabel")}))]}))]})),h?s.jsxs(s.Fragment,{children:[s.jsx("input",{type:"submit",className:r(e("kcButtonClass"),e("kcButtonPrimaryClass"),e("kcButtonLargeClass")),id:"saveTOTPBtn",value:g("doSubmit")}),s.jsx("button",Object.assign({type:"submit",className:r(e("kcButtonClass"),e("kcButtonDefaultClass"),e("kcButtonLargeClass"),e("kcButtonLargeClass")),id:"cancelTOTPBtn",name:"cancel-aia",value:"true"},{children:t("doCancel")}))]}):s.jsx("input",{type:"submit",className:r(e("kcButtonClass"),e("kcButtonPrimaryClass"),e("kcButtonLargeClass")),id:"saveTOTPBtn",value:g("doSubmit")})]}))]})}))}export{T as default};
//# sourceMappingURL=LoginConfigTotp-DPhQ0tgP.js.map
