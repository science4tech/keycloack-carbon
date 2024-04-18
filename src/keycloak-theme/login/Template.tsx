// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { useState, useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import logo from './assets/logo.svg';
import { InlineNotification} from "@carbon/react";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        displayWide = false,
        showAnotherWayIfPresent = true,
        headerNode,
        showUsernameNode = null,
        infoNode = null,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

    const { msg } = i18n;

    const { auth, url, message, isAppInitiatedAction } = kcContext;

    const { isReady } = usePrepareTemplate({
        "doFetchDefaultThemeResources": doUseDefaultCss,
        "styles": [
            `${url.resourcesCommonPath}/lib/zocial/zocial.css`,
            `${url.resourcesPath}/css/login.css`
        ],
        "htmlClassName": getClassName("kcHtmlClass"),
        "bodyClassName": getClassName("kcBodyClass")
    });

    useState(()=> { document.title = i18n.msgStr("loginTitle", kcContext.realm.displayName); });

    useEffect(() => {
        console.log(`Value of MY_ENV_VARIABLE on the Keycloak server: "${kcContext.properties.MY_ENV_VARIABLE}"`);
    }, []);

    if (!isReady) {
        return null;
    }
    function containsHTMLTags(str: string) {
        const regex = /<[^>]*>/;
        return regex.test(str);
    }
    return (
        <>
            <header aria-label="IBM Platform Name" className="cds--header bg-[--cds-layer] ">
                <a href="#" className="cds--header__name"><span className="cds--header__name--prefix"><img src={logo} alt={'logo'}/></span></a>

            </header>
            <div className={clsx(getClassName("kcLoginClass"), 'h-screen flex items-center justify-center')}>
                <div className={clsx('w-[544px] bg-[--cds-layer] !m-0 p-0')}>
                    <header className={clsx(getClassName("kcFormHeaderClass"), 'pt-4 pl-4 pr-4 mb-4 ')}>
                        {!(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                            displayRequiredFields ? (
                                <div className={getClassName("kcContentWrapperClass")}>
                                    <div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")}>
                                    <span className="subtitle">
                                        <span className="required">*</span>
                                        {msg("requiredFields")}
                                    </span>
                                    </div>
                                    <div className="col-md-10">
                                        <h3 id="kc-page-title text-[cds--type-heading-04]">{headerNode}</h3>
                                    </div>
                                </div>
                            ) : (
                                <h3 id="kc-page-title cds--type-heading-04">{headerNode}</h3>
                            )
                        ) : displayRequiredFields ? (
                            <div className={getClassName("kcContentWrapperClass")}>
                                <div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")}>
                                <span className="subtitle">
                                    <span className="required">*</span> {msg("requiredFields")}
                                </span>
                                </div>
                                <div className="col-md-10">
                                    {showUsernameNode}
                                    <div className={getClassName("kcFormGroupClass")}>
                                        <div id="kc-username">
                                            <label id="kc-attempted-username">{auth?.attemptedUsername}</label>
                                            <a id="reset-login" href={url.loginRestartFlowUrl}>
                                                <div className="kc-login-tooltip">
                                                    <i className={getClassName("kcResetFlowIcon")}></i>
                                                    <span
                                                        className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {showUsernameNode}
                                <div className={getClassName("kcFormGroupClass")}>
                                    <div id="kc-username">
                                        <label id="kc-attempted-username">{auth?.attemptedUsername}</label>
                                        <a id="reset-login" href={url.loginRestartFlowUrl}>
                                            <div className="kc-login-tooltip">
                                                <i className={getClassName("kcResetFlowIcon")}></i>
                                                <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </>
                        )}
                    </header>
                    <div id="kc-content">
                        <div id="kc-content-wrapper">
                            {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                            {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && !containsHTMLTags(message.summary) && (
                                <div className={clsx("alert", `alert-${message.type}`, 'px-4')}>

                                    <InlineNotification
                                        aria-label="closes notification"
                                        kind={message.type}
                                        lowContrast={true}

                                        onClose={function noRefCheck() {
                                        }}
                                        onCloseButtonClick={function noRefCheck() {
                                        }}
                                        statusIconDescription="notification"
                                        subtitle={message.summary.replace(/(<([^>]+)>)/gi, ", ")}
                                        title={message.type.charAt(0).toUpperCase() + message.type.slice(1)}
                                    />
                                </div>
                            )}
                            {children}
                            {auth !== undefined && auth.showTryAnotherWayLink && showAnotherWayIfPresent && (
                                <form
                                    id="kc-select-try-another-way-form"
                                    action={url.loginAction}
                                    method="post"
                                    className={clsx(displayWide && getClassName("kcContentWrapperClass"))}
                                >
                                    <div
                                        className={clsx(
                                            displayWide && [getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass")]
                                        )}
                                    >
                                        <div className={getClassName("kcFormGroupClass")}>
                                            <input type="hidden" name="tryAnotherWay" value="on"/>
                                            <a
                                                href="#"
                                                id="try-another-way"
                                                onClick={() => {
                                                    document.forms["kc-select-try-another-way-form" as never].submit();
                                                    return false;
                                                }}
                                            >
                                                {msg("doTryAnotherWay")}
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            )}
                            {displayInfo && (
                                <div id="kc-info" className={getClassName("kcSignUpClass")}>
                                    <div id="kc-info-wrapper" className={getClassName("kcInfoAreaWrapperClass")}>
                                        {infoNode}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
