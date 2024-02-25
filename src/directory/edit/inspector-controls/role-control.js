/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEntityRecord } from '@wordpress/core-data';
import { FormTokenField } from '@wordpress/components';

export default function RoleControl( { value, onChange } ) {

	/**
	 * User roles are received in format of object ex: { "administrator": "Administrator", "editor": "Editor" }.
	 */
	const { record, hasResolved } = useEntityRecord( 'simple-user-listing/v1', 'user-roles' );

	const userRoles = record?.registered_roles ?? [];

	if ( ! hasResolved ) {
		return;
	}

	/**
	 * We need to normalize the value because the block operates on a
	 * comma(`,`) separated string value and `FormTokenFiels` needs an
	 * array.
	 */
	const normalizedValue = ! value ? [] : value.toString().split( ',' );

	// Returns only the existing roles. This prevents the component
	// from crashing in the editor, when non existing ids are provided.
	const sanitizedValue = normalizedValue.reduce(
		( accumulator, key ) => {
			const label = userRoles[key];
			if ( label ) {
				accumulator.push( label );
			}
			return accumulator;
		},
		[]
	);

	// Get the suggestions as [array ex: 'Administrator', 'Editor' ].
	const suggestions = userRoles ? Object.values(userRoles) : [];

	const getRoleByLabel = ( name ) => {
		const entry = Object.entries(userRoles).find(([key, val]) => val === name);
  		return entry ? entry[0] : null;
	};

	// Send the tokens back to parent component as comma delimited, ex: 'administrator,editor'.
	const onRoleChange = ( newValue ) => {	
		const newRoles = Array.from(
			newValue.reduce( ( accumulator, label ) => {
				// Verify that new values point to existing entities.
				const role = getRoleByLabel( label );
				if ( role ) accumulator.add( role );
				return accumulator;
			}, new Set() )
		);

		onChange( newRoles.join( ',' ) );

	};

	return (
		<FormTokenField
			label={ __( 'Roles', 'simple-user-listing' ) }
			value={ sanitizedValue } // Needs to be an array of labels.
			suggestions={ suggestions } // Needs to be an array of labels.
			onChange={ onRoleChange }
		/>
	);
}

