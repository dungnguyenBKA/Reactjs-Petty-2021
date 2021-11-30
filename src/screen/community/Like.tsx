import { FC, useState } from "react";




interface LikeProp{

}

const Like: FC <LikeProp> = (props) => {

    const [isValid, setIsValid] = useState(false)

    const likeHandler = () => {
        setIsValid(true);
        console.log('Liked')!

    }

    return (<div>
        <button onClick = {likeHandler}> Like </button>
    </div>)


}

export default Like;