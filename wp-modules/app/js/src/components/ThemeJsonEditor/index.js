// @ts-check

/**
 * Genesis Studio App
 */

// WP Dependencies
import { ColorPicker, Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Icon, layout, file, globe, check } from '@wordpress/icons';

import PatternPreview from '../PatternPreview';
import useStudioContext from '../../hooks/useStudioContext';

/** @param {{visible: boolean}} props */
export default function ThemeJsonEditor( { visible } ) {
	/* eslint-disable */
	const { themeJsonFiles, currentTheme, currentThemeJsonFileId, currentThemeJsonFile } = useStudioContext();

	function renderSelector() {
		const renderedOptions = [];

		renderedOptions.push(
			<option key={ 1 }>
				{ __( 'Choose a Theme JSON File', 'fse-studio' ) }
			</option>
		);

		let counter = 3;

		for ( const fileId in themeJsonFiles.themeJsonFiles ) {
			const optionInQuestion = themeJsonFiles.themeJsonFiles[ fileId ];

			renderedOptions.push(
				<option key={ counter } value={ optionInQuestion.name }>
					{ optionInQuestion.name }
				</option>
			);
			counter++;
		}

		return currentTheme.data
			? (
				<select
					value={ currentThemeJsonFileId.value }
					onChange={ ( event ) => {
						currentTheme.set( {
							...currentTheme.data,
							theme_json_file: event.target.value,
						} )
					} }
				>
					{ renderedOptions }
				</select>
			) : null;
	}

	function renderThemeEditorWhenReady() {
		if ( ! currentThemeJsonFile.data ) {
			return null;
		}

		return <ThemeJsonDataEditor themeJsonFile={ currentThemeJsonFile } theme={ currentTheme } />;
	}

	return (
		<div hidden={ ! visible } className="fsestudio-theme-manager p-12">
			<div className="max-w-7xl mx-auto bg-white shadow">
				<h1 className="p-5 text-xl border-b border-gray-200 px-4 sm:px-6 md:px-8">
					{ __( 'Theme.json Manager', 'fse-studio' ) }
				</h1>
				<div className="px-4 sm:px-6 md:px-8 bg-[#F8F8F8] py-8 flex sm:flex-row flex-col items-end">
					<div className="flex flex-col gap-2">
						<button
							type="button"
							className="inline-flex items-center px-4 py-2 border border-4 border-transparent text-sm font-medium rounded-sm shadow-sm text-white bg-wp-gray hover:bg-[#4c5a60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wp-blue"
							onClick={ () => {
								const newData = {
									name: 'new',
									content: '',
								};

								themeJsonFiles.setThemeJsonFiles( {
									...themeJsonFiles.themeJsonFiles,
									my: newData,
								} );
							} }
						>
							{ __(
								'Create a new theme JSON file',
								'fse-studio'
							) }
						</button>
					</div>
				</div>
				{ renderThemeEditorWhenReady() }
			</div>
		</div>
	);
}

