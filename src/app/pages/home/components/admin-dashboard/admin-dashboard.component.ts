import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('barCanvas') private barCanvas!: ElementRef;

  barChart: any;
  data: any[] = [];

  constructor(private ser: DbService) {
    Chart.register(...registerables);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.ser.estadosHabitacion().subscribe(resp => {
      this.data = resp;
      this.barChartMethod();
    });
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.data.map(d => d.detalle),
        datasets: [{
          label: '# Habitaciones',
          data: this.data.map(d => d.cantidad),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          /* yAxes: {
            ticks: {
              beginAtZero: true
            }
          } */
        }
      }
    });
  }

}
