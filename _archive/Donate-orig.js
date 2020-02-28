import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import ProjectForm from './ProjectForm';
import AmountForm from './AmountForm';
import PaymentForm from './PaymentForm';
// import Review from './Review';


const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  button: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  divider: {
    marginBottom: theme.spacing(3),
  }
}));

const steps = ['Select Project', 'Choose Amount', 'Payment details'];

function getStepContent(step, props) {
  switch (step) {
    case 0:
      return <ProjectForm {...props} />;
    case 1:
      return <AmountForm {...props} />;
    case 2:
      return <PaymentForm {...props} />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [projectId, setProjectId] = React.useState('css');
  const [projectName, setProjectName] = React.useState('Code for Science & Society');
  const [amount, setAmount] = React.useState("500");
  
  const handleStepClick = (e) => {
    const label = e.target.innerText
    if (!label) return e.preventDefault()
    setActiveStep(steps.indexOf(label))
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  
  const onProjectChange = (id, name) => {
    setProjectId(id)
    setProjectName(name)
  };
  
  const onAmountChange = (val) => {
    setAmount(val)
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Donate
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel onClick={handleStepClick}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep > 0 ? (
              <Typography component="h2" variant="h5" align="center" gutterBottom>
                ${amount/100} to {projectName}
              </Typography>
             ) :  ''}
          </React.Fragment>       
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your donation.
                </Typography>
                <Typography variant="subtitle1">
                  You donated ${amount/100} to {projectName}. We have emailed you a receipt.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, {handleBack, handleNext, onProjectChange, onAmountChange, amount, projectId, projectName})}
                {activeStep === steps.length - 1 ? '' : 
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button variant="contained" onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  </div>
                }
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}