import { useState, useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { patternmanager } from '../globals';
import getHeaders from '../utils/getHeaders';

import useNoticeContext from './useNoticeContext';
import usePatterns from './usePatterns';

import type { Pattern, Patterns } from '../types';

export default function useThemeData(
	initialPatterns: Patterns,
	patterns: ReturnType< typeof usePatterns >
) {
	const { setSnackBarValue } = useNoticeContext();
	const [ isSaving, setIsSaving ] = useState( false );
	const [ fetchInProgress, setFetchInProgress ] = useState( false );
	const [ patternsData, setPatternsData ] = useState( initialPatterns );

	const editorDirty = useRef( false );
	const [ siteEditorDirty, setSiteEditorDirty ] = useState( false );
	const [ requestThemeRefresh, setRequestThemeRefresh ] = useState( false );

	useEffect( () => {
		window.addEventListener(
			'message',
			( event ) => {
				if ( event.data === 'patternmanager_site_editor_dirty' ) {
					setSiteEditorDirty( true );
				}
			},
			false
		);
		// When a pattern or site editor is saved, refresh the theme data.
		window.addEventListener(
			'message',
			( event ) => {
				if (
					event.data === 'patternmanager_site_editor_save_complete'
				) {
					setSiteEditorDirty( false );
					setRequestThemeRefresh( true );
				}
			},
			false
		);

		window.addEventListener( 'beforeunload', warnIfUnsavedChanges );
		return () => {
			window.removeEventListener( 'beforeunload', warnIfUnsavedChanges );
		};
	}, [] );

	useEffect( () => {
		if ( requestThemeRefresh ) {
			// If something is still dirty, don't do anything yet.
			if ( siteEditorDirty ) {
				setRequestThemeRefresh( false );
			} else {
				setRequestThemeRefresh( false );
				// We have to do this outside the pm_pattern_editor_save_complete listener because currentTheme is stale there.
				uponSuccessfulSave();
				getThemeData();
			}
		}
	}, [ requestThemeRefresh ] );

	/**
	 * Warns the user if there are unsaved changes before leaving.
	 *
	 * Forked from Gutenberg: https://github.com/WordPress/gutenberg/blob/5d5e97abd5e082050fdbb88bb1c93f9dbe10a23b/packages/editor/src/components/unsaved-changes-warning/index.js
	 */
	function warnIfUnsavedChanges( event: Event ) {
		if ( editorDirty.current || siteEditorDirty ) {
			// @ts-expect-error: returnvalue is deprecated, but preventDefault() isn't always enough to prevent navigating away from the page.
			event.returnValue = __(
				'Are you sure you want to leave the editor? There are unsaved changes.',
				'pattern-manager'
			);
			event.preventDefault();
		}
	}

	function getThemeData() {
		return new Promise( ( resolve ) => {
			if ( fetchInProgress ) {
				return;
			}
			setFetchInProgress( true );
			fetch( patternmanager.apiEndpoints.getPatternsEndpoint, {
				method: 'POST',
				headers: getHeaders(),
			} )
				.then( ( response ) => response.json() )
				.then( ( response: Patterns & { error?: string } ) => {
					setFetchInProgress( false );
					if ( response.error ) {
						setPatternsData( patternsData );
					} else {
						setPatternsData( response );
						resolve( response );
					}
				} );
		} );
	}

	function savePatternsData() {
		return new Promise( ( resolve ) => {
			setIsSaving( true );

			fetch( patternmanager.apiEndpoints.savePatternsEndpoint, {
				method: 'POST',
				headers: getHeaders(),
				body: JSON.stringify( patternsData ),
			} )
				.then( ( response ) => {
					if ( ! response.ok ) {
						throw response.statusText;
					}
					return response.json();
				} )
				.then( ( data: { patterns: Patterns } ) => {
					setPatternsData( data.patterns );

					if ( ! siteEditorDirty ) {
						uponSuccessfulSave();
					}

					resolve( data );
				} );
		} );
	}

	function uponSuccessfulSave() {
		getThemeData().then( () => {
			setSnackBarValue(
				__(
					'Pattern successfully saved to theme directory',
					'pattern-manager'
				)
			);

			editorDirty.current = false;
			setSiteEditorDirty( false );
			setIsSaving( false );
			patterns?.reloadPatternPreviews();
		} );
	}

	function createPattern( newPattern: Pattern ) {
		return new Promise( ( resolve ) => {
			const newPatternsData = {
				...patternsData,
				[ newPattern.name ]: newPattern,
			};

			setPatternsData( newPatternsData );
			resolve( newPatternsData );
		} );
	}

	function deletePattern( patternName: Pattern[ 'name' ] ) {
		if (
			/* eslint-disable no-alert */
			! window.confirm(
				__(
					'Are you sure you want to delete this pattern?',
					'pattern-manager'
				)
			)
		) {
			return;
		}

		const {
			[ patternName ]: {},
			...newPatterns
		} = patternsData;

		setPatternsData( newPatterns );
	}

	/**
	 * Allows the user to edit the theme.
	 *
	 * A separate function from setThemeData(), as this sets the 'dirty'
	 * state of the editor.
	 */
	function editPatterns( newPatterns: Patterns ) {
		editorDirty.current = true;
		setPatternsData( newPatterns );
	}

	return {
		data: patternsData,
		set: editPatterns,
		createPattern,
		deletePattern,
		save: savePatternsData,
		isSaving,
		fetchInProgress,
	};
}
