$('.small-image img').click(function(){

    $(this).addClass('image-active').siblings().removeClass('image-active');
    $(this).addClass('zoom').siblings().removeClass('zoom');

    let image = $(this).attr('src');
    let zoomattr = $(this).attr('data-zoom-image');

    $('.big-image img').attr('src',image)
    $('.big-image img').attr('data-zoom-image',zoomattr)

})


let modelBtn = document.querySelector('.modal-btn')
let modelBg = document.querySelector('.model-bg')
let modelClose = document.querySelector('.modal-close')

modelBtn.addEventListener('click',function(){
    modelBg.classList.add('bg-activate')
})

modelClose.addEventListener('click',function(){
    modelBg.classList.remove('bg-activate')
})