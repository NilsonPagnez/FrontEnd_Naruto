const membersPlace = document.querySelector('.midContent')
const btnVillage = document.querySelectorAll('.villages img')
const clanMemberDiv = document.querySelector('.left')

const btnShowMore = document.querySelector('.btnShowMore')
const btnShowLess = document.querySelector('.btnShowLess')



let serchMore = 9
let searchMoreLimiter = 0

let page = 1

let nameVila 


async function requestApi(querry) {
    let response = await fetch (`https://narutoql.up.railway.app/graphql/?query=${querry}`)

    response = await response.json()
    return response.data
}


function main(vila , pagina = 1) {
    const naruto = `{
        characters(filter: {village: "${vila}"} page: ${pagina})  {
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
    
    allCharacter.forEach((member, index) => {
        index = index < serchMore && index >= searchMoreLimiter
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



  
 
const clickShowMoreLess = function () {
  
  btnShowMore.addEventListener( 'click', async ()=>{
    
    serchMore +=  + 9
    searchMoreLimiter += + 9
    
    console.log(serchMore)
    if(serchMore == 54){
      page += 1
      serchMore = 9
      searchMoreLimiter = 0
     
    }
    main(nameVila, page)
  })
  btnShowLess.addEventListener( 'click', async ()=>{
    if(serchMore == 9 && searchMoreLimiter == 0 && page !==1){
      
      serchMore = 45
      searchMoreLimiter = 36
      page += -1
      main(nameVila, page)
      
    }else if(serchMore == 9 && searchMoreLimiter == 0 && page ==1){

    }else{

      serchMore +=  - 9
      searchMoreLimiter += - 9
      main(nameVila, page)
    }
    
   
    
  })
}



  const vilageButtonPress = function(){

    btnVillage.forEach((vila) => {
      const atualVila = vila.alt
      vila.addEventListener('click',async ()=>{
        
        page = 1
        
        serchMore = 9
        searchMoreLimiter = 0
        nameVila = atualVila
        
        clanMemberDiv.innerHTML= ''

        const memberImage = document.createElement('img')
        memberImage.classList.add('clanMemberLeft')
        memberImage.src = ' '
        clanMemberDiv.appendChild(memberImage)

        await main(atualVila, page)
        btnShowMore.style.display ='block'
        btnShowLess.style.display ='block'
        memberImage.src =`image/${atualVila}-image.png`
        memberImage.style.filter = `drop-shadow(1rem 0 0.8rem var(--${atualVila}))`;
        
      })
         
    });
    
  }
  vilageButtonPress()
  clickShowMoreLess()
 