import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  btnNewPet: {
    height: '20%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#095256',
    justifyContent: 'center',
  },
  item: {
    display: 'flex',
    backgroundColor: '#095256',
    padding: 10,
    minHeight: 150,
    flexDirection: 'row',
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  containerImageItem: {
    width: 100,
    justifyContent: 'center',
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  btnDates: {
    backgroundColor: '#338BF9',
    height: 40,
    width: 140,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAddText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  containerDates: {
    paddingLeft: 15,
    justifyContent: 'center',
  },
  btnEditRemove: {
    backgroundColor: 'transparent',
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  containerEditRemove: {
    flexDirection: 'row',
    paddingLeft: 15,
    alignItems: 'center',
  },
});
