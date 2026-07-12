import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToRead',
  standalone: true
})
export class MinutesToReadPipe implements PipeTransform {

  transform(timeInMinutes: number): string {
    if (timeInMinutes < 0) {
      return "0 دقيقة";
    }
  
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    
    let hoursString = '';
    let minutesString = '';
  
    // Handle hours string
    if (hours > 0) {
      if (hours === 1) {
        hoursString = 'ساعة واحدة';
      } else if (hours === 2) {
        hoursString = 'ساعتان';
      } else if (hours <= 10) {
        hoursString = `${hours} ساعات`;
      } else {
        hoursString = `${hours} ساعة`;
      }
    }
  
    // Handle minutes string
    if (minutes > 0) {
      if (minutes === 1) {
        minutesString = 'دقيقة واحدة';
      } else if (minutes === 2) {
        minutesString = 'دقيقتان';
      } else if (minutes <= 10) {
        minutesString = `${minutes} دقائق`;
      } else {
        minutesString = `${minutes} دقيقة`;
      }
    }
  
    // Combine hours and minutes
    if (hours > 0 && minutes > 0) {
      return `${hoursString} و ${minutesString}`;
    } else if (hours > 0) {
      return hoursString;
    } else if (minutes > 0) {
      return minutesString;
    } else {
      return 'الوقت مفتوح';
    }
  }

}
