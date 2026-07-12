import { Component, ElementRef, Input, NgZone, Output, Renderer2, ViewChild } from '@angular/core';
import * as Plyr from 'plyr';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import { DefaultPlyrDriver } from '../plyr-driver/default-plyr-driver';
import * as i0 from "@angular/core";
const _c0 = ["v"];
export class PlyrComponent {
    get player() {
        return this.playerChange.getValue();
    }
    constructor(elementRef, ngZone, renderer) {
        this.elementRef = elementRef;
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.playerChange = new BehaviorSubject(null);
        this.events = new Map();
        this.plyrType = 'video';
        // ngx-plyr events
        this.plyrInit = this.playerChange.pipe(filter(player => !!player));
        // standard media events
        this.plyrProgress = this.createLazyEvent('progress');
        this.plyrPlaying = this.createLazyEvent('playing');
        this.plyrPlay = this.createLazyEvent('play');
        this.plyrPause = this.createLazyEvent('pause');
        this.plyrTimeUpdate = this.createLazyEvent('timeupdate');
        this.plyrVolumeChange = this.createLazyEvent('volumechange');
        this.plyrSeeking = this.createLazyEvent('seeking');
        this.plyrSeeked = this.createLazyEvent('seeked');
        this.plyrRateChange = this.createLazyEvent('ratechange');
        this.plyrEnded = this.createLazyEvent('ended');
        this.plyrEnterFullScreen = this.createLazyEvent('enterfullscreen');
        this.plyrExitFullScreen = this.createLazyEvent('exitfullscreen');
        this.plyrCaptionsEnabled = this.createLazyEvent('captionsenabled');
        this.plyrCaptionsDisabled = this.createLazyEvent('captionsdisabled');
        this.plyrLanguageChange = this.createLazyEvent('languagechange');
        this.plyrControlsHidden = this.createLazyEvent('controlshidden');
        this.plyrControlsShown = this.createLazyEvent('controlsshown');
        this.plyrReady = this.createLazyEvent('ready');
        // HTML5 events
        this.plyrLoadStart = this.createLazyEvent('loadstart');
        this.plyrLoadedData = this.createLazyEvent('loadeddata');
        this.plyrLoadedMetadata = this.createLazyEvent('loadedmetadata');
        this.plyrQualityChange = this.createLazyEvent('qualitychange');
        this.plyrCanPlay = this.createLazyEvent('canplay');
        this.plyrCanPlayThrough = this.createLazyEvent('canplaythrough');
        this.plyrStalled = this.createLazyEvent('stalled');
        this.plyrWaiting = this.createLazyEvent('waiting');
        this.plyrEmptied = this.createLazyEvent('emptied');
        this.plyrCueChange = this.createLazyEvent('cuechange');
        this.plyrError = this.createLazyEvent('error');
        // YouTube events
        this.plyrStateChange = this.createLazyEvent('statechange');
        this.subscriptions = [];
    }
    ngOnChanges(changes) {
        this.subscriptions.push(this.plyrInit.pipe(first()).subscribe((player) => {
            const reinitTriggers = [changes.plyrOptions, changes.plyrPlaysInline, changes.plyrCrossOrigin].filter(t => !!t);
            if (reinitTriggers.length) {
                if (reinitTriggers.some(t => !t.firstChange)) {
                    this.initPlyr(true);
                }
            }
            else {
                this.updatePlyrSource(player);
            }
        }));
    }
    ngOnDestroy() {
        this.destroyPlayer();
        this.subscriptions.forEach(s => s.unsubscribe());
    }
    ngAfterViewInit() {
        this.initPlyr();
    }
    initPlyr(force = false) {
        if (force || !this.player) {
            this.ngZone.runOutsideAngular(() => {
                this.destroyPlayer();
                this.driver = this.plyrDriver || new DefaultPlyrDriver();
                this.ensureVideoElement();
                const newPlayer = this.driver.create({
                    videoElement: this.videoElement,
                    options: this.plyrOptions,
                });
                this.updatePlyrSource(newPlayer);
                this.playerChange.next(newPlayer);
            });
        }
    }
    updatePlyrSource(plyr) {
        this.driver.updateSource({
            videoElement: this.videoElement,
            plyr,
            source: {
                type: this.plyrType,
                title: this.plyrTitle,
                sources: this.plyrSources,
                poster: this.plyrPoster,
                tracks: this.plyrTracks,
            },
        });
    }
    // see https://stackoverflow.com/a/53704102/1990451
    createLazyEvent(name) {
        return this.plyrInit.pipe(switchMap(() => new Observable(observer => this.on(name, (data) => this.ngZone.run(() => observer.next(data))))));
    }
    destroyPlayer() {
        if (this.player) {
            Array.from(this.events.keys()).forEach(name => this.off(name));
            this.driver.destroy({
                plyr: this.player,
            });
            this.videoElement = null;
        }
    }
    get hostElement() {
        return this.elementRef.nativeElement;
    }
    // this method is required because the plyr inserts clone of the original element on destroy
    // so we catch the clone element right here and reuse it
    ensureVideoElement() {
        const videoElement = this.hostElement.querySelector('video');
        if (videoElement) {
            this.videoElement = videoElement;
        }
        else {
            this.videoElement = this.renderer.createElement('video');
            this.videoElement.controls = true;
            if (this.plyrCrossOrigin) {
                this.videoElement.setAttribute('crossorigin', '');
            }
            if (this.plyrPlaysInline) {
                this.videoElement.setAttribute('playsinline', '');
            }
            this.renderer.appendChild(this.hostElement, this.videoElement);
        }
    }
    on(name, handler) {
        this.events.set(name, handler);
        this.player.on(name, handler);
    }
    off(name) {
        this.player.off(name, this.events.get(name));
        this.events.delete(name);
    }
    static { this.ɵfac = function PlyrComponent_Factory(t) { return new (t || PlyrComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i0.Renderer2)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PlyrComponent, selectors: [["plyr"], ["", "plyr", ""]], viewQuery: function PlyrComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.vr = _t.first);
        } }, inputs: { plyrDriver: "plyrDriver", plyrType: "plyrType", plyrTitle: "plyrTitle", plyrPoster: "plyrPoster", plyrSources: "plyrSources", plyrTracks: "plyrTracks", plyrOptions: "plyrOptions", plyrCrossOrigin: "plyrCrossOrigin", plyrPlaysInline: "plyrPlaysInline" }, outputs: { plyrInit: "plyrInit", plyrProgress: "plyrProgress", plyrPlaying: "plyrPlaying", plyrPlay: "plyrPlay", plyrPause: "plyrPause", plyrTimeUpdate: "plyrTimeUpdate", plyrVolumeChange: "plyrVolumeChange", plyrSeeking: "plyrSeeking", plyrSeeked: "plyrSeeked", plyrRateChange: "plyrRateChange", plyrEnded: "plyrEnded", plyrEnterFullScreen: "plyrEnterFullScreen", plyrExitFullScreen: "plyrExitFullScreen", plyrCaptionsEnabled: "plyrCaptionsEnabled", plyrCaptionsDisabled: "plyrCaptionsDisabled", plyrLanguageChange: "plyrLanguageChange", plyrControlsHidden: "plyrControlsHidden", plyrControlsShown: "plyrControlsShown", plyrReady: "plyrReady", plyrLoadStart: "plyrLoadStart", plyrLoadedData: "plyrLoadedData", plyrLoadedMetadata: "plyrLoadedMetadata", plyrQualityChange: "plyrQualityChange", plyrCanPlay: "plyrCanPlay", plyrCanPlayThrough: "plyrCanPlayThrough", plyrStalled: "plyrStalled", plyrWaiting: "plyrWaiting", plyrEmptied: "plyrEmptied", plyrCueChange: "plyrCueChange", plyrError: "plyrError", plyrStateChange: "plyrStateChange" }, exportAs: ["plyr"], features: [i0.ɵɵNgOnChangesFeature], decls: 0, vars: 0, template: function PlyrComponent_Template(rf, ctx) { } }); }
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PlyrComponent, [{
        type: Component,
        args: [{ selector: 'plyr, [plyr]', exportAs: 'plyr', template: "" }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.Renderer2 }]; }, { plyrDriver: [{
            type: Input
        }], plyrType: [{
            type: Input
        }], plyrTitle: [{
            type: Input
        }], plyrPoster: [{
            type: Input
        }], plyrSources: [{
            type: Input
        }], plyrTracks: [{
            type: Input
        }], plyrOptions: [{
            type: Input
        }], plyrCrossOrigin: [{
            type: Input
        }], plyrPlaysInline: [{
            type: Input
        }], vr: [{
            type: ViewChild,
            args: ['v']
        }], plyrInit: [{
            type: Output
        }], plyrProgress: [{
            type: Output
        }], plyrPlaying: [{
            type: Output
        }], plyrPlay: [{
            type: Output
        }], plyrPause: [{
            type: Output
        }], plyrTimeUpdate: [{
            type: Output
        }], plyrVolumeChange: [{
            type: Output
        }], plyrSeeking: [{
            type: Output
        }], plyrSeeked: [{
            type: Output
        }], plyrRateChange: [{
            type: Output
        }], plyrEnded: [{
            type: Output
        }], plyrEnterFullScreen: [{
            type: Output
        }], plyrExitFullScreen: [{
            type: Output
        }], plyrCaptionsEnabled: [{
            type: Output
        }], plyrCaptionsDisabled: [{
            type: Output
        }], plyrLanguageChange: [{
            type: Output
        }], plyrControlsHidden: [{
            type: Output
        }], plyrControlsShown: [{
            type: Output
        }], plyrReady: [{
            type: Output
        }], plyrLoadStart: [{
            type: Output
        }], plyrLoadedData: [{
            type: Output
        }], plyrLoadedMetadata: [{
            type: Output
        }], plyrQualityChange: [{
            type: Output
        }], plyrCanPlay: [{
            type: Output
        }], plyrCanPlayThrough: [{
            type: Output
        }], plyrStalled: [{
            type: Output
        }], plyrWaiting: [{
            type: Output
        }], plyrEmptied: [{
            type: Output
        }], plyrCueChange: [{
            type: Output
        }], plyrError: [{
            type: Output
        }], plyrStateChange: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx5ci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtcGx5ci9zcmMvbGliL3BseXIvcGx5ci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsVUFBVSxFQUFnQixLQUFLLEVBQUUsTUFBTSxFQUF3QixNQUFNLEVBQUUsU0FBUyxFQUFnQixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEssT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7QUFTdkUsTUFBTSxPQUFPLGFBQWE7SUFJeEIsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFxRUQsWUFDVSxVQUFzQyxFQUN0QyxNQUFjLEVBQ2QsUUFBbUI7UUFGbkIsZUFBVSxHQUFWLFVBQVUsQ0FBNEI7UUFDdEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGFBQVEsR0FBUixRQUFRLENBQVc7UUE1RXJCLGlCQUFZLEdBQUcsSUFBSSxlQUFlLENBQU8sSUFBSSxDQUFDLENBQUM7UUFNL0MsV0FBTSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFJbEIsYUFBUSxHQUFtQixPQUFPLENBQUM7UUFrQjVDLGtCQUFrQjtRQUNSLGFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQXVCLENBQUM7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QWtCO2tCQUEzQixNQUFNO1lBQ0csbUJBQW1CO2tCQUE1QixNQUFNO1lBQ0csb0JBQW9CO2tCQUE3QixNQUFNO1lBQ0csa0JBQWtCO2tCQUEzQixNQUFNO1lBQ0csa0JBQWtCO2tCQUEzQixNQUFNO1lBQ0csaUJBQWlCO2tCQUExQixNQUFNO1lBQ0csU0FBUztrQkFBbEIsTUFBTTtZQUdHLGFBQWE7a0JBQXRCLE1BQU07WUFDRyxjQUFjO2tCQUF2QixNQUFNO1lBQ0csa0JBQWtCO2tCQUEzQixNQUFNO1lBQ0csaUJBQWlCO2tCQUExQixNQUFNO1lBQ0csV0FBVztrQkFBcEIsTUFBTTtZQUNHLGtCQUFrQjtrQkFBM0IsTUFBTTtZQUNHLFdBQVc7a0JBQXBCLE1BQU07WUFDRyxXQUFXO2tCQUFwQixNQUFNO1lBQ0csV0FBVztrQkFBcEIsTUFBTTtZQUNHLGFBQWE7a0JBQXRCLE1BQU07WUFDRyxTQUFTO2tCQUFsQixNQUFNO1lBR0csZUFBZTtrQkFBeEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgTmdab25lLCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3V0cHV0LCBSZW5kZXJlcjIsIFNpbXBsZUNoYW5nZSwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCAqIGFzIFBseXIgZnJvbSAncGx5cic7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpbHRlciwgZmlyc3QsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgRGVmYXVsdFBseXJEcml2ZXIgfSBmcm9tICcuLi9wbHlyLWRyaXZlci9kZWZhdWx0LXBseXItZHJpdmVyJztcclxuaW1wb3J0IHsgUGx5ckRyaXZlciB9IGZyb20gJy4uL3BseXItZHJpdmVyL3BseXItZHJpdmVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAncGx5ciwgW3BseXJdJywgLy8gdHNsaW50OmRpc2FibGUtbGluZVxyXG4gIHRlbXBsYXRlVXJsOiAnLi9wbHlyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9wbHlyLmNvbXBvbmVudC5jc3MnXSxcclxuICBleHBvcnRBczogJ3BseXInXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQbHlyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG5cclxuICBwcml2YXRlIHBsYXllckNoYW5nZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGx5cj4obnVsbCk7XHJcblxyXG4gIGdldCBwbGF5ZXIoKTogUGx5ciB7XHJcbiAgICByZXR1cm4gdGhpcy5wbGF5ZXJDaGFuZ2UuZ2V0VmFsdWUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZXZlbnRzID0gbmV3IE1hcCgpO1xyXG5cclxuICBASW5wdXQoKSBwbHlyRHJpdmVyOiBQbHlyRHJpdmVyO1xyXG5cclxuICBASW5wdXQoKSBwbHlyVHlwZTogUGx5ci5NZWRpYVR5cGUgPSAndmlkZW8nO1xyXG5cclxuICBASW5wdXQoKSBwbHlyVGl0bGU6IHN0cmluZztcclxuXHJcbiAgQElucHV0KCkgcGx5clBvc3Rlcjogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKSBwbHlyU291cmNlczogUGx5ci5Tb3VyY2VbXTtcclxuXHJcbiAgQElucHV0KCkgcGx5clRyYWNrczogUGx5ci5UcmFja1tdO1xyXG5cclxuICBASW5wdXQoKSBwbHlyT3B0aW9uczogUGx5ci5PcHRpb25zO1xyXG5cclxuICBASW5wdXQoKSBwbHlyQ3Jvc3NPcmlnaW46IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpIHBseXJQbGF5c0lubGluZTogYm9vbGVhbjtcclxuXHJcbiAgQFZpZXdDaGlsZCgndicpIHByaXZhdGUgdnI6IEVsZW1lbnRSZWY7XHJcblxyXG4gIC8vIG5neC1wbHlyIGV2ZW50c1xyXG4gIEBPdXRwdXQoKSBwbHlySW5pdCA9IHRoaXMucGxheWVyQ2hhbmdlLnBpcGUoZmlsdGVyKHBsYXllciA9PiAhIXBsYXllcikpIGFzIEV2ZW50RW1pdHRlcjxQbHlyPjtcclxuXHJcbiAgLy8gc3RhbmRhcmQgbWVkaWEgZXZlbnRzXHJcbiAgQE91dHB1dCgpIHBseXJQcm9ncmVzcyA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdwcm9ncmVzcycpO1xyXG4gIEBPdXRwdXQoKSBwbHlyUGxheWluZyA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdwbGF5aW5nJyk7XHJcbiAgQE91dHB1dCgpIHBseXJQbGF5ID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3BsYXknKTtcclxuICBAT3V0cHV0KCkgcGx5clBhdXNlID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3BhdXNlJyk7XHJcbiAgQE91dHB1dCgpIHBseXJUaW1lVXBkYXRlID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3RpbWV1cGRhdGUnKTtcclxuICBAT3V0cHV0KCkgcGx5clZvbHVtZUNoYW5nZSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCd2b2x1bWVjaGFuZ2UnKTtcclxuICBAT3V0cHV0KCkgcGx5clNlZWtpbmcgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnc2Vla2luZycpO1xyXG4gIEBPdXRwdXQoKSBwbHlyU2Vla2VkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3NlZWtlZCcpO1xyXG4gIEBPdXRwdXQoKSBwbHlyUmF0ZUNoYW5nZSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdyYXRlY2hhbmdlJyk7XHJcbiAgQE91dHB1dCgpIHBseXJFbmRlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdlbmRlZCcpO1xyXG4gIEBPdXRwdXQoKSBwbHlyRW50ZXJGdWxsU2NyZWVuID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2VudGVyZnVsbHNjcmVlbicpO1xyXG4gIEBPdXRwdXQoKSBwbHlyRXhpdEZ1bGxTY3JlZW4gPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnZXhpdGZ1bGxzY3JlZW4nKTtcclxuICBAT3V0cHV0KCkgcGx5ckNhcHRpb25zRW5hYmxlZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdjYXB0aW9uc2VuYWJsZWQnKTtcclxuICBAT3V0cHV0KCkgcGx5ckNhcHRpb25zRGlzYWJsZWQgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnY2FwdGlvbnNkaXNhYmxlZCcpO1xyXG4gIEBPdXRwdXQoKSBwbHlyTGFuZ3VhZ2VDaGFuZ2UgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnbGFuZ3VhZ2VjaGFuZ2UnKTtcclxuICBAT3V0cHV0KCkgcGx5ckNvbnRyb2xzSGlkZGVuID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NvbnRyb2xzaGlkZGVuJyk7XHJcbiAgQE91dHB1dCgpIHBseXJDb250cm9sc1Nob3duID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NvbnRyb2xzc2hvd24nKTtcclxuICBAT3V0cHV0KCkgcGx5clJlYWR5ID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3JlYWR5Jyk7XHJcblxyXG4gIC8vIEhUTUw1IGV2ZW50c1xyXG4gIEBPdXRwdXQoKSBwbHlyTG9hZFN0YXJ0ID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2xvYWRzdGFydCcpO1xyXG4gIEBPdXRwdXQoKSBwbHlyTG9hZGVkRGF0YSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdsb2FkZWRkYXRhJyk7XHJcbiAgQE91dHB1dCgpIHBseXJMb2FkZWRNZXRhZGF0YSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdsb2FkZWRtZXRhZGF0YScpO1xyXG4gIEBPdXRwdXQoKSBwbHlyUXVhbGl0eUNoYW5nZSA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdxdWFsaXR5Y2hhbmdlJyk7XHJcbiAgQE91dHB1dCgpIHBseXJDYW5QbGF5ID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NhbnBsYXknKTtcclxuICBAT3V0cHV0KCkgcGx5ckNhblBsYXlUaHJvdWdoID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ2NhbnBsYXl0aHJvdWdoJyk7XHJcbiAgQE91dHB1dCgpIHBseXJTdGFsbGVkID0gdGhpcy5jcmVhdGVMYXp5RXZlbnQoJ3N0YWxsZWQnKTtcclxuICBAT3V0cHV0KCkgcGx5cldhaXRpbmcgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnd2FpdGluZycpO1xyXG4gIEBPdXRwdXQoKSBwbHlyRW1wdGllZCA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdlbXB0aWVkJyk7XHJcbiAgQE91dHB1dCgpIHBseXJDdWVDaGFuZ2UgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnY3VlY2hhbmdlJyk7XHJcbiAgQE91dHB1dCgpIHBseXJFcnJvciA9IHRoaXMuY3JlYXRlTGF6eUV2ZW50KCdlcnJvcicpO1xyXG5cclxuICAvLyBZb3VUdWJlIGV2ZW50c1xyXG4gIEBPdXRwdXQoKSBwbHlyU3RhdGVDaGFuZ2UgPSB0aGlzLmNyZWF0ZUxhenlFdmVudCgnc3RhdGVjaGFuZ2UnKTtcclxuXHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICBwcml2YXRlIGRyaXZlcjogUGx5ckRyaXZlcjtcclxuXHJcbiAgcHJpdmF0ZSB2aWRlb0VsZW1lbnQ6IEhUTUxWaWRlb0VsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PixcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwIGluIGtleW9mIFBseXJDb21wb25lbnRdPzogU2ltcGxlQ2hhbmdlOyB9KSB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnBseXJJbml0LnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKChwbGF5ZXI6IFBseXIpID0+IHtcclxuICAgICAgY29uc3QgcmVpbml0VHJpZ2dlcnMgPSBbY2hhbmdlcy5wbHlyT3B0aW9ucywgY2hhbmdlcy5wbHlyUGxheXNJbmxpbmUsIGNoYW5nZXMucGx5ckNyb3NzT3JpZ2luXS5maWx0ZXIodCA9PiAhIXQpO1xyXG5cclxuICAgICAgaWYgKHJlaW5pdFRyaWdnZXJzLmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChyZWluaXRUcmlnZ2Vycy5zb21lKHQgPT4gIXQuZmlyc3RDaGFuZ2UpKSB7XHJcbiAgICAgICAgICB0aGlzLmluaXRQbHlyKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBseXJTb3VyY2UocGxheWVyKTtcclxuICAgICAgfVxyXG4gICAgfSkpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmRlc3Ryb3lQbGF5ZXIoKTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMuaW5pdFBseXIoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdFBseXIoZm9yY2UgPSBmYWxzZSkge1xyXG4gICAgaWYgKGZvcmNlIHx8ICF0aGlzLnBsYXllcikge1xyXG4gICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95UGxheWVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZHJpdmVyID0gdGhpcy5wbHlyRHJpdmVyIHx8IG5ldyBEZWZhdWx0UGx5ckRyaXZlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmVuc3VyZVZpZGVvRWxlbWVudCgpO1xyXG5cclxuICAgICAgICBjb25zdCBuZXdQbGF5ZXIgPSB0aGlzLmRyaXZlci5jcmVhdGUoe1xyXG4gICAgICAgICAgdmlkZW9FbGVtZW50OiB0aGlzLnZpZGVvRWxlbWVudCxcclxuICAgICAgICAgIG9wdGlvbnM6IHRoaXMucGx5ck9wdGlvbnMsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlUGx5clNvdXJjZShuZXdQbGF5ZXIpO1xyXG5cclxuICAgICAgICB0aGlzLnBsYXllckNoYW5nZS5uZXh0KG5ld1BsYXllcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVQbHlyU291cmNlKHBseXI6IFBseXIpIHtcclxuICAgIHRoaXMuZHJpdmVyLnVwZGF0ZVNvdXJjZSh7XHJcbiAgICAgIHZpZGVvRWxlbWVudDogdGhpcy52aWRlb0VsZW1lbnQsXHJcbiAgICAgIHBseXIsXHJcbiAgICAgIHNvdXJjZToge1xyXG4gICAgICAgIHR5cGU6IHRoaXMucGx5clR5cGUsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMucGx5clRpdGxlLFxyXG4gICAgICAgIHNvdXJjZXM6IHRoaXMucGx5clNvdXJjZXMsXHJcbiAgICAgICAgcG9zdGVyOiB0aGlzLnBseXJQb3N0ZXIsXHJcbiAgICAgICAgdHJhY2tzOiB0aGlzLnBseXJUcmFja3MsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTM3MDQxMDIvMTk5MDQ1MVxyXG4gIHByaXZhdGUgY3JlYXRlTGF6eUV2ZW50PFQgZXh0ZW5kcyBQbHlyLlBseXJFdmVudD4obmFtZTogUGx5ci5TdGFuZGFyZEV2ZW50IHwgUGx5ci5IdG1sNUV2ZW50IHwgUGx5ci5Zb3V0dWJlRXZlbnQpOiBFdmVudEVtaXR0ZXI8VD4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGx5ckluaXQucGlwZShcclxuICAgICAgc3dpdGNoTWFwKCgpID0+IG5ldyBPYnNlcnZhYmxlKG9ic2VydmVyID0+IHRoaXMub24obmFtZSwgKGRhdGE6IFQpID0+IHRoaXMubmdab25lLnJ1bigoKSA9PiBvYnNlcnZlci5uZXh0KGRhdGEpKSkpKVxyXG4gICAgKSBhcyBFdmVudEVtaXR0ZXI8VD47XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRlc3Ryb3lQbGF5ZXIoKSB7XHJcbiAgICBpZiAodGhpcy5wbGF5ZXIpIHtcclxuICAgICAgQXJyYXkuZnJvbSh0aGlzLmV2ZW50cy5rZXlzKCkpLmZvckVhY2gobmFtZSA9PiB0aGlzLm9mZihuYW1lKSk7XHJcblxyXG4gICAgICB0aGlzLmRyaXZlci5kZXN0cm95KHtcclxuICAgICAgICBwbHlyOiB0aGlzLnBsYXllcixcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLnZpZGVvRWxlbWVudCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldCBob3N0RWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIC8vIHRoaXMgbWV0aG9kIGlzIHJlcXVpcmVkIGJlY2F1c2UgdGhlIHBseXIgaW5zZXJ0cyBjbG9uZSBvZiB0aGUgb3JpZ2luYWwgZWxlbWVudCBvbiBkZXN0cm95XHJcbiAgLy8gc28gd2UgY2F0Y2ggdGhlIGNsb25lIGVsZW1lbnQgcmlnaHQgaGVyZSBhbmQgcmV1c2UgaXRcclxuICBwcml2YXRlIGVuc3VyZVZpZGVvRWxlbWVudCgpIHtcclxuICAgIGNvbnN0IHZpZGVvRWxlbWVudCA9IHRoaXMuaG9zdEVsZW1lbnQucXVlcnlTZWxlY3RvcigndmlkZW8nKTtcclxuXHJcbiAgICBpZiAodmlkZW9FbGVtZW50KSB7XHJcbiAgICAgIHRoaXMudmlkZW9FbGVtZW50ID0gdmlkZW9FbGVtZW50O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52aWRlb0VsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgICAgIHRoaXMudmlkZW9FbGVtZW50LmNvbnRyb2xzID0gdHJ1ZTtcclxuXHJcbiAgICAgIGlmICh0aGlzLnBseXJDcm9zc09yaWdpbikge1xyXG4gICAgICAgIHRoaXMudmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnY3Jvc3NvcmlnaW4nLCAnJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLnBseXJQbGF5c0lubGluZSkge1xyXG4gICAgICAgIHRoaXMudmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAnJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5ob3N0RWxlbWVudCwgdGhpcy52aWRlb0VsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvbihuYW1lOiBzdHJpbmcsIGhhbmRsZXI6IGFueSkge1xyXG4gICAgdGhpcy5ldmVudHMuc2V0KG5hbWUsIGhhbmRsZXIpO1xyXG4gICAgdGhpcy5wbGF5ZXIub24obmFtZSBhcyBhbnksIGhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvZmYobmFtZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnBsYXllci5vZmYobmFtZSBhcyBhbnksIHRoaXMuZXZlbnRzLmdldChuYW1lKSk7XHJcbiAgICB0aGlzLmV2ZW50cy5kZWxldGUobmFtZSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=