const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all') // promise for response
        .then(res => res.json()) // promise of json data
        .then(json => displayLessons(json.data))
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayLevelWord(data.data))
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container')
    // wordContainer.innerHTML = ''

    words.forEach(word => {
        // console.log(word)
        const card = document.createElement('div')
        card.innerHTML = `<p> Cat </p>`

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
        btnDiv.innerHTML = `<button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
                            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
                            </button>`

        // 4. append into container
        levelContainer.appendChild(btnDiv)
    })
}

loadLessons()
