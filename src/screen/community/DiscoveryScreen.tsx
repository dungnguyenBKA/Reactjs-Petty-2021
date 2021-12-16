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

const DiscoveryTab: FC = () => {
  return <App />;
  //   let [isLoading, setLoading] = useState(true)

  //     const getFakeData = (page: number) : Post[] => {
  //         console.log({page})
  //         let fakePosts : Post[] = []
  //         for (let index = 0; index < 5; index++) {
  //             const ranPost = new Post(
  //                 getRandomString(8),
  //                 getRandomString(10),
  //                 textLorem,
  //                 fakeAvatarUrls[ Math.round(Math.random()*10)  %fakeAvatarUrls.length],
  //                 fakeAvatarUrls[Math.round(Math.random()*10)%fakeAvatarUrls.length]
  //             )
  //             fakePosts.push(ranPost)
  //         }

  //         return fakePosts
  //       }
  //   let [page, setPage] = useState(0);
  //   let [listPostFilter, setListPostFilter] = useState<Post[]>(getFakeData(0));

  //   const fetchData = () => {
  //       setLoading(true)
  //     setTimeout(() => {
  //         setLoading(false)
  //         setListPostFilter([...listPostFilter, ...getFakeData(page+1)]);
  //         setPage(page + 1)
  //         console.log('featch ', page)
  //     }, 1000)
  //   };

  //   const refreshData = () => {
  //     console.log('refresh')

  //     setLoading(true)
  //     setTimeout(() => {
  //         setPage(0)
  //         setLoading(false)
  //         setListPostFilter(getFakeData(page));
  //     }, 1000)

  //   };

  //   useEffect( () => {
  //       fetchData()
  //   }, [])

  //   return (
  //     <InfiniteScroll
  //       dataLength={listPostFilter.length}
  //       next={fetchData}
  //       hasMore={true}
  //       loader={<h4>Loading...</h4>}
  //       endMessage={
  //         <p style={{ textAlign: "center" }}>
  //           <b>Yay! You have seen it all</b>
  //         </p>
  //       }

  //       refreshFunction={refreshData}
  //       pullDownToRefresh
  //       pullDownToRefreshThreshold={50}
  //       pullDownToRefreshContent={
  //         <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
  //       }
  //       releaseToRefreshContent={
  //         <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
  //       }
  //     >
  //       {listPostFilter.map((postItem) => (
  //         <PostItem
  //           key={getRandomString(8)}
  //           petName={postItem.petName}
  //           avatarURL={postItem.avatarUrl}
  //           imgURL={postItem.imgUrl}
  //           content={postItem.content}
  //         />
  //       ))}
  //     </InfiniteScroll>
  //   );
};

function App() {
  const [items, setItems] = useState<any>([]);

  const [hasMore, sethasMore] = useState(true);

  const [page, setpage] = useState(2);
  const getFakeData = (page: number) => {
    console.log({ page });
    let fakePosts: Post[] = [];
    for (let index = 0; index < 5; index++) {
      const ranPost = new Post(
        getRandomString(8),
        getRandomString(10),
        textLorem,
        fakeAvatarUrls[Math.round(Math.random() * 10) % fakeAvatarUrls.length],
        fakeAvatarUrls[Math.round(Math.random() * 10) % fakeAvatarUrls.length]
      );
      fakePosts.push(ranPost);
    }

    setItems(fakePosts);
  };

  // useEffect(() => {
  //   const getComments = async () => {
  //     const res = await fetch(
  //       `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=20`
  //       // For json server use url below
  //       // `http://localhost:3004/comments?_page=1&_limit=20`
  //     );
  //     const data = await res.json();
  //     setItems(data);
  //   };

  //   getComments();
  // }, []);

  const fetchComments = (pageNum: number) => {
   
    const data = getFakeData(pageNum);
    return data;
  };

  const fetchData = async () => {
    const commentsFormServer = await fetchComments(page);

    setItems([...items, ...commentsFormServer]);
    if (commentsFormServer.length < 20) {
      sethasMore(false);
    }
    setpage(page + 1);
  };

  const refreshData = async () => {
    console.log("refresh");

    const commentsFormServer = await fetchComments(1);

    setItems(commentsFormServer);
    if (commentsFormServer.length < 20) {
      sethasMore(false);
    }
    setpage(2); //load more  tu p2
  };
  return (
    <InfiniteScroll
      dataLength={items.length} //This is important field to render the next data
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
          {items.map((item: { body: Key | null | undefined; id: number }) => {
            return (
              <div key={item.id}>
                <p>{item.id}</p>
                <p>{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </InfiniteScroll>
  );
}
