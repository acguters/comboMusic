export interface leftMenuItem{
  id: number;
  title: string;
  subitems: leftMenuSubItem[];
  isSelected: boolean;
}

export interface leftMenuSubItem{
  id: number;
  title: string;
}
