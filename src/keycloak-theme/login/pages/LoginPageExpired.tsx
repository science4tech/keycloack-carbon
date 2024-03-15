import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import {Link} from "@carbon/react";

export default function LoginPageExpired(props: PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url } = kcContext;

    const { msg } = i18n;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} displayMessage={false} headerNode={msg("pageExpiredTitle")}>
            <div id="instruction1" className="instruction m-4 flex flex-col">
                <div className="flex items-end">
                    <span className="cds--type-body-01 text-[--cds-text-primary]">{msg("pageExpiredMsg1")}</span>
                        <Link className="ml-2 mb-0.5" id="loginRestartLink" href={url.loginRestartFlowUrl}>
                        {msg("doClickHere")}.
                    </Link>
                </div>
                <div className="flex items-end mt-4">
                    <span className="cds--type-body-01 text-[--cds-text-primary]">{msg("pageExpiredMsg2")}{" "}</span>
                    <Link className="ml-2 mb-0.5" id="loginContinueLink" href={url.loginAction}>
                        {msg("doClickHere")}.
                    </Link>
                </div>
                </div>
        </Template>
);
}
