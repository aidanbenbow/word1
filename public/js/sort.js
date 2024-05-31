const list = document.querySelector('.draggable-list'),
checkBtn = document.querySelector('.check-btn'),

orderList = [
'first',
'second',
'third',
'fourth',
'fifth',
'sixth',
'seventh',
'eigth',
'ninth',
'tenth',
],

listItems = []

let dragStartIndex 



createList()

function createList(){
    [...orderList]
    .map(a=>({val:a, sort:Math.random()}))
    .sort((a,b)=> a.sort - b.sort)
    .map(a=>a.val)
    .forEach((order, index)=>{
        const listItem = document.createElement('li')
        listItem.setAttribute('data-index', index)

        listItem.innerHTML = `
        
        <span class="number">${index+1}</span>
        <div class="draggable" draggable="true">
            <p class="person-name">${order}</p>
        </div>
   
        `

        listItems.push(listItem)

        list.append(listItem)

    })

    addEventListeners()
}

function dragStart(){
    //console.log('start')
    dragStartIndex = this.closest('li').getAttribute('data-index')
    
    console.log(dragStartIndex)
     
    
}

function dragEnter(){
    
   this.classList.add('over')
    
    
}

function dragLeave(){
    
   this.classList.remove('over')
}

function dragOver(e){
    e.preventDefault()
   // console.log('Over')
}

function dragDrop(){
   // console.log('Drop')
   const dragEndIndex = +this.getAttribute('data-index')

    swapItems(dragStartIndex, dragEndIndex)

    this.classList.remove('over')
   
}

function swapItems(fromIndex, toIndex){
    const itemOne = listItems[fromIndex].querySelector('.draggable'),
    itemTwo = listItems[toIndex].querySelector('.draggable')

    listItems[fromIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)
}

function addEventListeners(){
    const draggables = document.querySelectorAll('.draggable'),
    dragListItems = document.querySelectorAll('.draggable-list li')

    draggables.forEach(draaggable =>{
        draaggable.addEventListener('dragstart', dragStart)
    })

    dragListItems.forEach(item =>{
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })

}

function checkOrder(){
    listItems.forEach((item, index)=>{
const name = item.querySelector('.draggable').innerText.trim()

if(name !== orderList[index]){
    item.classList.add('wrong')
} else{
    item.classList.remove('wrong')
    item.classList.add('right')
}
    })
}

checkBtn.addEventListener('click', checkOrder)