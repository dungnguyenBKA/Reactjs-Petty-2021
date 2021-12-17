import { async } from "@firebase/util";
import { randomInt, randomUUID } from "crypto";
import { FC, Key, useEffect, useState } from "react";
import { Container, Navbar, Tab, Tabs } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { AppStyle, weightItem, flexHori, background } from "../../AppStyle";
import Column from "../../components/Column";
import Pet from "../../models/Pet";
import Post from "../../models/Post";
import { fakeAvatarUrls, getRandomString, textLorem } from "../../models/User";
import PostItem from "./Post";
import Search from "./Search";

interface DiscoveryScreenProp {}

export default function DiscoveryScreen(prop: DiscoveryScreenProp) {
  const onInputEditChange = (search: string) => {
    console.log(search);
  };

  let [activeTab, setActiveTab] = useState("tab_discovery");

  return (
    <Column>
      <Navbar>
        <Container>
          <Search onInputListener={onInputEditChange} />
        </Container>
      </Navbar>

      <div style={AppStyle(weightItem(1))}>
        <Tabs
          defaultActiveKey={activeTab}
          onSelect={(eventKey) => {
            if (eventKey !== null) {
              setActiveTab(eventKey);
            }
          }}
        >
          <Tab eventKey="tab_discovery" title="Khám phá">
            <DiscoveryTab />
          </Tab>
          <Tab eventKey="tab_follow" title="Theo dõi"></Tab>
        </Tabs>
      </div>
    </Column>
  );
}

const NUM_OF_POSTS = 5

const getFakeData = (page: number, len: number): Post[] => {
  console.log({ page });
  let fakePosts: Post[] = [];
  for (let index = 0; index < len; index++) {
    const ranPost = new Post(
      page*NUM_OF_POSTS+index,
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
  
  const getPostPaging = async(pageNum: number) => {
    await new Promise(r => setTimeout(r, 2000));
    return getFakeData(pageNum, NUM_OF_POSTS);
  };


  const fetchData = async () => {
    const postsFromServer = await getPostPaging(page);
    
    if(page == FIRST_PAGE_INDEX) {
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

  useEffect(() => {
    refreshData()
  }, []);

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
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
      <div className="container">
        <div className="row m-2">
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
        </div>
      </div>
    </InfiniteScroll>
  );
}
