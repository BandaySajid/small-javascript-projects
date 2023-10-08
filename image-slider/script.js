const left = document.querySelector('.left');
const right = document.querySelector('.right');
const slider = document.querySelector('.slider');
const buttons = document.querySelector('.buttons');

let current_slide = 0;

const getFirstSlide = () => {
    slider.style.transform = `translateX(0px)`;
};

const getLastSlide = () => {
    slider.style.transform = `translateX(-${500 * (slider.children.length - 1)}px)`;
};

const getCurrentSlide = () => {
    slider.style.transform = `translateX(-${500 * current_slide}px)`;
};

const update_slider_button = ()=>{
    buttons.children[current_slide].classList.add('active-btn')
    for(const node of buttons.children){
        if(node !== buttons.children[current_slide]){
            node.classList.remove('active-btn')
        }
    }
};

for(i = 0; i<slider.children.length; i++){
    const btn = document.createElement('button');
    i === 0 && btn.classList.add('active-btn')
    btn.setAttribute('index', i);
    btn.addEventListener('click', ()=>{
        current_slide = Number(btn.getAttribute('index'))
        getCurrentSlide();
        update_slider_button()
    });
    buttons.appendChild(btn);
};


const prevSlide = ()=>{

    if(current_slide <= 0){
        getLastSlide();
        current_slide = slider.children.length - 1;
        return;
    }
    current_slide --;
    getCurrentSlide();
};

const nextSlide = ()=>{
    if(current_slide >= slider.children.length - 1){
        getFirstSlide();
        current_slide = 0;
        return;
    };
    current_slide++;
    getCurrentSlide()
}

right.addEventListener('click', () => {
    nextSlide();
    update_slider_button()
});

left.addEventListener('click', () => {
    prevSlide();
    update_slider_button()
});