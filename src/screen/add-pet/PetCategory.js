import icDog from "../../asset/ic_dog.svg";
import icCat from "../../asset/ic_cat.svg";
import icHamster from "../../asset/ic_hamster.svg";
import icFish from "../../asset/ic_fish.svg";
import icHedge from "../../asset/ic_hedge.svg";
import icLizard from "../../asset/ic_lizard.svg";
import icMonkey from "../../asset/ic_monkey.svg";
import icPig from "../../asset/ic_pig.svg";
import icSquirrel from "../../asset/ic_squirrel.svg";
import icHare from "../../asset/ic_hare.svg";
import { ImageView } from "../../components/ImageView";
import "./PetCategory.css";
import { AppStyle } from "../../AppStyle";

const PetCategory = (props) => {
  return (
        <div className="item">
            <ImageView src={props.img} />
            <div>{props.name}</div> 
        </div>
  );
};

export default PetCategory;
