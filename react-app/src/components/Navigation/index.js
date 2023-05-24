import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import { useModal } from "../../context/Modal";

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const { closeModal } = useModal();

	return (
		<ul>
			<li>
				<NavLink exact to="/"><i class="fa-solid fa-palette"> WORCESTER ARTISTS UNITED</i></NavLink>
			</li>
			{isLoaded && !sessionUser &&
				<li>
					<OpenModalButton
						buttonText="LOGIN TO POST YOUR ARTWORK"
						onItemClick={closeModal}
						modalComponent={<LoginFormModal />}
					/>
				</li>
			}
			{isLoaded && sessionUser && !sessionUser.artist &&
				<li>
					<NavLink exact to={`/artistProfileForm/${sessionUser.id}`}><i class="fa-solid fa-paint-roller"> CREATE YOUR ARTIST PROFILE </i></NavLink>
				</li>
			}
			{isLoaded && sessionUser && sessionUser.artist &&
				<li>
					<NavLink exact to="/"><i class="fa-solid fa-paint-roller"> POST YOUR ARTWORK </i></NavLink>
				</li>
			}

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
