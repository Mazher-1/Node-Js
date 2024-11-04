// Promises Function

function getIngredients() {
    return new Promise((resolve) => {
      setTimeout(() => resolve("Banana and milk"), 1000);
    });
  }
  
  function blend(ingredients) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(`A smoothie with ${ingredients}`), 2000);
    });
}

// Async await 

async function makeSmoothie() {
    try {
      console.log("Getting ingredients...");
      let ingredients = await getIngredients(); // Waits for ingredients
      console.log("Ingredients ready:", ingredients);
  
      let smoothie = await blend(ingredients); // Waits for blending
      console.log("Smoothie is ready:", smoothie);
    } catch (error) {
      console.log("Could not make smoothie:", error);
    }
  }

  makeSmoothie();