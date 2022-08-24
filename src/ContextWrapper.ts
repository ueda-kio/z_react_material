import { createContext, Dispatch, SetStateAction } from 'react';

export type FairContents = {
	id: string;
	category: string;
	unit: string;
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
	fair: {
		fairContents: FairContents[];
		setFairContents: React.Dispatch<React.SetStateAction<FairContents[]>>;
	};
	multipleEvent: {
		isMultiple: boolean;
		setIsMultiple: React.Dispatch<React.SetStateAction<boolean>>;
	};
};

export const ContextWrapper = createContext({} as InitObjType);
