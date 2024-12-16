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
                name: 'Consult list',
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
                    newElement.next = beginning
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
                }else{
                    const newElement = new List(insertToEnding)
                    ending.next = newElement
                    ending = newElement
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
                    while(aux!==null){
                      process.stdout.write(` ${aux.value}`)
                      aux = aux.next
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
                  let previous = null
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