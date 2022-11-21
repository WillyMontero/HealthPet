export interface Dates {
  id: string;
  title: string;
  reason: string;
  date: Date;
  medication: string;
  FK_Pet: string;
}

export interface InputDates {
  title: string;
  reason: string;
  date: Date;
  medication: string;
  FK_Pet: string;
}
