
import CircularProgress from "@mui/material/CircularProgress";
import { FC, useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { AppStyle, flexHori, flexCenterInParent } from "../../AppStyle";
import Column from "../../components/Column";
import Post from "../../models/Post";
import { fakeAvatarUrls, getRandomString, textLorem } from "../../models/User";
import PostItem from "./Post";
import Search from "./Search";

interface DiscoveryScreenProp { }

export default function DiscoveryScreen(prop: DiscoveryScreenProp) {
  const onInputEditChange = (search: string) => {
    console.log(search);
  };

  return <Column>
    <Navbar>
      <Container>
        <Search onInputListener={onInputEditChange} />
      </Container>
    </Navbar>


    <DiscoveryTab />

  </Column>
}

const NUM_OF_POSTS = 5

const getFakeData = (page: number, len: number): Post[] => {
  console.log({ page });
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

const DiscoveryTab: FC = () => {
  const FIRST_PAGE_INDEX = 0
  const [items, setItems] = useState<Post[]>([]);

  const [hasMore, setHasMore] = useState(true);

  const [page, setPage] = useState(FIRST_PAGE_INDEX);

  const getPostPaging = async (pageNum: number) => {
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

  const refreshData = async () => {
    setPage(FIRST_PAGE_INDEX)
    fetchData()
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      loader={
        <div style={
          AppStyle(
            flexHori(),
            flexCenterInParent()
          )
        }>
          <CircularProgress />
        </div>
      }
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      refreshFunction={refreshData}
      pullDownToRefresh
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={
        <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
      }
      releaseToRefreshContent={
        <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
      }
    >
      {items.map((item) => {
        return (
          <PostItem
            key={item.id}
            content={item.content}
            petName={item.petName}
            imgURL={item.imgUrl}
            avatarURL={item.avatarUrl}
          />
        );
      })}
    </InfiniteScroll>
  );
}
