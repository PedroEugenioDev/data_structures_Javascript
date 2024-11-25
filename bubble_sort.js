const arr = [5,2,8,1,3]

function bubble_sort(arr) {
    let aux
    for (let i = 0; i < arr.length; i++) {
        let swapped = false
        for (let j = 0; j < (arr.length - 1); j++) {
            console.log(arr)
            if (arr[j] > arr[j+1]){
                aux = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = aux
                swapped = true;
            }
        }
        if(swapped === false) break
    }
}

console.log(`Ordenando [${arr}]`);
bubble_sort(arr);
console.log(`Ordenado: [${arr}]`);
