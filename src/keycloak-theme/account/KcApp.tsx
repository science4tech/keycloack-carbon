import "./KcApp.scss";
import { lazy, Suspense } from "react";
import type { PageProps } from "keycloakify/account";
import type { KcContext } from "./kcContext";
import { useI18n } from "./i18n";
import Template from "./Template";

const Password = lazy(() => import("./pages/Password"));


const Fallback = lazy(()=> import("keycloakify/account"));

const classes = {
    "kcBodyClass": "my-root-account-class"
} satisfies PageProps["classes"];

export default function KcApp(props: { kcContext: KcContext; }) {

    const { kcContext } = props;

    const i18n = useI18n({ kcContext });

    if (i18n === null) {
        return null;
    }

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "password.ftl": return <Password {...{ kcContext, i18n, Template, classes }} doUseDefaultCss={true} />;
                    default: return <Fallback {...{ kcContext, i18n, classes }} Template={Template} doUseDefaultCss={true} />;
                }
            })()}
        </Suspense>
    );

}
