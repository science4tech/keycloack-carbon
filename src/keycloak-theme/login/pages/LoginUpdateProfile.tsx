import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import {Button, Layer, TextInput} from "@carbon/react";
import {ArrowRight} from "@carbon/icons-react";

export default function LoginUpdateProfile(props: PageProps<Extract<KcContext, { pageId: "login-update-profile.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { url, user, messagesPerField, isAppInitiatedAction } = kcContext;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={msg("loginProfileTitle")}>
            <form id="kc-update-profile-form" className={getClassName("kcFormClass")} action={url.loginAction}
                  method="post">
                <div className={'border-t border-solid border-[--cds-border-subtle-01] mx-4 mt-6'}></div>

                {user.editUsernameAllowed && (
                    <div
                        className={clsx(
                            getClassName("kcFormGroupClass"),
                            messagesPerField.printIfExists("username", getClassName("kcFormGroupErrorClass"))
                        )}
                    >
                        <div className={'p-4 '}>
                        <Layer>
                            <TextInput
                                id={'username'}
                                type="text"
                                invalid={messagesPerField.exists("username")}
                                invalidText={messagesPerField.get("username")}
                                labelText={msg("username")}
                                className={getClassName("kcInputClass")}
                                name={'username'}
                                defaultValue={user.username ?? ""}/>
                        </Layer>
                    </div>
                    </div>
                )}

                <div
                    className={clsx(getClassName("kcFormGroupClass"), messagesPerField.printIfExists("email", getClassName("kcFormGroupErrorClass")))}
                >
                    <div className={'p-4 '}>
                    <Layer>
                        <TextInput
                            id={'email'}
                            type="text"
                            labelText= {msg("email")}
                            invalid={messagesPerField.exists("email")}
                            invalidText={messagesPerField.get("email")}
                            className={getClassName("kcInputClass")}
                            name={'email'}
                            defaultValue={user.email ?? ""}/>
                    </Layer>
                </div>
                </div>

                <div
                    className={clsx(
                        getClassName("kcFormGroupClass"),
                        messagesPerField.printIfExists("firstName", getClassName("kcFormGroupErrorClass"))
                    )}
                >
                    <div className={'p-4 '}>
                        <Layer>
                            <TextInput
                                id={'firstName'}
                                type="text"
                                invalid={messagesPerField.exists("firstName")}
                                invalidText={messagesPerField.get("firstName")}
                                labelText={msg("firstName")}
                                className={getClassName("kcInputClass")}
                                name={'firstName'}
                                defaultValue={user.firstName ?? ""}/>
                        </Layer>
                    </div>
                </div>

                <div
                    className={clsx(
                        getClassName("kcFormGroupClass"),
                        messagesPerField.printIfExists("lastName", getClassName("kcFormGroupErrorClass"))
                    )}
                >
                    <div className={'p-4 '}>
                        <Layer>
                            <TextInput
                                id={'lastName'}
                                type="text"
                                invalid={messagesPerField.exists("lastName")}
                                invalidText={messagesPerField.get("lastName")}
                                labelText={msg("lastName")}
                                className={getClassName("kcInputClass")}
                                name={'lastName'}
                                defaultValue={user.lastName ?? ""}/>
                        </Layer>
                    </div>
                </div>

                <div className={getClassName("kcFormGroupClass")}>
                    <div id="kc-form-options" className={getClassName("kcFormOptionsClass")}>
                        <div className={getClassName("kcFormOptionsWrapperClass")}/>
                    </div>

                    <div id="kc-form-buttons" className={clsx(getClassName("kcFormGroupClass"), 'flex justify-end !mt-[23px]')}>
                        {!isAppInitiatedAction ? (
                            <>
                                <Button
                                    tabIndex={4}
                                    name="cancel-aia"
                                    size={'xl'}
                                    className={clsx(
                                        getClassName("kcButtonClass"),
                                        getClassName("kcButtonPrimaryClass"),
                                        getClassName("kcButtonBlockClass"),
                                        getClassName("kcButtonLargeClass"),
                                        'w-1/2'
                                    )}
                                    type="submit"
                                    value={"true"}
                                    kind="secondary"> {msgStr("doCancel")}</Button>
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
                            </>
                        ) : (
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
                        )}
                    </div>
                </div>
            </form>
        </Template>
    );
}
