import React, {FC, useEffect, useState} from "react";
import {AppStyle, background, flexCenterInParent, radius, width} from "../../AppStyle";
import Column from "../../components/Column";
import Post from "../../models/Post";
import {fakeAvatarUrls, getRandomString, textLorem} from "../../models/User";
import Search from "./Search";
import PostItem from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import ButtonView from "../../components/ButtonView";
import {ImageList, ImageListItem, Paper} from "@mui/material";

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

	const getPostLoading = () => {


		let newPost = getFakeData(page, NUM_OF_POSTS);
		setItems([...items, ...newPost]);
		setPage(page+1);
	};

	// const fetchData = async () => {
	// 	const postsFromServer = await getPostPaging(page);
	// 	if (page === FIRST_PAGE_INDEX) {
	// 		// refresh
	// 		setItems(postsFromServer)
	// 	} else {
	// 		// append
	// 		setItems([...items, ...postsFromServer]);
	// 	}
	// 	if (postsFromServer.length < NUM_OF_POSTS) {
	// 		setHasMore(false);
	// 	}
	// 	setPage(page + 1);
	// };

	// useEffect(() => {
	// 	const initLoad = async () => {
	// 		const postsFromServer = await getPostPaging(FIRST_PAGE_INDEX);
	// 		setItems(postsFromServer)
	// 		if (postsFromServer.length < NUM_OF_POSTS) {
	// 			setHasMore(false);
	// 		}
	// 		setPage(FIRST_PAGE_INDEX+1);
	// 	}
	//
	// 	initLoad().then(() => console.log('init', {items}))
	// }, [])

	return (
		// <Column style={AppStyle({flexWrap: 'wrap'}, width('100%'))}>
		// 	{
		// 		items.map((item) => {
		// 			return <PostItem
		// 					petName={item.petName}
		// 					content={item.content}
		// 					avatarURL={item.avatarUrl}
		// 					imgURL={item.imgUrl}/>
		// 		})
		// 	}
		// 	<ButtonView onClick = {getPostLoading}>Đọc thêm</ButtonView>
		// </Column>

		<Column style={{
			paddingBottom: 0
		}}>
		<ImageList variant="masonry" cols={2} gap={0} style={{
			paddingBottom : 0,
			marginLeft: 20,
			marginRight: 20
		}}>
			{
						items.map((item) => {
							return <PostItem
									petName={item.petName}
									avatarURL={item.avatarUrl}
									imgURL={item.imgUrl}/>
						})
					}

		</ImageList>

	<ButtonView onClick = {getPostLoading}>Đọc thêm</ButtonView>
		</Column>
	);
}