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

    const getRightChild = () => {
        return rightChild;
    }

    const getLeftChild = () => {
        return leftChild;
    }
    
    const numberOfChildren = () => {
        if ((getLeftChild() === null) && (getRightChild() === null)) {
            return 0;
        } else if ((getLeftChild() === null) || (getRightChild() === null)){
            return 1;
        } else {
            return 2
        }
    }

    const getChild = () => {
        return getLeftChild() || getRightChild();
    }
    
    return {setLeftChild, setRightChild, getData, getLeftChild, getRightChild, numberOfChildren, getChild};
}

const tree = (array) => {

    const getRoot = () => {
        return root;
    }

    const _removeDuplicates = (array) => {
        return [...new Set(array)];

    }

    const _mergeSort = (array) => {

        let originalLength = array.length;
        if (originalLength === 1) return array;
    
        let rightArray = array.splice(Math.floor(originalLength/2))
        let leftArray = array.splice(0);
    
        let sortedLeft = _mergeSort(leftArray);
        let sortedRight = _mergeSort(rightArray);
    
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
    
    
        // console.log('\n\nsorted-left: ' + sortedLeft + '   sorted-right: ' + sortedRight + '\nsorted: ' + sortedArray);
    
        return sortedArray;   
        
    }

    const _prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node.getRightChild() !== null) {
          _prettyPrint(node.getRightChild(), `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.getData()}`);
        if (node.getLeftChild() !== null) {
          _prettyPrint(node.getLeftChild(), `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    const insertValue = (value) => {
        let currentNode = root;

        while(true){
            if (value > currentNode.getData()){

                if (currentNode.getRightChild() !== null){
                    currentNode = currentNode.getRightChild();
                } else {
                    const newNode = node(value);
                    currentNode.setRightChild(newNode);
                    return true;
                }
                
            } else if (value === currentNode.getData()){

                return false;

            } else if (value < currentNode.getData()){
                if (currentNode.getLeftChild() !== null){
                    currentNode = currentNode.getLeftChild();
                } else {
                    const newNode = node(value);
                    currentNode.setLeftChild(newNode);
                    return true;
                }
            }
        }
    }

    const _findReplacementNode = (node) => {
        let previousNode;
        let currentNode = node;
        const value = node.getData();

        while(true){
            
            if ( currentNode.getData() === value ){
                previousNode = currentNode;

                currentNode = currentNode.getRightChild();
                

            } else if ( currentNode.getData() > value ){
                if (currentNode.getLeftChild() !== null){

                    previousNode = currentNode;
                    currentNode = currentNode.getLeftChild();

                } else {
                    return [currentNode, previousNode];
                }
            }
        }

        return;
    }

    const find = (value) => {
        let currentNode = root;

        while(true){
            if (value > currentNode.getData()){

                if (currentNode.getRightChild() !== null){
                    currentNode = currentNode.getRightChild();
                } else {
                    return false;
                }
                
            } else if (value === currentNode.getData()){

                return currentNode;

            } else if (value < currentNode.getData()){
                if (currentNode.getLeftChild() !== null){
                    currentNode = currentNode.getLeftChild();
                } else {
                    return false;
                }
            }
        }

    }

    const deleteValue = (value) => {

        let previousNode;
        let currentNode = root;
        let isLeft;

        while(true){
            if (value > currentNode.getData()){

                if (currentNode.getRightChild() !== null){
                    previousNode = currentNode;
                    currentNode = currentNode.getRightChild();
                    isLeft = false;
                } else {
                    return;
                }

                
            } else if (value === currentNode.getData()){
                let children = currentNode.numberOfChildren();

                if ( children === 0 && isLeft){
                    previousNode.setLeftChild(null);
                    currentNode = null;

                } else if ( children === 0 && !isLeft){
                    previousNode.setRightChild(null);
                    currentNode = null;

                } else if ( children === 1 && isLeft) {
                    previousNode.setLeftChild(currentNode.getChild());

                } else if ( children === 1 && !isLeft) {
                    previousNode.setRightChild(currentNode.getChild());

                } else if (children === 2){

                    console.log('yooo')

                    const [replacementNode, preReplacementNode] = _findReplacementNode(currentNode);

                    console.log('yooo?')

                    if(preReplacementNode.getData() !== currentNode.getData()){
                        preReplacementNode.setLeftChild(replacementNode.getRightChild());
                    }
                    

                    if(isLeft){
                        previousNode.setLeftChild(replacementNode);
                    } else if(!isLeft){
                        previousNode.setRightChild(replacementNode);
                    }

                    replacementNode.setLeftChild(currentNode.getLeftChild());
                    replacementNode.setRightChild(currentNode.getRightChild());

                    currentNode = null;
                
                }

                _prettyPrint(root);

                return;

            } else if (value < currentNode.getData()){
                if (currentNode.getLeftChild() !== null){
                    previousNode = currentNode;
                    currentNode = currentNode.getLeftChild();
                    isLeft = true;
                } else {
                    return;
                }
            }
        }

    }

    const _buildTree = () => {

        function createBST(array, start, end){
            if (start > end) return null;

            let mid = Math.floor((start + end)/2);
            const root = node(array[mid]);

            root.setLeftChild(createBST(array, start, mid-1));
            root.setRightChild(createBST(array, mid+1, end));
            return root;
        }

        console.log('\noriginal array: ' + array);

        const uniqueArray = _removeDuplicates(array);

        console.log('\nunique array: ' + uniqueArray);

        const sortedArray =  _mergeSort(uniqueArray); 

        console.log('\nfinal sorted array: ' + sortedArray);

        let start =  0;
        let end = array.length - 1;

        const root = createBST(sortedArray, start, end);
        // console.log('\nroot: ' + root.getData());
        _prettyPrint(root);
        return root;

    }

    const root = _buildTree(array);


    const levelOrder = (action) => {
        
    }

    return {getRoot, deleteValue, insertValue, find};
}

const treeBoy = tree([4, 5, 1, 0, 98, 43, 2, 78, 13, 67, 126, 41, 61, 59, 13, 16, 90, 37]);
treeBoy.deleteValue(13);
// treeBoy.insertValue(29);