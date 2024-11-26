const arr = [5,4,3,2,1]

function insert_sort(arr) {
    let i, j
    for (i = 1; i < (arr.length); i++) {
        let element = arr[i]
        j = i-1
        while((j >= 0) && (arr[j] > element)) {
            arr[j+1] = arr[j] 
            j--
        }
        arr[j+1] = element
    }
}

console.log(`Ordenando [${arr}]`);
insert_sort(arr);
console.log(`Ordenado: [${arr}]`);