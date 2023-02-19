import {
  Component,
  NgZone,
  AfterViewInit,
  Output,
  Input,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { View, Feature, Map } from 'ol';
import { Coordinate } from 'ol/coordinate';
import VectorLayer from 'ol/layer/Vector';
import Projection from 'ol/proj/Projection';
import { Extent, getCenter } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import OSM, { ATTRIBUTION } from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { toLonLat, useGeographic } from 'ol/proj.js';
//import proj4 = require('proj4');
import { register } from 'ol/proj/proj4';
import { get as GetProjection } from 'ol/proj';
import { ScaleLine, defaults as DefaultControls } from 'ol/control';
import { Point, Polygon } from 'ol/geom';
import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';
import { Pixel } from 'ol/pixel';
import { EduGamingControl } from '../controls/edu-gaming-control';

useGeographic();

@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.scss'],
})
export class OlMapComponent implements AfterViewInit {
  @Input() center: Coordinate; // map center
  @Input() zoom: number; // initial zoom
  @Input() points: Coordinate[]; // Point
  mapPoint: Point;
  mapCoord: Coordinate;
  feat: Feature;
  view: View;
  //projection: Projection | any;
  //extent: Extent = [-20026376.39, -20048966.1, 20026376.39, 20048966.1];
  map: Map;
  @Output() mapReady = new EventEmitter<Map>();

  // Map views always need a projection.  Here we just want to map image
  // coordinates directly to map coordinates, so we create a projection that uses
  // the image extent in pixels.
  readonly extent = [0, 0, 1024, 968];
  readonly projection = new Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent: this.extent,
  });

  constructor(private zone: NgZone, private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.mapCoord = this.points[1];
    this.mapPoint = new Point(this.points[0]);

    this.feat = new Feature({
      point: new Point(this.mapCoord),
      name: 'My Polygon',
      id: 1,
    });

    this.feat.setId('1');

    if (!this.map) {
      this.zone.runOutsideAngular(() => this.initMap());
    }
    setTimeout(() => this.mapReady.emit(this.map));
  }

  private initMap(): void {
    // proj4.defs(
    //   'EPSG:3857',
    //   '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs'
    // );
    // register(proj4);
    //this.projection = GetProjection('EPSG:3857');
    //this.projection.setExtent(this.extent);
    this.view = new View({
      //center: this.center,
      center: getCenter(this.extent),
      zoom: this.zoom,
      projection: this.projection,
    });

    this.map = new Map({
      target: 'map',
      view: this.view,
      controls: DefaultControls().extend([new EduGamingControl({})]),
      layers: [
        new ImageLayer({
          source: new Static({
            url: 'https://imgs.xkcd.com/comics/online_communities.png',
            projection: this.projection,
            imageExtent: this.extent,
          }),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [this.feat],
          }),
          style: {
            'circle-radius': 9,
            'circle-fill-color': 'red',
          },
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [new Feature(this.mapPoint)],
          }),
          style: {
            'circle-radius': 9,
            'circle-fill-color': 'blue',
          },
        }),
      ],
    });
  }

  onClick($event: any) {
    let pixel: Pixel = [$event.x, $event.y];
    const feature = this.map.getFeaturesAtPixel(pixel)[0] as Feature;
    if (!feature) {
      return;
    }
    console.log(feature.getId());
    const coordinate = feature.getGeometry() as Point;
    console.log(coordinate.getCoordinates(), feature);
  }

  onPointerMove($event: any) {
    let pixel: Coordinate = [$event.x, $event.y];
    const type = this.map.hasFeatureAtPixel(pixel) ? 'pointer' : 'inherit';
    this.map.getViewport().style.cursor = type;
  }
}
