
type Category = "-" | "+";

type Tag = {
    id: number;
    name: string;
    icon: string;
    category: Category;
};

type RecordItem = {
    tagIds: number[];
    note: string;
    category: "+" | "-";
    amount: number;
    createdDate: string; // ISO 8601
};