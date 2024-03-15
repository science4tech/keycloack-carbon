import { createGetKcContext } from "keycloakify/account";


export const { getKcContext } = createGetKcContext({
	mockData: [
		{
			pageId: "account.ftl",
			locale: {
				//When we test the login page we do it in french
				currentLanguageTag: "en",
			},
			//Uncomment the following line for hiding the Alert message
			//"message": undefined
			//Uncomment the following line for showing an Error message
			// message: { type: "error", summary: "This is an error" }
		}
	],
	mockProperties: {
		MY_ENV_VARIABLE: "Mocked value"
	}
});

export const { kcContext } = getKcContext({
	//mockPageId: "account.ftl",
});

export type KcContext = NonNullable<ReturnType<typeof getKcContext>["kcContext"]>;
