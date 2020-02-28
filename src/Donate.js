import React,  { Component } from 'react';
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Fade from '@material-ui/core/Fade';
import SelectProject from './components/SelectProject';
import SelectAmount from './components/SelectAmount';
import PaymentForm from './components/PaymentForm';
import Card from './components/Card'
import projects from './projects'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary['A100'],
    overflow: 'hidden',
    paddingBottom: 100
  },
  grid: {
    margin: `0 ${theme.spacing(2)}px`
  },
  bigContainer: {
    width: '80%'
  },
  logo: {
    width: '90%'
  },
  logo1: {
    marginBottom: 24,
    display: 'flex',
    justifyContent: 'center'
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  stepGrid: {
    width: '80%'
  },
  buttonBar: {
    marginTop: 32,
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: theme.palette.primary['A100']
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  stepper: {
    backgroundColor: 'transparent'
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  formControl: {
    width: '100%'
  }
})

const getSteps = () => {
  return [
    'Select Project',
    'Choose Amount',
    'Payment details'
  ];
}

const calcFees = (amt) => {
  return (parseInt(amt, 10) * 0.022 + 3)
}

class Donate extends Component {

  state = {
    activeStep: 0,
    loading: true,
    labelWidth: 0,
    amount: "2500",
    payFees: false,
    projectId: 'css',
    projectName: 'Code for Science & Society',
    projectLogo: 'https://codeforscience.org/assets/Blue-logo-black-text-stacked.png',
    subscribeDisabled: false,
    subscribeProcessing: false,
    name: null,
    email: null
  }

  componentDidMount() {
    if (this.props.projectId) {
      const {name, logo} = projects[this.props.projectId]
      if (!name) return
      this.setState({activeStep:2, projectId: this.props.projectId, projectName: name, projectLogo: logo})
    }
  }
    

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handlePayment = ({name, email}) => {
    this.setState({name, email})
    this.handleNext()
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubscribe = event => {
    // TODO
    this.setState({ 
      subscribeDisabled: true,
      subscribeProcessing: true
    });
  };
  
  onProjectChange = (projectId) => {
    const {name, logo} = projects[projectId]
    if (!name) return
    this.setState({ projectId, projectName: name, projectLogo: logo})
    this.props.history.push(`${window.location.pathname}?project=${projectId}`)
  };
  
  onAmountChange = (val) => {
    this.setState({ amount: val})
  };
  
  onPayFees = (val) => {
    this.setState({ payFees: val})
  };
  
  handleDonateOptions = (val) => {
    console.log('TODO')
    // this.setState({ amount: val})
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, loading, projectId, projectName, projectLogo, amount, name, email, payFees } = this.state;
    const paymentAmount = this.state.payFees ? parseInt(amount, 10) + calcFees(amount) : amount
    
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid alignItems="center" justify="center" container className={classes.grid}>
              <Grid item xs={12}>
                <Typography component="h1" variant="h4" align="center" gutterBottom>
                  Support Public Technology
                </Typography>
                { activeStep === 0 && (
                  <Container maxWidth="sm">
                    <Paper className={classes.paper}>
                      <Typography variant="body1" gutterBottom className={classes.text} color="textSecondary">
                        Code for Science & Society empowers communities to work together and build innovative technology for the public good.
                      </Typography>
                      <Typography variant="body1" className={classes.text} color="textSecondary">
                        Support your favorite projects with a donation! 
                        Your donation will support the many volunters coding, building communities, writing documentation, and more.
                      </Typography>
                      <Typography variant="body2" className={classes.text} color="textSecondary">
                        This form is best used for smaller credit card donations. <a onClick={this.handleDonateOptions} href="#">See other options</a>
                      </Typography>
                    </Paper>
                  </Container>
                )}
                <div className={classes.stepContainer}>
                  <div className={classes.stepGrid}>
                    <Stepper classes={{root: classes.stepper}} activeStep={activeStep} alternativeLabel>
                      {steps.map(label => {
                        return (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </div>
                  { activeStep === 0 && (
                  <Container maxWidth="sm">
                    <Paper className={classes.paper}>
                      <div>
                        <SelectProject onProjectChange={this.onProjectChange} projectId={projectId} projectName={projectName}/>
                      </div>
                      <Card/>
                    </Paper>
                    </Container>
                  )}
                  { activeStep === 1 && (
                    <Container maxWidth="md">
                      <Paper className={classes.paper}>
                        <Grid
                          container
                          direction="row"
                          justify="space-around"
                        >
                          <Grid item xs={12} sm={3}>
                            <div className={classes.logo}><img width={"auto"} height={"auto"} style={{maxHeight: "75px", maxWidth:"200px"}} src={projectLogo} alt={projectName} /></div>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <SelectAmount onPayFees={this.onPayFees} onAmountChange={this.onAmountChange} amount={amount} payFees={payFees} />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Container>
                  )}
                  { activeStep === 2 && (
                    <Container maxWidth="md">
                      <Paper className={classes.paper}>
                        <Grid
                          container
                          direction="row"
                          justify="space-between"
                        >
                          <Grid item xs={12} sm={6}>
                            <div className={classes.logo}><img  width={"auto"} height={"auto"} style={{maxHeight: "75px", maxWidth:"200px"}} src={projectLogo} alt={projectName} /></div>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <SelectAmount onPayFees={this.onPayFees} onAmountChange={this.onAmountChange} amount={amount} payFees={payFees} />
                          </Grid>
                        </Grid>
                        <div>
                          <PaymentForm 
                            amount={paymentAmount}
                            projectId={projectId}
                            projectName={projectName}
                            handlePayment={this.handlePayment}
                          />
                        </div>
                        <Card/>
                      </Paper>
                    </Container>
                  )}
                  { activeStep === 3 && (
                  <Container maxWidth="sm">
                    <Paper className={classes.paper}>
                      <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div style={{width: 380, textAlign: 'center'}}>
                          <div style={{marginBottom: 32}}>
                            <Typography variant="h6" style={{fontWeight: 'bold'}} gutterBottom>
                              Thank you {name} for your donation!
                            </Typography>
                          </div>
                          { email && (
                            <div>
                              <Fade
                                in={loading}
                                style={{
                                  transitionDelay: loading ? '600ms' : '0ms',
                                }}
                                unmountOnExit
                              >
                                <div>
                                <Typography variant="body2" gutterBottom>
                                  Would you like to sign up for the CS&S newsletter?
                                </Typography>
                                <Button
                                 variant="contained"
                                 color="primary"
                                 onClick={this.handleSubscribe}
                                 disabled={this.state.subscribeDisabled}>
                                    {this.state.subscribeProcessing ? 'Subscribing…' : 'Yes, please subscribe!'}
                                 </Button>
                                </div>
                              </Fade>
                            </div>
                          )}
                        </div>
                      </div>
                    </Paper>
                  </Container>
                  )}
                  { activeStep <= 2 && (
                    <div className={classes.buttonBar}>
                      <Button
                       disabled={activeStep === 0}
                       onClick={this.handleBack}
                       className={classes.backButton}
                       size='large'
                       >
                         Back
                       </Button>
                     { activeStep < 2 && (
                       <Button
                         variant="contained"
                         color="primary"
                         onClick={this.handleNext}
                         size='large'
                         style={true ? {background: classes.button, color: 'white'} : {}}
                         disabled={false}
                       >
                         Next
                       </Button>
                      )}
                     </div>
                  )}
                </div>
              </Grid>              
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Donate))
