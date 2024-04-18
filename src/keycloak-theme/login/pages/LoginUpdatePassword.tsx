import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import {Button, Layer} from "@carbon/react";
import {CustomTextInput} from "../../custom-text-input.tsx";
import {ArrowRight} from "@carbon/icons-react";

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { url, messagesPerField, isAppInitiatedAction, username } = kcContext;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={msg("updatePasswordTitle")}>
            <form id="kc-passwd-update-form" className={getClassName("kcFormClass")} action={url.loginAction}
                  method="post">
                <div className={'border-t border-solid border-[--cds-border-subtle-01] mx-4 mt-6'}></div>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    readOnly={true}
                    autoComplete="username"
                    style={{display: "none"}}
                />
                <input type="password" id="password" name="password" autoComplete="current-password"
                       style={{display: "none"}}/>

                <div
                    className={clsx(
                        getClassName("kcFormGroupClass"),
                        messagesPerField.printIfExists("password", getClassName("kcFormGroupErrorClass"))
                    )}
                >
                    <div className={'p-4 '}>
                        <Layer>
                            <CustomTextInput.PasswordInput
                                id={'password-new'}
                                type="password"
                                autoFocus={true}
                                autoComplete="new-password"
                                labelText={msg("passwordNew")}
                                className={getClassName("kcLabelClass")}
                                name={'password-new'}
                            />
                        </Layer>
                    </div>

                </div>

                <div
                    className={clsx(
                        getClassName("kcFormGroupClass"),
                        messagesPerField.printIfExists("password-confirm", getClassName("kcFormGroupErrorClass"))
                    )}
                >
                    <div className={'p-4 '}>
                        <Layer>
                            <CustomTextInput.PasswordInput
                                id={'password-confirm'}
                                type="password"
                                autoComplete="new-password"
                                labelText={msg("passwordConfirm")}
                                className={getClassName("kcLabelClass")}
                                name={'password-confirm'}
                            />
                        </Layer>
                    </div>
                </div>

                <div className={getClassName("kcFormGroupClass")}>
                    <div id="kc-form-options" className={getClassName("kcFormOptionsClass")}>
                        <div className={getClassName("kcFormOptionsWrapperClass")}>
                            {isAppInitiatedAction && (
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" id="logout-sessions" name="logout-sessions" value="on"
                                               checked/>
                                        {msgStr("logoutOtherSessions")}
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>


                        {isAppInitiatedAction ? (
                            <>
                            <div id="kc-form-buttons"
                                 className={clsx(getClassName("kcFormGroupClass"), 'flex justify-between items-center !mt-6')}>
                                <input
                                    className={clsx(
                                        getClassName("kcButtonClass"),
                                        getClassName("kcButtonPrimaryClass"),
                                        getClassName("kcButtonLargeClass")
                                    )}
                                    type="submit"
                                    defaultValue={msgStr("doSubmit")}
                                />
                                <button
                                    className={clsx(
                                        getClassName("kcButtonClass"),
                                        getClassName("kcButtonDefaultClass"),
                                        getClassName("kcButtonLargeClass")
                                    )}
                                    type="submit"
                                    name="cancel-aia"
                                    value="true"
                                >
                                    {msg("doCancel")}
                                </button>
                            </div>
                            </>
                            ) : (
                            <div id="kc-form-buttons"
                                 className={clsx(getClassName("kcFormGroupClass"), 'flex justify-end items-center !mt-6')}>
                                <Button
                                    size={'xl'}
                                    className={clsx(
                                        'w-1/2'
                                    )}
                                    type="submit"
                                    value={msgStr("doSubmit")}
                                    kind="primary"
                                    renderIcon={(props) => <ArrowRight size={24} {...props} />}
                                    iconDescription="Submit"> {msgStr("doSubmit")}</Button>
                            </div>
                                )}
                            </div>
                            </form>
                            </Template>
                            );
                        }
