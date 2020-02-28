import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import { Favorite, FavoriteBorder} from '@material-ui/icons';

const styles = {
  input: {
    borderRadius: '0 4px 4px 0',
    borderLeft: 0,
    width: 80,
    'fieldset': {
      borderLeft: 0,
    },
  },
};

const values = [1000, 2500, 5000, 10000]

class AmountForm extends React.Component  {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleOther = this.handleOther.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }

  handleChange (e) {
    this.props.onAmountChange(e.currentTarget.value)
  }
  
  handleOther (e) {
    this.props.onAmountChange(e.currentTarget.value * 100)
  }
  
  handleCheck (e) {
    this.props.onPayFees(e.target.checked)
  }
  
  render () {
    const {amount, classes, payFees} = this.props
    const fees = amount/100 * 0.022 + 0.03 // (stripe fees for nonprofit)
    const label =  `I will cover the processing fees! $${fees.toFixed(2)}`
    return (
      <React.Fragment>
        <Grid container justify="center">
          <Grid item>
            <FormControl component="fieldset" className="">
              <ButtonGroup variant="contained" size="large" name="amount" color="primary" aria-label="amount">
                {values.map((val, i)  => {
                    const isSelected = (val + '' === amount)
                    return <Button 
                             onClick={this.handleChange} 
                             value={val} 
                             color={isSelected ? 'secondary':''}
                             key={i} disableElevation>${val/100}</Button>
                })}
                <FormControl size="medium" variant="outlined">
                  <InputLabel htmlFor="other-amount">Other</InputLabel>
                  <OutlinedInput
                    id="other-amount"
                    className={classes.input}
                    placeholder={amount/100 + ''}
                    onChange={this.handleOther}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    labelWidth={60}
                  />
                </FormControl>
              </ButtonGroup>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked={payFees} onChange={this.handleCheck} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
              label={label}
            />
          </Grid>
        </Grid>
    </React.Fragment>
  )}
}

export default withStyles(styles)(AmountForm)
