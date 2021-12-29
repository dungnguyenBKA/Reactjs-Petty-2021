import React, {FC, useContext, useEffect, useMemo, useRef, useState} from "react";
import {AppStyle, background, flexCenterInParent, flexHori, margin, marginHori} from "../../AppStyle";
import Column from "../../components/Column";
import Post from "../../models/Post";
import {fakeAvatarUrls, getRandomString, textLorem} from "../../models/User";
import Search from "./Search";
import PostItem from "./Post";
import ButtonView from "../../components/ButtonView";
import {CircularProgress, ImageList} from "@mui/material";
import {AppCtx} from "../../App";

interface DiscoveryScreenProp {

}

const isPropsEqual = (prev: DiscoveryScreenProp, next: DiscoveryScreenProp) => {
	console.log('equal??')
	return false
}

const DiscoveryScreen: FC<DiscoveryScreenProp> = (props) => {
	const onInputEditChange = (search: string) => {
		console.log(search);
	};

	return (
		<Column>
			<Search onInputListener={onInputEditChange} style={
				AppStyle(
					{
						zIndex: 1,
						position: 'sticky',
						top: 0
					},
					background('white')
				)
			}/>
			<ListPets/>
		</Column>
	)
}

export default DiscoveryScreen


const MemoDiscoveryScreen = React.memo(DiscoveryScreen, isPropsEqual)

export {
	MemoDiscoveryScreen
}

const NUM_OF_POSTS = 5

const getFakeData = (page: number, len: number): Post[] => {
	console.log({page});
	let fakePosts: Post[] = [];
	for (let index = 0; index < len; index++) {
		const ranPost = new Post(
			page * NUM_OF_POSTS + index,
			getRandomString(10),
			textLorem,
			fakeAvatarUrls[Math.round(Math.random() * 10) % fakeAvatarUrls.length],
			fakeAvatarUrls[Math.round(Math.random() * 10) % fakeAvatarUrls.length]
		);
		fakePosts.push(ranPost);
	}

	return fakePosts;
};

const ListPets: FC = () => {
	const FIRST_PAGE_INDEX = 0
	const [items, setItems] = useState<Post[]>([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(FIRST_PAGE_INDEX);
	const myRef = useRef<HTMLParagraphElement|null>(null)


	const isVisible = useOnScreen(myRef)

	const getPostLoading = () => {
		setTimeout(() => {
			let newPost = getFakeData(page, NUM_OF_POSTS);
			setItems([...items, ...newPost]);
			setPage(page + 1);
		}, 1000)
	}

	useEffect(() => {
		if(isVisible) {
			getPostLoading()
		}
	}, [isVisible])

	return (<Column style={AppStyle(
			margin(8)
		)}  >
			<ImageList variant="masonry" cols={2} gap={0}>
				{
					items.map((item) => {
						return <PostItem
							petName={item.petName}
							avatarURL={item.avatarUrl}
							imgURL={item.imgUrl}/>
					})
				}
			</ImageList>

			<p ref={myRef} style={
				AppStyle(
					flexHori(),
					flexCenterInParent()
				)
			}>
				<CircularProgress/>
			</p>
		</Column>
	);
}

export function useOnScreen(ref: any) {

	const [isIntersecting, setIntersecting] = useState(false)

	const observer = useMemo(() => {
		return new IntersectionObserver(
			([entry]) => {
				setIntersecting(entry.isIntersecting)
				console.log('re set visible')
			}
		)
	}, [])

	useEffect(() => {
		if(ref.current) {
			observer.observe(ref.current)
		}
		// Remove the observer as soon as the component is unmounted
		return () => { observer.disconnect() }
	}, [observer, ref])

	return isIntersecting
}