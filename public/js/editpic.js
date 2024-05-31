const imageLoader = document.querySelector('#article-pic'),
img = new Image(),
reader = new FileReader(),
canvas = document.querySelector('#canvas1'),
ctx = canvas.getContext('2d'),
widthInput = document.querySelector('.imgWidth input'),
heightInput = document.querySelector('.imgHeight input'),
picname = document.querySelector('.picname input'),
sliderInput = document.querySelector('.sliderWidth input')

let origImgRatio 

imageLoader.addEventListener('change', (e)=>{
    reader.readAsDataURL(e.target.files[0])
    console.log(e.target.files[0].name)
    reader.onload = ()=>{
        
       img.src = reader.result
        
       img.onload = () =>{
          canvas.width =img.width
          canvas.height =img.height
            
          widthInput.value =img.width
          heightInput.value =img.height
          sliderInput.max = img.width

          origImgRatio = img.width / img.height

          picname.value= e.target.files[0].name
            
           ctx.drawImage(img,0,0)
             
         }
     }
})


sliderInput.addEventListener('change', ()=>{
    widthInput.value = sliderInput.value 

    const height = widthInput.value/origImgRatio 
    
    heightInput.value = Math.floor(height)
resize()
    })

widthInput.addEventListener('keyup', ()=>{
    const height = widthInput.value/origImgRatio 
    
    heightInput.value = Math.floor(height)
resize()
   
    })


   function resize(){
        canvas.width = widthInput.value
        canvas.height = heightInput.value

        ctx.drawImage(img,0,0, canvas.width, canvas.height)
    }
