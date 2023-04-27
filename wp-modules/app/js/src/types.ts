import usePatterns from './hooks/usePatterns';
import versionControl from './hooks/useVersionControl';

export type PatternManagerViews = 'theme_patterns' | 'pattern_editor';

export type InitialContext = {
	apiEndpoints: InitialPatternManager[ 'apiEndpoints' ];
	patternCategories: InitialPatternManager[ 'patternCategories' ];
	patterns: ReturnType< typeof usePatterns >;
	siteUrl: InitialPatternManager[ 'siteUrl' ];
	versionControl: ReturnType< typeof versionControl >;
};

export type InitialPatternManager = {
	adminUrl: string;
	apiEndpoints: {
		deletePatternEndpoint: string;
		updateDismissedThemesEndpoint: string;
	};
	apiNonce: string;
	patternCategories: QueriedCategories;
	patterns: Patterns;
	siteUrl: string;
	themeName: string;
	versionControl: '' | 1;
	dismissedThemes: Theme[ 'name' ][];
};

export type Pattern = {
	content: string;
	editorLink: string;
	name: string;
	slug: string;
	title: string;
	blockTypes?: string[];
	categories?: string[];
	description?: string;
	inserter?: boolean;
	keywords?: string[];
	postTypes?: string[];
	viewportWidth?: number;
};

export type Patterns = {
	[ key: string ]: Pattern;
};

export type QueriedCategories = {
	label: string;
	name: string;
}[];

export type Theme = {
	name: string;
};
