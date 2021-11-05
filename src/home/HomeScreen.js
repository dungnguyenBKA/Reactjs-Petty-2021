import MyPet from "./MyPet"

export default function HomeScreen() {
    return <div>
        <Header />
        <MyPet />
    </div>
}

function Header() {
    return <div>
        <p>Header</p>
    </div>
}