const arr = [1,2,4,3,5]

function bubble_sort(arr) {
    let aux
    for (let i = 0; i < arr.length; i++) {
        let swapped = false
        for (let j = 0; j < (arr.length - (i+1)); j++) {
            if (arr[j] > arr[j+1]){
                aux = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = aux
                swapped = true
            }
        }
        if(!swapped){
            break;
        }
    }
}

console.log(`Ordenando [${arr}]`);
bubble_sort(arr);
console.log(`Ordenado: [${arr}]`);
