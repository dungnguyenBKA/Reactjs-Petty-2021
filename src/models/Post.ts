export default class Post{
    id: string|number = ""
    avatarUrl =
      "https://cms.luatvietnam.vn/uploaded/Images/Original/2019/01/17/nuoi-cho-meo_1701125148.png"
    petName = ""
    content =
      ""
    imgUrl =
      "http://vanchuyenchomeo.com/wp-content/uploads/2020/04/cho-meo-song-chung.jpg"

      constructor(id: string|number, petName: string, content: string, imgUrl: string, avatarUrl: string) {
          this.id = id
          this.petName = petName
          this.content = content
          this.imgUrl = imgUrl
          this.avatarUrl = avatarUrl
      }
}