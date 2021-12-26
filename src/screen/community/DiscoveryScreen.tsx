import React, {FC, useEffect, useState} from "react";
import {AppStyle, background} from "../../AppStyle";
import Column from "../../components/Column";
import Post from "../../models/Post";
import {fakeAvatarUrls, getRandomString, textLorem} from "../../models/User";
import Search from "./Search";
import PostItem from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";

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

	const getPostPaging = async (pageNum: number) => {
		console.log('get posts', pageNum)
		await new Promise(r => setTimeout(r, 2000));
		return getFakeData(pageNum, NUM_OF_POSTS);
	};

	const fetchData = async () => {
		const postsFromServer = await getPostPaging(page);
		if (page === FIRST_PAGE_INDEX) {
			// refresh
			setItems(postsFromServer)
		} else {
			// append
			setItems([...items, ...postsFromServer]);
		}
		if (postsFromServer.length < NUM_OF_POSTS) {
			setHasMore(false);
		}
		setPage(page + 1);
	};

	useEffect(() => {
		const initLoad = async () => {
			const postsFromServer = await getPostPaging(FIRST_PAGE_INDEX);
			setItems(postsFromServer)
			if (postsFromServer.length < NUM_OF_POSTS) {
				setHasMore(false);
			}
			setPage(FIRST_PAGE_INDEX+1);
		}

		initLoad().then(() => console.log('init', {items}))
	}, [])

	return (
		<Column>
			{
				items.map((item) => {
					return <PostItem
							petName={item.petName}
							content={item.content}
							avatarURL={item.avatarUrl}
							imgURL={item.imgUrl}/>
				})
			}
		</Column>
	);
}