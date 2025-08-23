// JS Scripts
import { HashMap } from "./hashmap.js";
import { getRandomPeople } from "./getrandompeople.js";

window.onload = () => {
  const MAX_SIZE = 500;
  let test = new HashMap();
  getRandomPeople(MAX_SIZE).then(list=>{
  for(let i = 0;i<MAX_SIZE;i++){
    test.set(list[i].key,list[i].value);
  }
  });
  console.log(test);

};
