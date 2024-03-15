import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import {Link} from "@carbon/react";

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg } = i18n;

    const { url, user } = kcContext;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} displayMessage={false} headerNode={msg("emailVerifyTitle")}>
            <p className="instruction m-4 cds--type-body-01 text-[--cds-text-primary]">{msg("emailVerifyInstruction1", user?.email ?? "")}</p>
            <p className="instruction m-4 cds--type-body-01 text-[--cds-text-primary]">
                {msg("emailVerifyInstruction2")}
                <br />
                <Link href={url.loginAction}>{msg("doClickHere")}</Link>
                &nbsp;
                <span className="cds--type-body-01 text-[--cds-text-primary]">{msg("emailVerifyInstruction3")}</span>
            </p>
        </Template>
    );
}
