const membersPlace = document.querySelector('.midContent')
const btnVillage = document.querySelectorAll('.villages img')

const btnShowMore = document.querySelector('.btnShowMore')



let serchMore = 9
let zero = 0

let nameVila 
async function requestApi(querry) {
    let response = await fetch (`https://narutoql.up.railway.app/graphql/?query=${querry}`)

    response = await response.json()
    return response.data
}


function main(vila) {
    const naruto = `{
        characters(filter: {village: "${vila}"})  {
         info{
           count
         }
         results {
           
           name
           age
           avatarSrc
           rank
           village
           
         }
       }
     }`

     requestApi(naruto).then(res => showVilageMembers(res))
}

function showVilageMembers(naruto){
    
    membersPlace.innerHTML = ''

    allCharacter = naruto.characters.results
    console.log(naruto)
    
    allCharacter.forEach((member, index) => {
        index = index < serchMore && index >= zero
        if(index == true){
          
          const memberInfo = document.createElement('div')
          memberInfo.classList.add('memberInfo')
          membersPlace.appendChild(memberInfo)

          const nome = document.createElement('p')
          nome.innerHTML =`NAME: ${member.name}`
          const age = document.createElement('p')
          age.innerHTML = `AGE: ${member.age}`
          const charImage = document.createElement('img')
          charImage.src = member.avatarSrc
          const rank = document.createElement('p')
          rank.innerHTML = `RANK: ${member.rank}`
          
          memberInfo.appendChild(charImage)
          memberInfo.appendChild(nome)
          memberInfo.appendChild(age)
          memberInfo.appendChild(rank)
          
        }
    });
}



  
 
const clickShowMore = function () {
  
  btnShowMore.addEventListener( 'click', async ()=>{
    
    serchMore +=  + 9
    zero += + 9
    console.log(serchMore)
    
    main(nameVila)
  })
}



  const vilageButtonPress = function(){

    btnVillage.forEach((vila) => {
      const atualVila = vila.alt
      vila.addEventListener('click', ()=>{
        serchMore = 9
        zero = 0
        nameVila = atualVila
        
        
  
       
        
        
        main(atualVila)
         
        
      })
         
    });
    
  }
  vilageButtonPress()
  clickShowMore()
  