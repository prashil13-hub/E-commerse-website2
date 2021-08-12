let image = $('.birthdayImg')
let profileImg = document.querySelector('.profileUserImg');

// function toggleMenu(){
//     let toggle = document.querySelector('.toggle');
//     let navigation = document.querySelector('.navigation');
//     toggle.classList.toggle('active');
//     navigation.classList.toggle('active');
// }

let index=0;

let addImgs = [
    {
        img:"https://images.unsplash.com/photo-1604334782192-a7a3e4f48bac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
    },
    {
        img:"https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfEo5eXJQYUhYUlFZfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
    },
    {
        img:"https://images.unsplash.com/photo-1504890195358-94a018166410?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGRyb25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
    },
    {
        img:"https://images.unsplash.com/photo-1549206464-82c129240d11?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjR8fGhlYWRwaG9uZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
    },
    {
        img:"https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTN8fHNob2VzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
    },
    {
        img:"https://images.unsplash.com/photo-1518131672697-613becd4fab5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHdhdGNofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
    },
    {
        img:"https://images.unsplash.com/photo-1567593179124-7835e19fe1e2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3BlYWNrZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
    },
    {
        img:"https://images.unsplash.com/photo-1574974409771-cebec54deb00?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHRlbGV2aXNpb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
    }
]

setInterval(() => {

    if(index == 0){
        image.attr('src',`${addImgs[0].img}`)
        index++;
    }else if(index == 1){
        image.attr('src',`${addImgs[1].img}`)
        index++;
    }else if (index == 2){
        image.attr('src',`${addImgs[2].img}`)
        index++;
    }else if(index == 3){
        image.attr('src',`${addImgs[3].img}`)
        index++;
    }else if(index == 4){
        image.attr('src',`${addImgs[4].img}`)
        index++;
    }else if(index == 5){
        image.attr('src',`${addImgs[5].img}`)
        index++;
    }else if(index == 6){
        image.attr('src',`${addImgs[6].img}`)
        index++;
    }else{
        image.attr('src',`${addImgs[7].img}`)
        index=0;
    }

},3500);

