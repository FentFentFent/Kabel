import type {WSTheme} from '../src/workspace-svg'



const KabelWSTheme: WSTheme = {
	UIStyles: {
        workspaceBGColor: '#ffffff',
		toolboxCategoriesBG: {
			position: 'absolute',
			left: '0',
			top: '0',
			width: '20%',
			height: '100%',
			background: 'rgba(240,240,240,0.9)',
			overflowY: 'auto',
		},
		toolboxFlyoutBG: {
			background: 'rgba(240,240,240,0.9)', // reuse same neutral bg
			overflowY: 'auto',
			padding: '4px', // like nodes padding
			borderRadius: '4px',
			boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
		},
	},
};

export default KabelWSTheme;