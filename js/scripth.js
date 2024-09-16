let imgElements = document.getElementsByClassName('img');
fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
.then(response => response.json())
.then(data => {
    let categories = data.categories;
    for (let i = 0; i < imgElements.length && i < categories.length; i++) {
        // Set the image source
        imgElements[i].setAttribute('src', categories[i].strCategoryThumb);
        
        // Create a new div for the name label
        let label = document.createElement('div');
      
        label.textContent = categories[i].strCategory.toUpperCase();  
        label.style.textAlign = 'center';
        label.style.fontWeight = 'bold';
        label.style.marginTop = '10px';
        label.style.color = 'white';
        label.style.fontSize = '15px';
        label.style.position ='relative';
        label.style.top ='-205px';
        label.style.left ='60px';
        label.style.backgroundColor ='blue';
        label.style.marginLeft ='90px';
        label.style.marginRight ='90px';
        label.style.borderRadius ='5px';
        label.style.boxShadow ='1px 3px 10px';
        label.style.fontFamily="Verdana, Geneva, Tahoma, sans-serif";
        // label.style.textDecoration='none'
        
        
        // Append the label below the image
        imgElements[i].parentElement.appendChild(label);
    }
})
.catch(error => {
    console.error('Error fetching data:', error);
});

// let link=document.getElementsByTagName('a')
//         link.style.textDecoration='none';

// description
fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
.then(response => response.json())
.then(data => {
    const categories = data.categories;
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const selectedCategory = categories.find(cat => cat.strCategory === category);
    const mealNameElement = document.querySelector('.category-name');
    const mealDescriptionElement = document.querySelector('.description');
    if (selectedCategory) {
        mealNameElement.textContent = selectedCategory.strCategory; 
        mealDescriptionElement.textContent = selectedCategory.strCategoryDescription; 
    } 
    
})
.catch(error => {
    console.error('Error fetching categories:', error);
});

// meals-category

let arr = [
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef', 
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken', 
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert',
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Lamb', 
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Miscellaneous', 
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta', 
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Pork',
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood', 
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Side', 
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Starter', 
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegan', 
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian',
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast',
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat'
    ];
    const mealContainer = document.getElementById('meal-items');
    let mealCount = 0; 
    
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('category');
    const categoryUrl = arr.find(url => url.includes(`c=${selectedCategory}`));
    
    if (categoryUrl) {
    fetch(categoryUrl)
        .then(response => response.json())
        .then(data => {
            const meals = data.meals;
            mealContainer.innerHTML = ''; 
            meals.forEach(meal => {
                const mealDiv = document.createElement('div');
                mealDiv.classList.add('meal');
                const mealImg = document.createElement('img');
                mealImg.setAttribute('src', meal.strMealThumb);
                mealImg.setAttribute('alt', meal.strMeal);
        
                const mealName = document.createElement('div');
                mealName.classList.add('meal-name');
                mealName.textContent = meal.strMeal;
        
                mealDiv.appendChild(mealImg);
                mealDiv.appendChild(mealName);
        
                mealContainer.appendChild(mealDiv);
    
                mealCount++; 
            });
        })
        .catch(error => {
            console.error('Error fetching meals:', error);
        });
    } 
    // else {
    //     mealContainer.innerHTML = 'No meals found for the selected category.';
    // }

// ------------------------------------------------------------------------------


let mealList = document.getElementById('meals1');
// const mealDetailsContent = document.querySelector('.meal-section');
let mealDetailsContent = document.querySelector('.text-bg-light');
let mealDetails11 = document.querySelector('.row');
let mealinfoo = document.querySelector('.meal-info-navbar');
let mealInfoMain = document.querySelector('.mealInfo-main');
// const recipeCloseBtn = document.getElementById('recipe-close-btn');


let searchbtn=document.getElementById("btn-search");

searchbtn.addEventListener("click",submit);


