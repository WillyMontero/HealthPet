import firestore from '@react-native-firebase/firestore';
import {InputDate, Date as TypeDate} from '../../interface';

const Date = () => {
  const dateRef = firestore().collection('Date');

  const addNewDate = (date: InputDate) => {
    try {
      return dateRef.add(date).then(response => {
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

  const getAllDates = async (FK_Pet: string) => {
    const data: any[] = [];
    await dateRef
      .where('FK_Pet', '==', FK_Pet)
      .get()
      .then(snapShot => {
        if (snapShot.empty) {
          console.log('F');
        } else {
          snapShot.docs.forEach(doc => {
            const newObj = {
              id: doc.id,
              FK_Pet: doc.get('FK_User'),
              date: doc.get('date'),
              medication: doc.get('medication'),
              reason: doc.get('reason'),
              title: doc.get('title'),
            };
            data.push(newObj);
          });
        }
      });
    return data;
  };

  return {addNewDate, deleteDate, getDates, updateDate, getAllDates};
};

export default Date;
