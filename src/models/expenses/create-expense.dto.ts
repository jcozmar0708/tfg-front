export interface CreateExpenseDto {
  groupUUID: string;
  title: string;
  amount: number;
  participants: string[];
}
