import { FC, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { AppStyle, margin, weightItem } from "../../AppStyle";
import Column from "../../components/Column";
import Rows from "../../components/Row";
import TextView from "../../components/Text";

class Todo {
    userId: number = 0
    id: number = 0
    title: string = ""
    completed: Boolean = false
}

export default function AddPetScreen() {

    let [listTodo, setListTodo] = useState<Todo[]>([])


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(response => response.json())
            .then(json => setListTodo(json))
    }, [listTodo])

    return <Column>
        {
            listTodo.map((item) => <TodoItem {...item}>OK</TodoItem>)
        }
    </Column>
}


const TodoItem: FC<Todo> = (props) => {
    return (
        <Card>
            <Column>
                <TextView>{props.id}</TextView>
                <TextView>{props.title}</TextView>
                <TextView>{props.completed.toString()}</TextView>
            </Column>
        </Card>

    )
}