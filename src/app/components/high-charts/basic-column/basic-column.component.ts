import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'basic-column',
  templateUrl: './basic-column.component.html',
  styleUrls: ['./basic-column.component.scss']
})
export class BasicColumnComponent {
    public options: Object;

  /**
   * Constructor
   *
   * @returns {void}
   */
  constructor() {
    this.options =  {     
        chart: {
            type: 'column'
        },
        title: {
            text: 'Share Volume'
        },
        xAxis: {
            categories: [
                'Facebook',
                'Twitter',
                'Tumblr',
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: '# of shares'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
            name: 'Downloads',
            data: [49, 71, 151],
            color: '#31A4EE'
            }, 
            {
            name: 'Shares',
            data: [51, 100, 210],
            color: '#884EA9'
            }, 
            {
            name: 'Total Social Shares',
            data: [100, 200, 300],
            color: '#F68E2B'
            }
        ],
        credits: {
            enabled: false
        }
    }
  }
}
