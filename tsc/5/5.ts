class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  private root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  search(value: number): boolean {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: TreeNode | null, value: number): boolean {
    if (node === null) {
      return false;
    }

    if (value === node.value) {
      return true;
    }

    if (value < node.value) {
      return this.searchNode(node.left, value);
    }

    return this.searchNode(node.right, value);
  }

  insert(value: number): void {
    this.root = this.insertNode(this.root, value);
  }

  private insertNode(node: TreeNode | null, value: number): TreeNode {
    if (node === null) {
      return new TreeNode(value);
    }

    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value);
    }

    return node;
  }

  remove(value: number): void {
    this.root = this.removeNode(this.root, value);
  }

  private removeNode(node: TreeNode | null, value: number): TreeNode | null {
    if (node === null) {
      return null;
    }

    if (value < node.value) {
      node.left = this.removeNode(node.left, value);
      return node;
    }

    if (value > node.value) {
      node.right = this.removeNode(node.right, value);
      return node;
    }

    if (node.left === null && node.right === null) {
      return null;
    }

    if (node.left === null) {
      return node.right;
    }

    if (node.right === null) {
      return node.left;
    }

    const minValue: number = this.findMin(node.right);
    node.value = minValue;
    node.right = this.removeNode(node.right, minValue);

    return node;
  }

  private findMin(node: TreeNode): number {
    if (node.left === null) {
      return node.value;
    }

    return this.findMin(node.left);
  }

  update(oldValue: number, newValue: number): boolean {
    if (!this.search(oldValue)) {
      return false;
    }

    if (oldValue !== newValue && this.search(newValue)) {
      return false;
    }

    this.remove(oldValue);
    this.insert(newValue);

    return true;
  }

  height(): number {
    return this.getHeight(this.root);
  }

  private getHeight(node: TreeNode | null): number {
    if (node === null) {
      return 0;
    }

    const leftHeight: number = this.getHeight(node.left);
    const rightHeight: number = this.getHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }
}

const tree: BinaryTree = new BinaryTree();

tree.insert(10);
tree.insert(5);
tree.insert(15);
tree.insert(3);
tree.insert(7);

console.log(tree.search(7));
console.log(tree.search(100));
console.log(tree.height());
tree.update(7, 8);
console.log(tree.search(7));
console.log(tree.search(8));
tree.remove(5);
console.log(tree.search(5));
console.log(tree.height());