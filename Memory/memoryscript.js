let icons = Array.from(document.getElementsByTagName("i"));
 
let playAgain = document.getElementById("rsbtn");
let openedIcons = [];
let kraj = false;
const ikone = [
    "bi-trophy",
    "bi-trophy",
    "bi-apple",
    "bi-apple",
    "bi-award",
    "bi-award",
    "bi-heart-fill",
    "bi-heart-fill",
    "bi-balloon",
    "bi-balloon",
    "bi-bandaid",
    "bi-bandaid"
];

function randomizeIcons(){
    for (let i = ikone.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i+1));
        let k = ikone[i];
        ikone[i] = ikone[j];
        ikone[j] = k;
      }
}

console.log(ikone);

function addIcons(){
    for (let i = 0; i<icons.length; i++){
        icons[i].classList.add(ikone[i]);
    }
}
function showIcons(){
    icons.forEach(icon => icon.classList.add("tile-open"));
}
function unshowIcons(){
    icons.forEach(icon => icon.classList.remove("tile-open"));
}
playAgain.innerHTML= '<button onClick="resetiraj();" class="reset">Započni</button>';
for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener("click", (event) => {
        let clickedIcon = event.target;

        // Da li je već otvoren
        if (openedIcons.includes(clickedIcon)) {
            // ako jes zatvori
            clickedIcon.classList.remove("tile-open");
            openedIcons = openedIcons.filter(icon => icon !== clickedIcon);
        } else {
            // ako nije otvori i izbaci prosle
            if (openedIcons.length === 2) {
                openedIcons.forEach(icon => icon.classList.remove("tile-open"));
                openedIcons = [];
            }
            
            clickedIcon.classList.add("tile-open");
            openedIcons.push(clickedIcon);

            // provjera jaesu li jednaki
            if (openedIcons.length === 2 && openedIcons[0].classList.contains("bi-trophy") && openedIcons[1].classList.contains("bi-trophy")
                ||  openedIcons[0].classList.contains("bi-award") && openedIcons[1].classList.contains("bi-award")
                ||  openedIcons[0].classList.contains("bi-apple") && openedIcons[1].classList.contains("bi-apple")
                ||  openedIcons[0].classList.contains("bi-heart-fill") && openedIcons[1].classList.contains("bi-heart-fill")
                ||  openedIcons[0].classList.contains("bi-balloon") && openedIcons[1].classList.contains("bi-balloon")
                ||  openedIcons[0].classList.contains("bi-bandaid") && openedIcons[1].classList.contains("bi-bandaid")
                )
                
                {
                // ako jesu daj matching
                openedIcons.forEach(icon => icon.classList.add("matching"));
                openedIcons = []; // izbaci iz otvoreni
            }
        }

        if(icons[0].classList.contains("matching") && icons[1].classList.contains("matching") && icons[2].classList.contains("matching") && icons[3].classList.contains("matching") && icons[4].classList.contains("matching") && icons[5].classList.contains("matching") && icons[6].classList.contains("matching") 
        && icons[8].classList.contains("matching")&& icons[9].classList.contains("matching")&& icons[10].classList.contains("matching")&& icons[11].classList.contains("matching")
        ){
          
             kraj = true;
             console.log(kraj);
           }
       
         if(kraj == true){
            playAgain.innerHTML= '<button onClick="resetiraj();" class="reset">Igraj Ponovo</button>';
         }  
    });
}

function resetiraj(){
   icons.forEach(icon => {
    icon.classList.remove("matching", "tile-open", "bi-trophy", "bi-heart-fill", "bi-award", "bi-apple", "bi-bandaid", "bi-balloon");
   })
   playAgain.innerHTML="";
   console.log("resetovano");
   randomizeIcons();
   addIcons();
   showIcons();
setTimeout(unshowIcons, 600);
   kraj= false;
}
console.log(playAgain);

for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener("touchdown", (event) => {
        let clickedIcon = event.target;

        // Da li je već otvoren
        if (openedIcons.includes(clickedIcon)) {
            // ako jes zatvori
            clickedIcon.classList.remove("tile-open");
            openedIcons = openedIcons.filter(icon => icon !== clickedIcon);
        } else {
            // ako nije otvori i izbaci prosle
            if (openedIcons.length === 2) {
                openedIcons.forEach(icon => icon.classList.remove("tile-open"));
                openedIcons = [];
            }
            
            clickedIcon.classList.add("tile-open");
            openedIcons.push(clickedIcon);

            // provjera jaesu li jednaki
            if (openedIcons.length === 2 && openedIcons[0].classList.contains("bi-trophy") && openedIcons[1].classList.contains("bi-trophy")
                ||  openedIcons[0].classList.contains("bi-award") && openedIcons[1].classList.contains("bi-award")
                ||  openedIcons[0].classList.contains("bi-apple") && openedIcons[1].classList.contains("bi-apple")
                ||  openedIcons[0].classList.contains("bi-heart-fill") && openedIcons[1].classList.contains("bi-heart-fill")
                ||  openedIcons[0].classList.contains("bi-balloon") && openedIcons[1].classList.contains("bi-balloon")
                ||  openedIcons[0].classList.contains("bi-bandaid") && openedIcons[1].classList.contains("bi-bandaid")
                )
                
                {
                // ako jesu daj matching
                openedIcons.forEach(icon => icon.classList.add("matching"));
                openedIcons = []; // izbaci iz otvoreni
            }
        }

        if(icons[0].classList.contains("matching") && icons[1].classList.contains("matching") && icons[2].classList.contains("matching") && icons[3].classList.contains("matching") && icons[4].classList.contains("matching") && icons[5].classList.contains("matching") && icons[6].classList.contains("matching") 
        && icons[8].classList.contains("matching")&& icons[9].classList.contains("matching")&& icons[10].classList.contains("matching")&& icons[11].classList.contains("matching")
        ){
          
             kraj = true;
             console.log(kraj);
           }
       
         if(kraj == true){
            playAgain.innerHTML= '<button onClick="resetiraj();" class="reset">Igraj Ponovo</button>';
         }  
    });
}
