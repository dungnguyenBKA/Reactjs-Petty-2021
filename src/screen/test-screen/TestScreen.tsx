import { FC, useEffect, useState } from "react"

import Column from "../../components/Column";
import Rows from "../../components/Row";
import TextView from "../../components/Text";

interface TestScreenProp {

}

class ImageData{
    title: string = ""
    url: string = ""
    thumbnailUrl: string = ""
}

const TestScreen: FC<TestScreenProp> = (props) => {
    // https://jsonplaceholder.typicode.com/albums/1/photos


    const [listItem, setListItem] = useState<ImageData[]>([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
            .then(res => res.json())
            .then(resJson => {setListItem(resJson)});
    }, [])

    return (
        <Column>
        {
            // listItem => List <Image>
            listItem.map(item=>{
                return <Image avatar={item.thumbnailUrl} url={item.url} title={item.title}/>            
            })
        }
        </Column>
    )
}

export default TestScreen

interface ImageProp {
    url: string,
    avatar: string,
    title: string

}
const Image: FC<ImageProp> = (prop) => {

    return (<Column>
        <Rows>
            <img src={prop.avatar} />
            <TextView>
                {prop.title}

            </TextView>

        </Rows>
        <img src={prop.url} />
    </Column>);


}