import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import {InlineNotification, Link} from "@carbon/react";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { message, client } = kcContext;

    const { msg } = i18n;
    const errorClass = `mx-4 ${!client  ? 'mb-8' : ''}`;
    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} displayMessage={false} headerNode={msg("errorTitle")}>
            <div id="kc-error-message" className={errorClass}>
                <InlineNotification
                    hideCloseButton={true}
                    aria-label="closes notification"
                    kind={message.type}
                    lowContrast={true}
                    statusIconDescription="notification"
                    subtitle={message.summary}
                    title={message.type.charAt(0).toUpperCase() + message.type.slice(1)}
                />

                {client !== undefined && client.baseUrl !== undefined && (
                    <Link href={client.baseUrl} className={'my-8'}>{msg("backToApplication")}</Link>
                )}
            </div>
        </Template>
    );
}
