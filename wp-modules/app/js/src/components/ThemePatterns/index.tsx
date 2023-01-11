import React from 'react';

// WP Dependencies.
import { createInterpolateElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Icon, close, copy, edit, external } from '@wordpress/icons';

import usePmContext from '../../hooks/usePmContext';

// Components
import PatternPreview from '../PatternPreview';

// Globals
import { patternmanager } from '../../globals';

// Utils
import getDuplicatePattern from '../../utils/getDuplicatePattern';
import getNextPatternIds from '../../utils/getNextPatternIds';
import { Pattern } from '../../types';

type Props = {
	isVisible: boolean;
};

export default function ThemePatterns( { isVisible }: Props ) {
	const { currentTheme, currentView, currentPatternId } = usePmContext();

	if ( ! isVisible || ! currentTheme.data ) {
		return null;
	}

	return (
		<div hidden={ ! isVisible } className="w-full">
			<div className="bg-pm-gray p-8 lg:p-12 w-full">
				<div className="max-w-7xl mx-auto">
					<h1 className="text-4xl mb-3">
						{ __( 'Patterns', 'pattern-manager' ) }
					</h1>
					<p className="text-lg max-w-2xl">
						Add patterns to your theme. You can create patterns from
						scratch using the Create New Pattern button, and you can
						also duplicate patterns as a start.
					</p>
				</div>
			</div>

			<div className="mx-auto p-8 lg:p-12">
				<div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-10 lg:gap-20">
					<div className="flex-initial w-full md:w-2/3">
						<>
							<div className="grid w-full grid-cols-2 gap-5">
								{ Object.entries(
									currentTheme?.data?.included_patterns ?? {}
								).length === 0 ? (
									<div className="bg-pm-gray p-10 text-center w-full col-span-2 rounded">
										{ createInterpolateElement(
											__(
												'No patterns added yet. Click the <span></span> button to start creating and adding patterns.',
												'pattern-manager'
											),
											{
												span: (
													<strong>
														{ __(
															'Create New Pattern',
															'pattern-manager'
														) }
													</strong>
												),
											}
										) }
									</div>
								) : null }
								{ Object.entries(
									currentTheme?.data?.included_patterns ?? {}
								).map(
									( [ patternName, patternData ]: [
										string,
										Pattern
									] ) => {
										return (
											<div
												key={ patternName }
												className="min-h-[300px] bg-gray-100 flex flex-col justify-between border border-gray-200 rounded relative group"
											>
												<button
													type="button"
													className="absolute top-2 right-2 z-50"
													aria-label={ __(
														'Delete pattern',
														'pattern-manager'
													) }
													onClick={ () => {
														currentTheme.deletePattern(
															patternName
														);
													} }
												>
													<Icon
														className="text-black fill-current p-1 bg-white shadow-sm rounded hover:text-red-500 ease-in-out duration-300 opacity-0 group-hover:opacity-100"
														icon={ close }
														size={ 30 }
													/>
												</button>
												<button
													type="button"
													className="absolute top-2 left-2 z-50"
													aria-label={ __(
														'Edit Pattern',
														'pattern-manager'
													) }
													onClick={ () => {
														currentPatternId.set(
															patternName
														);
														currentView.set(
															'pattern_editor'
														);
													} }
												>
													<Icon
														className="text-black fill-current p-1 bg-white shadow-sm rounded hover:text-red-500 ease-in-out duration-300 opacity-0 group-hover:opacity-100"
														icon={ edit }
														size={ 30 }
													/>
												</button>

												<button
													type="button"
													className="absolute bottom-16 left-2 z-50"
													aria-label={ __(
														'Duplicate Pattern',
														'pattern-manager'
													) }
													onClick={ () => {
														const newPattern =
															getDuplicatePattern(
																patternData,
																Object.values(
																	currentTheme
																		.data
																		?.included_patterns ??
																		{}
																)
															);
														currentTheme
															.createPattern(
																newPattern
															)
															.then( () => {
																currentPatternId.set(
																	newPattern.slug
																);
																currentView.set(
																	'pattern_editor'
																);
															} );
													} }
												>
													<Icon
														className="text-black fill-current p-1 bg-white shadow-sm rounded hover:text-red-500 ease-in-out duration-300 opacity-0 group-hover:opacity-100"
														icon={ copy }
														size={ 30 }
													/>
												</button>

												<div className="p-3 flex flex-grow items-center z-0">
													<PatternPreview
														key={ patternName }
														url={
															patternmanager.siteUrl +
															'?pm_pattern_preview=' +
															patternData.name
														}
														scale={ 0.2 }
													/>
												</div>
												<div>
													<h2 className="text-sm bg-white p-4 rounded-b">
														{ patternData.title }
													</h2>
												</div>
											</div>
										);
									}
								) }
							</div>
						</>
					</div>

					<div className="flex-1 w-full md:w-1/3 text-base">
						<div className="bg-pm-gray p-8 gap-6 flex flex-col rounded mb-5">
							<div>
								<h2 className="sr-only">
									{ __(
										'Pattern Creation',
										'pattern-manager'
									) }
								</h2>
								<h3 className="mb-2 font-medium">
									Create new patterns
								</h3>
								<p className="text-base mb-5">
									Create new patterns for your theme using the
									button below. Patterns will appear on this
									page as you create them.
								</p>
								<button
									className="w-full items-center px-4 py-2 border-4 border-transparent font-medium text-center rounded-sm shadow-sm text-white bg-wp-blue hover:bg-wp-blue-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wp-blue"
									onClick={ () => {
										// Get the new pattern title and slug.
										const { patternTitle, patternSlug } =
											getNextPatternIds(
												currentTheme?.data
													?.included_patterns
											);

										currentTheme
											.createPattern( {
												type: 'pattern',
												title: patternTitle,
												name: patternSlug,
												slug: patternSlug,
												categories: [],
												keywords: [],
												blockTypes: [],
												postTypes: [],
												inserter: true,
												description: '',
												viewportWidth: '',
												content: '',
											} )
											.then( () => {
												// Switch to the newly created theme.
												currentPatternId.set(
													patternSlug
												);
												currentView.set(
													'pattern_editor'
												);
											} );
									} }
								>
									{ __(
										'Create New Pattern',
										'pattern-manager'
									) }
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
