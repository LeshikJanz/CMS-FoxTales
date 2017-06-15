import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'basic-line',
  templateUrl: './basic-line.component.html',
  styleUrls: ['./basic-line.component.scss']
})
export class BasicLineComponent {
    public options: Object;

  /**
   * Constructor
   *
   * @returns {void}
   */
  constructor() {

        this.options =  {     

    title: {
        text: 'Session Over Time'
    },
    yAxis: {
        title: {
            text: '# of Sessions'
        }
    },
    xAxis: {
        title: {
            text: 'Time'
        },
        categories: ['12pm','1pm','2pm','3pm','4pm','5pm','6pm',
                     '7pm','8pm','9pm','10pm','11pm','12am','1am',
                     '2am','3am','4am','5am','6am', '7am', '8am',
                     '9am', '10am', '11am']
    },
    series: [{
        name: 'Sessions',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 129931,
        139931, 149931, 159931, 169931, 179931, 189931,
        179931, 169931, 179931, 189931, 199931, 209931, 219931, 229931,
        239931, 249931],
        color: '#8E5EC0',
        marker: {
            color: '#F57F17'
        }
    }],
     
    credits: {
      enabled: false
    }
}
  }
}
