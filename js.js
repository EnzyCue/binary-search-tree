const node = (data, leftChild = null, rightChild = null) => {
    
    const getData = () => {
        return data;
    }

    const setLeftChild = (childNode) => {
        leftChild = childNode;
    }

    const setRightChild = (childNode) => {
        rightChild = childNode;
    }
    
    return {setLeftChild, setRightChild, getData};
}

const tree = (array) => {
    let root;

    const getRoot = () => {
        return root;
    }

    const setRoot = (newRoot) => {
        return root;
    }


    const buildTree = (array) => {
        // builds a binary search tree for the input array
        const uniqueArray = this._removeDuplicates(array);

        const sortedArray =  this._mergeSort(array);

        
        

    }


    const _removeDuplicates = (array) => {
        // removes duplicated from array of elements.
        return [...new Set(array)];

    }

    const _mergeSort = (array) => {
        // sorts array fo elements and returns the sorted array,

        let originalLength = array.length;
        if (originalLength === 1) return array;
    
        let rightArray = array.splice(Math.floor(originalLength/2))
        let leftArray = array.splice(0);
    
        let sortedLeft = this._mergeSort(leftArray);
        let sortedRight = this._mergeSort(rightArray);
    
        let sortedArray = [];
    
        let i = 0;
        let j = 0;
    
        while(true){
            
            if (i === sortedRight.length) {
                sortedArray = sortedArray.concat(sortedLeft.splice(j));
                break;
            } else if (j === sortedLeft.length) {
                sortedArray = sortedArray.concat(sortedRight.splice(i));
                break;        
            }
    
            if (sortedRight[i] < sortedLeft[j]) {
                sortedArray.push(sortedRight[i]);
                i++;
                
            } else {
                sortedArray.push(sortedLeft[j]);
                j++;
            }
        }
    
    
        console.log('\n\nsorted-left: ' + sortedLeft + '   sorted-right: ' + sortedRight + '\nsorted: ' + sortedArray);
    
        return sortedArray;   
        
    }



    return {setLeftChild, setRightChild, getData};
}