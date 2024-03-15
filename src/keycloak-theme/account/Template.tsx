// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/account/TemplateProps";
import { useGetClassName } from "keycloakify/account/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import logo from './assets/logo.svg';
import {
    Header,
    HeaderContainer,
    SideNav,
    SideNavItems, SideNavLink,
} from "@carbon/react";


export default function Template(props: TemplateProps<KcContext, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, active, classes, children } = props;

    const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

    const { msg } = i18n;

    const {  url, features, realm } = kcContext;

    const { isReady } = usePrepareTemplate({
        "doFetchDefaultThemeResources": doUseDefaultCss,
        "styles": [
            `${url.resourcesPath}/css/account.css`
        ],
        "htmlClassName": getClassName("kcHtmlClass"),
        "bodyClassName": clsx("admin-console", "user", getClassName("kcBodyClass"))
    });

    if (!isReady) {
        return null;
    }

    return (
        <>

        <HeaderContainer
            render={() => (
                <>
                    <Header aria-label="Trialnet" className={'cds--header bg-[--cds-layer]'}>
                        <a href="#" className="cds--header__name"><span className="cds--header__name--prefix"><img
                            src={logo} alt={'logo'}/></span></a>
                        <SideNav
                            aria-label="Side navigation"
                            className={'bg-[--cds-layer]'}
                            >
                            <SideNavItems>

                                    <SideNavLink className={clsx(active === "account" && "active")}
                                        href={url.accountUrl}>{msg("account")}
                                    </SideNavLink>

                                {features.passwordUpdateSupported && (
                                    <SideNavLink className={clsx(active === "password" && "active")}
                                                 href={url.passwordUrl}>{msg("password")}
                                    </SideNavLink>
                                )}
                                <SideNavLink className={clsx(active === "totp" && "active")}
                                             href={url.totpUrl}>{msg("authenticator")}

                                </SideNavLink>
                                {features.identityFederation && (
                                    <SideNavLink className={clsx(active === "social" && "active")}
                                                 href={url.socialUrl}>{msg("federatedIdentity")}

                                    </SideNavLink>
                                )}
                                <SideNavLink className={clsx(active === "sessions" && "active")}
                                             href={url.sessionsUrl}>{msg("sessions")}

                                </SideNavLink>
                                <SideNavLink className={clsx(active === "applications" && "active")}
                                             href={url.applicationsUrl}>{msg("applications")}

                                </SideNavLink>
                                {features.log && (
                                    <SideNavLink className={clsx(active === "log" && "active")}
                                                 href={url.logUrl}>{msg("log")}

                                    </SideNavLink>
                                )}
                                {realm.userManagedAccessAllowed && features.authorization && (
                                    <SideNavLink className={clsx(active === "authorization" && "active")}
                                                 href={url.resourceUrl}>{msg("myResources")}

                                    </SideNavLink>
                                )}
                            </SideNavItems>
                        </SideNav>
                    </Header>
                    <div className="cds--content h-full w-full">
                    <div className="cds--grid">
                        <div className="cds--row">
                        <div className={'cds--offset-lg-3'}>
                                {children}
                            </div>
                        </div>
                    </div>
                    </div>
                </>

            )}
        />
        </>

    );
}
