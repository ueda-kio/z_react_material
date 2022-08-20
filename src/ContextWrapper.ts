import { createContext, Dispatch, SetStateAction } from 'react';

type FairContents = {
	category: string;
};

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
	noReception: {
		isNoReception: boolean;
		setIsNoReception: React.Dispatch<React.SetStateAction<boolean>>;
	};
	fairContents: {
		contents: FairContents[];
		setContents: React.Dispatch<React.SetStateAction<FairContents[]>>;
	};
};

export const ContextWrapper = createContext({} as InitObjType);
