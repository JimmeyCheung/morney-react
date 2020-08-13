
type Category = "-" | "+";

type Tag = {
    id: number;
    name: string;
    icon: string;
    category: Category;
};
type RecordItem = {
    id: number;
    tagIds: number[];
    note: string;
    category: "+" | "-";
    amount: number;
    createdDate: string; // ISO 8601
};
type ChartData = {
    xAxis: string[];
    series: Sery[] | undefined;
    totalAmount: number;
    averageAmount: number;
}
type Sery = { name: string; value: number }