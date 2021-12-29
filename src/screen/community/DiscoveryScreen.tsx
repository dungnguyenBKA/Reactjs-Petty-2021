import React, {FC, useContext, useEffect, useMemo, useRef, useState} from "react";
import {AppStyle, background, flexCenterInParent, flexHori, margin} from "../../AppStyle";
import Column from "../../components/Column";
import Search from "./Search";
import PetItem from "./PetItem";
import {CircularProgress, ImageList} from "@mui/material";
import {AppCtx} from "../../App";
import Pet from "../../models/Pet";
import {getRandomString} from "../../models/User";

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

const ListPets: FC = () => {
	const FIRST_PAGE_INDEX = 0
	const [items, setItems] = useState<Pet[]>([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(FIRST_PAGE_INDEX);
	const myRef = useRef<HTMLParagraphElement | null>(null)
	const appContext = useContext(AppCtx)
	const appApi = appContext.appApi
	const logger = appContext.logger

	const isVisible = useOnScreen(myRef)

	const getPets = async () => {
		try {
			let res = await appApi.getAllPets(page)
			let resData = res.data
			if (resData.statusCode === 200) {
				if (!resData.data) {
					setHasMore(false)
				} else {
					setItems([...items, ...resData.data]);
					//setPage(page + 1);
				}
			} else {
				logger.errorToast()
				setHasMore(false)
			}
		} catch (e) {
			logger.error(e)
			logger.errorToast()
			setHasMore(false)
		}
	}

	useEffect(() => {
		getPets().then(
			() => logger.log('fetch done')
		)
	}, [isVisible])

	return (<Column style={AppStyle(
			margin(8)
		)}>
			<ImageList variant="masonry" cols={2} gap={0}>
				{
					items.map((pet) => {
						return <PetItem key={`${pet.id} ${getRandomString(10)}`} pet={pet}/>
					})
				}
			</ImageList>

			{hasMore &&
                <p ref={myRef} style={
					AppStyle(
						flexHori(),
						flexCenterInParent()
					)
				}>
                    <CircularProgress/>
                </p>}
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
