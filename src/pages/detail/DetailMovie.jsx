import { useParams } from "react-router-dom";
import DetailView from "./DetailMovieView";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AUTH_HEADERS } from "@/lib/api";

const DetailMovie = () => {
	const [detailMovie, setDetailMovie] = useState({});
	const [images, setImages] = useState({});
	const [alternativeTitles, setAlternativeTitles] = useState([]);
	const [recom, setRecom] = useState([]);
	const [similars, setSimilars] = useState([]);
	const [reviews, setReviews] = useState([]);
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const headers = useMemo(() => (AUTH_HEADERS), []);

	const addRating = async (movieId, rating) => {
		try {
			const response = await axios.post(
				`https://api.themoviedb.org/3/movie/${movieId}/rating`,
				{ value: rating },
				{
					headers: {
						...AUTH_HEADERS,
						"Content-Type": "application/json;charset=utf-8"
					},
				}
			);
			if (response.data.status_code == 1) {
				toast.success("Success add rating");
			} else if (response.data.status_code == 12) {
				toast.success("Success update rating");
			} else {
				toast.error("Failed add rating");
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	const addFavorite = async (movieId) => {
		try {
			const response = await axios.post(
				`https://api.themoviedb.org/3/account/21559324/favorite`,
				{ media_type: "movie", media_id: movieId, favorite: true },
				{
					headers: {
						...AUTH_HEADERS,
						"Content-Type": "application/json;charset=utf-8"
					},
				}
			);
			if (response.data.status_code == 1) {
				toast.success("Success add favorite");
			} else {
				toast.error("Failed add favorite");
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	const addWatchlist = async (movieId) => {
		try {
			const response = await axios.post(
				`https://api.themoviedb.org/3/account/21559324/watchlist`,
				{ media_type: "movie", media_id: movieId, watchlist: true },
				{
					headers: {
						...AUTH_HEADERS,
						"Content-Type": "application/json;charset=utf-8"
					},
				}
			);
			if (response.data.status_code == 1) {
				toast.success("Success add watchlist");
			} else {
				toast.error("Failed add watchlist");
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	const fetchDetailMovie = useCallback(async () => {
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/movie/${id}`,
				{
					headers,
				}
			);
			setDetailMovie(response.data);
		} catch (err) {
			console.error(err.message);
		}
	}, [headers, id]);

	const fetchImages = useCallback(async () => {
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/movie/${id}/images`,
				{
					headers,
				}
			);
			setImages(response.data);
		} catch (err) {
			console.error(err.message);
		}
	}, [headers, id]);

	const fetchAlternativeTitle = useCallback(async () => {
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/movie/${id}/alternative_titles`,
				{
					headers,
				}
			);
			setAlternativeTitles(response.data.titles);
		} catch (err) {
			console.error(err.message);
		}
	}, [headers, id]);

	const fetchRecommendationsMovie = useCallback(async () => {
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/movie/${id}/recommendations`,
				{
					headers,
				}
			);
			setRecom(response.data.results);
		} catch (err) {
			console.error(err.message);
		}
	}, [headers, id]);

	const fetcSimilarsMovie = useCallback(async () => {
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/movie/${id}/similar`,
				{
					headers,
				}
			);
			setSimilars(response.data.results);
		} catch (err) {
			console.error(err.message);
		}
	}, [headers, id]);

	const fetchReviews = useCallback(async () => {
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/movie/${id}/reviews`,
				{
					headers,
				}
			);
			setReviews(response.data.results);
		} catch (err) {
			console.error(err.message);
		}
	}, [headers, id]);

	useEffect(() => {
		setIsLoading(true);
		const getData = async () => {
			await Promise.all([
				fetchDetailMovie(),
				fetchImages(),
				fetchAlternativeTitle(),
				fetchRecommendationsMovie(),
				fetcSimilarsMovie(),
				fetchReviews(),
			]);
			setIsLoading(false);
		};

		getData();
	}, [
		fetcSimilarsMovie,
		fetchAlternativeTitle,
		fetchDetailMovie,
		fetchImages,
		fetchRecommendationsMovie,
		fetchReviews,
	]);

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
			<DetailView
				detailMovie={detailMovie}
				images={images}
				alternativeTitles={alternativeTitles}
				recomens={recom}
				similars={similars}
				reviews={reviews}
				addRating={addRating}
				isLoading={isLoading}
				addFavorite={addFavorite}
				addWatchlist={addWatchlist}
			/>
		</>
	);
};

export default DetailMovie;
