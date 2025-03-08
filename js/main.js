let gear = document.querySelector(".gear");
let mainColor,mainColorHov,secColor,secColorHov;
let colorChangerEl= [...document.getElementsByClassName("color")];
let pic = document.querySelector("div.shape");
let thBtns= [...document.getElementsByClassName("th")];
let yesBtn= document.querySelector(".yes");
let noBtn= document.querySelector(".no");
let resetBtn= document.querySelector(".reset");
let popUp= document.querySelector(".pop-up");
let dragedListIcon = document.querySelector(".nav .fa-solid.fa-bars");
let dragedList = document.querySelector(".nav ul");
let project =  document.querySelector(".project");
let projectCard =  document.querySelectorAll(".pro-card");
let test , changeinterval;


gear.addEventListener("click" , () => {
    gear.parentElement.classList.toggle("open");
});

document.addEventListener("click" , (e) => {
    if (!gear.parentElement.contains(e.target) && e.target !== gear){
        gear.parentElement.classList.remove("open");
    }
    if (e.target !== dragedListIcon){
        dragedList.classList.add("draged");
    }
});

window.addEventListener("load",() =>{
    if(localStorage.getItem("colors")){
        removeActiveFromEls(colorChangerEl);
        addActiveToEl(colorChangerEl[JSON.parse(localStorage.colors).num])
    }
    if (localStorage.getItem("pic")=="yes"||!localStorage.getItem("pic")) {
        cahngePic();
    }else{
        pic.style.backgroundImage =localStorage.picBackGround;
        removeActiveFromEls(thBtns);
        addActiveToEl(noBtn);
        }   
});

window.onscroll = () => {
    reched(project);
}

dragedListIcon.addEventListener("click", ()=> dragedList.classList.toggle("draged"));

colorChangerEl.forEach(e => {
    e.addEventListener("click",async (e) =>{
        removeActiveFromEls(colorChangerEl);
        addActiveToEl(e.target);
        let num = e.target.dataset.color;
        let colorData = await getDataFromJson("js/colorChanger.json");
        saveColorDataInLocal("colors",colorData[num]);
        colorChanging(colorData[num]);  
    })
});

thBtns.forEach(e => {
    e.addEventListener("click", (e) =>{
        removeActiveFromEls(thBtns);
        addActiveToEl(e.target);
    })
});


yesBtn.addEventListener("click" , () => {
    if (!localStorage.getItem("pic")) {
        localStorage.setItem("pic","yes");
        cahngePic();
    }
});

noBtn.addEventListener("click" , () => {
    localStorage.setItem("pic","no");
    clearInterval(changeinterval);
    localStorage.setItem("picBackGround",pic.style.backgroundImage);
});

resetBtn.addEventListener("click" , async () => {
    localStorage.clear();
    window.location.reload();
});

function addActiveToEl(e) {
    e.classList.add("active");
}

function removeActiveFromEls(arr) {
    arr.forEach(e => {
        e.classList.remove("active");
    });
}

async function getDataFromJson(link) {
    try {
        let response = await fetch(link);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        let text = await response.json();
        return text;
    } catch (error) {
        console.error("Failed to load color data:", error);
    }
}

function saveColorDataInLocal(name,value) {
    let colors= JSON.stringify(value);
    localStorage.setItem(name,colors);
}

function colorChanging(colors) {
    document.documentElement.style.setProperty(`--main-color`, colors.mainColor);   
    document.documentElement.style.setProperty(`--main-color-hov`,colors.mainColorHov);   
    document.documentElement.style.setProperty(`--sec-color`, colors.secColor);   
    document.documentElement.style.setProperty(`--sec-color-hov`, colors.secColorHov);
}

function cahngePic() {
    if(localStorage.getItem("pic")=="yes"||!localStorage.getItem("pic")){
        changeinterval = setInterval(() => {
            let picNum = Math.floor(Math.random() * 5)+1;
            while (test==picNum) {
                picNum = Math.floor(Math.random() * 5)+1;
            }
            pic.style.backgroundImage= `url("/images/landing${picNum}.jpeg")`;
            test=picNum;
        }, 2000);
    }
}

function reched(sec) {
    let secTop=sec.offsetTop;
    let WindowScrollHeight=window.pageYOffset;
    if (WindowScrollHeight >= (secTop - 450)) {
        projectCard.forEach(e => {
            e.classList.add("reached");
            popUp.style.opacity=1;
        });
    }
    if (WindowScrollHeight <= (secTop-450)) {
        projectCard.forEach(e => {
            if (e.classList.contains("reached")) {
                e.classList.remove("reached");
                popUp.style.opacity=0;
            }
        });
    }
}

const swiper = new Swiper('.swiper', {
    centeredSlides: true, 
    loop: true, 
    spaceBetween: 10, 
    initialSlide: 1, 

    autoplay: {
        delay: 3000, 
        disableOnInteraction: false, 
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    breakpoints: {
        0: {
            slidesPerView: 1, 
        },
        766: { 
            slidesPerView: 2, 
        }
    }
});

// pic.style.backgroundImage= `url("https://youseif-elshreif.github.io/New_version_T1hCJ/images/landing${picNum}.jpg")`;
// const baseUrl = window.location.origin;
//             const projectPath = window.location.pathname.split('/').length > 2 ? window.location.pathname.split('/')[1] : ''; 
//             const fullPath = projectPath ? `${baseUrl}/${projectPath}` : baseUrl;
//             pic.style.backgroundImage = `url("${fullPath}/images/landing${picNum}.jpg")`;



