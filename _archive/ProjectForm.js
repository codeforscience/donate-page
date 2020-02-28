import React from 'react';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const PROJECTS = {
  css: {
    name: 'Code for Science & Society',
    logo: 'https://codeforscience.org/assets/Blue-logo-black-text-stacked.png',
    url: 'https://codeforscience.org'
  },
  dat: {
    name: 'Dat Foundation',
    logo: 'https://codeforscience.org/assets/dat-logo.png',
    url: 'https://dat.foundation'
  },
  ioi: {
    name: 'Invest in Open Infrastructure',
    logo: 'https://codeforscience.org/assets/ioi-temp-logo.png',
    url: 'https://investinopen.org/'
  },
  mlab: {
    name: 'Measurement Lab',
    logo: 'https://codeforscience.org/assets/mlab.png',
    url: 'https://www.measurementlab.net/'
  },
  oreview: {
    name: 'OpenReview',
    logo: 'https://codeforscience.org/assets/openreview.png',
    url: 'https://openreview.net/'
  },
  orefine: {
    name: 'OpenRefine',
    logo: 'https://codeforscience.org/assets/open-refine-320px.png',
    url: 'https://openrefine.org/'
  },
  pre:  {
    name: 'PREreview',
    logo: 'https://codeforscience.org/assets/prereview.png',
    url: 'http://prereview.org/'
  },
}

class ProjectForm extends React.Component  {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.props.onProjectChange(e.target.value, PROJECTS[e.target.value])
  }
  
  render () {
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl component="fieldset" className="">
              <RadioGroup aria-label="project" name="project" value={this.props.projectId} onChange={this.handleChange}>
                {Object.keys(PROJECTS).map((id) => {
                    return <FormControlLabel value={id} key={id} control={<Radio />} label={PROJECTS[id].name} />;
                })}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
    </React.Fragment>
  )}
}

export default ProjectForm
