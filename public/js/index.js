$('.small-image1 img').click(function(){

    $(this).addClass('image-active1').siblings().removeClass('image-active1');

    let image = $(this).attr('src');

    $('.big-image1 img').attr('src',image)

})

$('.small-image2 img').click(function(){

    $(this).addClass('image-active2').siblings().removeClass('image-active2');

    let image = $(this).attr('src');

    $('.big-image2 img').attr('src',image)

})

$('.small-image3 img').click(function(){

    $(this).addClass('image-active3').siblings().removeClass('image-active3');

    let image = $(this).attr('src');

    $('.big-image3 img').attr('src',image)

})

$('.small-image4 img').click(function(){

    $(this).addClass('image-active4').siblings().removeClass('image-active4');

    let image = $(this).attr('src');

    $('.big-image4 img').attr('src',image)

})

$('.small-image5 img').click(function(){

    $(this).addClass('image-active5').siblings().removeClass('image-active5');

    let image = $(this).attr('src');

    $('.big-image5 img').attr('src',image)

})
// --------------------------------------------------------------------------------------

$('.gallery .btn').click(function(){
    let filter = $(this).attr('data-filter')
    if(filter == 'all'){
        $('.gallery .box').show(400)
    }else{
        $('.gallery .box').not('.'+filter).hide(200);
        $('.gallery .box').filter('.'+filter).show(200);
    }


    $(this).addClass('button-active').siblings().removeClass('button-active');
})

$('.feature-slider').owlCarousel({
    items:1,
    nav:true,
    dots:false,
    autoplay:true,
    autoplayTimeout:5000,
    loop:true
});
