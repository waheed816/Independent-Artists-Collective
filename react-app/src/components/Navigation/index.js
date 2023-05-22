import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/"><i class="fa-solid fa-palette"> WORCESTER ARTISTS UNITED</i></NavLink>
			</li>
			<li>
				<NavLink to="/allArtists">
				<i class="fa-solid fa-paintbrush"> VIEW ALL ARTISTS</i>
				</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
