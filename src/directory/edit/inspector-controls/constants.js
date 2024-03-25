/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const orderByOptions = [
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

export const orderOptions = [
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