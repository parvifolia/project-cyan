// Selectors
const addItem = document.querySelectorAll(".add-item");


// Do actions for each drink section *Now just 2, but we can easily add more in future
addItem.forEach(section=>{

    ////// SELECTORS //////

    // Find out which section
    const sectionName = section.getAttribute('name');
    // Find the own hour list for each section
    const hourList = section.parentElement.parentElement.nextElementSibling.children[0];


    ////// GET LOCAL STORAGE //////

    // Check the local storage's day and if it is'nt today, clear the Local Storage
    const localDate = JSON.parse(localStorage.getItem('isToday'));
    // * dateFns isToday() function returns a boolean
    const isToday = dateFns.isToday(new Date(localDate));
    if (!isToday) {
        localStorage.clear()
    }

    // Check the hour list in the Local Storage
    const localHourList = JSON.parse(localStorage.getItem(sectionName));
    // Add hours to UI if there are any
    if (localHourList) {
        localHourList.forEach(hour=>{
            // Add this time to list
            const newLi = document.createElement('li');
            newLi.innerHTML = hour;
            hourList.appendChild(newLi);

            // Strikethrough except for last hour
            const innerList= hourList.children;

            for (let i = 0; i < innerList.length-1 ; i++) {
                innerList[i].classList.add('strikethrough');
            }
        })
    }
    // Add a message if there is no hour in the beginning
    else {
        if (sectionName === "left"){
        const newLi = document.createElement('li');
        newLi.setAttribute('name','first-text')
        newLi.innerHTML = `What a beautiful day!`;
        hourList.appendChild(newLi);
        }
        else if (sectionName === "right"){
            const newLi = document.createElement('li');
            newLi.setAttribute('name','first-text')
            newLi.innerHTML = `Lets meet the day with a drink!`;
            hourList.appendChild(newLi);
        }
    }

    

    ////// EVENT LISTENER for each ADD DRINK BUTTON //////

    section.addEventListener('click',e=>{

        // Remove the first messages in first cycle
        if (hourList.children[0].getAttribute('name') === 'first-text'){
            hourList.children[0].remove();
        }
        

        // Create new time & format as hour:minute via dateFns library
        const newTime = new Date();
        const newHour = dateFns.format(newTime,'HH:mm')
        
        // Add this time to list
        const newLi = document.createElement('li');
        newLi.innerHTML = newHour;
        hourList.appendChild(newLi);

        // Strikethrough except for last hour
        const innerList= hourList.children;

        for (let i = 0; i < innerList.length-1 ; i++) {
            innerList[i].classList.add('strikethrough');
        }

        ////// SET LOCAL STORAGE //////

        // Storage hours in an array
        const localList = []
        const currentList = Array.from(innerList);
        currentList.forEach(e=>{
            localList.push(e.innerHTML)
        })

        // Put them to Local Storage with the section name variable
        localStorage.setItem(sectionName,JSON.stringify(localList));

        // Put a timestamp for check day later
        localStorage.setItem('isToday',newTime.getTime())


        // Text Animation
        e.target.children[0].innerText = "Enjoy your drink!";
        e.target.classList.add('item-text-changed')

        setTimeout(() => {
            if(sectionName==='left'){
                e.target.children[0].innerText = "Coffee";
            } else if(sectionName==='right') {
                e.target.children[0].innerText = "Tea";
            }
            e.target.classList.remove('item-text-changed')
        }, 1500);



    })
})

//////////////////////////////////////////////////
/////////////////// ANIMATIONS ///////////////////
//////////////////////////////////////////////////

// Tilt Animation
const tilt = $('.add-item').tilt({
    glare: true,
    maxGlare: .3,
    scale: 1.15
});

// Opening Animation
gsap.from(".section-left", 1, {
    delay: 0.4,
    y: '-100%',
    ease: "power1.out",
});
gsap.from(".section-right", 1, {
    delay: 0.8,
    y: '-100%',
    ease: "power1.out",
});
gsap.from(".section-left .add-item", 1.6, {
    delay: 1.2,
    opacity: 0,
    y: -40,
    ease: Expo.easeInOut
});
gsap.from(".section-right .add-item", 1.6, {
    delay: 1.4,
    opacity: 0,
    y: -40,
    ease: Expo.easeInOut
});


gsap.from(".section-left .item-list", 1.6, {
    delay: 1.6,
    opacity: 0,
    y: -40,
    ease: Expo.easeInOut
});
gsap.from(".section-right .item-list", 1.6, {
    delay: 1.8,
    opacity: 0,
    y: -40,
    ease: Expo.easeInOut
});
