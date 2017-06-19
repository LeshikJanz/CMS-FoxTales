import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'semi-circle-donut',
  templateUrl: './semi-circle-donut.component.html',
  styleUrls: ['./semi-circle-donut.component.scss']
})
export class SemiCircleDonutComponent {
  public options: Object;

  /**
   * Constructor
   *
   * @returns {void}
   */
  constructor() {

    this.options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
      },
      title: {
        text: 'Content Type',
        align: 'center',
        verticalAlign: 'middle',
        y: 40
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: -50,
            style: {
              fontWeight: 'bold',
              color: 'white'
            }
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%']
        }
      },
      series: [{
        type: 'pie',
        name: 'Content Type',
        innerSize: '50%',
        data: [
          {
            name: 'Photo',
            y: 10.38,
            color: '#CEC3D9'
          },
          {
            name: 'GIF',
            y: 36.33,
            color: '#906DB5'
          },
          {
            name: 'BurstGIF',
            y: 24.03,
            color: '#643596'
          },
          {
            name: 'Video',
            y: 14.77,
            color: '#4E1B85'
          },
          {
            name: 'Cinemagraph',
            y: 10.91,
            color: '#35006E'
          },
          {
            name: 'Proprietary or Undetectable',
            y: 0.2,
            dataLabels: {
              enabled: false
            }
          }
        ]
      }],
      credits: {
        enabled: false
      }
    };
  }
}
