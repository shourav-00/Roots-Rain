const category=()=>{
    fetch('https://openapi.programming-hero.com/api/categories')
    .then(res=>res.json())
    .then(data=>displayCategory(data.categories))
}

const displayCategory=(data)=>{
    const getplace=document.getElementById('category');
    getplace.innerHTML="";
    data.forEach(element => {
        //console.log(element.category_name);
        const place=document.createElement("div");
        place.innerHTML=`
            <div class='cat-btn'onclick="specificCat('${element.category_name}',this)">
                <h2 class="font-bold ">${element.category_name}</h2>   
            </div>
        `
        getplace.appendChild(place);


    });
}

category();


const middleSection=()=>{
    
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(prom=>prom.json())
    .then(data=>displayMiddle(data.plants))
};

const displayMiddle=(data)=>{
    const getplace=document.getElementById("MiddleSection");
    getplace.innerHTML="";

    data.forEach(element => {
        const place=document.createElement("div");

        place.innerHTML=`
        <div class="m-2 bg-white shadow-sm h-full rounded-lg flex flex-col">
                <img class="w-full h-40 object-cover" src="${element.image}" alt="coming">
                <h2 onclick="modal('${element.name}',
                '${element.image}',
                '${element.category}',
                '${element.price}',
                '${element.description}')" 
                class="p-2 font-bold">${element.name}</h2>
                <p class="p-2">${element.description}</p>
                
                <div class="flex justify-between items-center my-5 text-sm p-2 ">
                <div class="p-2 font-bold">${element.category}</div>
                    
                    <p class="p-2 font-bold">$<span class="">${element.price}</span></p>

                </div>
                <button onclick="addtocard('${element.name}','${element.price}')" class="btn btn-success rounded-xl mx-4 mb-3 mx-auto w-[80%]">Add to Card-</button>
            </div>`
        getplace.appendChild(place);

    });

}

const modal = (name, image, category, price, description) => {
    // If modal already exists, remove it first
    const existing = document.getElementById("overlay");
    if (existing) existing.remove();

    // Create overlay
    const overlay = document.createElement("div");
    overlay.id = "overlay"; // important!
    overlay.className = "fixed inset-0 flex justify-center items-center z-50";

    // Create modal content
    const get = document.createElement("div");
    get.className = "bg-white rounded-lg shadow-lg p-6 w-[90%] md:w-[60%] lg:w-[40%] flex flex-col max-h-[80vh] overflow-y-auto";

    get.innerHTML = `
        <h2 class="p-2 font-bold">${name}</h2>
        <img class="w-full h-40 object-cover" src="${image}" alt="coming">
        <div class="p-2 font-bold">${category}</div>
        <p class="p-2 font-bold">$<span>${price}</span></p>
        <p class="p-2">${description}</p>
        <button class="button bg-white m-2 text-center">Close</button>
    `;

    overlay.appendChild(get);
    document.body.appendChild(overlay);

    // Close modal on button click
    get.querySelector(".button").addEventListener("click", () => overlay.remove());

    
};




middleSection();


//specificCat-------------------->

const specificCat=(categoryName,element)=>{

    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('bg-green-700', 'text-white'); 
    });

    // Add active class to the clicked button
    if (element) {
        element.classList.add('bg-green-700','text-white');
    }

    // spinner
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("hidden"); 

    fetch("https://openapi.programming-hero.com/api/plants")
    .then(prom=>prom.json())
    .then(data=>displayCat(data.plants,categoryName))
    .finally(() => spinner.classList.add("hidden"));
}

const displayCat=(CatName,categoryName)=>{
    const getplace=document.getElementById("MiddleSection");
    getplace.innerHTML="";


    const filteredPlants = []; // ← empty array to store results

    CatName.forEach(ele => {
        if (ele.category === categoryName) { // check condition
            filteredPlants.push(ele); // add matching item to array
        }
    });

    //console.log(filteredPlants); // now you have all plants in this category
    filteredPlants.forEach(element => {
        const place=document.createElement("div");

        place.innerHTML=`
        <div class="m-2 bg-white shadow-sm h-full rounded-lg flex flex-col">
                <img class="w-full h-40 object-cover" src="${element.image}" alt="coming">
                <h2 onclick="modal('${element.name}',
                '${element.image}',
                '${element.category}',
                '${element.price}',
                '${element.description}')" 
                class="p-2 font-bold">${element.name}</h2>
                <p class="p-2">${element.description}</p>
                
                <div class="flex justify-between items-center my-5 text-sm p-2 ">
                <div class="p-2 font-bold">${element.category}</div>
                    
                    <p class="p-2 font-bold">$<span class="">${element.price}</span></p>

                </div>
                <button id="surity" onclick="addtocard('${element.name}','${element.price}')" class="btn btn-success rounded-xl mx-4 mb-3 mx-auto w-[80%]">Add to Card</button>
            </div>`
        getplace.appendChild(place);
    }

    )
    
}

let Tprice=0;
const addtocard=(name,price)=>{
        const getplace=document.getElementById("add-to-card");
        const confirmed = confirm(`Are you sure you want to add ${name} to the cart?`);
        if (!confirmed) return;

        const confirmation=document.getElementById("surity");
    
            const place=document.createElement("div");
            
           
            place.innerHTML=`
            <div class="flex justify-between items-center bg-[#51c97d] gap-3 mb-2 p-2 rounded-xl">
            <div>
            <h2>${name}</h2>
            <h2>${price}</h2>
            
            </div>
            <div>
                <p><i class="fa-solid fa-skull-crossbones"></i></p>
             </div>
            </div>
        `
        getplace.appendChild(place);
        Tprice+=Number(price);
        if(Tprice<=0){
            document.getElementById("total-price").innerText="";
        }
        
        document.getElementById("total-price").innerText=`
            Total Price:$${Tprice}
        `
      
            place.querySelector("i").addEventListener("click", () => {
                Tprice-=Number(price);
                place.remove();

                if(Tprice<=0){
                document.getElementById("total-price").innerText="";
                Tprice=0;
                }

                else{
                document.getElementById("total-price").innerText=`
                Total Price:$${Tprice}
                `
                }

                // document.getElementById("total-price").innerText = `Total Price:$${Tprice}`;
            });
       

      
        
        
    }

    document.getElementById("btn-alert").addEventListener("click",()=>{
        alert("Buy a Tree to get Plant");
    })
    document.getElementById("Involved").addEventListener("click",()=>{
        alert("Scroll down to the bottom to saty with us");
    })

    

