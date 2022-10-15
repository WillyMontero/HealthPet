export interface Date {
  id: string;
  reason: string;
  date: string;
  medication: [string];
  FK_Record: number;
}

export interface InputDate {
  reason: string;
  date: string;
  medication: [string];
  FK_Record: number;
}
