import * as React from '@wordpress/element';

/**
 * @param {{
 *  children: React.ReactChildren,
 *  description: string,
 *  heading: string,
 *  isVisible: boolean
 * }} props
 */
export default function Container( {
	children,
	description,
	heading,
	isVisible,
} ) {
	return (
		<div hidden={ ! isVisible } className="flex-1">
			<div className="bg-fses-gray mx-auto p-8 lg:p-12 w-full">
				<div className="max-w-7xl mx-auto">
					<h1 className="text-4xl mb-3">
						{ heading }
					</h1>
					<p className="text-lg max-w-2xl">
						{ description }
					</p>
				</div>
			</div>
			{ children }
		</div>
	);
}
