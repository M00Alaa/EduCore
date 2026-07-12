import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true,
})
export class DurationPipe implements PipeTransform {
  transform(startDate: Date | string | undefined | null, endDate: Date | string | undefined | null): string {
    if (!startDate || !endDate) {
      return '-';
    }
    // Convert inputs to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validate dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return '-';
    }

    // Ensure start is before end
    if (start > end) {
      return this.transform(end, start); // Swap if needed
    }

    // Calculate time difference in milliseconds
    const diffMs = end.getTime() - start.getTime();
    
    // Constants for time units in milliseconds
    const msInDay = 1000 * 60 * 60 * 24;
    const msInMonth = msInDay * 30.44; // Average month length
    const msInYear = msInDay * 365.25; // Account for leap years

    // Calculate years, months, days
    let years = Math.floor(diffMs / msInYear);
    let remainingMs = diffMs % msInYear;

    let months = Math.floor(remainingMs / msInMonth);
    remainingMs = remainingMs % msInMonth;

    let days = Math.floor(remainingMs / msInDay);

    // Build the duration string
    const parts: string[] = [];

    if (years > 0) {
      parts.push(`${years} ${years === 1 ? 'عام' : 'أعوام'}`);
    }
    if (months > 0) {
      parts.push(`${months} ${months === 1 ? 'شهر' : 'شهور'}`);
    }
    if (days > 0) {
      parts.push(`${days} ${days === 1 ? 'يوم' : 'أيام'}`);
    }

    // Return formatted string or fallback
    return parts.length > 0 ? parts.join('، ') : 'أقل من يوم';
  }
}