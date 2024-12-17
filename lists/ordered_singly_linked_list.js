const inquirer = require('@inquirer/prompts');

class List {
  constructor(value = null) {
      this.value = value; 
      this.next = null;   
  }
}

let beginning = null
let ending = null
let aux = null
let previous = null

async function main(){
    let option
    do {
        console.clear()
        option = await inquirer.select({
            message: 'Choose an option:',
            choices: [
              {
                name: 'Insert at list',
                value: '1',
              },
              {
                name: 'Consult list',
                value: '2',
              },
              {
                name: 'Remove from list',
                value: '3',
              },
              {
                name: 'Clean list',
                value: '4',
              },
              {
                name: 'Exit',
                value: '5',
              },
            ],
          });
        switch (option) {
            case '1':
                console.clear()
                const insertToBeginning = await inquirer.input({ message: "Value: "})
                if(beginning===null){
                    let newElement = new List(insertToBeginning)
                    beginning = newElement
                    ending = newElement
                }else{
                    const newElement = new List(insertToBeginning)
                    aux = beginning
                    previous = null
                    while((aux !== null) && (newElement.value > aux.value)){
                        previous = aux
                        aux = aux.next
                    }
                    if(previous === null){
                        newElement.next = beginning
                        beginning = newElement
                    }else if( aux === null ){
                        ending.next = newElement
                        ending = newElement
                    }else{
                        previous.next = newElement
                        newElement.next = aux
                    }
                }
                break;
            case '2':
                console.clear();
                if(beginning===null){
                    console.log("Empty List")
                    await inquirer.input({message: "Press any key to continue..."})
                }
                else{
                    aux = beginning
                    process.stdout.write('List:')
                    while(aux!==null){
                      process.stdout.write(` ${aux.value}`)
                      aux = aux.next
                    }
                    process.stdout.write('\n')
                    await inquirer.input({message: "Press any key to continue..."})
                }
                break;
            case '3':
                console.clear();
                if(beginning === null){
                    console.log("Empty List")
                    await inquirer.input({message: "Press any key to continue..."})
                }
                else{
                  removeFromList = await inquirer.input({ message: "Value to remove: "})
                  console.log(`Removing ${removeFromList}...`)
                  aux = beginning
                  previous = null
                  let found = 0
                  while (aux !== null) {
                    if (aux.value === removeFromList) {
                      found++
                      if(aux === beginning){
                        beginning = aux.next
                        aux = beginning
                      }else if(aux ===  ending){
                        previous.next = null
                        ending = previous
                        aux = null
                      }else{
                        previous.next = aux.next
                        aux = aux.next
                      }
                    }else{
                      previous = aux
                      aux = aux.next
                    }
                  }
                  if(found === 0){
                    console.log("Value not found")
                  }else{
                    console.log(`${found} items removed`)
                  }
                }
                break;
            case '4':
                console.clear();
                if(beginning===null){
                    console.log("Empty List")
                    await inquirer.input({message: "Press any key to continue..."})
                }
                else{
                    beginning = null
                    ending = null
                }
                break;   
            case '5':
                console.log("Exiting...")
                break;     
            default:
                console.log("invalid option!")
        }    
    } while (option !== '5');
}

main()