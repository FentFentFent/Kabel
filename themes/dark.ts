import type { WSTheme } from '../src/workspace-svg';

const KabelDarkTheme: WSTheme = {
	UIStyles: {
		workspaceBGColor: '#121412ff',
		toolboxCategoriesBG: {
			position: 'absolute',
			left: '0',
			top: '0',
			width: '20%',
			height: '100%',
			background: '#1b1b1b',
			color: '#e0e0e0',
			overflowY: 'auto',
			border: 'none',
			outline: 'none',
		},
		toolboxFlyoutBG: {
			display: 'block',
			background: '#1e1e1e',
			color: '#e0e0e0',
			overflowY: 'auto',
			padding: '4px', 
			borderRadius: '4px',
			boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
			border: 'none',
			outline: 'none',
		},
	},
};

export default KabelDarkTheme;
