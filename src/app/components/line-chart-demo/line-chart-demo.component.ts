import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {endWith} from 'rxjs/operators';

@Component({
  selector: 'app-line-chart-demo',
  templateUrl: './line-chart-demo.component.html'
})
export class LineChartDemoComponent implements OnInit {
  // lineChart

  private date: Date;
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  ngOnInit() {
    this.getData().subscribe(
      data => {
        this.lineChartData = data;
      }
    );
    this.getLabels().subscribe(
      data => {
        this.labels = data;
      }
    );
    this.getMonth().subscribe()
  }

  private getData() {
   return this.http.get('http://localhost:3100/table');
  }

  private getLabels() {
    return this.http.get('http://localhost:3100/categories');
  }

  private getMonth() {
    return this.http.get('http://localhost:3100/month');
  }

  public labels: Object;
  public users: Object;
  public lineChartData: Object;
  public lineChartLabels = ['Septembre', 'Octobre'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public plusOne(event: any) {
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    const value = idAttr.nodeValue;
    const newData = this.lineChartData;
    newData[value.substr(0, 1)]['data'][value.substr(1, 1)] = newData[value.substr(0, 1)]['data'][value.substr(1, 1)] + 1;
    return this.http.put('http://localhost:3100/table/' + value.substr(0, 1), newData[value.substr(0, 1)]).subscribe(
      res => {
        this.getData().subscribe(
          data => {
            this.lineChartData = data;
          }
        );
      }
    );
  }

  public minusOne(event: any) {
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    const value = idAttr.nodeValue;
    const newData = this.lineChartData;
    console.log(newData[value.substr(0, 1)]);
    if (value.substr(1, 1) > 0) {
      newData[value.substr(0, 1)]['data'][value.substr(1, 1)] = newData[value.substr(0, 1)]['data'][value.substr(1, 1)] - 1;
      return this.http.put('http://localhost:3100/table/' + value.substr(0, 1), newData[value.substr(0, 1)]).subscribe(
        res => {
          this.getData().subscribe(
            data => {
              this.lineChartData = data;
            }
          );
        }
      );
    }
  }

  public newCategory: string;

  public addCategory() {
    this.callBackCategory('Jérôme', this.newCategory);
    this.callBackCategory('Sarah', this.newCategory);
  }

  public callBackCategory(name: string, category: string) {
    let newCategory: object;
    newCategory = { 'data': [], 'label': name + ': ' + category };
    for (let i = 0; i < this.lineChartLabels.length; i++) {
      newCategory['data'].push(0);
    }
    return this.http.post('http://localhost:3100/table', newCategory).subscribe(
      res => {
        this.getData().subscribe(
          data => {
            console.log(data);
            this.lineChartData = data;
          }
        );
      }
    );
  }

  public deleteCategory(id) {
    return this.http.delete('http://localhost:3100/table/' + id).subscribe(
      res => {
        this.getData().subscribe(
          data => {
            this.lineChartData = data;
          }
        );
      }
    );
  }
}
