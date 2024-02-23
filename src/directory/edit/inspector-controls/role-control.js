/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEntityRecord } from '@wordpress/core-data';
import { FormTokenField } from '@wordpress/components';

export default function RoleControl( { roles, onRoleChange } ) {

	const { record, hasResolved } = useEntityRecord( 'simple-user-listing/v1', 'user-roles' );

	if ( ! hasResolved ) {
		return;
	}

	// Get the suggestions as [array ex: 'Administrator', 'Editor' ].
	const suggestions = record ? Object.values(record).map(role => role) : [];

	// Roles come in from the attributes as an array of slugs, ex: ['administrator,editor'].
	// Need to be converted to array of labels for consumption by FormTokenField.
	// Make sure the values are in the whitelisted suggestions array.
	const filteredRoles = Array.isArray(roles) ? roles.map(key => record[key]) : [];

	const getRoleByLabel = ( roles, name ) => {
		const entry = Object.entries(roles).find(([key, val]) => val === name);
  		return entry ? entry[0] : null;
	};

	// Send the tokens back to parent component, ex: ['administrator,editor'].
	const handleRoleChange = ( roleNames ) => {
		
		const newRoles = Array.from(
			roleNames.reduce( ( accumulator, label ) => {
				// Verify that new values point to existing entities.
				const role = getRoleByLabel( record, label );
				if ( role ) accumulator.add( role );
				return accumulator;
			}, new Set() )
		);
	
		onRoleChange( newRoles );

	};

	return (
		<FormTokenField
			label={ __( 'Roles', 'simple-user-listing' ) }
			value={ filteredRoles } // Needs to be an array of labels.
			suggestions={ suggestions } // Needs to be an array of labels.
			onChange={ handleRoleChange }
		/>
	);
}

