let nav_buttons = document.querySelectorAll(".nav_button");
let contacts_inputs = document.querySelectorAll("#contacts .inp")
let nav_buttons_parent = document.querySelector("#side_bar")
let page_buttons = document.querySelectorAll(".page_button");
let pages = document.querySelectorAll("#container > section");
let page_titles = document.querySelectorAll("#page_title")
let side_bar_button = document.querySelector("#side_bar_button");
let side_bar_close = document.querySelector("#close");
let theme_mode = document.querySelector(".theme_mode");
let form = document.querySelector("#contacts form")
let light_mode = true;
troll_elems = ['<i class="fa-solid fa-face-sleeping"></i>','<i class="fa-solid fa-laptop-code"></i>','<i class="fa-solid fa-mug-hot"></i>', '<i class="fa-solid fa-star"></i>','<i class="fa-solid fa-headphones"></i>' ]
window.onload = ()=>{
    page_buttons[0].click()
    add_projects()
}
nav_buttons.forEach((elem)=>{
    elem.onmouseenter = ()=>{
        Dactivate(document.querySelectorAll("#side_bar hr"))
        elem.previousElementSibling.classList.add("active")
        elem.nextElementSibling.classList.add("active")
    }
    elem.onmouseleave = ()=>{
        Dactivate(document.querySelectorAll("#side_bar hr"))
    }

})

page_buttons.forEach((elem,ind)=>{
    elem.onclick = ()=>{

        if(!elem.classList.contains("active")){
            Dactivate(page_buttons, elem)
            Dactivate(pages, pages[ind])
            if(pages[ind].getAttribute("id") == "home"){
                troll()
            }
            if(nav_buttons_parent.classList.contains("active")){
                side_bar_button.style.transform = "scale(1)"
                nav_buttons_parent.classList.remove("active");
                document.querySelector("#container").classList.remove("un_active")
        }
        }
    }
})


dark_colors = ["#24273c", "#474c58", "#373d49", "#39415b", "#f8f5f1", "#ffffff", "#ffc557", "#171627","1px 4px 6px rgb(0 0 0)", "0 0 25px var(--main_color)", "0 0 25px var(--main_color)", "0 0 50px var(--main_color)"]
light_colors = ["#F6EDE3", "#353535", "#d3c8bb", "#6f68ad", "#181818", "#e8dbff", "#ffc557","#272727","1px 4px 6px rgba(0, 0, 0, 0.25)", "2px 2px var(--color1)", "0 0 0 var(--main_color)", "0 0 var(--main_color)"]


theme_mode.onclick = ()=>{
    light_mode = !light_mode;

    if(light_mode){
        change_colors(light_colors)
                theme_mode.firstElementChild.classList.remove("fa-sun-bright")
        theme_mode.firstElementChild.classList.add("fa-moon")

    }else{
        change_colors(dark_colors)
                theme_mode.firstElementChild.classList.add("fa-sun-bright")
        theme_mode.firstElementChild.classList.remove("fa-moon")
    }
}
function troll(){
        
        document.querySelectorAll(".troll").forEach((troll)=>{
            ind = Math.floor(Math.random()*troll_elems.length)

            troll.innerHTML = troll_elems[ind];
            troll_elems.splice(ind,1)
        })
        troll_elems = ['<i class="fa-solid fa-face-sleeping"></i>','<i class="fa-solid fa-laptop-code"></i>','<i class="fa-solid fa-mug-hot"></i>', '<i class="fa-solid fa-star"></i>','<i class="fa-solid fa-headphones"></i>' ]

}
function change_colors(arr){
    document.documentElement.style.setProperty("--body", arr[0])
    document.documentElement.style.setProperty("--color1", arr[1])
    document.documentElement.style.setProperty("--color2", arr[2])
    document.documentElement.style.setProperty("--color3", arr[3])
    document.documentElement.style.setProperty("--dark_text", arr[4])
    document.documentElement.style.setProperty("--light_text", arr[5])
    document.documentElement.style.setProperty("--main_color", arr[6])
    document.documentElement.style.setProperty("--home", arr[7])
    document.documentElement.style.setProperty("--sh", arr[8])
    document.documentElement.style.setProperty("--tsh", arr[9])
    document.documentElement.style.setProperty("--tsh2", arr[10])
    document.documentElement.style.setProperty("--sh2", arr[11])
}
function Dactivate (arr, elem) {
    if(arr){
            arr.forEach((t)=>{
        t.classList.remove("active")
    });
    }
    if (elem){
        elem.classList.add("active")
    }
}
page_titles.forEach((elem)=>{
    [...elem.children].forEach((child,ind) =>{
        child.style.transitionDelay = `${0.45 + ind*0.05}s`
    })
})

side_bar_button.onclick = ()=>{
    Dactivate(false, nav_buttons_parent);

    side_bar_button.style.transform = "scale(0)"
    document.querySelector("#container").classList.add("un_active")
}

side_bar_close.onclick = ()=>{
    if(nav_buttons_parent.classList.contains("active")){
        nav_buttons_parent.classList.remove("active");
        side_bar_button.style.transform = "scale(1)"
    document.querySelector("#container").classList.remove("un_active")

    }
}


contacts_inputs.forEach((inp)=>{
    inp.onfocus = ()=>{
        Dactivate(document.querySelectorAll("#contacts form > div"), inp.parentElement)
    }
    inp.onblur = ()=>{
                Dactivate(document.querySelectorAll("#contacts form > div"), false)

    }
})

function add_projects() {
    fetch("https://api.github.com/users/Zeddy-Forreal/repos")
        .then(res => res.json())
        .then(repos => {
            for (const repo of repos) {
                if (repo.name != "Zeddy-Forreal") {
                    
                    fetch(`https://api.github.com/repos/Zeddy-Forreal/${repo.name}/languages`)
                        .then(res => res.json())
                        .then(langs => {
                            
                            let language_names = Object.keys(langs).sort(); 

                            let extra_techs = [];
                            switch(repo.name){
                                case "tic-tac-toe":
                                    extra_techs.push("Tailwind");
                                    break
                                case "prayer-times-app":
                                    extra_techs.push("API")
                                    break;
                                default:
                                    extra_techs = []
                            }
                                                        
                            
                            let techs = [...language_names, ...extra_techs].map(lan => `<small class="${lan.toLowerCase()}">${lan}</small>`);
                            let html_text = `
                                <div class="project">
                                    <header>
                                        <h2><i class="fa-light fa-folder"></i></h2>
                                        <div>
                                            <a target='_blank' href='${repo.html_url}'><h4><i class="fa-brands fa-github"></i></h4></a>
                                            <a target='_blank' href='https://zeddy-forreal.github.io/${repo.name}/'><h4><i class="fa-solid fa-arrow-up-right-from-square"></i></h4></a>
                                        </div>
                                    </header>
                                    <article>
                                        <h4>${repo.name.split("-").join(" ")}</h4>
                                        <h5>${repo.description || ""}</h5>
                                    </article>
                                    <footer>${techs.join(" ")}</footer>
                                </div>`;
                            
                            document.querySelector(".projects_container").innerHTML += html_text;
                        });
                }
            }
        });
}

form.addEventListener("submit", async (a)=>{
    a.preventDefault()
    const response = await fetch(form.action, {method:"post", body: new FormData(form)})
    if (response.ok){
        console.log("YES")
    }else{
        console.log("NO")
    }
    form.reset()
})


