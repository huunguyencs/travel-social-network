import { makeStyles } from '@material-ui/core';
import attr from './attr';
import color from './color';

const formStyles = makeStyles(theme => ({
  addLocationContainer: {
    // borderRadius: attr.borderRadius.md,
    // padding: 20,
    // margin: 20,
    width: '100%'
  },
  paperContainer: {
    padding: 10,
    width: 550,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: attr.borderRadius.md,
    [theme.breakpoints.down('sm')]: {
      padding: 10,
      width: 400
    }
  },
  formContainer: {
    padding: 30
  },
  textTitle: {
    display: 'flex',
    justifyContent: 'center'
  },
  formAction: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    // width: "100%",
    backgroundColor: color.turquoise,
    padding: 10,
    paddingInline: 20,
    marginBlock: 15,
    borderRadius: attr.borderRadius.md,
    [theme.breakpoints.down('sm')]: {
      padding: 5,
      paddingInline: 10,
      marginBlock: 10
    }
  },
  hashtag: {
    width: '100%',
    marginBottom: 15
  },
  postContentInput: {
    width: '100%'
    // [theme.breakpoints.down("sm")]: {
    //     width: "300px"
    // }
  },
  input: {
    backgroundColor: color.lightgray,
    width: '100%',
    padding: 15,
    borderRadius: attr.borderRadius.md,
    marginBottom: 20
  },
  formCreateReview: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20
  },
  addLocationForm: {
    textAlign: 'center',
    padding: 20
  },
  addFormContainer: {
    paddingBottom: 30
  },
  addLocationSubmit: {
    margin: 20,
    paddingInline: 30,
    backgroundColor: color.turquoise
  },
  datepicker: {
    display: 'flex',
    justifyContent: 'center',
    // marginInline: 50,
    marginBottom: 30
  },
  tourNameInput: {
    width: '100%',
    marginBottom: 20
  },
  center: {
    display: 'flex',
    justifyContent: 'center'
  },
  autocomplete: {
    width: 400,
    marginTop: 20,
    marginInline: 20
  },
  imageInputContainer: {
    marginInline: '20px',
    maxWidth: '500px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '300px'
    }
  },
  imageInput: {
    width: '150px',
    height: '150px',
    margin: '5px',
    position: 'relative',
    cursor: 'pointer',
    transition: '0.5s',
    '&:hover': {
      filter: 'brightness(80%)'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100px',
      height: '100px'
    }
  },
  nameTourInput: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  error: {
    display: 'flex',
    justifyContent: 'center',
    color: 'red',
    marginTop: 10
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  bodyChangeImage: {
    padding: 10,
    position: 'relative'
  },
  imageChange: {
    height: '350px',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      height: '200px'
    }
  },
  borderDash: {
    border: '2px dashed #000',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative'
  },
  borderDashHover: {
    border: '3px dashed #aaa',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative'
  },
  imageChageInput: {},
  buttonWrap: {
    margin: 20,
    display: 'flex',
    justifyContent: 'right'
  },
  uploadWrap: {
    // alignContent: 'center'
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  imageChangeContent: {
    display: 'block'
  },
  removeImageChange: {
    color: color.white,
    backgroundColor: color.red,
    '&:hover': {
      backgroundColor: color.darkred
    }
  },
  description: {
    margin: 10
  },
  serviceCard: {
    marginBlock: 20,
    paddingBlock: 10,
    paddingInline: 20,
    marginInline: 30,
    width: 370,
    [theme.breakpoints.down('md')]: {
      marginInline: 0,
      width: 300
    }
  },
  imageService: {
    width: 100,
    height: 100
  },
  serviceInfo: {
    marginLeft: 15,
    width: '100%'
  },
  changeContainer: {
    position: 'relative'
  },
  removeButton: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  sizeImageAvatar: {
    width: '300px',
    height: '300px'
  },
  sizeImageBg: {
    width: '500px',
    height: '250px'
  },
  modal_header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    borderBottom: '1px solid #f1f1f1'
  },
  modal_header_closeIcon: {
    color: color.gray,
    fontSize: '20px',
    width: '25px',
    height: '25px'
  },
  create: {
    marginTop: 20,
    marginBottom: 20,
    border: '1px solid #e8e8e8',
    background: '#fff',
    borderRadius: attr.borderRadius.md,
    boxShadow: 'none'
  },
  createWrapper: {
    borderRadius: attr.borderRadius.md
  },
  compose: {
    padding: 16,
    borderBottom: '1px solid #e8e8e8',
    height: 60
  },
  composeForm: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  composeFormImage: {
    height: 42,
    width: 42,
    borderRadius: '50%'
  },
  composeOptions: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 8,
    borderRadius: `0 0 ${attr.borderRadius.md}px ${attr.borderRadius.md}px`,
    background: color.white,
    cursor: 'pointer'
  },
  composeOption: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '6px 16px',
    marginRight: 10,
    background: '#f7f7f7',
    borderRadius: 500,
    fontSize: 15,
    color: '#888da8',
    transition: 'all 0.3s'
  },
  composeIcon: {
    height: 20,
    width: 20,
    transition: 'all 0.3s',
    marginRight: 5
  },
  sizeAvatarInfo: {
    width: '100%',
    height: '300px'
  },
  sizeBgInfo: {
    width: '100%',
    height: '300px'
  }
}));

export default formStyles;
