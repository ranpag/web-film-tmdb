import { useDispatch, useSelector } from "react-redux";
import FavoriteView from "./FavoriteView";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { deleteFavorite, setFavorite } from "../../stores/actions/movieAction";
import toast, { Toaster } from "react-hot-toast";
import { AUTH_HEADERS } from "@/lib/api";

const Favorite = () => {
	const { favorites } = useSelector((state) => state.movie);
	const dispatch = useDispatch();
	const [isLoading, setIsloading] = useState(true);

	const fetchFavoriteMovie = useCallback(async () => {
		setIsloading(true);
		try {
			const response = await axios.get(
				"https://api.themoviedb.org/3/account/21559324/favorite/movies?language=en-US&page=1&sort_by=created_at.asc",
				{ headers: AUTH_HEADERS }
			);
			dispatch(setFavorite(response.data));
			setIsloading(false);
		} catch (err) {
			console.error(err.message);
		}
	}, [dispatch]);

	const deleteFavoriteMovie = async (movieId) => {
		try {
			const response = await axios.post(
				`https://api.themoviedb.org/3/account/21559324/favorite`,
				{ media_type: "movie", media_id: movieId, favorite: false },
				{
					headers: {
						...AUTH_HEADERS,
						"Content-Type": "application/json;charset=utf-8"
					},
				}
			);
			if (response.data.status_code == 13) {
				toast.success("Success remove from favorite");
				dispatch(
					deleteFavorite({
						...favorites,
						results: favorites.results.filter((item) => item.id !== movieId),
					})
				);
			} else {
				toast.error("Failed remove from favorite");
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	useEffect(() => {
		fetchFavoriteMovie();
	}, [fetchFavoriteMovie]);

	useEffect(() => {
		const open = (sectionId) => {
			const section = document.getElementById(sectionId);
			section.scrollIntoView({ behavior: "smooth", block: "start" });
		};
		open("root");
	}, []);

	return (
		<>
			<Toaster />
			<FavoriteView
				favorites={favorites}
				isLoading={isLoading}
				deleteFavoriteMovie={deleteFavoriteMovie}
			/>
		</>
	);
};

export default Favorite;
