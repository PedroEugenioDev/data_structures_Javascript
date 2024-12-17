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
                name: 'Insert at list',
                value: '1',
              },
              {
                name: 'Consult list from beginning to ending',
                value: '2',
              },
              {
                name: 'Consult list from ending to beginning',
                value: '3',
              },
              {
                name: 'Remove from list',
                value: '4',
              },
              {
                name: 'Clean list',
                value: '5',
              },
              {
                name: 'Exit',
                value: '6',
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
                    while((aux !== null && (newElement.value > aux.value))){
                        aux = aux.next
                    }
                    if(aux === beginning){
                        newElement.next = beginning
                        beginning.previous = newElement
                        beginning = newElement
                    }else if(aux === null){
                        newElement.previous = ending
                        ending.next = newElement
                        ending = newElement
                    }else{
                        newElement.next = aux
                        newElement.previous = aux.previous
                        aux.previous.next = newElement
                        aux.previous = newElement
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
                if(beginning===null){
                    console.log("Empty List")
                    await inquirer.input({message: "Press any key to continue..."})
                }
                else{
                    aux = ending
                    process.stdout.write('List:')
                    while(aux!==null){
                        process.stdout.write(` ${aux.value}`)
                        aux = aux.previous
                    }
                    process.stdout.write('\n')
                    await inquirer.input({message: "Press any key to continue..."})
                }
                break;
            case '4':
                console.clear();
                if(beginning === null){
                    console.log("Empty List")
                    await inquirer.input({message: "Press any key to continue..."})
                }
                else{
                  removeFromList = await inquirer.input({ message: "Value to remove: "})
                  console.log(`Removing ${removeFromList}...`)
                  aux = beginning
                  let found = 0
                  while (aux !== null) {
                    if (aux.value === removeFromList) {
                      found++
                      if(aux === beginning){
                        beginning = aux.next
                        if(beginning === null){
                            beginning.previous = null
                        }
                        aux = beginning
                      }else if(aux ===  ending){
                        ending = aux.previous
                        ending.next = null
                        aux = null
                      }else{
                        aux.previous.next = aux.next
                        aux.next.previous = aux.previous
                        aux = aux.next
                      }
                    }else{
                      aux = aux.next
                    }
                  }
                  if(found === 0){
                    console.log("Value not found")
                  }else{
                    console.log(`${found} items removed`)
                  }
                  await inquirer.input({message: "Press any key to continue..."})
                }
                break;
            case '5':
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
            case '6':
                console.log("Exiting...")
                break;     
            default:
                console.log("invalid option!")
        }    
    } while (option !== '6');
}

main()