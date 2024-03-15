import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import {Button, Layer, Link, TextInput} from "@carbon/react";
import {ArrowRight} from "@carbon/icons-react";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { url, realm, auth } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayMessage={false}
            headerNode={msg("emailForgotTitle")}
            infoNode={msg("emailInstruction")}
        >
            <form id="kc-reset-password-form" className={getClassName("kcFormClass")} action={url.loginAction} method="post">
                <div className={'border-t border-solid border-[--cds-border-subtle-01] mx-4 mt-6'}></div>
                <div className={'p-4 '}>
                        <Layer>
                            <TextInput
                                id={'username'}
                                type="text"
                                labelText={!realm.loginWithEmailAllowed
                                    ? msg("username")
                                    : !realm.registrationEmailAsUsername
                                        ? msg("usernameOrEmail")
                                        : msg("email")}
                                className={getClassName("kcLabelClass")}
                                name={'username'}
                                defaultValue={auth !== undefined && auth.showUsername ? auth.attemptedUsername : undefined}
                            />
                        </Layer>
                </div>
                <div className={clsx(getClassName("kcFormGroupClass"), getClassName("kcFormSettingClass"))}>

                    <div id="kc-form-buttons" className={clsx(getClassName("kcFormGroupClass"), 'flex justify-between items-center !mt-6')}>
                    <Link class={'ml-4'} href={url.loginUrl}>{msg("backToLogin")}</Link>
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
                            type="submit"
                            value={msgStr("doSubmit")}
                            kind="primary"
                            renderIcon={(props) => <ArrowRight size={24} {...props} />} iconDescription="Submit"> {msgStr("doSubmit")}</Button>
                    </div>
                </div>
            </form>
        </Template>
    );
}
