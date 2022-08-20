import { createContext, Dispatch, SetStateAction } from 'react';

type InitObjType = {
	providerValue: {
		value: string;
		setValue: React.Dispatch<React.SetStateAction<string>>;
	};
	test: string;
};

export const ContextWrapper = createContext({} as InitObjType);
