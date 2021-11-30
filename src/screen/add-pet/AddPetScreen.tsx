import { FC, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { AppStyle, flexVerti, margin, weightItem } from "../../AppStyle";
import Column from "../../components/Column";
import Rows from "../../components/Row";
import TextView from "../../components/Text";
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

import PetCategory from "./PetCategory";



export default function AddPetScreen() {
  let petCateList = [
    { id: 1, petCateName: "Chó", img: icDog },
    { id: 2, petCateName: "Mèo", img: icCat },
    { id: 3, petCateName: "Chuột", img: icHamster },
    { id: 4, petCateName: "Thỏ", img: icHare },
    { id: 5, petCateName: "Khỉ", img: icMonkey },
    { id: 6, petCateName: "Lợn", img: icPig },
    { id: 7, petCateName: "Sóc", img: icSquirrel },
    { id: 8, petCateName: "Nhím", img: icHedge },
    { id: 9, petCateName: "Thằn lằn", img: icLizard },
    { id: 10, petCateName: "Cá", img: icFish },
  ];


  return (
    <div className="petList">
      {petCateList.map((item) => (
        <PetCategory key={item.id} name={item.petCateName} img={item.img} />
      ))}
    </div>
  );
}
