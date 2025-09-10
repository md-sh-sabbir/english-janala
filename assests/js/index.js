const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all') // promise for response
        .then(res => res.json()) // promise of json data
        .then(json => displayLessons(json.data))
}

const removeActive = () => {
    const lesseonButtons = document.querySelectorAll('.lesson-btn')
    // console.log(lesseonButtons)
    lesseonButtons.forEach(btn => {
        btn.classList.remove('bg-[#422AD5]', 'text-white')
    })
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive() // remove all active class
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        // console.log(clickBtn)
        clickBtn.classList.add('bg-[#422AD5]', 'text-white') // add active class
        displayLevelWord(data.data)
    })
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = ''

    if(words.length == 0){
        wordContainer.innerHTML = `
             <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-[Hind_Siliguri]">
                    <img src="assests/images/alert-error.png" alt="" class="mx-auto">
                    <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
            </div>
        `
        return
    }

    words.forEach(word => {
        // console.log(word)
        const card = document.createElement('div')
        card.innerHTML = `<div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
                <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
                <p class="font-semibold">Meaning / Pronounciation</p>
                <div class="font-[Hind_Siliguri]">
                    <h2 class="text-2xl font-medium text-gray-600">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}"</h2>
                </div>
                <div class="flex justify-between items-center">
                    <button onclick="my_modal_5.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] text-[#374957]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] text-[#374957]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>`

        wordContainer.appendChild(card)
    })
}

const displayLessons = (lessons) => {
    // 1. get the container & empty
    const levelContainer = document.getElementById('level-container')
    levelContainer.innerHTML = ''

    // 2. get into every lessons
    lessons.forEach(lesson => {

        // 3. create elements
        const btnDiv = document.createElement('div')
        btnDiv.innerHTML = `<button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
                            </button>`

        // 4. append into container
        levelContainer.appendChild(btnDiv)
    })
}

loadLessons()
