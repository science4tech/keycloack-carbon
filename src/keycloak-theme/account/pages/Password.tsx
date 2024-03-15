import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import { useGetClassName } from "keycloakify/account/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import {CustomTextInput} from "../../custom-text-input.tsx";

export default function LogoutConfirm(props: PageProps<Extract<KcContext, { pageId: "password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        "classes": {
            ...classes,
            "kcBodyClass": clsx(classes?.kcBodyClass, "password")
        }
    });

    const { url, password, account, stateChecker } = kcContext;

    const { msg } = i18n;


    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="password">
            <div className="flex flex-col justify-center items-center h-full">

                    <h2>{msg("changePasswordHtmlTitle")}</h2>

                <div className="subtitle">
                    <span className="subtitle">{msg("allFieldsRequired")}</span>
                </div>


            <form action={url.passwordUrl} className="form-horizontal" method="post">
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={account.username ?? ""}
                    autoComplete="username"
                    readOnly
                    style={{ "display": "none" }}
                />

                {password.passwordSet && (

                    <div className="form-group">
                        <CustomTextInput.PasswordInput
                            labelText={msg("password")}
                            tabIndex={2}
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                        />
                    </div>
                )}

                <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />

                <div className="form-group">
                    <CustomTextInput.PasswordInput
                        labelText={msg("passwordNew")}
                        tabIndex={2}
                        id="password-new"
                        name="password-new"
                        type="password"
                        autoComplete="new-password"
                    />

                    <CustomTextInput.PasswordInput
                        labelText={msg("passwordConfirm")}
                        tabIndex={2}
                        id="password-confirm"
                        name="password-confirm"
                        type="password"
                        autoComplete="new-password"
                    />
                </div>
                <div className="form-group">
                    <div id="kc-form-buttons" className="col-md-offset-2 col-md-10 submit">
                        <div>
                            <button
                                type="submit"
                                className={clsx(
                                    getClassName("kcButtonClass"),
                                    getClassName("kcButtonPrimaryClass"),
                                    getClassName("kcButtonLargeClass")
                                )}
                                name="submitAction"
                                value="Save"
                            >
                                {msg("doSave")}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </Template>
    );
}
