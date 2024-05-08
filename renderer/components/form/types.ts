export interface ItemsComponentProps<T extends { id?: number; name: string }> {
  getAllItem: () => Promise<T[]>;
  addItem: (name: string) => Promise<number>;
  deleteItem: (id: number) => Promise<void>;
  updateItem: (id: number, name: string) => Promise<number>;
  label: string;
}
