export class Product {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;

  constructor(id: number, name: string, categoryId: number, categoryName: string) {
    this.id = id;
    this.name = name;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
  }
}
