export interface IBaseColumn {
  title: string;
  order: number;
}

export interface IColumn extends IBaseColumn {
  id: string;
}
