import { useDispatch, useSelector } from "react-redux";
import ExploreView from "./ExploreView";
import ExploreGenreView from "./ExploreGenreView";
import ExplorePersonView from "./ExplorePerson";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
	setNowPlaying,
	setPopular,
	setUpcoming,
	setTopRated,
	setTrending,
	setGenre,
	setSearch,
} from "../../stores/actions/movieAction";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setPopularPeople } from "../../stores/actions/peopleAction";
import { AUTH_HEADERS } from "@/lib/api";

const Explore = () => {
	const state = useSelector((state) => state);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const [queryParams, setQueryParams] = useSearchParams();
	const navigate = useNavigate();
	const headers = useMemo(() => (AUTH_HEADERS), []);

	const tab = queryParams.get("tab");
	const page = queryParams.get("page") ?? "1";
	const search = queryParams.get("search");

	const searchMovie = (i) => {
		setQueryParams({ search: i, page: page });
	};

	const fetchSearchMovie = useCallback(async () => {
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=true&language=en-US&page=` +
					page,
				{ headers }
			);
			dispatch(setSearch(response.data));
		} catch (err) {
			console.error(err.message);
		}
	}, [dispatch, headers, page, search]);

	const fetchPopularPerson = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/person/popular?page=` + page,
				{ headers }
			);
			dispatch(setPopularPeople(response.data.results));
			setIsLoading(false);
		} catch (err) {
			console.error(err.message);
		}
	}, [dispatch, headers, page]);

	const fetchMovieGenre = useCallback(async () => {
		try {
			const response = await axios.get(
				"https://api.themoviedb.org/3/genre/movie/list",
				{ headers }
			);
			dispatch(setGenre(response.data.genres));
		} catch (err) {
			console.error(err.message);
		}
	}, [dispatch, headers]);

	const fetchNowPlaying = useCallback(async () => {
		try {
			const response = await axios.get(
				"https://api.themoviedb.org/3/movie/now_playing",
				{ headers }
			);
			dispatch(setNowPlaying(response.data.results));
		} catch (err) {
			console.error(err.message);
		}
	}, [dispatch, headers]);

	const fetchPopular = useCallback(async () => {
		try {
			const response = await axios.get(
				"https://api.themoviedb.org/3/movie/popular",
				{ headers }
			);
			dispatch(setPopular(response.data.results));
		} catch (err) {
			console.error(err.message);
		}
	}, [dispatch, headers]);

	const fetchUpcoming = useCallback(async () => {
		try {
			const response = await axios.get(
				"https://api.themoviedb.org/3/movie/upcoming",
				{ headers }
			);
			dispatch(setUpcoming(response.data.results));
		} catch (err) {
			console.error(err.message);
		}
	}, [dispatch, headers]);

	const fetchTopRated = useCallback(async () => {
		try {
			const response = await axios.get(
				"https://api.themoviedb.org/3/movie/top_rated",
				{ headers }
			);
			dispatch(setTopRated(response.data.results));
		} catch (err) {
			console.error(err.message);
		}
	}, [dispatch, headers]);

	const fetchTrending = useCallback(async () => {
		try {
			const response = await axios.get(
				"https://api.themoviedb.org/3/trending/movie/week",
				{ headers }
			);
			dispatch(setTrending(response.data.results));
		} catch (err) {
			console.error(err.message);
		}
	}, [dispatch, headers]);

	useEffect(() => {
		setIsLoading(true);
		const getData = async () => {
			await Promise.all([
				fetchNowPlaying(),
				fetchPopular(),
				fetchTopRated(),
				fetchTrending(),
				fetchUpcoming(),
			]);

			setIsLoading(false);
		};

		if ((tab !== null && tab.toLowerCase()) === "genre") {
			fetchMovieGenre();
		} else if (tab !== null && tab.toLowerCase() === "person") {
			fetchPopularPerson();
		} else if (tab === null || tab === undefined) {
			getData();
		} else {
			navigate("/explore");
			return null;
		}
	}, [
		fetchMovieGenre,
		fetchNowPlaying,
		fetchPopular,
		fetchPopularPerson,
		fetchTopRated,
		fetchTrending,
		fetchUpcoming,
		navigate,
		tab,
	]);

	useEffect(() => {
		if (search !== null && tab === null) {
			fetchSearchMovie();
		}
	}, [fetchSearchMovie, search, tab]);

	useEffect(() => {
		const open = (sectionId) => {
			const section = document.getElementById(sectionId);
			section.scrollIntoView({ behavior: "smooth", block: "start" });
		};
		open("root");
	}, []);

	if (tab !== null && tab.toLowerCase() === "genre") {
		return <ExploreGenreView genres={state.movie.genres} />;
	}

	if (tab !== null && tab.toLowerCase() === "person") {
		return (
			<ExplorePersonView
				person={state.people}
				page={page}
				isLoading={isLoading}
			/>
		);
	}

	return (
		<ExploreView
			movie={state.movie}
			isLoading={isLoading}
			search={search}
			searchMovie={searchMovie}
		/>
	);
};

export default Explore;
