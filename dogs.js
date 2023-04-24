const dogPics =[
"images\\dog1.jpg",
"images\\dog2.jpg",
"images\\dog3.jpg",
"images\\dog4s.jpg",
"images\\dog5.jpg",
"images\\dog6.jpg",
"images\\dog7.jpg",
"images\\dog8.jpg",
"images\\dog9.jpg",
"images\\dog10.jpg",
];


let dogData;

let listBox = $("<fieldset><legend><i class='bi bi-hearts'></i>Choose a dog you want to visit:</legend><select id='dogList' name='doglist' Size=5></fieldset>");
$(".lists").append(listBox);

const process = (data) => {
  // Storing in a global variable for access later
  dogData = data;

  
  // Iterate through the array, adding <option> to the <select>
  data.forEach((dog) => {

    let dogInfo =`<option>${dog.name}</option>`;
   
    // Add the dogInfo to the select list
    $("#dogList").append(dogInfo);
  });
};


// This issues the GET request
const getDogData = () => {
  $.ajax({
    type: "GET",
    url: "https://cit-doghouse-api.uc.r.appspot.com/api/v1/dogs/limit/10",
    dataType: "json",
    success: function (result, status, xhr) {
      process(result);
    },
    error: function (xhr, status, error) {
      alert(
        "Result: " +
          status +
          " " +
          error +
          " " +
          xhr.status +
          " " +
          xhr.statusText
      );
    },
  });
};

const readDog = () => {

  listBox.on("click", function () {

      // when click happens, get the index of the item selected
      let index = $("select[name='doglist'] option:selected").index();
      console.log("index is", index);

      $("#id_readDog").click(function() { 

        let dogImg = document.createElement("img");
        dogImg.src = dogPics[index];
        let container0 = document.getElementById('dogImg');
        container0.replaceChildren();
        $("#dogImg").append(dogImg);
      
        // set the information in the popup
        let name = `My name is  <span class="name">${dogData[index].name}</span>`
        let container = document.getElementById('name');
        container.replaceChildren();
      
        $("#name").append(name);
      
        let breed = `<i class='bi bi-hearts'></i> I'm a (${dogData[index].gender}) <span class="breed">${dogData[index].breed}</span>.`
        let container1 = document.getElementById('breed');
        container1.replaceChildren();
        $("#breed").append(breed);
      
        let age = `<i class='bi bi-hearts'></i> I'm <span class="age">${dogData[index].age}</span> years old.` 
        let container2 = document.getElementById('age');
        container2.replaceChildren();
        $("#age").append (age);
      
        let treat = `<i class='bi bi-hearts'></i> My favorite treat is <span class="treat">${dogData[index].treat}</span>. <br><br>
        <span class="message">"Want to play with me today?"</span> <i class="bi bi-chat-heart"></i>`;
        let container3 = document.getElementById('treat');
        container3.replaceChildren();
        $("#treat").append(treat)
        
        console.log (index)
        console.log(dogData)
  
        
      });
      
});

};

const deleteDog = () =>{

  listBox.on("click", function () {

    // when click happens, get the index of the item selected
    let index = $("select[name='doglist'] option:selected").index();
    console.log("delete index is", index);

    $("#id_deleteDog").click(function(){

      // let deleteDog = dogData.splice(index, 1);
      let deleteDogTest = dogData.splice(index, 1);


      let deletePic = dogPics.splice(index, 1);
      console.log(deletePic);


      let container = document.getElementById('dogList');
      container.replaceChildren();

      dogData.forEach((dog) => {

        let dogInfo =`<option>${dog.name}</option>`;
       
        // Add the dogInfo to the select list
        $("#dogList").append(dogInfo);
      });
  
      // console.log("the remove dog is " + deleteDog);
      console.log("the remove dog is " + deleteDogTest);

      // console.log ("delete" + index);
      // console.log(dogData);
  
      });
     
  
  });
};


const createDog = () =>{
  $("#id_createDog").click(function(){
    let dogAge = $("#inputAge").val();
    let dogName = $("#inputName").val();
    let dogBreed = $("#inputBreed").val();
    let dogGender = $("input[type=radio][name=gender]:checked").val();
    let dogTreat =$("#inputTreat").val();

    dogData.push({
      age: dogAge,
      breed: dogBreed,
      gender: dogGender,
      name: dogName,
      treat: dogTreat,
      _id: "0"
    });

    let container = document.getElementById('dogList');
      container.replaceChildren();

      dogData.forEach((dog) => {

        let dogInfo =`<option>${dog.name}</option>`;
       
        // Add the dogInfo to the select list
        $("#dogList").append(dogInfo);
      });s

   
    console.log(dogData);
    console.log(dogAge)
  })

}


$(document).ready(getDogData);
$(document).ready(readDog);
$(document).ready(deleteDog);
$(document).ready(createDog);



