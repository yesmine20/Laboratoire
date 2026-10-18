import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ChartDataset, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MemberService } from '../../services/member-service';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatChipsModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  Nb_Members: number = 0;
  // types: String[] = [];
  chartLabels: String[] = []; //les types (student et teacher qu'on va les extraire de façon dynammique)
  chartData: ChartDataset<'pie'>[] = [{ label: 'Members', data: [] }];
  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: { legend: { display: true } },
  };
  // chartData: ChartDataset[] = [
  //     {
  //       // ⤵️ Add these
  //       label: '$ in millions',
  //       data: [1551, 1688, 1800, 1895, 2124, 2124]
  //     }
  //   ];
  //   chartLabels: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  //   chartOptions: ChartOptions = {};

  constructor(private MS: MemberService) {
    this.MS.GetAllMembers().subscribe((response) => {
      this.Nb_Members = response.length;
      //extraction des types yelzm tsir hné khtr bch nekhdmha aala tableau m3ebi eli mawjoud fel response
      console.log('Types:');
      const types = [...new Set(response.map((e) => e.type))];
      //map ynjm yaawed tous les types exempl teacher yal9aha martin aadou houwa 2 toes bch na7iw les duplications nestaamlou set 
      // tout les courbes yetkhadmou bel map w filter 
      const counts = types.map(
        (e) => response.filter((l) => l.type === e).length
      );
      // bch treferenci w hatinh fel axe des x
      this.chartLabels = types;
      this.chartData = [{
        data: counts
        //count nbStud / nbTeacher
      }];
    });

  }

}
