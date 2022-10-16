export interface Record {
  id: string;
  FK_Vet: string;
  FK_Pet: string;
  FK_User: string;
}

export interface InputRecord {
  FK_Vet: string;
  FK_Pet: string;
  FK_User: string;
}
