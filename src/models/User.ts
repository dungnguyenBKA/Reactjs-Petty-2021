import { randomInt, randomUUID } from "crypto"

interface User {
    id: string
    name: string
    avatar: string

    // constructor(id: string, name: string, avatar: string) {
    //     this.id = id
    //     this.name = name
    //     this.avatar = avatar
    // }
}

let fakeUserAvatarUrls = [
    "https://i.scdn.co/image/78d984cb018f355126c426306677ce3fc5711593",
    "https://media-cdn.laodong.vn/storage/newsportal/2019/11/10/765130/Son-Tung-Mtp.jpg?w=720&crop=auto&scale=both",
    "https://upload.wikimedia.org/wikipedia/commons/9/99/Lee_Do-hyun_in_October_2020.jpg",
    "https://store-images.s-microsoft.com/image/apps.28411.13510798887593857.411c7070-8254-4bc7-9822-93212e9b3eaa.d5650289-0ad1-4560-ac30-38a18a1847bb?mode=scale&q=90&h=200&w=200&background=%230078D7"
]

function getRandomString(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

let getRamdomFakeUser = function (): User {
    let user: User = {
        id: getRandomString(8),
        name: getRandomString(10),
        avatar: fakeUserAvatarUrls[Math.round(Math.random() * (fakeUserAvatarUrls.length-1))]
    }
    return user;
};


export default User
export {
    getRamdomFakeUser,
    getRandomString
}