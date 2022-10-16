import firestore from '@react-native-firebase/firestore';
import {InputDate, Date as TypeDate} from '../../interface';

const Date = () => {
  const dateRef = firestore().collection('Date');

  const addNewDate = (date: InputDate) => {
    try {
      dateRef.add(date).then(() => {
        return true;
      });
    } catch (error) {
      return false;
    }
  };

  const updateDate = async (dataDate: TypeDate) =>
    await dateRef.doc(dataDate.id).set(dataDate);

  const deleteDate = async (dateId: string) => {
    return await dateRef
      .doc(dateId)
      .delete()
      .then(() => true)
      .catch(() => false);
  };

  const getDates = async (userId: string) => {
    const data: TypeDate[] = [];
    const dateData = await dateRef.doc(userId).get();
    console.log(dateData);
    return data;
  };

  return {addNewDate, deleteDate, getDates, updateDate};
};

export default Date;
