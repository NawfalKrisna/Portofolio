const items =
document.querySelectorAll(".qa-item");

const observer =
new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target
            .classList
            .add("show");

        }

    });

},
{
    threshold:0.15
}

);

items.forEach(item=>{
    observer.observe(item);
});