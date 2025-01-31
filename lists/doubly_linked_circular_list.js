const inquirer = require('@inquirer/prompts');

class List {
  constructor(value = null) {
      this.value = value; 
      this.next = null;
      this.previous = null   
  }
}

let beginning = null
let ending = null
let aux = null

async function main(){
    let option
    do {
        console.clear()
        option = await inquirer.select({
            message: 'Choose an option:',
            choices: [
              {
                name: 'Insert at the beginning',
                value: '1',
              },
              {
                name: 'Insert at the ending',
                value: '2',
              },
              {
                name: 'Consult list from beginning to ending',
                value: '3',
              },
              {
                name: 'Consult list from ending to beginning',
                value: '4',
              },
              {
                name: 'Remove from list',
                value: '5',
              },
              {
                name: 'Clean list',
                value: '6',
              },
              {
                name: 'Exit',
                value: '7',
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
                    newElement.next = beginning
                    newElement.previous = beginning
                }else{
                    const newElement = new List(insertToBeginning)
                    newElement.next = beginning
                    beginning.previous = newElement
                    newElement.previous = ending
                    ending.next = newElement
                    beginning = newElement
                }
                break;
            case '2':
                console.clear()
                insertToEnding = await inquirer.input({ message: "Value: "})
                if(beginning===null){
                    let newElement = new List(insertToEnding)
                    beginning = newElement
                    ending = newElement
                    newElement.next = beginning
                    newElement.previous = beginning
                }else{
                    const newElement = new List(insertToEnding)
                    ending.next = newElement
                    newElement.previous = ending 
                    ending = newElement
                    ending.next = beginning
                    beginning.previous = ending
                }
                break;
            case '3':
                console.clear();
                if(beginning===null){
                    console.log("Empty List")
                    await inquirer.input({message: "Press any key to continue..."})
                }
                else{
                    aux = beginning
                    process.stdout.write('List:')
                    do{
                        process.stdout.write(` ${aux.value}`)
                        aux = aux.next
                    }while(aux!==beginning)
                    process.stdout.write('\n')
                    await inquirer.input({message: "Press any key to continue..."})
                }
                break;
            case '4':
                console.clear();
                if(beginning===null){
                    console.log("Empty List")
                    await inquirer.input({message: "Press any key to continue..."})
                }
                else{
                    aux = ending
                    process.stdout.write('List:')
                    do{
                        process.stdout.write(` ${aux.value}`)
                        aux = aux.previous
                    }while(aux !== ending)
                    process.stdout.write('\n')
                    await inquirer.input({message: "Press any key to continue..."})
                }
                break;
            case '5':
                console.clear();
                if(beginning === null){
                    console.log("Empty List")
                    await inquirer.input({message: "Press any key to continue..."})
                }
                else{
                  removeFromList = await inquirer.input({ message: "Value to remove: "})
                  console.log(`Removing ${removeFromList}...`)
                  aux = beginning
                  let quantity = 0
                  do {
                    quantity++
                    aux = aux.next
                  } while (aux!==beginning);
                  aux =  beginning
                  let found = 0
                  let element = 0
                  do {
                    if(beginning === ending){
                        beginning = null
                        ending = null
                        found++
                    }else if (aux.value === removeFromList) {
                      found++
                      if(aux === beginning){
                        beginning = aux.next
                        beginning.previous = ending
                        ending.next = beginning
                        aux = beginning
                      }else if(aux ===  ending){
                        ending = ending.previous
                        ending.next = beginning
                        beginning.previous = ending
                        aux = aux.next
                      }else{
                        aux.previous.next = aux.next
                        aux.next.previous = aux.previous
                        aux = aux.next
                      }
                    }else{
                      aux = aux.next
                    }
                    element++
                  }while(element <= quantity) 
                  if(found === 0){
                    console.log("Value not found")
                  }else{
                    console.log(`${found} items removed`)
                  }
                }
                break;
            case '6':
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
            case '7':
                console.log("Exiting...")
                break;     
            default:
                console.log("invalid option!")
        }    
    } while (option !== '7');
}

main()