import React from 'react';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

class AmountForm extends React.Component  {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.props.onAmountChange(e.target.value)
  }
  
  render () {
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl component="fieldset" className="">
              <RadioGroup aria-label="amount" name="amount" value={this.props.amount} onChange={this.handleChange} row>
                <FormControlLabel value="500" control={<Radio />} label="$5" />
                <FormControlLabel value="1000" control={<Radio />} label="$10" />
                <FormControlLabel value="2500" control={<Radio />} label="$25" />
                <FormControlLabel value="5000" control={<Radio />} label="$50" />
                <FormControlLabel value="10000" control={<Radio />} label="$100" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
    </React.Fragment>
  )}
}

export default AmountForm
