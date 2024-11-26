const arr = [1,2,5,4,3]

function selection_sort(arr) {
    let i, j
    for (i = 0; i < (arr.length - 1); i++) {
        let elemento = arr[i]
        let menor = arr[i+1]
        let pos = i
        for (j = i+1; j < arr.length; j++) {
            if(arr[j]<menor){
                menor = arr[j]
                pos = j
            }
        }
        if(menor<elemento){
            arr[pos]=elemento
            arr[i]=menor
        }
    }
}

console.log(`Ordenando [${arr}]`);
selection_sort(arr);
console.log(`Ordenado: [${arr}]`);