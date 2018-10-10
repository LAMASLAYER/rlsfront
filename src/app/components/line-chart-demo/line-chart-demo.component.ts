import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {endWith} from 'rxjs/operators';

@Component({
  selector: 'app-line-chart-demo',
  templateUrl: './line-chart-demo.component.html'
})
export class LineChartDemoComponent implements OnInit {
  // lineChart

  public date: string;
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
    this.date = new Date().toString().substr(4, 3);
    this.user = 'Jérôme';
    this.getMonth().subscribe(
      data => {
        this.months = data;
      }
    );
    this.getActivities(this.date).subscribe(
      data => {
        const tempData = [];
        let size = 0, key;
        for (key in data) {
          if (data.hasOwnProperty(key)) { size++; }
        }
        console.log(size);
        for (let i = size - 1; i > size - 7; i--) {
          tempData.push(data[i]);
        }
        console.log(tempData);
        this.activities = tempData;
        console.log(this.activities[1]);
      }
    );
  }

  public changeMonth(month: string) {
    this.activities = null;
    this.getActivities(month).subscribe(
      data => {
        this.activities = data;
        console.log(data);
      }
    );
  }

  private getActivities(currentDate: string) {
    return this.http.get('http://localhost:3000/activity?month=' + currentDate);
}

  private getData() {
   return this.http.get('http://localhost:3000/table');
  }

  private getLabels() {
    return this.http.get('http://localhost:3000/categories');
  }

  private getMonth() {
    return this.http.get('http://localhost:3000/month');
  }

  public months: Object;
  public user:string;
  public activities: Object;
  public labels: Object;
  public users: Object;
  public lineChartData: Object;
  public lineChartLabels = ['Octobre'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(0,0,255,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(0,0,255,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(0,0,255,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(255,192,203 ,1 )',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(255,192,203 ,1 )',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(255,192,203 ,1 )',
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

  public plusOne(id) {
    const value = id;
    const newData = this.lineChartData;
    console.log(this.newReason);
    newData[value.substr(0, 1)]['data'][value.substr(1, 1)] = newData[value.substr(0, 1)]['data'][value.substr(1, 1)] + 1;
    return this.http.put('http://localhost:3000/table/' + value.substr(0, 1), newData[value.substr(0, 1)]).subscribe(
      res => {
        this.getData().subscribe(
          data => {
            this.lineChartData = data;
          }
        );
      }
    );
  }

  public minusOne(id) {
    const value = id;
    const newData = this.lineChartData;
    console.log(value);
      newData[value.substr(0, 1)]['data'][value.substr(1, 1)] = newData[value.substr(0, 1)]['data'][value.substr(1, 1)] - 1;
      return this.http.put('http://localhost:3000/table/' + value.substr(0, 1), newData[value.substr(0, 1)]).subscribe(
        res => {
          this.getData().subscribe(
            data => {
              this.lineChartData = data;
            }
          );
        }
      );
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
    return this.http.post('http://localhost:3000/table', newCategory).subscribe(
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
    return this.http.delete('http://localhost:3000/table/' + id).subscribe(
      res => {
        this.getData().subscribe(
          data => {
            this.lineChartData = data;
          }
        );
      }
    );
  }

  public reasons: Object;
  public tempId: any;

  public setTempId(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    this.tempId = idAttr.nodeValue;
  }

  public loadReasons() {

    return this.http.get('http://localhost:3000/reasons').subscribe(
      res => {
        this.reasons = res;
      }
    );
  }

  public newReason: string;

  public addReason(newReason) {
    this.newReason = newReason;
  }

  public loadActivity() {
    return this.http.get('http://localhost:3000/activity');
  }
  public act;

  public setActivity(act: string) {
    this.act = act;
    console.log(this.act);
  }

  public setUser(user: string) {
    this.user = user;
    console.log(this.user);
  }

  public newAct: Object;

  public newActivity() {
    this.newAct = { 'type': this.act, 'author': this.user, 'reason' : this.newReason, 'month': this.date };
    return this.http.post('http://localhost:3000/activity', this.newAct).subscribe(
      res => {
        this.getActivities(this.date).subscribe(
          data => {
            const tempData = [];
            let size = 0, key;
            for (key in data) {
              if (data.hasOwnProperty(key)) { size++; }
            }
            console.log(size);
            for (let i = size - 1; i > size - 7; i--) {
              tempData.push(data[i]);
            }
            console.log(tempData);
            this.activities = tempData;
            console.log(this.activities[1]);
          }
        );
      }
    );
  }
  public allActivities: Object;

  public getAllActivities() {
    return this.http.get('http://localhost:3000/activity?month=' + this.date).subscribe(
      data => {
        this.allActivities = data;
        console.log(this.allActivities);
      }
    );
  }

}

