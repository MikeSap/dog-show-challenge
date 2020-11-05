const dogTable = document.querySelector('#table-body')
const editForm = document.querySelector('#dog-form')


function main (){

    renderDogs()
    addEditListener()
}


function renderDogs(){
    fetch('http://localhost:3000/dogs')
        .then(resp => resp.json())
        .then(dogs => {
            dogs.forEach(dog => {                
                dogTable.innerHTML += renderDog(dog)
            })
        })
    
}

function renderDog(dog){
    return `<tr data-id=${dog.id}><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class='edit' data-id=${dog.id}>Edit</button></td></tr>`
}

function addEditListener(){
    dogTable.addEventListener('click', (e) => {
        e.preventDefault()
        if (e.target.className === 'edit'){
            editDog(e)
        } 
    })

    editForm.addEventListener('submit', (e) =>{
        e.preventDefault()        

        const dogData = {
            name: editForm.name.value,
            breed: editForm.breed.value,
            sex: editForm.sex.value
        }

        const reqObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dogData)
        }

        fetch(`http://localhost:3000/dogs/${editForm.dogId.value}`, reqObj)
        .then(resp => resp.json())
        .then(editedDog => {
            returnDog(editedDog)
            editForm.reset()
        })
    })
}

function editDog(e){
    let dogEntry = e.target.parentElement.parentElement.children
    let [dogName, dogBreed, dogSex] = dogEntry  
    
    editForm.name.value = dogName.innerText
    editForm.breed.value = dogBreed.innerText
    editForm.sex.value = dogSex.innerText
    editForm.dogId.value = e.target.dataset.id
}

function returnDog(dog){
    editedDogTable = dogTable.querySelector(`tr[data-id="${dog.id}"`).children    
    
    editedDogTable[0].innerText = dog.name
    editedDogTable[1].innerText = dog.breed
    editedDogTable[2].innerText = dog.sex
}

main()