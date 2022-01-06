import React, {FC, useContext, useEffect, useMemo, useRef, useState} from "react";
import {AppStyle, background, flexCenterInParent, flexHori, margin} from "../../AppStyle";
import Column from "../../components/Column";
import Search from "./Search";
import PetItem from "./PetItem";
import {CircularProgress, ImageList, Typography} from "@mui/material";
import {AppCtx} from "../../App";
import Pet from "../../models/Pet";
import {getRandomString} from "../../models/User";
import Logger from "../../api/Logger";
import AppApi from "../../api/AppApi";

interface DiscoveryScreenProp {

}

const DiscoveryScreen: FC<DiscoveryScreenProp> = (props) => {
	const onInputEditChange = (search: string) => {
		setQueryType(search)
		console.log({search})
	};

	const [queryName, setQueryName] = useState('')
	const [queryType, setQueryType] = useState('')

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
			<ListPets queryName={queryName} queryType={queryType}/>
		</Column>
	)
}

export default DiscoveryScreen

interface ListPetProps {
	queryName: string,
	queryType: string
}

const ListPets: FC<ListPetProps> = (props) => {
	const {queryName, queryType} = props
	const FIRST_PAGE_INDEX = 0
	const [items, setItems] = useState<Pet[]>([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(FIRST_PAGE_INDEX);
	const myRef = useRef<HTMLParagraphElement | null>(null)
	const appContext = useContext(AppCtx)
	const appApi = appContext.appApi
	const setLoading = appContext.setLoading
	const isVisible = useOnScreen(myRef)

	useEffect(() => {
		let controller = new AbortController()
		const getPets = async () => {
			try {
				setLoading(true)
				let res = await appApi.getAllPets(page, AppApi.DEFAULT_LEN_ITEMS,queryName, queryType, controller)
				let resData = res.data
				if (resData.statusCode === 200) {
					if (resData.data.length === 0 ) {
						setHasMore(false)
					} else {
						setItems([...items, ...resData.data]);
						setPage(page + 1);
					}
				} else {
					Logger.errorToast()
					setHasMore(false)
				}
			} catch (e) {
				Logger.error(e)
				setHasMore(false)
			} finally {
				setLoading(false)
			}
		}

		getPets().then(() =>
			Logger.log('fetch all pets done')
		)

		return () => {
			controller.abort()
		}
	}, [isVisible, queryType, queryName])

	return (<Column style={AppStyle(
			margin(0)
		)}>
			<ImageList variant="masonry" cols={2} gap={0}>
				{
					items.map((pet) => {
						return <PetItem key={`${pet.id} ${getRandomString(10)}`} pet={pet}/>
					})
				}
			</ImageList>

			{hasMore ?
                <p ref={myRef} style={
					AppStyle(
						flexHori(),
						flexCenterInParent()
					)
				}>
                    <CircularProgress/>
                </p> : <Typography style={{
					alignSelf: 'center'
				}}>Đã hết dữ liệu</Typography>}
		</Column>
	);
}

export function useOnScreen(ref: any) {

	const [isIntersecting, setIntersecting] = useState(false)

	const observer = useMemo(() => {
		return new IntersectionObserver(
			([entry]) => {
				setIntersecting(entry.isIntersecting)
			}
		)
	}, [])

	useEffect(() => {
		if (ref.current) {
			observer.observe(ref.current)
		}
		// Remove the observer as soon as the component is unmounted
		return () => {
			observer.disconnect()
		}
	}, [observer, ref])

	return isIntersecting
}
