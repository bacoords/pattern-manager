/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import getNextPatternIds from '../../utils/getNextPatternIds';
import usePmContext from '../../hooks/usePmContext';
import wpeLogoDefaultCropped from '../../../../img/WPE-LOGO-S-Default-Cropped.svg';
import getNewPattern from '../../utils/getNewPattern';
import getEditorUrl from '../../utils/getEditorUrl';

export default function Header() {
	const { notice, patterns } = usePmContext();

	return (
		<div className="pattern-manager-header-container">
			<div className="header-container-logo">
				<img
					alt={ __( 'WP Engine logo', 'pattern-manager' ) }
					className="logo-svg"
					aria-hidden="true"
					src={ wpeLogoDefaultCropped }
				/>
				<span className="logo-title">
					{ __( 'Pattern Manager', 'pattern-manager' ) }
				</span>
			</div>
			<div className="header-container-inner">
				<button
					className="header-button"
					onClick={ async () => {
						notice.set(
							__(
								'Creating your new pattern and opening it in the editor…',
								'pattern-manager'
							)
						);
						// Get the new pattern title and slug.
						const { patternTitle, patternSlug } = getNextPatternIds(
							patterns.data
						);

						await patterns.savePattern(
							getNewPattern( {
								title: patternTitle,
								name: patternSlug,
								slug: patternSlug,
								content: '',
							} )
						);
						location.href = getEditorUrl( patternSlug );
					} }
				>
					{ __( 'Create New Pattern', 'pattern-manager' ) }
				</button>
			</div>
		</div>
	);
}
