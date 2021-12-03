import { FC, useState } from "react"
import { Colors } from "../../AppColor"
import { AppStyle, setOverFlowX, flexShrink, width, cursorPointer, height, radius, border, borderWidth, margin, flexCenterInParent } from "../../AppStyle"
import Column from "../../components/Column"
import { ButtonImageView, ImageView } from "../../components/ImageView"
import Rows from "../../components/Row"
import TextView from "../../components/Text"

import './AddImage.css'

import icCancle from '../../asset/ic_cancle.svg'

let imgDemo = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg"


export default function AddImage() {
    let [listImage, setListImage] = useState<string[]>([])

    return <Rows style={AppStyle(setOverFlowX())}>
        <AddImageItem onClick={() => {
            let newList = [...listImage]
            newList.push(imgDemo)
            setListImage(newList)
        }} />

        <Rows>
{
            listImage.map((item, index) =>
                <ImageItem position={0} item={imgDemo} onItemDelete={() => {
                    let _newList = [...listImage]
                    _newList.splice(index, 1)
                    setListImage(_newList)
                }} />
            )
        }
        </Rows>
        


    </Rows>

}

interface AddImageItemProps {
    onClick: () => void
}

const AddImageItem: FC<AddImageItemProps> = (props) => {
    return <Column
        onClick={() => {
            props.onClick()
        }}
        style={AppStyle(flexShrink(0), width(150), cursorPointer(), height(200), radius(8), border(Colors.color_8A8A8F), borderWidth(1), margin(12), flexCenterInParent())}>
        <TextView>Thêm ảnh</TextView>
    </Column>
}


interface ImageItemProps {
    item: string,
    position: number,
    onItemDelete: (position: number) => void
}

const ImageItem: FC<ImageItemProps> = (props) => {
    return <div className="container" style={AppStyle(width(150), height(200))}>
        <ImageView className="background-img" src={props.item} />
        <ButtonImageView className="ic-delete" src={icCancle} onClick={() => props.onItemDelete(props.position)} />
    </div>
}
