import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  sectionContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202020',
  },
  Container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '35%',
  },
  title: {
    fontSize: 24,
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#338BF9',
    borderRadius: 4,
    justifyContent: 'center',
    height: 50,
    width: 250,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  inputField: {
    width: '80%',
    paddingTop: '5%',
  },
  input: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    color: '#959595',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleInput: {
    paddingLeft: '3%',
    color: '#FFFFFF',
  },
  btnConteiner: {
    paddingTop: '5%',
  },
  btnLink: {
    paddingTop: 10,
    textDecorationLine: 'underline',
  },
  btnDate: {
    width: '100%',
    height: 45,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  btnDateText: {
    color: '#959595',
    marginLeft: 5,
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
    marginBottom: 10,
  },
  btnDatesDelete: {
    backgroundColor: '#f93e33',
    height: 40,
    width: 140,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnAddText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginTop: 15,
  },
  newItem: {
    display: 'flex',
    backgroundColor: 'transparent',
    minHeight: 150,
    flexDirection: 'row',
  },
  btnAdd: {
    backgroundColor: '#1c1c1c',
    height: 135,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    maxWidth: 180,
  },
});
