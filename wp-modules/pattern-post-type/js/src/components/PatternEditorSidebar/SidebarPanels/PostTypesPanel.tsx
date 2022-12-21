import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { Spinner } from '@wordpress/components';
import Select from 'react-select';
import { HelperTooltip, ReverseTooltip } from '../../Tooltips';

import { PostMeta, SelectOptions } from '../../../types';

type Props = {
	postMeta: PostMeta;
	postTypes: SelectOptions;
	handleChange: (
		metaKey: 'postTypes',
		newValue: PostMeta[ 'postTypes' ]
	) => void;
	children: React.ReactNode;
};

/**
 * The panel section for restricting post types for the pattern.
 * Custom post types and certain core types are displayed as toggles.
 */
export function PostTypesPanel( {
	postMeta,
	postTypes,
	handleChange,
	children,
}: Props ) {
	/**
	 * Boolean to catch when a template-part related block type is selected.
	 * This is used to automatically select and disable the wp_template post type.
	 */
	const templatePartBlockTypeSelected =
		postMeta?.blockTypes?.some(
			( blockType ) => blockType !== 'core/post-content'
		) &&
		postMeta?.blockTypes?.some( ( blockType ) =>
			blockType.includes( 'core/template-part' )
		);

	/**
	 * Automatically select the wp_template postType when a template-part blockType is selected.
	 * wp_template postType removal will also be disabled in the postType Select component.
	 */
	useEffect( () => {
		if (
			templatePartBlockTypeSelected &&
			! postMeta?.postTypes?.includes( 'wp_template' )
		) {
			handleChange( 'postTypes', [
				...postMeta.postTypes,
				'wp_template',
			] );
		}
	}, [ postMeta.postTypes, templatePartBlockTypeSelected ] );

	return (
		<PluginDocumentSettingPanel
			name="fsestudio-pattern-editor-pattern-post-types"
			title={ __( 'Post Types', 'fse-studio' ) }
		>
			<HelperTooltip
				helperText={ __(
					'With no selections, this pattern will be available in the block inserter for all post types.',
					'fse-studio'
				) }
				helperTitle={ __( 'Allowed post types', 'fse-studio' ) }
			/>
			{ postTypes ? (
				<Select
					isMulti
					isClearable
					closeMenuOnSelect={ false }
					value={ postMeta?.postTypes?.map( ( postType ) => {
						return {
							...postTypes.find(
								( matchedPostType ) =>
									matchedPostType.value === postType
							),
							// Conditionally make wp_template post type non-removable.
							// Add a custom label with Tooltip.
							...( postType === 'wp_template' &&
								templatePartBlockTypeSelected && {
									label: (
										<ReverseTooltip
											helperText={ __(
												'Required for "core/template-part" transforms (block types).',
												'fse-studio'
											) }
											helperTitle={ __(
												'Templates',
												'fse-studio'
											) }
											icon="lock"
										/>
									),
									isFixed: true,
								} ),
						};
					} ) }
					options={ postTypes }
					onChange={ ( postTypeSelections ) => {
						handleChange(
							'postTypes',
							postTypeSelections.map(
								( postType ) => postType.value
							)
						);
					} }
					menuPlacement="auto"
					styles={ {
						menu: ( base ) => ( {
							...base,
							// Without this z-index value, the dropdown is transparent.
							zIndex: 100,
						} ),
						multiValue: ( base, state ) => {
							return state.data.isFixed
								? { ...base, backgroundColor: 'gray' }
								: base;
						},
						multiValueLabel: ( base, state ) => {
							return state.data.isFixed
								? {
										...base,
										fontWeight: 'bold',
										color: 'white',
										paddingRight: 6,
								  }
								: base;
						},
						multiValueRemove: ( base, state ) => {
							return state.data.isFixed
								? { ...base, display: 'none' }
								: base;
						},
					} }
				/>
			) : (
				<Spinner />
			) }
			{ children }
		</PluginDocumentSettingPanel>
	);
}
