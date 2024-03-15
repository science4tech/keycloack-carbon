import {TextInput} from "@carbon/react";

//@typescript-eslint/no-explicit-any
interface CustomTextInputinterface {
    PasswordInput: any;
}

// @typescript-eslint/no-explicit-any
export const CustomTextInput: (CustomTextInputinterface & typeof TextInput) = TextInput as any;