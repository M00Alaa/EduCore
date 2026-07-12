import { CommonModule, NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnDestroy, Output, ViewChild, TemplateRef, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Icon, latLng, marker, tileLayer } from 'leaflet';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { catchError, debounceTime, distinctUntilChanged, of, Subject, switchMap, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mg-map-selector',
  standalone: true,
  imports: [
    CommonModule,
    LeafletModule,
    FormsModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    TranslateModule,
    NgStyle,
  ],
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.scss']
})
export class MapSelectorComponent implements OnDestroy {
  @ViewChild('mapModal') mapModal!: TemplateRef<any>;
  @Input() disabled = false;
  @Input()
  public set default(v: { lat: string | number | null | undefined, lng: string | number | null | undefined }) {

    if (v.lat !== null && v.lng !== null && v.lat !== '' && v.lng !== '' && v.lat !== undefined && v.lng !== undefined) {
      this.selectedLocation = {
        lat: +v.lat,
        lng: +v.lng,
      }
      this.tempLocation = { ...this.selectedLocation };
      if (this.map) {
        this.setLatLng(+v.lat!, +v.lng!, 13)
      }
      // Fetch the display name if we don't already have one
      if (!this.selectedLocationName) {
        this.reverseGeocodeSubject.next({ lat: +v.lat, lng: +v.lng });
      }
    }
  }

  selectedLocation = { lat: 24.6, lng: 46.7 };
  tempLocation = { lat: 24.6, lng: 46.7 };
  selectedLocationName = '';
  tempLocationName = '';
  isGeocoding = false;
  private reverseGeocodeSubject = new Subject<{ lat: number; lng: number }>();
  private destroy$ = new Subject<void>();
  modalRef: NgbModalRef | null = null;
  isRTL = document.dir === 'rtl';

  @Output() changed = new EventEmitter<{ lat: number, lng: number }>();
  map: L.Map | undefined;

