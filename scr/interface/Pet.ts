export interface Pet {
  id: string;
  name: string;
  petType: string;
  race: string;
  email: string;
  bornDate: Date;
  weight: string;
  bloodType: string;
}

export interface InputPet {
  name: string;
  petType: string;
  race: string;
  email: string;
  bornDate: Date;
  weight: string;
  bloodType: string;
  FK_User: string;
}
