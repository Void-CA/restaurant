export type Table = {
  id: number;
  table_number: number;
  status: "available" | "occupied" | "reserved" | "cleaning";
};
