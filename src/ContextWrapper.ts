import { createContext, Dispatch, SetStateAction } from 'react';

type InitObjType = {
	providerValue: {
		value: string;
		setValue: React.Dispatch<React.SetStateAction<string>>;
	};
	realTime: {
		isRealTime: boolean;
		setIsRealTime: React.Dispatch<React.SetStateAction<boolean>>;
	};
	summarize: {
		isSummarize: boolean;
		setIsSummarize: React.Dispatch<React.SetStateAction<boolean>>;
	};
};

export const ContextWrapper = createContext({} as InitObjType);
