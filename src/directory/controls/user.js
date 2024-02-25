/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { FormTokenField } from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { useDebounce } from '@wordpress/compose';
import { decodeEntities } from '@wordpress/html-entities';

const BASE_QUERY = {
	_fields: 'id,name',
	context: 'edit',
};

// Helper function to get the user id based on user input in users `FormTokenField`.
const getUserIdByUserValue = ( users, userValue ) => {
	// First we check for exact match by `user.id` or case sensitive `user.name` match.
	const userId =
		userValue?.id || users?.find( ( user ) => user.name === userValue )?.id;
	if ( userId ) {
		return userId;
	}

	/**
	 * Here we make an extra check for entered users in a non case sensitive way,
	 * to match user expectations, due to `FormTokenField` behaviour that shows
	 * suggestions which are case insensitive.
	 *
	 * Although WP tries to discourage users to add users with the same name (case insensitive),
	 * it's still possible if you manually change the name, as long as the users have different slugs.
	 * In this edge case we always apply the first match from the users list.
	 */
	const userValueLower = userValue.toLocaleLowerCase();
	return users?.find(
		( user ) => user.name.toLocaleLowerCase() === userValueLower
	)?.id;
};

export default function UserControl( { value, onChange } ) {

	const [ searchSuggestions, setSearchSuggestions ] = useState([]);
	const [ userIds, setUserIds ] = useState([]);
	const [ formValue, setFormValue ] = useState([]);
	const [ searchValue, setSearchValue ] = useState('');
	const debouncedSearch = useDebounce( setSearchValue, 500 );

	/**
	 * Convert the comma separated string of user ids to an array of integers.
	 * Needed to avoid infinite render loops.
	 */
	useEffect( () => {

		/**
		 * We need to normalize the value because the block operates on a
		 * comma(`,`) separated string value and `FormTokenFiels` needs an
		 * array. This should create an array of integers from the string.
		 */
		const normalizedUserIds = !value ? [] : value.toString().split(',').map(id => +id);

		setUserIds(normalizedUserIds);
		
	}, [ value ] );

	/**
	 * We need to dynamically fetch the list of user to provide
	 * based on search results.
	 */
	const { searchResults, searchHasResolved } = useSelect(
		( select ) => {

			// Limit search to when there's a value to search for.
			if ( ! searchValue ) {
				return {
					searchResults: [],
					searchHasResolved: true
				};
			}

			const { getEntityRecords, hasFinishedResolution } = select( coreStore );

			const query = {
				...BASE_QUERY,
				per_page: 25,
				search: searchValue,
				exclude: userIds
			};

			return {
				searchResults: getEntityRecords( 'root', 'user', query ),
				searchHasResolved: hasFinishedResolution( 'getEntityRecords', [
					'root',
					'user',
					query,
				] ),
			};

		},
		[ searchValue, userIds ]
	);


	/**
	 * We need to dynamically fetch the list of currently
	 * selected users
	 */
	const existingUsers = useSelect(
		( select ) => {

			// Limit query to when there are selected users.
			if ( ! userIds?.length ) {
				return  [];
			}

			const { getEntityRecords } = select( coreStore );

			const query = {
				...BASE_QUERY,
				per_page: -1,
				include: userIds
			};

			return getEntityRecords( 'root', 'user', query );	

		},
		[ userIds ]
	);

	/**
	 * Update the `formValue` state only after the selectors are resolved
	 * to avoid emptying the input when we're changing users.
	 * Sanitize the selected users to be used in the `FormTokenField`, ex: object[]
	 */
	useEffect( () => {

		if ( ! userIds?.length ) {
			setFormValue([]);
		}

		if ( ! existingUsers?.length ) return;

		const sanitizedValue = existingUsers.map( ( user ) => {
			return {
				id: user.id,
				value: user.name
			};
		} );

		setFormValue( sanitizedValue );
	}, [ userIds, existingUsers ] );

	/**
	 * Update suggestions only when the query has resolved.
	 * Sanitize the search results to be used in the `FormTokenField`, ex string[]
	 */
	useEffect( () => {
		if ( ! searchHasResolved ) return;
		setSearchSuggestions( searchResults?.map(obj => obj.name) );
	}, [ searchResults, searchHasResolved ] );

	/**
	 * Dispatch comma delimited user ids to attributes.
	 */
	const onUserChange = ( newValues ) => {
		const ids = Array.from(
			newValues.reduce( ( accumulator, user ) => {
				// Verify that new values point to existing entities.
				const id = getUserIdByUserValue( searchResults, user );
				if ( id ) accumulator.add( id );
				return accumulator;
			}, new Set() )
		);
		setSearchSuggestions([]);
		onChange( ids.join( ',' ) );
	};

	return (
		<FormTokenField
			label={ __( 'Users' , 'simple-user-listing' ) }
			value={ formValue }
			onInputChange={ debouncedSearch }
			onChange={ onUserChange }
			suggestions={ searchSuggestions }
			displayTransform={ decodeEntities }
			messages={{
				added: __('User added', 'simple-user-listing'),
				remove: __('Remove User', 'simple-user-listing'),
				removed: __('User removed', 'simple-user-listing')
			}}
			__experimentalShowHowTo={ false }
		/>
	);
}
