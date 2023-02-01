import { store as editorStore } from '@wordpress/editor';
import { useEffect } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';
import getHeaders from '../utils/getHeaders';
import { patternManager } from '../globals';
import type { Pattern, SelectQuery } from '../types';

export default function useSaveButtonInterrupter(
	setPatternNames: ( patternNames: Array< Pattern[ 'name' ] > ) => void
) {
	const isSavingPost = useSelect( ( select: SelectQuery ) => {
		return select( 'core/editor' ).isSavingPost();
	}, [] );
	const editor = useSelect( editorStore, [] );
	const { editPost } = useDispatch( 'core/editor' );

	useEffect( () => {
		if ( isSavingPost ) {
			handleSave();
		}
	}, [ isSavingPost ] );

	useEffect( () => {
		// While the above event listeners handle interrupting save button clicks, this also handles keyboard shortcut saves (like cmd+s).
		Object.values(
			document.getElementsByClassName(
				'editor-post-publish-panel__toggle'
			)
		).forEach( ( saveButton ) => {
			saveButton.addEventListener( 'click', handleSave, false );
		} );
	}, [] );

	async function handleSave( event?: Event ) {
		event?.preventDefault();

		const meta = editor.getEditedPostAttribute( 'meta' );
		if ( ! meta.title ) {
			return;
		}

		// If the pattern name changed, update the URL query param 'name'.
		// That query param gets the pattern data.
		if ( meta.previousName && meta.previousName !== meta.name ) {
			const url = new URL( location.href );
			url.searchParams.set( 'name', meta.name );
			window.history.pushState( {}, '', url );
		}

		await savePattern();
		await updatePatternNames();
		editPost( {
			meta: {
				...meta,
				previousName: meta.name,
			},
		} );
	}

	async function savePattern() {
		await fetch( patternManager.apiEndpoints.savePatternEndpoint, {
			method: 'POST',
			headers: getHeaders(),
			body: JSON.stringify( {
				pattern: {
					...editor.getEditedPostAttribute( 'meta' ),
					content: editor.getEditedPostContent(),
				},
			} ),
		} );
	}

	async function updatePatternNames() {
		const response = await fetch(
			patternManager.apiEndpoints.getPatternNamesEndpoint,
			{
				method: 'GET',
				headers: getHeaders(),
			}
		);

		if ( response.ok ) {
			setPatternNames( await response.json() );
		}
	}
}
