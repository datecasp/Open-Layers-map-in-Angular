import {
  AfterViewInit,
  VERSION,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Feature, Map, Overlay, View } from 'ol/index.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Point } from 'ol/geom.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { fromLonLat } from 'ol/proj.js';
import { Coordinate } from 'ol/coordinate';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  map: Map | any;
  readonly place: Coordinate = [-3.2, 39.8];
  readonly zoom = 6.5;
  //readonly wmPlace = fromLonLat(this.place);
  readonly point: Coordinate = [-3, 39.5];
  readonly point2: Coordinate = [512, 484];
  //readonly wmPoint = new Point(fromLonLat(this.point));
  readonly points: Coordinate[] = [this.point, this.point2];

  imgMenuIcon: string = './assets/rubik.png';
  imgMenuIconHover: string = './assets/rubik-hover.png';
  imgSrc: string = this.imgMenuIcon;

  ngAfterViewInit() {}

  public onMapReady(event: any) {
    console.log('Map Ready');
  }
}
