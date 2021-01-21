((d)=>{
    const $btnMenu = d.querySelector(".menu-btn");
    const $menu = d.querySelector(".menu");
    $btnMenu.addEventListener("click", e =>{
        $btnMenu.firstElementChild.classList.toggle("none");
        $btnMenu.lastElementChild.classList.toggle("none");
        $menu.classList.toggle("is-active")
    })
    d.addEventListener("click", e=>{
        if(!e.target.matches(".menu a")) return false;
            $btnMenu.firstElementChild.classList.remove("none");
            $btnMenu.lastElementChild.classList.add("none");
            $menu.classList.remove("is-active");
    })
})(document);


((d)=>{
    const $form = d.querySelector(".contact-form")
    const $loader = d.querySelector(".contact-form-loader")
    const $response = d.querySelector(".contact-modal-response")

    $form.addEventListener("submit",(e)=>{
        e.preventDefault();
        $loader.classList.remove("none");
        fetch("https://formsubmit.co/ajax/f5c55ca3d1eee46bc32cb5f4331c6b7d",{
            method:"POST",
            
            body: new FormData(e.target)
            // mode: "no-cors"
        })
        .then((res) => (res.ok ? res.json(): Promise.reject(res)))
        .then((json) => {
            console.log(json);
            
            location.hash = "#gracias";
            $form.reset();
        })
        .catch(err =>{
            console.log(err);
            let message = err.statusText || "Ocurrio un error al enviar, intenta nuevamente"
            $response.querySelector("h3").innerHTML = `Error ${err.status}: ${message}`;
            
        }).finally(()=>{
            $loader.classList.add("none");
            setTimeout(()=>{
                location.hash = "#close"
            },3000)
        });
    })
})(document);