import { experimentOn } from 'component-lab';

export default experimentOn('Component Experiment Name')
  .case('Experiment 1 Name', {
    template: `
      <h1>HI</h1>
    `
  });
