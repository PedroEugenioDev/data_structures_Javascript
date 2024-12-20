function merge_sort(arr) {
    if(arr.length <= 1){
        return arr
    }

    let middle = Math.floor(arr.length/2)
    let left = arr.slice(0, middle)
    let right = arr.slice(middle)
    
    let leftOrdered = merge_sort(left)
    let rightOrdered = merge_sort(right)

    let sorted = merge(leftOrdered,rightOrdered)
    return sorted
} 

function merge(left, right){
    let rightPosition = 0
    let leftPosition = 0
    let sorted = []

    while((leftPosition < left.length) && (rightPosition < right.length)){
        if(left[leftPosition] <= right[rightPosition]){
            sorted.push(left[leftPosition])
            leftPosition += 1
        }else{
            sorted.push(right[rightPosition])
            rightPosition += 1
        }
    }

    while(leftPosition<left.length){
        sorted.push(left[leftPosition])
        leftPosition += 1
    }

    while(rightPosition<right.length){
        sorted.push(right[rightPosition])
        rightPosition += 1
    }

   return sorted
}

data = [8,2,4,3,6,7,5,1,1,2,3,9,8,7,7,7]
console.log(`Ordenando [${data}]`)
sorted_data = merge_sort(data)
console.log(`Ordenado: [${sorted_data}]`)