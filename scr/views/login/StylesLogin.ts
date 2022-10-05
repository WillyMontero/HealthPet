import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  sectionContainer: {
    height: '100%',
    backgroundColor: '#338BF9',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '35%'
  },
  title: {
    fontSize: 24
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#095256',
    borderRadius: 4,
    justifyContent: 'center',
    height: 50,
    width: 250
  },
  btnText: {
    color: '#f3f3f3',
    fontWeight: 'bold',
  },
  inputField: {
    width: '80%',
    paddingTop: '5%'
  },
  input:{
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    color: '#959595'
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleInput: {
    paddingLeft: "3%"
  },
  btnConteiner: {
    paddingTop: '10%'
  },
  btnLink: {
    paddingTop: 10,
    textDecorationLine: 'underline'
  }
});