function ThemeJsonDataEditor( { themeJsonFile, theme } ) {
	const { patterns } = useStudioContext();
	const content = themeJsonFile.data.content;
	const [ currentView, setCurrentView ] = useState( 'settings' );

	const views = [
		{
			name: __( 'Settings', 'fse-studio' ),
			slug: 'settings',
			icon: file,
			current: true,
		},
		{
			name: __( 'Styles', 'fse-studio' ),
			slug: 'styles',
			icon: layout,
			current: false,
		},
		{
			name: __( 'Custom Templates', 'fse-studio' ),
			slug: 'custom_templates',
			icon: globe,
			current: false,
		},
		{
			name: __( 'Template Parts', 'fse-studio' ),
			slug: 'template_parts',
			icon: globe,
			current: false,
		},
	];

	function renderSettings() {
		const rendered = [];
		for ( const setting in content.settings ) {
			if ( setting === 'color' ) {
				for ( const colorSetting in content.settings[ setting ] ) {
					if ( colorSetting === 'palette' ) {
						rendered.push(
							<FseStudioColorPalette
								key={ colorSetting }
								themeJsonFile={ themeJsonFile }
								colors={
									content.settings[ setting ][ colorSetting ]
								}
							/>
						);
					}
				}
			}
		}

		return rendered;
	}

	function renderPatternPreviews() {
		const rendered = [];

		for ( const blockPattern in patterns.patterns ) {
			rendered.push(
				<PatternPreview
					key={ blockPattern }
					blockPatternData={ patterns.patterns[ blockPattern ] }
					themeJsonData={ null }
					scale={ 0.5 }
				/>
			);
		}

		return rendered;
	}

	function maybeRenderSettingsView() {
		if ( currentView !== 'settings' ) {
			return '';
		}

		const rendered = [];

		for ( const setting in content.settings ) {
			if ( setting === 'color' ) {
				for ( const colorSetting in content.settings[ setting ] ) {
					if ( colorSetting === 'palette' ) {
						rendered.push(
							<FseStudioColorPalette
								key={ colorSetting }
								themeJsonFile={ themeJsonFile }
								colors={
									content.settings[ setting ][ colorSetting ]
								}
							/>
						);
					}
				}
			}
		}

		return rendered;
	}

	function maybeRenderStylesView() {}

	function maybeRenderCustomTemplatesView() {}

	function maybeRenderTemplatePartsView() {}

	return (
		<>
			<div className="flex flex-row px-4 sm:px-6 md:px-8 py-8 gap-14">
				<ul className="w-72">
					{ views.map( ( item ) => {
						if ( item.slug !== 'settings' ) {
							return;
						}
						return (
							<li key={ item.name }>
								<button
									className={
										'w-full text-left p-5 font-medium' +
										( currentView === item.slug
											? ' bg-gray-100'
											: ' hover:bg-gray-100' )
									}
									key={ item.name }
									onClick={ () => {
										setCurrentView( item.slug );
									} }
								>
									{ item.name }
								</button>
							</li>
						)
					} ) }
				</ul>
				{ maybeRenderSettingsView() }
				{ maybeRenderStylesView() }
				{ maybeRenderCustomTemplatesView() }
				{ maybeRenderTemplatePartsView() }
			</div>
			<div className="p-5 text-xl border-t border-gray-200 px-4 sm:px-6 md:px-8 flex justify-between items-center">
				<div className="flex items-center">
					{ themeJsonFile.hasSaved ?
						(
							<span className="text-sm text-green-600 flex flex-row items-center mr-6">
								<Icon
									className="fill-current"
									icon={ check }
									size={ 26 }
								/>{ ' ' }
								{ __( 'Saved to disk', 'fse-studio' ) }
							</span>
						) : null
					}
					<button
						type="button"
						className="inline-flex items-center px-4 py-2 border border-4 border-transparent text-sm font-medium rounded-sm shadow-sm text-white bg-wp-blue hover:bg-wp-blue-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wp-blue"
						onClick={ () => {
							themeJsonFile.save();
							theme.save();
						} }
					>
						{ __( 'Save Theme and Theme Configuration File', 'fse-studio' ) }
					</button>
				</div>
			</div>
		</>
	);
}

function FseStudioColorPalette( { themeJsonFile, colors } ) {
	function renderColorOptions() {
		return colors.map( ( color, index ) => (
			<FseStudioColorPalettePicker
				key={ color.slug }
				themeJsonFile={ themeJsonFile }
				color={ color }
				index={ index }
			/>
		) );
	}

	return <div className="grid gap-5">{ renderColorOptions() }</div>;
}

function FseStudioColorPalettePicker( { themeJsonFile, color, index } ) {
	const [ popoverIsVisible, setPopoverIsVisible ] = useState( false );

	function maybeRenderPickerPopover() {
		if ( popoverIsVisible ) {
			return (
				<Popover
					onClose={ () => {
						setPopoverIsVisible( false );
					} }
				>
					<div className="p-2">
						<ColorPicker
							color={ color.color }
							// @ts-ignore The declaration file is wrong.
							onChange={ ( colorValue ) => {
								const modifiedData = { ...themeJsonFile.data };
								modifiedData.content.settings.color.palette[
									index
								] = {
									...modifiedData.content.settings.color
										.palette[ index ],
									color: colorValue,
								};

								themeJsonFile.set( modifiedData );
							} }
							enableAlpha
							defaultValue="#000"
						/>
					</div>
				</Popover>
			);
		}
	}

	return (
		<>
			<div>
				<label
					className="flex gap-1"
					onClick={ () => {
						setPopoverIsVisible( true );
					} }
				>
					<div
						style={ {
							width: '20px',
							height: '20px',
							backgroundColor: color.color,
						} }
						onClick={ () => {
							setPopoverIsVisible( true );
						} }
					>
						{ maybeRenderPickerPopover() }
					</div>
					<div>{ color.name }</div>
				</label>
			</div>
		</>
	);
}
