import firestore from '@react-native-firebase/firestore';
import {InputRecord, Record as TypeRecord} from '../../interface';

const Record = () => {
  const recordRef = firestore().collection('Record');

  const addNewRecord = (record: InputRecord) => {
    try {
      recordRef.add(record).then(() => {
        return true;
      });
    } catch (error) {
      return false;
    }
  };

  const updateRecord = async (dataRecord: TypeRecord) =>
    await recordRef.doc(dataRecord.id).set(dataRecord);

  const deleteRecord = async (recordId: string) => {
    return await recordRef
      .doc(recordId)
      .delete()
      .then(() => true)
      .catch(() => false);
  };

  const getRecords = async (userId: string) => {
    const data: TypeRecord[] = [];
    const recordData = await recordRef.doc(userId).get();
    console.log(recordData);
    return data;
  };

  return {addNewRecord, deleteRecord, getRecords, updateRecord};
};

export default Record;
