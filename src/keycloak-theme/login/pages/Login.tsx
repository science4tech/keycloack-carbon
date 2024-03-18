import { useState, type FormEventHandler } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import {Button, Checkbox, Layer, Link, TextInput} from "@carbon/react";
import {ArrowRight} from "@carbon/icons-react";
import {CustomTextInput} from "../../custom-text-input.tsx";

const my_custom_param = new URL(window.location.href).searchParams.get("my_custom_param");

if (my_custom_param !== null) {
    console.log("my_custom_param:", my_custom_param);
}

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
        e.preventDefault();

        setIsLoginButtonDisabled(true);

        const formElement = e.target as HTMLFormElement;

        //NOTE: Even if we login with email Keycloak expect username and password in
        //the POST request.
        formElement.querySelector("input[name='email']")?.setAttribute("name", "username");

        formElement.submit();
    });

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayInfo={false}
            displayWide={realm.password && social.providers !== undefined}
            headerNode={msg("doLogIn")}
            infoNode={
                <div id="kc-registration">
                </div>
            }
        >

            <div id="kc-form" className={clsx(realm.password && social.providers !== undefined && getClassName("kcContentWrapperClass"))}>
                <div
                    id="kc-form-wrapper"
                    className={clsx(
                        realm.password &&
                        social.providers && [getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass")]
                    )}
                >
                    {realm.password && (
                        <form id="kc-form-login" onSubmit={onSubmit} action={url.loginAction} method="post">
                            <div className={'border-t border-solid border-[--cds-border-subtle-01] mx-4 mt-6'}></div>
                            <div className={'p-4 '}>
                            <div className={getClassName("kcFormGroupClass")}>
                                {!usernameHidden &&
                                    (() => {
                                        const label = !realm.loginWithEmailAllowed
                                            ? "username"
                                            : realm.registrationEmailAsUsername
                                                ? "email"
                                                : "usernameOrEmail";

                                        const autoCompleteHelper: typeof label = label === "usernameOrEmail" ? "username" : label;

                                        return (
                                            <>
                                            <Layer>
                                                <TextInput
                                                    id={autoCompleteHelper}
                                                    type="text"
                                                    labelText={msg(label)}
                                                    className={getClassName("kcLabelClass")}
                                                    placeholder={'yourname@email.com'}
                                                    name={autoCompleteHelper}
                                                    defaultValue={login.username ?? ""}
                                                    tabIndex={1}
                                                    autoFocus={true}
                                                    autoComplete="off"
                                                />
                                            </Layer>
                                            </>
                                        );
                                    })()}
                            </div>
                            <div className={clsx(getClassName("kcFormGroupClass"),'mt-4')}>
                                <Layer>
                                <CustomTextInput.PasswordInput
                                    labelText={msg("password")}
                                    tabIndex={2}
                                    id="password"
                                    className={clsx(getClassName("kcInputClass"),)}
                                    name="password"
                                    type="password"
                                    autoComplete="off"
                                />
                                </Layer>
                            </div>
                            <div className={clsx(getClassName("kcFormGroupClass"), getClassName("kcFormSettingClass"))}>

                                <div className={'flex justify-between'}>
                                <div id="kc-form-options" className={'mt-8'}>
                                    {realm.rememberMe && !usernameHidden && (
                                        <Checkbox

                                            id="rememberMe"
                                            name="rememberMe"
                                            {...(login.rememberMe === "on"
                                                ? {
                                                "checked": true
                                            }
                                                : {})}
                                            labelText={msg("rememberMe")} />
                                    )}
                                </div>
                                <div className={clsx(getClassName("kcFormOptionsWrapperClass"),'mt-8')}>
                                    {realm.resetPasswordAllowed && (
                                        <span>
                                            <Link tabIndex={5} href={url.loginResetCredentialsUrl}>
                                                {msg("doForgotPassword")} </Link>
                                        </span>
                                    )}
                                </div>
                                </div>
                            </div>
                            </div>
                            <div id="kc-form-buttons" className={clsx(getClassName("kcFormGroupClass"),'flex justify-end !mt-[23px]')}>
                                <input
                                    type="hidden"
                                    id="id-hidden-input"
                                    name="credentialId"
                                    {...(auth?.selectedCredential !== undefined
                                        ? {
                                            "value": auth.selectedCredential
                                        }
                                        : {})}
                                />
                                <Button
                                    tabIndex={4}
                                    size={'xl'}
                                    className={clsx(
                                        getClassName("kcButtonClass"),
                                        getClassName("kcButtonPrimaryClass"),
                                        getClassName("kcButtonBlockClass"),
                                        getClassName("kcButtonLargeClass"),
                                        'w-1/2'
                                    )}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value={msgStr("doLogIn")}
                                    disabled={isLoginButtonDisabled}
                                    kind="primary"
                                    renderIcon={(props) => <ArrowRight size={24} {...props} />} iconDescription="Log in"> {msgStr("doLogIn")}</Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}
