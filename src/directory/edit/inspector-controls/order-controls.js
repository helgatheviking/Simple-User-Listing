/**
 * WordPress dependencies
 */
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const orderByOptions = [
	{
		// translators: label for ordering users by name.
		label: __( 'Display name', 'simple-user-listing' ),
		value: 'name',
	},
	{

		label: __( 'User name', 'simple-user-listing' ),
		value: 'login',
	},
	{
		// translators: label for ordering users by User ID
		label: __( 'User ID', 'simple-user-listing' ),
		value: 'id',
	},
];

const orderOptions = [
	{
		// translators: label for ordering users in ascending order.
		label: __( 'Ascending, ex: A → Z', 'simple-user-listing' ),
		value: 'asc',
	},
	{
		// translators: label for ordering users in descending order.
		label: __( 'Descending, ex: Z → A', 'simple-user-listing' ),
		value: 'desc',
	},
];
export default function OrderControls( { order, orderBy, onOrderChange, onOrderByChange } ) {
	return (
		<>
			<SelectControl
				__nextHasNoMarginBottom
				label={ __( 'Order by', 'simple-user-listing' ) }
				value={ orderBy }
				options={ orderByOptions }
				onChange={ ( value ) => {
					onOrderByChange( value );
				} }
			/>

			<SelectControl
				__nextHasNoMarginBottom
				label={ __( 'Order', 'simple-user-listing' ) }
				value={ order }
				options={ orderOptions }
				onChange={ ( value ) => {
					onOrderChange( value );
				} }
			/>
		</>
	);
}