  options: L.MapOptions = {
    layers: [tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '' })],
    zoom: 8,
    markerZoomAnimation: true,
    minZoom: 3,
    center: latLng(this.selectedLocation.lat, this.selectedLocation.lng),
  };

  get displayValue(): string {
    return this.selectedLocationName || '';
  }

  private readonly injector = inject(Injector);

  constructor(
    private cd: ChangeDetectorRef,
    private http: HttpClient
  ) {
    this.reverseGeocodeSubject.pipe(
      // debounceTime(400),
      switchMap(({ lat, lng }) => {
        this.isGeocoding = true;
        this.cd.detectChanges();
        return this.http.get<any>(`${environment.api}/api/v1/geocode/reverse?lat=${lat}&lng=${lng}`, {
          headers: { 'X-Skip-Global-Error': 'true' }
        }).pipe(
          catchError((err) => { console.error('[map-selector] reverse geocode failed', err); return of(null); })
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe(result => {
      const name = result?.display_name || '';
      this.tempLocationName = name;
      // If modal is closed, geocode was triggered by the default setter — update
      // selectedLocationName directly so the input shows the resolved name
      if (!this.modalRef) {
        this.selectedLocationName = name;
      }
      this.isGeocoding = false;
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getModalService(): NgbModal {
    return this.injector.get(NgbModal);
  }

  openMapModal(): void {
    if (!this.disabled) {
      this.tempLocation = { ...this.selectedLocation };
      this.tempLocationName = this.selectedLocationName;
      this.modalRef = this.getModalService().open(this.mapModal, {
        size: 'lg',
        centered: true,
        backdrop: 'static'
      });

      // Wait for modal to render then initialize/resize map
      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
          if (this.customMarker) {
            this.setLatLng(this.tempLocation.lat, this.tempLocation.lng, 13);
          }
        }
      }, 300);
    }
  }

  closeMapModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
      this.modalRef = null;
    }
    this.searchForm.reset();
  }

  confirmLocation(): void {
    this.selectedLocation = { ...this.tempLocation };
    this.selectedLocationName = this.tempLocationName;
    this.changed.emit(this.selectedLocation);
    this.closeMapModal();
  }

  layers: any[] = [];
  customMarker: L.Marker<any> | undefined;

  onMapReady(map: L.Map) {
    this.map = map;

    // Create a marker that will capture the selected location
    const defaultLatLng = latLng(this.tempLocation.lat, this.tempLocation.lng);

    const customIcon = new Icon({
      iconUrl: '/assets/images/map-pin.svg',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    this.customMarker = marker(defaultLatLng, {
      draggable: !this.disabled,
      icon: customIcon
    });

    this.customMarker.on('dragend', (event) => {
      this.tempLocation = event.target.getLatLng();
      this.tempLocationName = '';
      this.reverseGeocodeSubject.next({ lat: this.tempLocation.lat, lng: this.tempLocation.lng });
      this.cd.detectChanges();
    });

    // Handle map click events
    map.on('click', (event: L.LeafletMouseEvent) => {
      if (this.disabled) {
        return;
      }
      this.customMarker?.setLatLng(event.latlng);
      this.tempLocation = event.latlng;
      this.tempLocationName = '';
      this.reverseGeocodeSubject.next({ lat: event.latlng.lat, lng: event.latlng.lng });
      this.cd.detectChanges();
    });

    // Set layers in next tick to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.layers = [this.customMarker];
      this.cd.detectChanges();
    }, 0);

    this.setSearchForm();

    // Force initial map resize
    setTimeout(() => {
      map.invalidateSize(true);
    }, 100);

    // Final resize and positioning after everything is set up
    setTimeout(() => {
      map.invalidateSize(true);
      if (this.customMarker) {
        this.setLatLng(this.tempLocation.lat, this.tempLocation.lng, 8);
      }
    }, 500);
  }

  searching = false;
  setSearchForm() {
    this.searchForm.controls["searchedLocation"].valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged((curr, prev) => {
          return curr === prev || false;
        }),
        switchMap(text => {
          if (text) {
            this.searching = true;
            this.search(text || '');
          }
          return of(text || '')
        })
      )
      .subscribe(res => {

      });
  }

  setLatLng(lat: number, lng: number, zoom?: number) {
    if (this.customMarker && this.map) {
      const newLatLng = latLng(lat, lng);
      this.customMarker.setLatLng(newLatLng);
      this.tempLocation = newLatLng;

      if (zoom) {
        this.map.setView(newLatLng, zoom, { animate: true });
      } else {
        this.map.panTo(newLatLng);
      }
    }
  }

  searchForm = new FormGroup({
    searchedLocation: new FormControl('', Validators.required)
  })

  suggestions: any[] = [];

  search(word: string) {
    if (word && typeof word === 'string' && word.trim().length > 2) {
      const url = `${environment.api}/api/v1/geocode/search?q=${encodeURIComponent(word)}`;

      this.http.get<any[]>(url, { headers: { 'X-Skip-Global-Error': 'true' } }).subscribe({
        next: (results) => {
          this.suggestions = results.map(item => ({
            ...item,
            label: item.display_name,
            x: parseFloat(item.lon),
            y: parseFloat(item.lat)
          }));
          this.searching = false;
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error('Search error:', err);
          this.searching = false;
          this.suggestions = [];
          this.cd.detectChanges();
        }
      });
    } else {
      this.searching = false;
      this.suggestions = [];
    }
  }

  selectLocation(item: { x?: number; y?: number; label?: string }) {
    if (item?.x != null && item?.y != null && item?.label) {
      this.setLatLng(item.y, item.x, 16);
      this.tempLocationName = item.label;
      this.suggestions = [];
      this.searchForm.controls.searchedLocation.patchValue(item.label, { emitEvent: false, onlySelf: true });
    }
  }

}