function submit(){
   let searchBox=document.getElementById("input-search").value;
   
   fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBox}`)
    .then(response=>response.json())
    .then(data=>{
        let html = "";
        if(data.meals){
            data.meals.forEach(meals1 =>{
                html +=`
                
                    <div class="col1" id="col1">
                        <div class="card text-bg-light"  data-id="${meals1.idMeal}" style="width: 17.5rem;">
                        <img src="${meals1.strMealThumb}" id="meal-imgs" class="card-img1" alt="...">                          
                            <div class="card-img-overlay">
                                <h6 class="card-title1">${meals1.strCategory}</h6>
                                <p class="card-text1">${meals1.strMeal}</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </a>
                `;
                
            });
            mealList.classList.remove("not-found");
            // mealinfoo.classList.remove("meal-info-navbar");

            

        }else{
            html = "Sorry,No meals found !";
            mealList.classList.add("not-found");
        }

        
        mealList.innerHTML=html;

    });


}

// -------------------------meal details------------
mealList.addEventListener("click",getMealRecipe);


function getMealRecipe(e){
    e.preventDefault();

    // console.log(e.target.parentElement.parentElement); 
    if(e.target.parentElement.parentElement){
        let mealItem=e.target.parentElement;
        console.log(mealItem);
            // mealinfoo.classList.remove("meal-info-navbar");
            // mealList.classList.remove("meals1");
        
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response=>response.json())
        .then(data=> mealinfo(data.meals));
    }
}



function mealinfo(meal){
    // console.log(meal);
    meal = meal[0];

   function createNumberedSteps(text) {
        // Split the text into paragraphs
        const paragraphs = text.split('\n\n');
      
        // Add numbers to the beginning of each paragraph
        const numberedSteps = paragraphs.map((paragraph, index) => {
          return `${index + 1}. ${paragraph}`;
        });
      
        // Join the numbered steps back into a single string
        const numberedText = numberedSteps.join('\n\n');
      
        return numberedText;
      }
      
      // Example usage:
      const originalText = `${meal.strInstructions}`;
      const numberedText = createNumberedSteps(originalText);

      // console.log(numberedText);
      
    let html = `
    <div class="meal-info-navbar">
     <a href="index1.html"><img class="meal-info-nav-img" src="/index1 (1).png" alt=""></a>
     <i class="fa-solid fa-angles-right"><p class="meal-name">${meal.strMeal}</p></i>
     <div class="meal-info"><br>
      <h2 class="cate-main2">MEALS DETAILS</h2><br>
      <div class="meal-details">
        <div class="container">
          <div class="row">
            <div class="col-1">
              <img class="meal-info-img" src="${meal.strMealThumb}" alt="">
            </div>
            <div class="col-2">
              <h3 class="meal-info-name">${meal.strMeal}</h3>
              <span class="meal-info-category-name">Category:<p class="meal-info-category-name1">${meal.strCategory}</p></span><br>
              <span class="meal-info-category-source">Source:<p class="meal-info-category-sourceurl">${meal.strSource}</p></span><br><br>
              <span class="meal-info-category-tags">Tags: <p class="meal-info-category-tags1">${meal.strTags}</p>
              </span>
              
                <div class="ingredient-container">
                  <h3 class="ingredient-heading"> Ingredients </h3>
                  <div class="row">
                  <ul class="ing-list-group">
                    <li class="ing-list-item">${meal.strIngredient1}</li>
                    <li class="ing-list-item">${meal.strIngredient2}</li>
                    <li class="ing-list-item">${meal.strIngredient3}</li>
                    <li class="ing-list-item">${meal.strIngredient4}</li>
                    <li class="ing-list-item">${meal.strIngredient5}</li>
                    <li class="ing-list-item">${meal.strIngredient6}</li>
                    <li class="ing-list-item">${meal.strIngredient7}</li>
                    <li class="ing-list-item">${meal.strIngredient8}</li>
                    <li class="ing-list-item">${meal.strIngredient9}</li>
                  </ul>
                </div>
                    <div class="col">
                    
                    <div class="ing-list">
    
                      
                  </div>
                  </div>
                </div>
              </div>
              </div><br><br><br>
            <div class="measure">
              <h3 class="ingredient-heading2"> Measurements </h3>
                <div class="row">
                  <div class="col">
                    <div class="ing-col">
                     <span class="ing-spoon"><i class="fa-solid fa-spoon fa-lg"></i></span>
                     <p class="ing-measure">${meal.strMeasure1}</p>
                    </div>
                  </div>
                  <div class="col">
                    <div class="ing-col">
                     <span class="ing-spoon"><i class="fa-solid fa-spoon fa-lg"></i></span>
                     <p class="ing-measure">${meal.strMeasure2}</p>
                    </div>
                  </div>
                  <div class="col">
                    <div class="ing-col">
                     <span class="ing-spoon"><i class="fa-solid fa-spoon fa-lg"></i></span>
                     <p class="ing-measure">${meal.strMeasure3}</p>
                    </div>
                  </div>
                  <div class="col">
                    <div class="ing-col">
                     <span class="ing-spoon"><i class="fa-solid fa-spoon fa-lg"></i></span>
                     <p class="ing-measure">${meal.strMeasure4}</p>
                    </div>
                  </div>
                  <div class="col">
                    <div class="ing-col">
                     <span class="ing-spoon"><i class="fa-solid fa-spoon fa-lg"></i></span>
                     <p class="ing-measure">${meal.strMeasure5}</p>
                    </div>
                  </div>
                  <div class="col">
                    <div class="ing-col">
                     <span class="ing-spoon"><i class="fa-solid fa-spoon fa-lg"></i></span>
                     <p class="ing-measure">${meal.strMeasure6}</p>
                    </div>
                  </div>
                  <div class="col">
                    <div class="ing-col">
                     <span class="ing-spoon"><i class="fa-solid fa-spoon fa-lg"></i></span>
                     <p class="ing-measure">${meal.strMeasure7}</p>
                    </div>
                  </div>
                  <div class="col">
                    <div class="ing-col">
                     <span class="ing-spoon"><i class="fa-solid fa-spoon fa-lg"></i></span>
                     <p class="ing-measure">${meal.strMeasure8}</p>
                    </div>
                  </div>
                  <div class="col">
                    <div class="ing-col">
                     <span class="ing-spoon"><i class="fa-solid fa-spoon fa-lg"></i></span>
                     <p class="ing-measure">${meal.strMeasure9}</p>
                    </div>
                  </div><div class="col">
                    <div class="ing-col">
                     <span class="ing-spoon"><i class="fa-solid fa-spoon fa-lg"></i></span>
                     <p class="ing-measure">${meal.strMeasure10}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              <div class="instructions">
                <h3 class="ingredient-heading3">Instructions :</h3>
                <p class="instructions-text">${numberedText}</p><br>
              </div>
          </div>
        </div>
      </div>
     </div>
     </div>
     </div>
     <br>
     <br>
     <br>
     <br>
     <br>
     <br>
     <br>
     <br>
     <br>
     `;
     mealInfoMain.innerHTML=html;
    
}
// let numb=1;


//   console.log(numberedText);



// function numb(){
//     for(let i=1;i<=6;i++){
//         if(meal[`strIngredient${i}`]){
// }
// }

// }return numb();

// let items="";
// const ing= ${meal.strIngredient[i]}





// recipeCloseBtn.addEventListener('click', () => {
//   mealDetailsContent.parentElement.removeChild(mealDetailsContent);
// });

// if(){
//   let contaicate =  document.querySelector('.container-cate');
//     contaicate.style.display="none";
// }


// ---------------------------------------------------------------------------
    // function mealinfo(meal){
    //     // console.log(meal);
    //     meal = meal[0];
    
    //    function createNumberedSteps(text) {
    //         // Split the text into paragraphs
    //         const paragraphs = text.split('\n\n');
          
    //         // Add numbers to the beginning of each paragraph
    //         const numberedSteps = paragraphs.map((paragraph, index) => {
    //           return `${index + 1}. ${paragraph}`;
    //         });
          
    //         // Join the numbered steps back into a single string
    //         const numberedText = numberedSteps.join('\n\n');
          
    //         return numberedText;
    //       }
          
    //       // Example usage:
    //       const originalText = `${meal.strInstructions}`;
    //       const numberedText = createNumberedSteps(originalText);
    
    //       // console.log(numberedText);
          
    //     let html = `
    //     <div class="meal-info-navbar">
    //      <a href="index.html"><img class="meal-info-nav-img" src="/home (1).png" alt=""></a>
    //      <i class="fa-solid fa-angles-right"><p class="meal-name">${meal.strMeal}</p></i>
    //      <div class="meal-info"><br>
    //       <h2 class="cate-main2">MEALS DETAILS</h2><br>
    //       <div class="meal-details">
    //         <div class="container">
    //           <div class="row">
    //             <div class="col-1">
    //               <img class="meal-info-img" src="${meal.strMealThumb}" alt="">
    //             </div>
    //             <div class="col-2">
    //               <h3 class="meal-info-name">${meal.strMeal}</h3>
    //               <span class="meal-info-category-name">Category:<p class="meal-info-category-name1">${meal.strCategory}</p></span><br>
    //               <span class="meal-info-category-source">Source:<p class="meal-info-category-sourceurl">${meal.strSource}</p></span><br><br>
    //               <span class="meal-info-category-tags">Tags: <p class="meal-info-category-tags1">${meal.strTags}</p>
    //               </span>
                  
    //                 <div class="ingredient-container">
    //                   <h3 class="ingredient-heading"> Ingredients </h3>
    //                   <div class="row">
    //                   <ul class="ing-list-group">
    //                     <li class="ing-list-item">${meal.strIngredient1}</li>
    //                     <li class="ing-list-item">${meal.strIngredient2}</li>
    //                     <li class="ing-list-item">${meal.strIngredient3}</li>
    //                     <li class="ing-list-item">${meal.strIngredient4}</li>
    //                     <li class="ing-list-item">${meal.strIngredient5}</li>
    //                     <li class="ing-list-item">${meal.strIngredient6}</li>
    //                     <li class="ing-list-item">${meal.strIngredient7}</li>
    //                     <li class="ing-list-item">${meal.strIngredient8}</li>
    //                     <li class="ing-list-item">${meal.strIngredient9}</li>
    //                   </ul>
    //                 </div>
    //                     <div class="col">
                        
    //                     <div class="ing-list">
        
                          
    //                   </div>
    //                   </div>
    //                 </div>
    //               </div>
    //               </div><br><br><br>
    //             <div class="measure">
    //               <h3 class="ingredient-heading2"> Measurements </h3>
    //                 <div class="row">
    //                   <div class="col">
    //                     <div class="ing-col">
    //                      <span class="ing-spoon"><i class="fa-solid fa-spoon fa-lg"></i></span>
    //                      <p class="ing-measure">${meal.strMeasure1}</p>
    //                     </div>
    //                   </div>
    //                   <div class="col">
    //                     <div class="ing-col">
    //                      <span class="ing-spoon"><i class="fa-solid fa-spoon fa-lg"></i></span>
    //                      <p class="ing-measure">${meal.strMeasure2}</p>
    //                     </div>
    //                   </div>
    //                   <div class="col">
    //                     <div class="ing-col">
    //                      <span class="ing-spoon"><i class="fa-solid fa-spoon fa-lg"></i></span>
    //                      <p class="ing-measure">${meal.strMeasure3}</p>
    //                     </div>
    //                   </div>
    //                   <div class="col">
    //                     <div class="ing-col">
    //                      <span class="ing-spoon"><i class="fa-solid fa-spoon fa-lg"></i></span>
    //                      <p class="ing-measure">${meal.strMeasure4}</p>
    //                     </div>
    //                   </div>
    //                   <div class="col">
    //                     <div class="ing-col">
    //                      <span class="ing-spoon"><i class="fa-solid fa-spoon fa-lg"></i></span>
    //                      <p class="ing-measure">${meal.strMeasure5}</p>
    //                     </div>
    //                   </div>
    //                   <div class="col">
    //                     <div class="ing-col">
    //                      <span class="ing-spoon"><i class="fa-solid fa-spoon fa-lg"></i></span>
    //                      <p class="ing-measure">${meal.strMeasure6}</p>
    //                     </div>
    //                   </div>
    //                   <div class="col">
    //                     <div class="ing-col">
    //                      <span class="ing-spoon"><i class="fa-solid fa-spoon fa-lg"></i></span>
    //                      <p class="ing-measure">${meal.strMeasure7}</p>
    //                     </div>
    //                   </div>
    //                   <div class="col">
    //                     <div class="ing-col">
    //                      <span class="ing-spoon"><i class="fa-solid fa-spoon fa-lg"></i></span>
    //                      <p class="ing-measure">${meal.strMeasure8}</p>
    //                     </div>
    //                   </div>
    //                   <div class="col">
    //                     <div class="ing-col">
    //                      <span class="ing-spoon"><i class="fa-solid fa-spoon fa-lg"></i></span>
    //                      <p class="ing-measure">${meal.strMeasure9}</p>
    //                     </div>
    //                   </div><div class="col">
    //                     <div class="ing-col">
    //                      <span class="ing-spoon"><i class="fa-solid fa-spoon fa-lg"></i></span>
    //                      <p class="ing-measure">${meal.strMeasure10}</p>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //               <div class="instructions">
    //                 <h3 class="ingredient-heading3">Instructions :</h3>
    //                 <p class="instructions-text">${numberedText}</p><br>
    //               </div>
    //           </div>
    //         </div>
    //       </div>
    //      </div>
    //      </div>
    //      </div>
    //      <br>
    //      <br>
    //      <br>
    //      <br>
    //      <br>
    //      <br>
    //      <br>
    //      <br>
    //      <br>
    //      `;
    //      mealInfoMain.innerHTML=html;
        
    // }